# 25 - LiPo Safety and Charging (12S Systems)

## ⚠️ CRITICAL SAFETY WARNING

LiPo batteries store enormous energy. A 12S 30Ah pack contains ~1,300Wh — enough to cause severe burns, start fires, or destroy property. **Always follow safety procedures.**

---

## LiPo Cell Chemistry

```
    Voltage per cell:
    
    4.20V  ████████████████████████  100%  FULL CHARGE
           │
    4.10V  ██████████████████████    90%
           │
    4.00V  ████████████████████      80%
           │
    3.90V  ██████████████████        60%
           │
    3.85V  █████████████████         50%  STORAGE VOLTAGE
           │
    3.80V  ████████████████          40%
           │
    3.70V  ██████████████            30%  NOMINAL
           │
    3.50V  ████████████              15%  WARNING
           │
    3.30V  ████████                  ~0%  CRITICAL — DO NOT DISCHARGE FURTHER
           │
    3.0V   ██                        DAMAGE ZONE — PERMANENT DAMAGE
           │
    2.5V   █                         FAILURE ZONE — FIRE RISK
```

---

## 12S Pack Specifications

```
    Our 12S 30Ah Pack:
    ═══════════════════════════════════════════
    Cells in series:   12
    Nominal voltage:   44.4V (12 × 3.7V)
    Full charge:       50.4V (12 × 4.2V)
    Storage voltage:   46.2V (12 × 3.85V)
    Minimum voltage:   39.6V (12 × 3.3V)
    
    Capacity:          30,000 mAh (30Ah)
    Energy:            1,332 Wh
    Weight:            ~4.9 kg
    
    Max continuous current (3C):   90A
    Max burst current (5C):       150A (3 sec)
    Hover current (~20A):         ~15 min endurance
```

---

## Charger Requirements

### Minimum Requirements for 12S Charging

| Specification | Minimum | Recommended |
|--------------|---------|-------------|
| Max voltage | 50.4V (12S) | 50.4V+ with headroom |
| Max charge rate | 1C (30A) | 0.5C (15A) for longevity |
| Balance charging | Required | Required |
| Cell count detection | Auto | Auto |
| Charge profiles | LiPo HV | LiPo + LiPo HV |
| Power supply | 1500W | 2000W+ |

### Recommended Chargers

| Charger | Max Voltage | Max Current | Price Range |
|---------|------------|-------------|-------------|
| ToolkitRC M8 | 50.4V | 25A | $150-200 |
| SkyRC D600 | 50.4V | 15A | $200-250 |
| Hot RC 2000W | 50.4V | 40A | $300-400 |

### Power Supply Requirements

```
    For 12S 30Ah at 0.5C (15A):
    
    Power = 50.4V × 15A = 756W
    With charger losses (~80%): 756W / 0.8 = 945W
    
    Minimum: 1000W power supply
    Recommended: 1500W+ for headroom
```

---

## Balance Charging

### Why Balance Charging is Critical

```
    WITHOUT balancing:
    
    Cell 1: 4.18V  ████████████████████████
    Cell 2: 4.15V  ███████████████████████
    Cell 3: 4.20V  █████████████████████████  ← Overcharged!
    Cell 4: 4.12V  ██████████████████████
    ...
    Cell 12: 4.19V ████████████████████████
    
    Cell 3 hits 4.2V first → charger stops
    Cell 1,2,4,12 still charging → undercharged
    Cell 3 at 4.2V while others at 4.15V → imbalance
    
    AFTER balancing:
    
    Cell 1: 4.20V  █████████████████████████
    Cell 2: 4.20V  █████████████████████████
    Cell 3: 4.20V  █████████████████████████
    Cell 4: 4.20V  █████████████████████████
    ...
    Cell 12: 4.20V █████████████████████████
    
    All cells equal → maximum capacity → safe operation
```

### Balance Lead Connector (12S)

