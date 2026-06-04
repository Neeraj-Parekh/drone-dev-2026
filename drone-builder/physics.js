/**
 * COEP Hexacopter — Physics Engine v1.0
 * 
 * Calculates MTOW, flight time, thrust margin, hover current,
 * and checks compatibility rules from components.json.
 * 
 * Validated against Path G-A from v4 report:
 *   MTOW = 36.4 kg, Flight time = 16 min, Thrust margin = 2.5x
 */

const PhysicsEngine = {
  GRAVITY_MS2: 9.81,
  AIR_DENSITY_KGM3: 1.225,

  // Formula panel overrides (set by applyFormulaParams)
  _overrideDod: null,
  _overrideEfficiency: null,
  _overrideWiring: null,
  _overridePumpPower: null,

  /**
   * Main calculation: given a configuration object, return all derived values.
   * 
   * @param {Object} config - Component selections
   * @param {string} config.frame - Frame component ID
   * @param {string} config.motor - Motor component ID (single combo)
   * @param {number} config.motorCount - Number of motors (4, 6, 8)
   * @param {string} config.battery - Battery component ID
   * @param {number} config.batteryCount - Number of batteries in parallel
   * @param {string} config.fc - Flight controller component ID
   * @param {string} config.gps - GPS component ID
   * @param {string} config.pdb - PDB component ID
   * @param {string} config.pump - Pump component ID
   * @param {number} config.tankCapacity_L - Tank capacity in liters
   * @param {Object} components - Full components database (from components.json)
   * @returns {Object} Calculation results
   */
  calculate(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);

    const frame = getComp(config.frame);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const fc = getComp(config.fc);
    const gps = getComp(config.gps);
    const pdb = getComp(config.pdb);
    const pump = getComp(config.pump);

    if (!frame || !motor || !battery || !fc) {
      return { error: "Missing required components" };
    }

    const motorCount = config.motorCount ?? 6;
    const batteryCount = config.batteryCount ?? 1;
    const tankCapacity_L = config.tankCapacity_L ?? 10;
    const tankWeight_g = config.tankWeight_g ?? 5800; // Default: EFT 10L tank dry weight

    // Step 1: Dry Weight (grams)
    const dryWeight = this.calculateDryWeight(config, components);

    // Step 2: MTOW (grams)
    const liquidWeight_g = tankCapacity_L * 1000; // 1L water = 1000g
    const mtow_g = dryWeight + liquidWeight_g;

    // Step 3: Frame Check
    const frameMTOW_g = frame.specs.max_takeoff_weight_kg * 1000;
    const frameExceeds = mtow_g > frameMTOW_g;

    // Step 4: Hover Physics
    const maxThrustPerMotor_g = motor.specs.max_thrust_g || 15000;
    const hoverThrustPerMotor_g = mtow_g / motorCount;
    const hoverThrottle = hoverThrustPerMotor_g / maxThrustPerMotor_g;

    // Dynamic efficiency curve: efficiency drops as throttle increases (linear model anchored at 50% throttle)
    const baseEfficiency = parseFloat(motor.specs.efficiency_g_per_W) || 9.0;
    const dynamicEfficiency = baseEfficiency - 5.7 * (hoverThrottle - 0.5);
    const motorEfficiency_gPerW = this._overrideEfficiency || Math.max(5.0, Math.min(baseEfficiency + 1.0, dynamicEfficiency));

    const hoverPowerPerMotor_W = hoverThrustPerMotor_g / motorEfficiency_gPerW;
    const totalHoverPower_W = hoverPowerPerMotor_W * motorCount;

    // Step 5: Battery Check
    const batteryVoltage_V = battery.specs.nominal_voltage_V || 44.4;
    const batteryCapacity_Ah = battery.specs.capacity_Ah || 30;
    const batteryC = battery.specs.continuous_discharge_C || 3;
    const batteryPeakC = battery.specs.peak_discharge_C || (batteryC * 1.5);

    const pumpPower_W = this._overridePumpPower || (pump ? (pump.specs.power_W || 60) : 0);
    const totalHoverPowerWithPump_W = totalHoverPower_W + pumpPower_W;

    // Hover current correctly includes pump draw
    const hoverCurrent_A = totalHoverPowerWithPump_W / batteryVoltage_V;

    // Peak current represents maximum burst power (max propulsion power + pump)
    const peakMotorPower_W = motor.specs.rated_power_W || 950;
    const peakCurrent_A = ((peakMotorPower_W * motorCount) + pumpPower_W) / batteryVoltage_V;

    const batteryMaxCurrent_A = batteryC * batteryCapacity_Ah * batteryCount;
    const batteryPeakMaxCurrent_A = batteryPeakC * batteryCapacity_Ah * batteryCount;

    // Red error if continuous exceeds continuous rating OR peak exceeds peak rating
    const batteryExceeds = (hoverCurrent_A > batteryMaxCurrent_A) || (peakCurrent_A > batteryPeakMaxCurrent_A);

    // Step 6: Flight Time
    const batteryEnergy_Wh = batteryCapacity_Ah * batteryVoltage_V;
    const batteryDoD = this._overrideDod || this.estimateDoD(battery);
    const usableWh = batteryEnergy_Wh * batteryDoD;
    const totalPower_W = totalHoverPower_W + pumpPower_W;
    const flightTime_min = (usableWh / totalPower_W) * 60;

    // Step 7: Thrust Margin
    const totalMaxThrust_g = maxThrustPerMotor_g * motorCount;
    const thrustMargin = totalMaxThrust_g / mtow_g;
    const thrustMarginLow = thrustMargin < 2.0;

    // Cost calculation
    const totalCost = this.calculateCost(config, components);

    // Compatibility checks
    const compatibilityIssues = this.checkCompatibility(config, components);

    return {
      // Weight
      dryWeight_g: Math.round(dryWeight),
      liquidWeight_g: Math.round(liquidWeight_g),
      mtow_g: Math.round(mtow_g),
      mtow_kg: (mtow_g / 1000).toFixed(1),

      // Frame
      frameMTOW_g: frameMTOW_g,
      frameMTOW_kg: (frameMTOW_g / 1000).toFixed(1),
      frameExceeds: frameExceeds,

      // Hover
      hoverThrustPerMotor_g: Math.round(hoverThrustPerMotor_g),
      hoverPowerPerMotor_W: Math.round(hoverPowerPerMotor_W),
      totalHoverPower_W: Math.round(totalHoverPower_W),
      hoverCurrent_A: hoverCurrent_A.toFixed(1),

      // Battery
      batteryEnergy_Wh: Math.round(batteryEnergy_Wh),
      batteryDoD: batteryDoD,
      usableWh: Math.round(usableWh),
      peakCurrent_A: Math.round(peakCurrent_A),
      batteryMaxCurrent_A: Math.round(batteryMaxCurrent_A),
      batteryExceeds: batteryExceeds,

      // Flight
      flightTime_min: flightTime_min.toFixed(1),
      flightTime_reserve_min: (flightTime_min - 5).toFixed(1), // 5 min reserve

      // Thrust
      maxThrustPerMotor_g: maxThrustPerMotor_g,
      totalMaxThrust_g: totalMaxThrust_g,
      thrustMargin: thrustMargin.toFixed(2),
      thrustMarginLow: thrustMarginLow,

      // Cost
      totalCost_INR: totalCost,
      costFormatted: "₹" + totalCost.toLocaleString('en-IN'),

      // Safety flags
      flags: this.generateFlags({
        frameExceeds, batteryExceeds, thrustMarginLow,
        mtow_g, frameMTOW_g, thrustMargin, peakCurrent_A, batteryMaxCurrent_A
      }),

      // Compatibility
      compatibilityIssues: compatibilityIssues,

      // Metadata
      motorCount: motorCount,
      batteryCount: batteryCount,
      tankCapacity_L: tankCapacity_L
    };
  },

  isFlyingComponent(comp) {
    const nonFlyingGroups = new Set(['charger', 'regulatory']);
    if (nonFlyingGroups.has(comp.compare_group)) return false;

    const groundIds = new Set(['tool_kit', 'smoke_stopper', 'prop_balancer', 'calibration_scale', 'lipo_safe_bag']);
    if (groundIds.has(comp.id)) return false;

    return true;
  },

  calculateDryWeight(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);
    const frame = getComp(config.frame);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const fc = getComp(config.fc);
    const gps = getComp(config.gps);
    const pdb = getComp(config.pdb) || getComp('tarot_tl2996_pdb');
    const pump = getComp(config.pump);
    const camera = getComp(config.camera);
    const sensor = getComp(config.sensor);

    let tank = getComp(config.tank);
    if (!tank && components.length > 0) {
      const capacity = config.tankCapacity_L ?? 10;
      tank = components.find(c => c.compare_group === 'tank' && (c.specs?.capacity_L === capacity || c.specs?.capacity_l === capacity));
    }

    let weight = 0;
    if (frame) weight += frame.weight_g || 0;
    if (motor) weight += (motor.weight_g || 0) * (config.motorCount ?? 6);
    if (battery) weight += (battery.weight_g || 0) * (config.batteryCount ?? 1);
    if (tank) weight += tank.weight_g || 0;
    if (fc) weight += fc.weight_g || 0;
    if (gps) weight += gps.weight_g || 0;
    if (pdb) weight += pdb.weight_g || 0;
    if (pump) weight += pump.weight_g || 0;
    if (camera) weight += camera.weight_g || 0;
    if (sensor) weight += sensor.weight_g || 0;

    // Dynamically add required flying accessories from the database
    if (components.length > 0) {
      const selectedIds = new Set([
        config.frame, config.motor, config.battery, config.fc, config.gps,
        config.pdb || 'tarot_tl2996_pdb', config.pump, tank?.id, config.camera, config.sensor,
        config.rc_rx,
        ...(config.extras || [])
      ].filter(Boolean));

      // Determine correct RC receiver: prefer ELRS if config specifies it, otherwise fall back to FrSky
      const rcReceiverId = (config.rc_rx === 'elrs' || config.rx === 'betafpv_elrs_lite_rx' || config.rc_rx === 'betafpv_elrs_lite_rx')
        ? 'betafpv_elrs_lite_rx'
        : (config.rc_rx === 'skydroid_t12' ? 'skydroid_t12' : 'frsky_rxsr');

      const requiredFlyingAccessoryIds = [
        'mauch_hs200_lv',      // current sensor
        'matek_12v_bec',       // bec
        rcReceiverId,          // receiver (ELRS or FrSky)
        'g10_vibration_pads',   // vibration pads
        '6awg_wire_harness',   // wire harness
        '100a_anl_fuse',       // fuse
        'gps_mast_20cm',       // gps mast
        'battery_strap',       // battery strap
        'teejet_xr11002'       // spray nozzles
      ];

      requiredFlyingAccessoryIds.forEach(id => {
        if (!selectedIds.has(id)) {
          const c = getComp(id);
          if (c) {
            let itemWeight = c.weight_g || 0;
            if (id === 'teejet_xr11002' && pump && (parseFloat(pump.specs?.flow_L_per_min) > 5)) {
              itemWeight *= 2;
            }
            weight += itemWeight;
          }
        }
      });
    }

    // Add extras[] — optional add-on components declared per-preset (LiDAR, camera, backup GPS, etc.)
    if (Array.isArray(config.extras)) {
      config.extras.forEach(extraId => {
        const extra = getComp(extraId);
        if (extra && PhysicsEngine.isFlyingComponent(extra, components)) {
          weight += extra.weight_g || 0;
        }
      });
    }

    return weight;
  },

  calculateCost(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);
    const frame = getComp(config.frame);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const fc = getComp(config.fc);
    const gps = getComp(config.gps);
    const pdb = getComp(config.pdb) || getComp('tarot_tl2996_pdb');
    const pump = getComp(config.pump);
    const camera = getComp(config.camera);
    const sensor = getComp(config.sensor);

    let tank = getComp(config.tank);
    if (!tank && components.length > 0) {
      const capacity = config.tankCapacity_L ?? 10;
      tank = components.find(c => c.compare_group === 'tank' && (c.specs?.capacity_L === capacity || c.specs?.capacity_l === capacity));
      // Fallback: match by approximate capacity for custom tanks (e.g. 7L HDPE)
      if (!tank && capacity <= 7) {
        tank = getComp('generic_7l_hdpe_tank');
      }
    }

    let cost = 0;
    if (frame) cost += frame.price_inr || 0;
    if (motor) cost += (motor.price_inr || 0) * (config.motorCount ?? 6);
    if (battery) cost += (battery.price_inr || 0) * (config.batteryCount ?? 1);
    if (tank) cost += tank.price_inr || 0;
    if (fc) cost += fc.price_inr || 0;
    if (gps) cost += gps.price_inr || 0;
    if (pdb) cost += pdb.price_inr || 0;
    if (pump) cost += pump.price_inr || 0;
    if (camera) cost += camera.price_inr || 0;
    if (sensor) cost += sensor.price_inr || 0;

    // Add extras[] — optional add-on components declared per-preset (LiDAR, camera, backup GPS, etc.)
    if (Array.isArray(config.extras)) {
      config.extras.forEach(extraId => {
        const extra = getComp(extraId);
        if (extra) cost += extra.price_inr || 0;
      });
    }

    // Dynamically add required accessories from database
    if (components.length > 0) {
      const selectedIds = new Set([
        config.frame, config.motor, config.battery, config.fc, config.gps,
        config.pdb || 'tarot_tl2996_pdb', config.pump, tank?.id, config.camera, config.sensor,
        config.rc_rx,
        ...(config.extras || [])
      ].filter(Boolean));

      // Determine correct RC receiver: prefer ELRS if config specifies it, otherwise fall back to FrSky
      const rcReceiverId = (config.rc_rx === 'elrs' || config.rx === 'betafpv_elrs_lite_rx' || config.rc_rx === 'betafpv_elrs_lite_rx')
        ? 'betafpv_elrs_lite_rx'
        : (config.rc_rx === 'skydroid_t12' ? 'skydroid_t12' : 'frsky_rxsr');

      let chargerId = 'skyrc_pc1260';
      if (battery) {
        let batteryS = 0;
        if (battery.compatibility?.cells) {
          const match = String(battery.compatibility.cells).match(/(\d+)S/i);
          if (match) batteryS = parseInt(match[1]);
        }
        if (!batteryS && battery.specs?.configuration) {
          const match = String(battery.specs.configuration).match(/(\d+)S/i);
          if (match) batteryS = parseInt(match[1]);
        }
        if (!batteryS) {
          batteryS = Math.round((battery.specs?.nominal_voltage_V || battery.specs?.voltage_V || 44.4) / 3.7);
        }
        if (batteryS === 14) {
          chargerId = 'ultrapower_up2800_14s';
        } else if (batteryS <= 6) {
          chargerId = 'hobbymate_h6ac_charger';
        }
      }

      const requiredAccessoryIds = [
        'mauch_hs200_lv',       // current sensor
        'matek_12v_bec',        // BEC
        rcReceiverId,           // RC receiver (ELRS or FrSky)
        'g10_vibration_pads',   // vibration pads
        '6awg_wire_harness',    // wire harness
        '100a_anl_fuse',        // fuse
        'gps_mast_20cm',        // gps mast
        'battery_strap',        // battery strap
        'teejet_xr11002',       // spray nozzles
        chargerId,              // dynamic charger based on battery voltage (PC1260/UP2800/H6AC)
        'tool_kit',             // maintenance tool kit
        'smoke_stopper',        // safety smoke stopper
        'prop_balancer',        // propeller balancer
        'calibration_scale',    // calibration scale
        'lipo_safe_bag'         // lipo safe bag
      ];

      if (config.rc_rx !== 'skydroid_t12') {
        requiredAccessoryIds.push('radiomaster_tx16s_mkii');
      }

      requiredAccessoryIds.forEach(id => {
        if (!selectedIds.has(id)) {
          const c = getComp(id);
          if (c) {
            let itemCost = c.price_inr || 0;
            if (id === 'teejet_xr11002' && pump && (parseFloat(pump.specs?.flow_L_per_min) > 5)) {
              itemCost *= 2;
            }
            cost += itemCost;
          }
        }
      });
    }

    // Dynamic assembly & spare props costs scaled as a percentage of Bill of Materials (BOM)
    const assemblyCost = Math.round(cost * 0.05); // 5% of BOM for integration, assembly, and testing
    const sparePropsCost = Math.round(cost * 0.01); // 1% of BOM for spare propellers and consumables
    cost += assemblyCost + sparePropsCost;

    return cost;
  },

  estimateDoD(battery) {


    // Semi-solid batteries at 3C discharge: ~80% DoD
    // LiPo Pro at 5C: ~75% DoD
    // Conservative estimate based on chemistry
    const chemistry = battery.specs.chemistry || "";
    const dischargeC = battery.specs.continuous_discharge_C || 3;

    if (chemistry.includes("Semi-solid")) return 0.80;
    if (dischargeC >= 25) return 0.75; // High C-rate LiPo
    return 0.80; // Default
  },

  checkCompatibility(config, components) {
    components = components || [];
    const issues = [];
    const getComp = (id) => components.find(c => c.id === id);
    const battery = getComp(config.battery);
    const fc = getComp(config.fc);
    const gps = getComp(config.gps);
    const motor = getComp(config.motor);
    const frame = getComp(config.frame);
    const pdb = getComp(config.pdb);
    const pump = getComp(config.pump);
    const powerModule = getComp(config.powerModule);

    // Pre-calculate battery cells
    let batteryS = 0;
    if (battery) {
      if (battery.compatibility?.cells) {
        const match = String(battery.compatibility.cells).match(/(\d+)S/i);
        if (match) batteryS = parseInt(match[1]);
      }
      if (!batteryS && battery.specs?.configuration) {
        const match = String(battery.specs.configuration).match(/(\d+)S/i);
        if (match) batteryS = parseInt(match[1]);
      }
      if (!batteryS) {
        batteryS = Math.round((battery.specs?.nominal_voltage_V || battery.specs?.voltage_V || 44.4) / 3.7);
      }
    }

    // Resolve charger dynamically if not explicitly selected
    let charger = getComp(config.charger);
    if (!charger && battery) {
      let chargerId = 'skyrc_pc1260';
      if (batteryS === 14) {
        chargerId = 'ultrapower_up2800_14s';
      } else if (batteryS <= 6) {
        chargerId = 'hobbymate_h6ac_charger';
      }
      charger = getComp(chargerId);
    }

    let tank = getComp(config.tank);
    if (!tank && components.length > 0) {
      const capacity = config.tankCapacity_L ?? 10;
      tank = components.find(c => c.compare_group === 'tank' && (c.specs?.capacity_L === capacity || c.specs?.capacity_l === capacity));
    }

    // === CRITICAL ERRORS (RED) ===

    // R1: Power Module + FC compatibility
    if (fc && powerModule) {
      if (fc.id === "pixhawk_6c_combo" && powerModule.id === "holybro_pm02d") {
        issues.push({
          rule: "R1", severity: "error", icon: "🔴",
          title: "WRONG POWER MODULE",
          message: "PM02D uses I2C protocol. Pixhawk 6C requires PM02 V3 (analog). Drone will not boot.",
          component: powerModule.name,
          fix: "Use Holybro PM02V3 instead of PM02D"
        });
      }
      if (fc.id === "cube_orange_plus" && powerModule.id === "pm02_v3") {
        issues.push({
          rule: "R1", severity: "error", icon: "🔴",
          title: "WRONG POWER MODULE",
          message: "PM02V3 is analog. Cube Orange+ requires PM02D (I2C) or Carrier Board power module.",
          component: powerModule.name,
          fix: "Use Holybro PM02D with Cube Orange+ carrier board"
        });
      }
    }

    // R2: Battery voltage vs charger
    if (battery && charger) {
      let chargerMaxS = 0;
      if (charger.specs?.max_cells) {
        chargerMaxS = parseInt(charger.specs.max_cells);
      } else if (charger.specs?.max_cell_count) {
        const match = String(charger.specs.max_cell_count).match(/(\d+)S/i);
        if (match) chargerMaxS = parseInt(match[1]);
      } else if (charger.compatibility?.voltage) {
        const match = String(charger.compatibility.voltage).match(/(\d+)S/i);
        if (match) chargerMaxS = parseInt(match[1]);
      }

      if (chargerMaxS > 0 && batteryS > chargerMaxS) {
        issues.push({
          rule: "R2", severity: "error", icon: "🔴",
          title: "CRITICAL CHARGING FIRE RISK",
          message: `${battery.name} is ${batteryS}S. ${charger.name} only charges up to ${chargerMaxS}S. Attempting to charge a ${batteryS}S battery with a ${chargerMaxS}S charger is an extreme fire hazard.`,
          component: charger.name,
          fix: `Upgrade to a compatible charger (e.g. SkyRC PC1260 for 12S, UltraPower UP2800 for 14S)`
        });
      }
    }

    // R3: GPS compass check
    if (gps && fc) {
      const hasCompass = gps.specs?.compass && gps.specs.compass !== "none";
      const isArduPilot = fc.specs?.firmware?.includes("ArduPilot");
      if (!hasCompass && isArduPilot) {
        issues.push({
          rule: "R3", severity: "error", icon: "🔴",
          title: "GPS HAS NO COMPASS",
          message: "ArduPilot position-hold, RTL, and auto modes require compass. Flight will be unsafe.",
          component: gps.name,
          fix: "Use a GPS with built-in compass (QMC5883/IST8310) or add external compass"
        });
      }
    }

    // R4: GPS with no compass warning for PX4
    if (gps && fc) {
      const hasCompass = gps.specs?.compass && gps.specs.compass !== "none";
      const isPX4 = fc.specs?.firmware?.includes("PX4");
      if (!hasCompass && isPX4) {
        issues.push({
          rule: "R4", severity: "warning", icon: "⚠️",
          title: "GPS HAS NO COMPASS",
          message: "PX4 will use GPS-only navigation. Position hold degraded without compass heading.",
          component: gps.name,
          fix: "Add compass for better heading accuracy"
        });
      }
    }

    // R5: Frame MTOW check
    if (frame && motor) {
      const motorCount = config.motorCount ?? 6;
      const batteryCount = config.batteryCount ?? 1;
      const tankCapacity_L = config.tankCapacity_L ?? 10;
      const tankWeight_g = config.tankWeight_g ?? 5800;
      const cameraWeight_g = config.cameraWeight_g ?? 0;
      const dryWeight = this.calculateDryWeight(config, components);
      const mtow = dryWeight + (tankCapacity_L * 1000) + cameraWeight_g;
      const frameMax = (frame.specs?.max_takeoff_weight_kg || 36) * 1000;
      if (mtow > frameMax) {
        issues.push({
          rule: "R5", severity: "error", icon: "🔴",
          title: "FRAME OVERLOADED",
          message: `MTOW ${(mtow / 1000).toFixed(1)}kg exceeds frame max ${(frameMax / 1000).toFixed(1)}kg. Frame fatigue, warranty void, crash risk.`,
          component: frame.name,
          fix: "Reduce payload weight or use a higher-rated frame"
        });
      }
    }

    // R6: Battery C-rating vs current (continuous hover vs. continuous C-rate, burst/peak vs. peak C-rate)
    if (battery && motor) {
      const motorCount = config.motorCount || 6;
      const batteryCount = config.batteryCount || 1;
      const batteryVoltage = battery.specs?.nominal_voltage_V || 44.4;
      const capacity = battery.specs?.capacity_Ah || 30;
      const continuousC = battery.specs?.continuous_discharge_C || 3;
      const peakC = battery.specs?.peak_discharge_C || (continuousC * 1.5);

      const continuousMax_A = (battery.specs?.continuous_discharge_A || (continuousC * capacity)) * batteryCount;
      const peakMax_A = (battery.specs?.peak_discharge_A || (peakC * capacity)) * batteryCount;

      const hoverCurrent = this.calculateHoverCurrent(config, components);

      const pumpPower = pump ? (pump.specs?.power_W || 60) : 0;
      const peakMotorPower_W = motor.specs?.rated_power_W || 950;
      const peakCurrent = ((peakMotorPower_W * motorCount) + pumpPower) / batteryVoltage;

      if (hoverCurrent > continuousMax_A) {
        issues.push({
          rule: "R6", severity: "error", icon: "🔴",
          title: "BATTERY CONTINUOUS OVERCURRENT",
          message: `Hover current ${hoverCurrent.toFixed(1)}A exceeds battery continuous max of ${continuousMax_A}A. The battery will overheat and potentially catch fire.`,
          component: battery.name,
          fix: "Use a battery with higher capacity/C-rating, add batteries in parallel, or reduce drone dry weight."
        });
      } else if (peakCurrent > peakMax_A) {
        issues.push({
          rule: "R6", severity: "error", icon: "🔴",
          title: "BATTERY PEAK OVERCURRENT",
          message: `Maximum peak current ${peakCurrent.toFixed(1)}A (at full throttle) exceeds battery peak burst rating of ${peakMax_A}A. Risk of voltage sag, cell damage, or fire at full throttle.`,
          component: battery.name,
          fix: "Use a battery with higher peak discharge rating, add batteries in parallel, or choose more efficient motors."
        });
      }
    }

    // R10: Tank capacity vs Frame MTOW compatibility check
    if (frame && tank) {
      const tankCapacity = tank.specs?.capacity_L || tank.specs?.capacity_l || 10;
      const dryWeightWithoutTank = this.calculateDryWeight(config, components) - (tank.weight_g || 0);
      const tankFullWeight = (tank.weight_g || 0) + (tankCapacity * 1000);
      const estimatedMTOW = dryWeightWithoutTank + tankFullWeight;
      const frameMax = (frame.specs?.max_takeoff_weight_kg || 36) * 1000;
      if (estimatedMTOW > frameMax) {
        issues.push({
          rule: "R10", severity: "error", icon: "🔴",
          title: "TANK EXCEEDS FRAME MTOW",
          message: `Selecting a ${tankCapacity}L tank (${tankCapacity}kg payload + ${tank.weight_g}g dry tank) with this frame puts the minimum MTOW at ${(estimatedMTOW / 1000).toFixed(1)}kg, exceeding the frame limit of ${(frameMax / 1000).toFixed(1)}kg before adding cameras or other accessories.`,
          component: tank.name,
          fix: "Choose a smaller tank (e.g. 10L) or upgrade to a heavier airframe"
        });
      }
    }

    // R7: ESC protocol vs FC CAN ports
    if (motor && fc) {
      const escProtocol = motor.specs?.esc_protocol || "";
      if (escProtocol.includes("DroneCAN")) {
        const canPorts = fc.specs?.can_ports || 0;
        if (canPorts === 0) {
          issues.push({
            rule: "R7", severity: "error", icon: "🔴",
            title: "ESC PROTOCOL MISMATCH",
            message: "Motor ESCs use DroneCAN but FC has no CAN ports.",
            component: fc.name,
            fix: "Use PWM ESCs or switch to FC with CAN ports"
          });
        }
      }
    }

    // R8: PM02D fire risk warning
    if (powerModule && powerModule.id === "holybro_pm02d") {
      issues.push({
        rule: "R8", severity: "warning", icon: "⚠️",
        title: "KNOWN FIRE RISK",
        message: "PM02D has documented fire/melting issues. Monitor voltage readings. Replace if erratic.",
        component: powerModule.name,
        fix: "Replace with PM02V3 (analog, more reliable)"
      });
    }

    // R9: M100 GPS without GPS mast
    if (gps && gps.id === "hglrc_m100_5883") {
      issues.push({
        rule: "R9", severity: "warning", icon: "⚠️",
        title: "GPS MAST REQUIRED",
        message: "M100 GPS is sensitive to motor/ESC noise. Mount on 200mm+ carbon fiber mast away from power cables.",
        component: gps.name,
        fix: "Use GPS mast >= 200mm, route away from power wiring"
      });
    }

    // === WARNINGS (YELLOW) ===

    // W1: Thrust margin
    if (frame && motor) {
      const motorCount = config.motorCount ?? 6;
      const batteryCount = config.batteryCount ?? 1;
      const tankCapacity_L = config.tankCapacity_L ?? 10;
      const tankWeight_g = config.tankWeight_g ?? 5800;
      const cameraWeight_g = config.cameraWeight_g ?? 0;
      const dryWeight = this.calculateDryWeight(config, components);
      const mtow = dryWeight + (tankCapacity_L * 1000) + cameraWeight_g;
      const totalThrust = (motor.specs?.max_thrust_g || 15000) * motorCount;
      const margin = totalThrust / mtow;
      if (margin < 2.0) {
        issues.push({
          rule: "W1", severity: "warning", icon: "⚠️",
          title: "LOW THRUST MARGIN",
          message: `Thrust margin ${margin.toFixed(2)}x is below recommended 2.0x. Poor climb performance, no wind margin.`,
          component: motor.name,
          fix: "Add more motors or reduce payload weight"
        });
      }
    }

    // W2: Hover current > 80% battery max
    if (battery && motor) {
      const hoverCurrent = this.calculateHoverCurrent(config, components);
      const batteryMax = (battery.specs?.continuous_discharge_C || 3) * (battery.specs?.capacity_Ah || 30);
      if (hoverCurrent > batteryMax * 0.8) {
        issues.push({
          rule: "W2", severity: "warning", icon: "⚠️",
          title: "MARGINAL BATTERY",
          message: `Hover current ${hoverCurrent.toFixed(1)}A is >80% of battery max ${batteryMax}A. Battery will heat up.`,
          component: battery.name,
          fix: "Use higher capacity battery or reduce power draw"
        });
      }
    }

    // W3: Flight time < 10 minutes
    if (battery && motor) {
      const motorCount = config.motorCount ?? 6;
      const batteryCount = config.batteryCount ?? 1;
      const tankCapacity_L = config.tankCapacity_L ?? 10;
      const tankWeight_g = config.tankWeight_g ?? 5800;
      const cameraWeight_g = config.cameraWeight_g ?? 0;
      const dryWeight = this.calculateDryWeight(config, components);
      const mtow = dryWeight + (tankCapacity_L * 1000) + cameraWeight_g;
      const efficiency = parseFloat(motor.specs?.efficiency_g_per_W) || 9.0;
      const hoverPower = (mtow / motorCount) / efficiency * motorCount;
      const voltage = battery.specs?.nominal_voltage_V || 44.4;
      const capacity = battery.specs?.capacity_Ah || 30;
      const energy = capacity * voltage * 0.8;
      const pumpPower = pump ? (pump.specs?.power_W || 60) : 0;
      const flightTime = (energy / (hoverPower + pumpPower)) * 60;
      if (flightTime < 10) {
        issues.push({
          rule: "W3", severity: "warning", icon: "⚠️",
          title: "INSUFFICIENT FLIGHT TIME",
          message: `Estimated flight time ${flightTime.toFixed(1)} min is below 10 min minimum for spray missions.`,
          component: battery.name,
          fix: "Use larger battery or reduce payload weight"
        });
      }
    }

    // W4: Vibration pads missing for X8 motors
    if (motor && motor.id.includes("x8")) {
      const hasVibPads = components.some(c => c.id === "g10_vibration_pads");
      if (!hasVibPads) {
        issues.push({
          rule: "W4", severity: "warning", icon: "⚠️",
          title: "MISSING VIBRATION PADS",
          message: "X8 motors produce significant vibration. Without G10 vibration pads, IMU will fail and cause crashes.",
          component: motor.name,
          fix: "Add G10 Vibration Pads (₹500)"
        });
      }
    }

    // W5: No pump selected for spray mission
    if (config.tankCapacity_L && config.tankCapacity_L > 0 && !pump) {
      issues.push({
        rule: "W5", severity: "warning", icon: "⚠️",
        title: "NO PUMP SELECTED",
        message: "Tank capacity is set but no pump selected. Cannot spray without pump.",
        component: "System",
        fix: "Add a pump component to the build"
      });
    }

    // W6: Battery cells vs voltage mismatch
    if (battery) {
      const cells = battery.specs?.cells;
      const voltage = battery.specs?.nominal_voltage_V;
      if (cells && voltage) {
        const expectedV = cells * 3.7;
        if (Math.abs(voltage - expectedV) > 1) {
          issues.push({
            rule: "W6", severity: "warning", icon: "⚠️",
            title: "BATTERY SPECS INCONSISTENT",
            message: `${cells}S battery should be ~${expectedV}V nominal, but listed as ${voltage}V.`,
            component: battery.name,
            fix: "Verify battery specifications are correct"
          });
        }
      }
    }

    // W7: FC without GPS for autonomous missions
    if (fc && !gps) {
      issues.push({
        rule: "W7", severity: "warning", icon: "⚠️",
        title: "NO GPS SELECTED",
        message: "Flight controller has no GPS. Position-hold, RTL, and autonomous missions unavailable.",
        component: fc.name,
        fix: "Add a GPS module for autonomous flight modes"
      });
    }

    // R11: PDB outputs vs motor count
    if (pdb) {
      const motorCount = config.motorCount || 6;
      const escOutputs = pdb.specs?.esc_outputs || 6;
      if (motorCount > escOutputs) {
        issues.push({
          rule: "R11", severity: "error", icon: "🔴",
          title: "INSUFFICIENT PDB OUTPUTS",
          message: `${pdb.name} only has ${escOutputs} ESC outputs, but you selected an ${motorCount}-motor configuration. Physically routing ${motorCount} ESCs would require unsafe wire splicing.`,
          component: pdb.name,
          fix: "Use a PDB with more ESC outputs (e.g. Matek HV PDB with 8 outputs) or reduce motor count."
        });
      }
    }

    // R12: Motor size vs Frame mount clamps (mismatch on Tarot T960 frame with large motors)
    if (frame && motor) {
      if (frame.id === "tarot_t960_frame" && motor.id === "sunnysky_x4112s_motor") {
        issues.push({
          rule: "R12", severity: "error", icon: "🔴",
          title: "MOTOR MOUNT MISMATCH",
          message: "SunnySky X4112S motors (46mm OD) cannot be mounted directly to Tarot T960 arms (22mm tubes) without custom-machined adapter plates, introducing safety and vibration risks.",
          component: motor.name,
          fix: "Change frame to EFT E610P (35mm native arm clamps) or use compatible smaller motors."
        });
      }
    }

    // R13: Battery voltage over-limit (14S battery on 12S ESCs or 12S PDB)
    if (battery) {
      if (batteryS === 14) {
        if (motor && (motor.id.includes('x8') || motor.id.includes('sunnysky'))) {
          issues.push({
            rule: "R13", severity: "error", icon: "🔴",
            title: "VOLTAGE OVER-LIMIT (ESC)",
            message: `Selected battery ${battery.name} is 14S. Motor ESCs (${motor.name}) only support up to 12S voltage. Overvoltage will damage/destroy the ESCs.`,
            component: motor.name,
            fix: "Use 14S-rated propulsion combo (like Hobbywing X9 G2L) or use a 12S battery."
          });
        }
        if (pdb && pdb.id === 'tarot_tl2996_pdb') {
          issues.push({
            rule: "R13", severity: "error", icon: "🔴",
            title: "VOLTAGE OVER-LIMIT (PDB)",
            message: `Selected battery ${battery.name} is 14S. Tarot TL2996 PDB is only rated for 12S max (50.4V). Using 14S exceeds trace and capacitor voltage ratings, risking electrical fire.`,
            component: pdb.name,
            fix: "Use a 14S-rated PDB (like Matek HV PDB / FCHUB-12S) or use a 12S battery."
          });
        }
      }
    }

    // R14: Battery voltage under-limit (6S battery on 12S/14S ESCs)
    if (battery && batteryS < 12) {
      if (motor && (motor.id.includes('x8') || motor.id.includes('x9'))) {
        issues.push({
          rule: "R14", severity: "error", icon: "🔴",
          title: "UNDER-VOLTAGE MISMATCH (ESC)",
          message: `Selected battery ${battery.name} is ${batteryS}S. Motor ESCs (${motor.name}) require at least 12S nominal voltage to arm and spin.`,
          component: motor.name,
          fix: "Use a 12S or 14S battery compatible with the selected motor system."
        });
      }
    }

    // R15: Connector compatibility (Tattu batteries use AS150U-F, Hobbywing ESCs use XT150. AS150U-F to XT150 adapter required)
    if (battery && motor) {
      const batteryName = battery.name.toLowerCase();
      const motorName = motor.name.toLowerCase();
      if (batteryName.includes("tattu") && motorName.includes("x8")) {
        issues.push({
          rule: "R15", severity: "info", icon: "ℹ️",
          title: "CONNECTOR ADAPTER REQUIRED",
          message: "Tattu batteries use AS150U-F connectors while Hobbywing X8 ESCs use XT150. An AS150U-F to XT150 adapter is required for electrical hookup.",
          component: battery.name,
          fix: "Ensure '6AWG wire harness with AS150 to XT150 adapters' accessory is included in your bill of materials (automatically added)."
        });
      }
    }

    return issues;
  },

  calculateHoverCurrent(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);
    const frame = getComp(config.frame);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const pump = getComp(config.pump);
    if (!frame || !motor || !battery) return 0;

    const motorCount = config.motorCount ?? 6;
    const tankCapacity_L = config.tankCapacity_L ?? 10;

    const dryWeight = this.calculateDryWeight(config, components);
    const mtow = dryWeight + (tankCapacity_L * 1000);
    const hoverThrustPerMotor = mtow / motorCount;

    // Dynamic efficiency curve based on hover throttle
    const maxThrustPerMotor = motor.specs?.max_thrust_g || 15000;
    const hoverThrottle = hoverThrustPerMotor / maxThrustPerMotor;
    const baseEfficiency = parseFloat(motor.specs.efficiency_g_per_W) || 9.0;
    const dynamicEfficiency = baseEfficiency - 5.7 * (hoverThrottle - 0.5);
    const efficiency = Math.max(5.0, Math.min(baseEfficiency + 1.0, dynamicEfficiency));

    const hoverPowerPerMotor = hoverThrustPerMotor / efficiency;
    const totalHoverPower = hoverPowerPerMotor * motorCount;
    const pumpPower = pump ? (pump.specs.power_W || 60) : 0;
    const voltage = battery.specs.nominal_voltage_V || 44.4;
    return (totalHoverPower + pumpPower) / voltage;
  },

  checkMotorLoad(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);
    const motor = getComp(config.motor);
    const frame = getComp(config.frame);
    const battery = getComp(config.battery);
    const gps = getComp(config.gps);
    const pdb = getComp(config.pdb);
    const pump = getComp(config.pump);
    const fc = getComp(config.fc);
    if (!motor || !frame) return null;

    const motorCount = config.motorCount ?? 6;
    const batteryCount = config.batteryCount ?? 1;
    const tankCapacity_L = config.tankCapacity_L ?? 10;
    const tankWeight_g = config.tankWeight_g ?? 5800;
    const cameraWeight_g = config.cameraWeight_g ?? 0;

    const dryWeight = this.calculateDryWeight(config, components);
    const mtow = dryWeight + (tankCapacity_L * 1000) + cameraWeight_g;
    const hoverLoadPerMotor = mtow / motorCount;
    const maxThrustPerMotor = motor.specs?.max_thrust_g || 15000;
    const hoverThrottle = hoverLoadPerMotor / maxThrustPerMotor;

    return {
      mtow_kg: (mtow / 1000).toFixed(1),
      hoverLoadPerMotor_g: Math.round(hoverLoadPerMotor),
      maxThrustPerMotor_g: maxThrustPerMotor,
      hoverThrottle: (hoverThrottle * 100).toFixed(1) + "%",
      throttleRating: hoverThrottle < 0.5 ? "good" : hoverThrottle < 0.7 ? "marginal" : "overloaded"
    };
  },

  getComponentSuggestions(config, components) {
    components = components || [];
    const suggestions = [];
    const getComp = (id) => components.find(c => c.id === id);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const fc = getComp(config.fc);
    const gps = getComp(config.gps);

    // Suggest better battery if flight time is low
    if (battery && motor) {
      const currentCapacity = battery.specs?.capacity_Ah || 30;
      if (currentCapacity < 22) {
        const betterBatteries = components.filter(c =>
          c.type === "C" &&
          (c.specs?.capacity_Ah || 0) > currentCapacity &&
          c.id !== battery.id
        ).sort((a, b) => (b.specs?.capacity_Ah || 0) - (a.specs?.capacity_Ah || 0));
        if (betterBatteries.length > 0) {
          suggestions.push({
            type: "upgrade",
            title: "Larger battery available",
            message: `Your ${currentCapacity}Ah battery gives ~${this.estimateFlightTime(config, components)} min. ${betterBatteries[0].name} (${betterBatteries[0].specs.capacity_Ah}Ah) would give more flight time.`,
            component: betterBatteries[0].id
          });
        }
      }
    }

    // Suggest ADS-B if Cube Orange selected
    if (fc && fc.id === "cube_orange_plus") {
      suggestions.push({
        type: "info",
        title: "ADS-B already built-in",
        message: "Cube Orange+ has uAvionix ADS-B 1090MHz receiver. No external ADS-B needed.",
        component: fc.id
      });
    }

    // Suggest GPS upgrade if using basic GPS
    if (gps && gps.id === "hglrc_m100_5883") {
      suggestions.push({
        type: "upgrade",
        title: "GPS upgrade available",
        message: "M100-5883 is budget GPS with 2m accuracy. Holybro M9N (₹6,990) gives 1.5m accuracy + 25Hz update.",
        component: "holybro_m9n"
      });
    }

    // Suggest Pixhawk 6X if using Cube Orange (cost savings)
    if (fc && fc.id === "cube_orange_plus") {
      suggestions.push({
        type: "alternative",
        title: "Cost-effective alternative",
        message: "Pixhawk 6X (₹31,000) has same H753 processor. Add external ADS-B for ₹8,000 total ₹39,000 vs ₹50,000.",
        component: "pixhawk_6x"
      });
    }

    return suggestions;
  },

  estimateFlightTime(config, components) {
    components = components || [];
    const getComp = (id) => components.find(c => c.id === id);
    const motor = getComp(config.motor);
    const battery = getComp(config.battery);
    const pump = getComp(config.pump);
    if (!motor || !battery) return "N/A";

    const motorCount = config.motorCount ?? 6;
    const batteryCount = config.batteryCount ?? 1;
    const tankCapacity_L = config.tankCapacity_L ?? 10;
    const tankWeight_g = config.tankWeight_g ?? 5800;
    const cameraWeight_g = config.cameraWeight_g ?? 0;
    const frame = getComp(config.frame);
    const gps = getComp(config.gps);
    const pdb = getComp(config.pdb);
    const fc = getComp(config.fc);

    const dryWeight = this.calculateDryWeight(config, components);
    const mtow = dryWeight + (tankCapacity_L * 1000) + cameraWeight_g;
    const efficiency = parseFloat(motor.specs?.efficiency_g_per_W) || 9.0;
    const hoverPower = (mtow / motorCount) / efficiency * motorCount;
    const voltage = battery.specs?.nominal_voltage_V || 44.4;
    const capacity = battery.specs?.capacity_Ah || 30;
    const energy = capacity * voltage * 0.8;
    const pumpPower = pump ? (pump.specs?.power_W || 60) : 0;
    return ((energy / (hoverPower + pumpPower)) * 60).toFixed(1);
  },

  generateFlags({ frameExceeds, batteryExceeds, thrustMarginLow, mtow_g, frameMTOW_g, thrustMargin, peakCurrent_A, batteryMaxCurrent_A }) {
    const flags = [];

    if (frameExceeds) {
      flags.push({
        type: "error",
        icon: "🔴",
        message: `MTOW (${(mtow_g / 1000).toFixed(1)}kg) exceeds frame limit (${(frameMTOW_g / 1000).toFixed(1)}kg)`,
        detail: "Frame fatigue, warranty void, crash risk"
      });
    }

    if (batteryExceeds) {
      flags.push({
        type: "error",
        icon: "🔴",
        message: `Peak current (${peakCurrent_A}A) exceeds battery max (${batteryMaxCurrent_A}A)`,
        detail: "Battery will puff, risk of fire"
      });
    }

    if (thrustMarginLow) {
      flags.push({
        type: "warning",
        icon: "⚠️",
        message: `Thrust margin ${thrustMargin}x is below recommended 2.0x`,
        detail: "Poor climb performance, no wind margin"
      });
    }

    if (!frameExceeds && !batteryExceeds && !thrustMarginLow) {
      flags.push({
        type: "success",
        icon: "✅",
        message: "All checks passed",
        detail: "Configuration is viable"
      });
    }

    return flags;
  }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhysicsEngine;
}
