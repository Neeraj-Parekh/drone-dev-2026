/**
 * COEP Agricultural Hexacopter — Verified Component Configuration
 *
 * All measurements in MILLIMETERS and GRAMS.
 * Sources: manufacturer datasheets + EFT E616P official specs + visual reference analysis
 * Scale: 1 R3F unit = 1mm (displayed as meters by dividing by 1000)
 */

export const SCALE = 0.001; // mm to meters

// ─── FRAME: EFT E616P ────────────────────────────────────
// Official: 1648mm wheelbase, 40mm arm OD, body ~350mm wide
export const FRAME = {
  wheelbase: 1644,           // mm diagonal motor-to-motor (official EFT spec)
  armLength: 822,            // mm center to motor = wheelbase/2
  armTubeOD: 40,             // mm carbon tube
  armTubeID: 37,             // mm
  centerBodyRadius: 150,     // mm (~300mm body diameter, real E616P)
  centerBodyHeight: 60,      // mm plate-to-plate (not including standoffs)
  standoffHeight: 20,        // mm between plates
  plateThickness: 3,         // mm carbon fiber
  weight: 6410,              // g
  material: 'T700 Carbon Fiber',
} as const;

// ─── MOTOR: Hobbywing X9 G2L ─────────────────────────────
export const MOTOR = {
  kv: 110,
  maxThrust: 24,             // kg
  statorDiameter: 96,        // mm
  statorHeight: 16,          // mm
  bodyDiameter: 104,         // mm
  fanDiameter: 130,          // mm
  bodyHeight: 53,            // mm
  shaftOD: 14,               // mm
  shaftLength: 15,           // mm visible
  weightWithProp: 1532,      // g
  weightWithoutProp: 1245,   // g
  escContinuous: 30,         // A
  escPeak: 120,              // A
  ipRating: 'IPX6',
  // Motor mount bracket (CNC aluminum clamp)
  mountBoltPattern: '6×M3 on 24mm PCD',
  mountClampBore: 40.1,      // mm
  mountWidth: 53,            // mm
  mountHeight: 28,           // mm
  // Colors per rotation
  bellColorCW: '#cc2222',    // red anodized
  bellColorCCW: '#22aa22',   // green anodized
} as const;

// ─── PROPELLER: Hobbywing MFP 36×11 ──────────────────────
export const PROP = {
  diameter: 927.1,           // mm tip-to-tip unfolded
  pitch: 11,                 // inches
  bladeCount: 2,
  weight: 287,               // g set with adapter
  singleBladeWeight: 82,     // g
  hubBore: 14,               // mm
  hubHeight: 34.7,           // mm
  hubWidth: 26.5,            // mm
  hubThickness: 7,           // mm
  boltCircle: 31,            // mm
  // Blade proportions (real airfoil)
  bladeRootWidth: 50,        // mm
  bladeTipWidth: 25,         // mm
  bladeRootThickness: 3,     // mm
  bladeTipThickness: 1,      // mm
  bladeLength: 464,          // mm per blade (half of 927mm span)
  maxRPM: 4150,
  recommendedRPM: [1600, 3100],
} as const;

// ─── BATTERY: Tattu 12S 30Ah ─────────────────────────────
export const BATTERY = {
  capacity: 30000,           // mAh
  voltage: 44.4,             // V
  energy: 1332,              // Wh
  dimensions: { l: 212, w: 90.5, h: 132 }, // mm
  weight: 4900,              // g
  maxContinuous: 90,         // A
  connector: 'AS150U',
  dischargeWire: '8AWG 250mm',
  count: 1,                  // single pack (not 3!)
} as const;

// ─── FLIGHT CONTROLLER: Pixhawk 6C ───────────────────────
export const FC = {
  dimensions: { l: 54.3, w: 39, h: 17.5 }, // mm
  weight: 42.4,              // g
  color: '#cc6600',          // Holybro orange
  mountingHoleSpacing: 30.5, // mm
} as const;

// ─── GPS: HGLRC M100 Mini ────────────────────────────────
export const GPS = {
  moduleDimensions: { l: 15, w: 15, h: 5.2 }, // mm
  weight: 2.6,               // g
  mastHeight: 350,           // mm (300-400mm for ag drones)
  mastTubeOD: 10,            // mm
  antennaDiameter: 70,       // mm (mushroom dome)
  antennaHeight: 25,         // mm dome height
} as const;

// ─── TELEMETRY: RFD868x ──────────────────────────────────
export const TELEMETRY = {
  moduleDimensions: { l: 30, w: 57, h: 12.8 }, // mm
  weight: 14,                // g
  frequency: '865-870 MHz',
  maxPower: 30,              // dBm
  range: 40,                 // km
  // Dual whip antennas
  antennaLength: 120,        // mm
  antennaDiameter: 3,        // mm
  antennaSpacing: 40,        // mm between whips
} as const;

// ─── RC RECEIVER: FrSky R-XSR ────────────────────────────
export const RC = {
  dimensions: { l: 16, w: 11, h: 5.4 }, // mm
  weight: 1.5,               // g
} as const;

// ─── PUMP: SHURflo 8000 ──────────────────────────────────
export const PUMP = {
  dimensions: { l: 213, w: 102, h: 104 }, // mm
  weight: 1860,              // g
  color: '#111111',          // black (not blue-gray)
  mountOffset: { y: -20, z: -50 }, // mm relative to tank bottom
} as const;