```
    JST-XH 13-pin connector (12S + ground):
    
    ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
    │1│2│3│4│5│6│7│8│9│A│B│C│G│
    └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
     G  1  2  3  4  5  6  7  8  9  A  B  C
     │  │  │  │  │  │  │  │  │  │  │  │  │
     │  Cell 1   Cell 2   ...   Cell 12
     │  3.7V     3.7V           3.7V
     │
     Ground (negative terminal)
```

---

## Fire Risks and Prevention

### What Causes LiPo Fires?

| Cause | Risk Level | Prevention |
|-------|-----------|------------|
| Over-discharge (<3.0V/cell) | HIGH | Set low-voltage alarm, use telemetry |
| Over-charge (>4.25V/cell) | HIGH | Balance charge, don't leave unattended |
| Physical puncture | HIGH | Protect from crashes, use cases |
| Short circuit | HIGH | Check wiring, use fuses |
| Excessive current draw | MEDIUM | Don't exceed C-rating |
| Heat (>60°C) | MEDIUM | Keep away from heat sources |
| Manufacturing defect | LOW | Buy quality brands |

### Fire Extinguisher Requirements

```
    REQUIRED: ABC dry chemical extinguisher for Li-ion fires
    
    ┌─────────────────────────────────────────┐
    │  FIRE EXTINGUISHER                       │
    │  ─────────────────────────────────────  │
    │  For lithium-ion (LiPo) battery fires   │
    │  Note: Li-ion batteries do NOT contain  │
    │  metallic lithium — Class D not needed  │
    │                                          │
    │  DO NOT USE:                             │
    │  ✗ Class D extinguisher (ineffective)   │
    │  ✗ CO₂ alone (can't cool sufficiently)  │
    │                                          │
    │  USE:                                    │
    │  ✓ ABC dry chemical extinguisher        │
    │  ✓ Water mist (effective cooling)       │
    │  ✓ Dry sand (for small fires)           │
    │  ✓ Fireproof bag/container              │
    │  ✓ Call emergency services              │
    └─────────────────────────────────────────┘
```

### Charging Area Setup

```
    SAFE CHARGING AREA:
    
    ┌────────────────────────────────────────────────┐
    │                                                │
    │   ┌──────────┐    ┌──────────┐    ┌────────┐ │
    │   │  CHARGER │    │  LiPo    │    │ Class  │ │
    │   │          │    │  SAFE    │    │   D    │ │
    │   │ ┌──────┐ │    │  BAG     │    │  FIRE  │ │
    │   │ │12S   │ │    │          │    │EXTING. │ │
    │   │ │BAL   │ │    │ ┌──────┐ │    │        │ │
    │   │ │LEAD  │ │    │ │ LiPo │ │    │   🔥   │ │
    │   │ └──────┘ │    │ │ in   │ │    │        │
    │   └──────────┘    │ │ bag  │ │    └────────┘ │
    │                   │ └──────┘ │                │
    │                   └──────────┘                │
    │                                                │
    │   ✓ Non-flammable surface (concrete/steel)    │
    │   ✓ Well-ventilated area (not enclosed)       │
    │   ✓ No flammable materials nearby             │
    │   ✓ Smoke detector installed                  │
    │   ✓ Clear exit path                           │
    │   ✓ Never charge unattended                   │
    │   ✓ Never charge overnight                    │
    │   ✓ Keep away fromammable materials          │
    └────────────────────────────────────────────────┘
```

---

## Charging Procedure

### Step-by-Step 12S Balance Charge

```
    ┌─────────────────────────────────────────────────┐
    │           12S LICHARGE PROCEDURE                 │
    ├─────────────────────────────────────────────────┤
    │                                                  │
    │  STEP 1: VISUAL INSPECTION                       │
    │  □ Check for swelling/puffing                    │
    │  □ Check for damage to wires/connector           │
    │  □ Check balance lead for damage                 │
    │  □ Feel temperature (should be ambient)          │
    │                                                  │
    │  STEP 2: VOLTAGE CHECK                           │
    │  □ Measure main voltage with multimeter          │
    │  □ Should be between 39.6V and 50.4V             │
    │  □ If <39.6V: DO NOT CHARGE (cell damage)       │
    │  □ If >50.4V: DO NOT CHARGE (overcharged)       │
    │                                                  │
    │  STEP 3: CONNECT TO CHARGER                      │
    │  □ Connect main XT60/XT90/AS150 connector       │
    │  □ Connect balance lead (13-pin JST-XH)         │
    │  □ Verify connection is secure                   │
    │                                                  │
    │  STEP 4: SET CHARGER                             │
    │  □ Select "LiPo Balance" mode                    │
    │  □ Set cell count: 12S (auto-detect if capable)  │
    │  □ Set charge rate: 0.5C = 15A (recommended)    │
    │     Or 1C = 30A (faster, more wear)             │
    │  □ Set voltage: 4.20V per cell (default)        │
    │                                                  │
    │  STEP 5: START CHARGE                            │
    │  □ Press start                                   │
    │  □ Monitor first few minutes                     │
    │  □ Verify cell voltages are reasonable           │
    │  □ Verify total voltage is climbing              │
    │                                                  │
    │  STEP 6: MONITOR                                 │
    │  □ Check every 10-15 minutes                     │
    │  □ Watch for unusual heat or smell               │
    │  □ Do NOT leave unattended                       │
    │                                                  │
    │  STEP 7: COMPLETE                                │
    │  □ Charger will stop automatically at 4.20V/cell│
    │  □ Disconnect balance lead first                 │
    │  □ Disconnect main connector                     │
    │  □ Allow to cool before use                      │
    │  □ Store at 3.85V/cell if not using within 48hr │
    │                                                  │
    └─────────────────────────────────────────────────┘
```

---

## Storage Voltage

### Why Storage Voltage Matters

```
    Full charge (4.20V/cell):
    ┌─────────────────────────────────────────────┐
    │  Cell chemistry is under maximum stress      │
    │  Electrolyte decomposes slowly               │
    │  Capacity degrades over time                  │
    │  Storage life: ~3-6 months before degradation│
    └─────────────────────────────────────────────┘
    
    Storage voltage (3.85V/cell):
    ┌─────────────────────────────────────────────┐
    │  Cell chemistry is at minimum stress         │
    │  Electrolyte is stable                        │
    │  Capacity retention is maximized              │
    │  Storage life: 1-2 years with minimal loss   │
    └─────────────────────────────────────────────┘
    
    Over-discharge (<3.0V/cell):
    ┌─────────────────────────────────────────────┐
    │  Copper dendrites form on anode               │
    │  Internal short circuit risk                  │
    │  Capacity permanently reduced                 │
    │  May cause fire when recharged               │
    └─────────────────────────────────────────────┘
```

### Storage Procedure

```
    TO STORE LiPo:
    
    1. Charge to full (4.20V/cell)
    2. Use charger's "Storage" mode to discharge to 3.85V/cell
       OR
       Fly until voltage reaches ~3.85V/cell under load
    3. Disconnect all leads
    4. Place in LiPo-safe bag
    5. Store in cool, dry location (15-25°C)
    6. Check voltage every 3 months
    7. Re-balance if any cell drifts >0.05V
    
    12S STORAGE VOLTAGE: 46.2V (12 × 3.85V)
```

---

## Depth of Discharge (DoD) and Battery Life

```
    Cycle Life vs DoD:
    
    DoD     │ Cycles │ Example Use
    ════════╪════════╪══════════════════════════
    20%     │ 2000+  │ Conservative, long life
    30%     │ 1500   │ Balanced approach
    50%     │ 800    │ Moderate use
    80%     │ 300    │ Aggressive use
    100%    │ 150    │ Maximum discharge
    
    For our 12S 30Ah pack:
    - 20% DoD = use 6Ah → 6Ah × 50.4V = 302Wh
    - 50% DoD = use 15Ah → 15Ah × 50.4V = 756Wh
    - 100% DoD = use 30Ah → 30Ah × 50.4V = 1512Wh
    
    Recommendation: Keep DoD < 80% for reasonable battery life
    Always land when battery shows 20% remaining
```