// ─── NOZZLES: TeeJet XR11002 ─────────────────────────────
export const NOZZLE = {
  bodyDiameter: 15,          // mm
  bodyHeight: 12,            // mm
  capDiameter: 25,           // mm with Quick TeeJet cap
  capHeight: 30,             // mm
  tipColor: '#44aa44',       // green VisiFlo (02 size)
  bodyColor: '#888888',      // gray polymer
  dropTubeLength: 200,       // mm below arm
  dropTubeOD: 8,             // mm
  checkValveDiameter: 10,    // mm
  checkValveHeight: 15,      // mm
  count: 4,
  positionAlongArm: 0.65,    // fraction of arm length from center
} as const;

// ─── FLOW SENSOR: YF-S402 ────────────────────────────────
export const FLOW_SENSOR = {
  dimensions: { l: 58, w: 35, h: 27 }, // mm
  weight: 29,                // g
  thread: 'G1/4" BSPP',
} as const;

// ─── SPRAY TANK: 16L HDPE ────────────────────────────────
export const TANK = {
  capacity: 16,              // liters
  dimensions: { l: 380, w: 280, h: 280 }, // mm
  weight: 800,               // g
  color: '#e8e8e0',          // off-white (not green!)
  opacity: 0.65,             // translucent
} as const;

// ─── JETSON ORIN NANO ────────────────────────────────────
export const JETSON = {
  dimensions: { l: 100, w: 79, h: 21 }, // mm
  weight: 100,               // g
} as const;

// ─── LANDING GEAR ────────────────────────────────────────
export const LANDING_GEAR = {
  strutHeight: 445,          // mm — must clear tank bottom (-475mm from mid-plane)
  footDia: 80,               // mm wide pads
  strutDia: 16,              // mm carbon tube
  spread: 550,               // mm lateral
  crossBraceAngle: 45,       // degrees
} as const;

// ─── SPRAY TUBING ────────────────────────────────────────
export const TUBING = {
  outerDia: 10,              // mm (8mm ID + wall)
  color: '#2244cc',          // blue polyurethane
  routingFraction: 0.6,      // arm length fraction for nozzle position
  dropLength: 200,           // mm below arm for nozzle drops
} as const;

// ─── WIRING ──────────────────────────────────────────────
export const WIRING = {
  powerWireDia: 2.5,         // mm (12AWG silicone)
  signalWireDia: 1.0,        // mm (22AWG)
  powerColors: ['#cc0000', '#000000'], // red, black
  signalColors: ['#ffffff', '#ffaa00', '#00aaff', '#00ff00', '#aa00ff'], // multi
  zipTieSpacing: 100,        // mm
  zipTieWidth: 3,            // mm
} as const;

// ─── CONNECTORS ──────────────────────────────────────────
export const CONNECTOR = {
  AS150: { bulletDia: 7, length: 20, weightPair: 24 }, // mm
  XT90: { pinDia: 4.5, length: 30, weightPair: 28 },   // mm
} as const;

// ─── BUSBAR ──────────────────────────────────────────────
export const BUSBAR = {
  width: 15,                 // mm
  thickness: 5,              // mm
  crossSection: 75,          // mm²
  color: '#cc8833',          // copper
} as const;

// ─── MOTOR LAYOUT (ArduCopter Hexa-X) ────────────────────
export const MOTOR_LAYOUT = [
  { index: 0, angle: 0,    rotation: 'CW' as const, position: 'Front Right' },
  { index: 1, angle: 60,   rotation: 'CCW' as const, position: 'Front Left' },
  { index: 2, angle: 120,  rotation: 'CW' as const, position: 'Left' },
  { index: 3, angle: 180,  rotation: 'CCW' as const, position: 'Rear Left' },
  { index: 4, angle: 240,  rotation: 'CW' as const, position: 'Rear Right' },
  { index: 5, angle: 300,  rotation: 'CCW' as const, position: 'Right' },
] as const;

// ─── COMPOSITE POSITIONS ─────────────────────────────────
// Y=0 is midplate center. Stack calculated from frame center downward.
// Landing gear strut tops attach to bottom plate, feet extend to ground.
export const DRONE = {
  bodyRadius: FRAME.centerBodyRadius,
  bodyHeight: FRAME.centerBodyHeight,
  armLength: FRAME.armLength,
  armTubeOD: FRAME.armTubeOD,

  // Vertical stack (Y=0 is midplane between top/bottom plates)
  topPlateY: FRAME.centerBodyHeight / 2,              // +30mm
  bottomPlateY: -FRAME.centerBodyHeight / 2,           // -30mm
  midPlateY: 0,

  // Standoff positions (6 corners of hex)
  standoffPositions: Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60) * Math.PI / 180;
    const r = FRAME.centerBodyRadius * 0.85;
    return { x: Math.sin(a) * r, z: Math.cos(a) * r };
  }),

  // Component vertical positions — calculated from frame center
  fcY: FRAME.centerBodyHeight / 2 + FRAME.plateThickness + 8,           // +41mm
  gpsMastBaseY: FRAME.centerBodyHeight / 2 + FRAME.plateThickness + 8,  // +41mm
  gpsTopY: FRAME.centerBodyHeight / 2 + FRAME.plateThickness + 8 + GPS.mastHeight, // +391mm
  batteryY: -FRAME.centerBodyHeight / 2 - FRAME.plateThickness - 10 - BATTERY.dimensions.h / 2, // ~-109mm
  tankY: -FRAME.centerBodyHeight / 2 - FRAME.plateThickness - 10 - BATTERY.dimensions.h - 20 - TANK.dimensions.h / 2, // ~-325mm
  // Landing gear: strut tops attach at body mid-plane, feet extend to ground
  landingGearY: 0,           // Y=0 (body mid-plane, not bottom plate)
  motorY: 0, // Arms exit from body mid-plane (Y=0)
  propY: MOTOR.bodyHeight + 8, // above motor
} as const;