---

## Cell Balancing

### When to Balance

| Situation | Action |
|-----------|--------|
| Before every flight | Check cell voltages are within 0.1V |
| After every charge | Verify balance completed |
| After crash | Check for cell damage |
| After storage | Rebalance if cells drifted |
| Monthly | Full balance cycle |

### Monitoring Cell Voltages

```
    In-flight monitoring via telemetry:
    
    ┌─────────────────────────────────────────┐
    │  Cell Voltages (12S)                     │
    ├─────────────────────────────────────────┤
    │  Cell  1: 4.02V  ████████████████       │
    │  Cell  2: 4.01V  ████████████████       │
    │  Cell  3: 4.03V  ████████████████       │
    │  Cell  4: 4.02V  ████████████████       │
    │  Cell  5: 4.01V  ████████████████       │
    │  Cell  6: 4.02V  ████████████████       │
    │  Cell  7: 4.03V  ████████████████       │
    │  Cell  8: 4.01V  ████████████████       │
    │  Cell  9: 4.02V  ████████████████       │
    │  Cell 10: 4.02V  ████████████████       │
    │  Cell 11: 4.01V  ████████████████       │
    │  Cell 12: 4.02V  ████████████████       │
    ├─────────────────────────────────────────┤
    │  Total:  48.24V  Max Δ: 0.02V  OK     │
    └─────────────────────────────────────────┘
    
    WARNING if any cell differs by >0.1V from others
    CRITICAL if any cell <3.3V under load
```

---

## Over-Discharge Dangers

```
    DISCHARGE CURVE (per cell):
    
    4.20V ─────╲
                ╲
    4.00V ───────╲
                  ╲
    3.80V ─────────╲
                    ╲
    3.60V ───────────╲
                      ╲
    3.40V ─────────────╲
                        ╲
    3.20V ───────────────╲
                          ╲
    3.00V ─────────────────╲_____ DANGER ZONE
                            │
    2.50V ──────────────────│_____ FAILURE ZONE
                            │
    ────────────────────────┼────────────────
                        20% remaining
    
    BELOW 3.0V PER CELL:
    - Copper dendrites form on anode
    - Internal resistance increases dramatically
    - Capacity permanently reduced
    - May cause FIRE when recharged
    - DO NOT attempt to charge over-discharged LiPo
```

---

## Over-Charge Dangers

```
    CHARGE CURVE (per cell):
    
    4.50V ─────────────────────── DANGER ZONE
            │                    Fire risk!
    4.25V ─────────────────────── MAXIMUM LIMIT
            │
    4.20V ─────────────────────── FULL CHARGE
            │
    4.00V ───────────────────────
            │
    3.85V ─────────────────────── STORAGE
            │
    3.70V ─────────────────────── NOMINAL
            │
    ─────────────────────────────
    
    ABOVE 4.25V PER CELL:
    - Electrolyte decomposes
    - Gas generation (swelling)
    - Thermal runaway possible
    - FIRE RISK
    - Never charge unattended
    - Use quality charger with auto-cutoff
```

---

## Safety Checklist

```
    ┌─────────────────────────────────────────────────────┐
    │              LiPo SAFETY CHECKLIST                   │
    ├─────────────────────────────────────────────────────┤
    │                                                      │
    │  BEFORE CHARGING:                                    │
    │  □ Inspect for swelling/puffing                      │
    │  □ Check wires for damage                            │
    │  □ Measure voltage with multimeter                   │
    │  □ Verify voltage is safe (39.6V-50.4V for 12S)     │
    │  □ Place in LiPo-safe bag or on non-flammable surface│
    │  □ Connect to charger in ventilated area             │
    │  □ Set charger to correct cell count and rate        │
    │                                                      │
    │  DURING CHARGING:                                    │
    │  □ Monitor for first 5 minutes                       │
    │  □ Check for unusual heat or smell                   │
    │  □ DO NOT leave unattended                           │
    │  □ DO NOT charge overnight                           │
    │  □ Keep away from flammable materials                │
    │  □ Keep ABC dry chemical extinguisher accessible      │
    │                                                      │
    │  AFTER CHARGING:                                     │
    │  □ Verify all cells at 4.20V ±0.02V                 │
    │  □ Disconnect balance lead first                     │
    │  □ Disconnect main connector                         │
    │  □ Allow to cool before use                          │
    │  □ Store at 3.85V/cell if not using within 48hr     │
    │                                                      │
    │  DURING FLIGHT:                                      │
    │  □ Monitor cell voltages via telemetry               │
    │  □ Land when any cell <3.5V under load               │
    │  □ Land when total voltage <42V (12S)               │
    │  □ Avoid crashes that could puncture battery         │
    │                                                      │
    │  AFTER CRASH:                                        │
    │  □ Remove battery immediately if damaged             │
    │  □ Place in LiPo-safe bag                            │
    │  □ Monitor for swelling or heat                      │
    │  □ Do NOT charge damaged battery                     │
    │  □ Dispose at battery recycling center               │
    │                                                      │
    │  STORAGE:                                            │
    │  □ Store at 3.85V/cell (46.2V for 12S)              │
    │  □ Keep in cool, dry location (15-25°C)             │
    │  □ Check voltage every 3 months                      │
    │  □ Rebalance if cell delta >0.05V                    │
    │                                                      │
    │  DISPOSAL:                                           │
    │  □ Discharge to 0V (short through resistor)         │
    │  □ Immerse in salt water for 24 hours                │
    │  □ Take to battery recycling center                  │
    │  □ NEVER put in regular trash                        │
    │                                                      │
    └─────────────────────────────────────────────────────┘
```

---

## Emergency Procedures

### LiPo Fire

```
    IF LiPo CATCHES FIRE:
    
    1. Use ABC dry chemical extinguisher or water mist
    2. If no extinguisher, use dry sand
    3. Evacuate the area
    4. Call emergency services
    5. Do NOT attempt to move burning battery
    6. Ventilate area (toxic fumes)
    7. Water is effective for cooling — use if available
    
    SMOKE WITHOUT FIRE:
    1. Disconnect from charger immediately
    2. Move to non-flammable surface
    3. Place in LiPo-safe bag
    4. Monitor for 30 minutes
    5. Do NOT charge again
    6. Dispose properly
```

### Swollen Battery

```
    IF BATTERY IS SWOLLEN:
    
    1. DO NOT charge
    2. DO NOT use in flight
    3. Discharge slowly through resistor (if safe)
    4. Place in LiPo-safe bag
    5. Take to battery recycling center
    6. Do NOT puncture or compress
    7. Do NOT put in fire
```

---

## Maintenance Schedule

```
    ┌─────────────────────────────────────────────────────┐>
    │           LiPo MAINTENANCE SCHEDULE                  │
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  BEFORE EVERY FLIGHT:                                │>
    │  □ Visual inspection for damage                      │>
    │  □ Check cell voltages (should be within 0.1V)      │>
    │  □ Verify connector condition                        │>
    │  □ Check for swelling                                │>
    │                                                      │>
    │  AFTER EVERY FLIGHT:                                 │>
    │  □ Check for physical damage                         │>
    │  □ Measure cell voltages                             │>
    │  □ Store at storage voltage if not recharging        │>
    │                                                      │>
    │  MONTHLY:                                            │>
    │  □ Full balance charge cycle                         │>
    │  □ Check internal resistance                         │>
    │  □ Inspect balance lead                              │>
    │  □ Clean connectors                                  │>
    │                                                      │>
    │  QUARTERLY:                                          │>
    │  □ Full discharge/recharge cycle                     │>
    │  □ Capacity test (measure actual mAh)                │>
    │  □ IR test (compare to baseline)                     │>
    │  □ Physical inspection of all cells                  │>
    │                                                      │>
    │  REPLACE WHEN:                                       │>
    │  □ Capacity drops below 80% of rated                 │>
    │  □ IR increases >50% from baseline                   │>
    │  □ Cells can't balance within 0.05V                  │>
    │  □ Visible swelling or damage                        │>
    │  □ Voltage drops below 3.3V under load               │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|------------|------------|
| Charging unattended | Fire if something goes wrong | Always monitor |
| Using wrong cell count | Over-charge or under-charge | Verify 12S setting |
| Charging too fast | Heat, swelling, reduced life | Use 0.5C rate |
| Ignoring balance lead | Cell imbalance, overcharge | Always balance charge |
| Storing fully charged | Capacity degradation | Store at 3.85V/cell |
| Over-discharging in flight | Cell damage, fire risk | Set low-voltage alarm |
| Using Class D on LiPo fire | Ineffective (not metallic lithium) | Use ABC dry chemical or water mist |
| Throwing in trash | Environmental hazard, fire | Recycle properly |

---

## Summary

```
    LiPo Safety Rules:
    ═══════════════════════════════════════════
    
    1. NEVER charge unattended
    2. ALWAYS balance charge
    3. NEVER discharge below 3.3V/cell
    4. NEVER charge above 4.25V/cell
    5. ALWAYS store at 3.85V/cell
    6. KEEP ABC dry chemical extinguisher accessible
    7. INSPECT before every use
    8. DISPOSE properly (recycle)
    9. Water mist is effective for LiPo fire cooling
    10. WHEN IN DOUBT, DISPOSE
    
    Remember: A LiPo fire can reach 600°C (1100°F)
    and produce toxic hydrogen fluoride gas.
    Safety is not optional.
```

---

## EFT E616P Build Connection

> **12S 30Ah Semi-Solid-State battery — 1,332 Wh of stored energy. Follow ALL safety procedures.**

### Our Battery Safety Specs
| Parameter | Value | Source |
|---|---|---|
| Pack Voltage | 44.4V nominal, 50.4V full | grepow.com |
| Energy | 1,332 Wh | grepow.com |
| Weight | 4,900g | genstattu.com |
| Connector | AS150U | grepow.com |
| Charge Rate | 1C (30A) recommended | genstattu.com |
| Power Required | 945W min charger | Calculated |
| Storage Voltage | 46.2V (3.85V/cell) | genstattu.com |
| Critical Voltage | 39.6V (3.3V/cell) | genstattu.com |

### Charger Requirements
| Spec | Minimum | Recommended |
|---|---|---|
| Max Voltage | 50.4V (12S) | 50.4V+ |
| Max Current | 15A (0.5C) | 30A (1C) |
| Balance Charging | Required | Required |
| Power | 1,000W | 1,500W+ |
| Model | ToolkitRC M8 | SkyRC D600 |

### Emergency Procedures
| Situation | Action |
|---|---|
| LiPo fire | ABC extinguisher or water mist, evacuate, call emergency services |
| Smoke without fire | Disconnect immediately, place in LiPo bag, monitor 30 min |
| Swollen battery | DO NOT charge, discharge slowly through resistor, recycle |
| Over-discharged (<3.0V) | DO NOT attempt to charge, retire immediately |

---

## Common Mistakes & Pitflies

| Mistake | Consequence | Prevention |
|---|---|---|
| Charging unattended | Fire if something goes wrong | Monitor during charge, keep extinguisher |
| Storing fully charged | Capacity degradation | Store at 3.85V/cell (storage mode) |
| Not balance charging | Cell imbalance, overcharge risk | ALWAYS balance charge |
| Wrong charge rate | Battery swelling | Use 0.5C (15A) for longevity |
| Over-discharging | Permanent damage, fire risk | Land at 3.5V/cell, set alarms |
| Ignoring swollen battery | Fire/explosion | Retire immediately |
| Using wrong connector | Poor connection, fire risk | Match AS150 to battery |

---

*Enrichment added: May 29, 2026 | Template v1.0*
