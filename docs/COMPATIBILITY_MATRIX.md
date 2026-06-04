# COEP Hexacopter v4 - Component Compatibility Matrix

**Version:** 1.0.0 | **Date:** 2026-06-03 | **Author:** Multi-Path Analysis

---

## Table of Contents
1. [Quick Reference Matrix](#quick-reference-matrix)
2. [Connector Compatibility](#connector-compatibility)
3. [Voltage Compatibility](#voltage-compatibility)
4. [Software/Firmware Compatibility](#softwarefirmware-compatibility)
5. [Physical Compatibility](#physical-compatibility)
6. [Known Incompatibilities (Critical)](#known-incompatibilities-critical)
7. [Recommended Combinations](#recommended-combinations)
8. [Substitution Guide](#substitution-guide)

---

## Quick Reference Matrix

### Flight Controllers

| Component | Pixhawk 6C | Cube Orange+ | Jiyi K++V2 | DJI A3 | Ag++ |
|-----------|:----------:|:------------:|:----------:|:------:|:----:|
| ArduPilot | ✅ | ✅ | ❌ | ❌ | ❌ |
| PX4 | ✅ | ✅ | ❌ | ❌ | ❌ |
| DroneCAN | ✅ (2 ports) | ✅ (2 ports) | ❌ | ❌ | ❌ |
| PWM outputs | 14 | 14 | 8 | 8 | 6 |
| Price | ₹32,499 | ₹50,000 | ₹28,500 | ₹1,20,000 | N/A |

**Decision:** Pixhawk 6C is best value. Cube Orange+ for redundancy. Avoid Ag++ (discontinued).

### GPS Modules

| Component | Pixhawk 6C | Cube Orange+ | Jiyi K++V2 |
|-----------|:----------:|:------------:|:----------:|
| HGLRC M100-5883 | ✅ (UART+I2C) | ✅ | ❌ (needs DJI GPS) |
| Holybro M9N | ✅ (UART+I2C) | ✅ | ❌ |
| Here4 RTK | ✅ (DroneCAN) | ✅ | ❌ |
| Beitian BN-880 | ✅ (UART+I2C) | ✅ | ❌ |

**Decision:** M100-5883 for budget. M9N for reliability. Here4 for RTK.

### Power Modules

| Component | Pixhawk 6C | Cube Orange+ | Jiyi K++V2 |
|-----------|:----------:|:------------:|:----------:|
| Holybro PM02V3 | ✅ | ✅ | ❌ |
| MAUCH HS-200-LV | ✅ (analog) | ✅ | ❌ |
| DJI PMU | ❌ | ❌ | ✅ |

**Decision:** PM02V3 for Pixhawk 6C. MAUCH for additional sensing.

### Batteries

| Component | Weight | Energy | C-Rate | Price | Best For |
|-----------|--------|--------|--------|-------|----------|
| Tattu 30Ah Semi-Solid | 4,900g | 1,332 Wh | 3C | ₹1,06,000 | Path G-A (lowest weight) |
| Tattu 22Ah Pro | 6,300g | 977 Wh | 25C | ₹45,674 | Path A-F (in-stock) |
| GenX 22Ah HV | 5,800g | 977 Wh | 25C | ₹23,838 | Path A-E (budget) |
| GNB 22Ah | 6,000g | 977 Wh | 40C | ₹49,000 | High burst |
| Tattu NEO 26Ah | 4,500g | 1,154 Wh | 10C | ₹1,37,000 | Premium lightweight |
| mPower 21Ah Li-ion | 4,200g | 907 Wh | 11C | ₹50,000 | Long cycle life |
| mPower 25Ah Li-ion | 4,800g | 1,100 Wh | 10C | ₹62,000 | High capacity |
| DJI DB1560 | 12,000g | 1,500 Wh | 11.5C | ₹2,08,000 | ⚠️ 14S only |

**Decision:** Tattu 30Ah for best flight time. GenX for budget. Avoid DJI DB1560 (14S incompatibility).

### Motors + ESCs

| Component | Thrust | Weight | ESC | Protocol | Price |
|-----------|--------|--------|-----|----------|-------|
| Hobbywing X8 Combo | 15kg | 1,150g | 80A | PWM | ₹14,000 |
| Hobbywing X9 G2L | 24kg | 1,532g | 30A | DroneCAN | ₹17,287 |
| DJI E800 Pro | 13.2kg | 1,395g | 45A | DJI CAN | N/A |

**Decision:** X8 for budget. X9 G2L for DroneCAN telemetry. E800 Pro for DJI ecosystem.

### Pumps

| Component | Flow | Pressure | Voltage | Weight | Price |
|-----------|------|----------|---------|--------|-------|
| Hobbywing 5L | 5 L/min | 3.5 bar | 12S direct | 388g | ₹6,533 |
| SHURflo 8000 | 5.3 L/min | 2.1 bar | 12V DC | 1,860g | ₹14,500 |

**Decision:** Hobbywing 5L (lighter, direct 12S). SHURflo for better pressure match with TeeJet nozzles.

---

## Connector Compatibility

### Power Connectors

| Battery Connector | PDB Input | ESC Input | Adapter Available |
|-------------------|-----------|-----------|-------------------|
| AS150U-F | ✅ Tarot TL2996 | ❌ | AS150→XT150 adapter |
| XT150 | ❌ (needs adapter) | ✅ Hobbywing X8 | XT150→AS150 adapter |
| AS150 | ✅ Tarot TL2996 | ❌ | AS150→XT150 adapter |
| XT90 | ❌ | ❌ (undersized) | N/A |

**Critical:** Tattu batteries use AS150U-F. Hobbywing X8 ESCs use XT150. **Adapter required!**

**Recommended Adapter:** AS150U-F (female) → XT150 (male), 10AWG, rated 100A

### Signal Connectors

| Component | Connector | Compatible With |
|-----------|-----------|-----------------|
| Pixhawk 6C PM port | JST-GH 6-pin | Holybro PM02V3 ✅ |
| Pixhawk 6C RCIN | JST-GH 4-pin | FrSky R-XSR (SBUS) ✅ |
| Pixhawk 6C GPS | JST-GH 10-pin | M100-5883 ✅, M9N ✅ |
| Pixhawk 6C CAN | JST-GH 4-pin | X9 G2L ESC ✅, Here4 ✅ |
| Jiyi K++V2 RC | DJI 3-pin | Skydroid H12 ✅ |
| Jiyi K++V2 GPS | DJI connector | DJI GPS only ❌ |

### Communication Protocols

| Protocol | Pixhawk 6C | Cube Orange+ | Jiyi K++V2 |
|----------|:----------:|:------------:|:----------:|
| SBUS | ✅ | ✅ | ❌ (DJI) |
| PPM | ✅ | ✅ | ❌ |
| UART | ✅ (3 ports) | ✅ | ✅ |
| I2C | ✅ (1 port) | ✅ | ✅ |
| SPI | ✅ | ✅ | ✅ |
| CAN (DroneCAN) | ✅ (2 ports) | ✅ (2 ports) | ❌ |
| DJI CAN | ❌ | ❌ | ✅ |

---

## Voltage Compatibility

### System Voltage Matrix

| Component | Min Voltage | Max Voltage | Nominal | Compatible |
|-----------|-------------|-------------|---------|------------|
| Tattu 30Ah Semi-Solid | 39.6V | 50.4V | 44.4V | 12S ✅ |
| Tattu 22Ah Pro | 39.6V | 50.4V | 44.4V | 12S ✅ |
| GenX 22Ah HV | 39.6V | 50.4V | 44.4V | 12S ✅ |
| Hobbywing X8 ESC | 44.4V | 50.4V | 44.4V | 12S ✅ |
| Hobbywing X9 G2L ESC | 44.4V | 58.8V | 44.4V | 12S-14S ✅ |
| Tarot TL2996 PDB | 44.4V | 50.4V | 44.4V | 12S ✅ |
| Holybro PM02V3 | 7V | 60V | 44.4V | 12S ✅ |
| Matek 12V BEC | 44.4V | 50.4V | 44.4V | 12S ✅ |
| DJI DB1560 | 51.8V | 58.8V | 51.8V | ⚠️ 14S only |

**⚠️ CRITICAL:** DJI DB1560 is 14S (51.8V nominal). **NOT compatible** with 12S ESCs or PDBs.

### BEC Voltage Routing

```
Battery (12S, 44.4V)
  │
  ├── Tarot TL2996 PDB
  │     ├── ESC 1-6 (direct 12S)
  │     ├── Matek 12V BEC → 12V rail (pump, accessories)
  │     │     └── Pixhawk 6C (via 5V BEC from ESC or PM)
  │     └── MAUCH HS-200-LV → Current sensor → Pixhawk 6C (analog)
  │
  └── Optional: Mean Well NSD10-48S5 → 5V rail (FC, GPS)
        └── Mean Well NSD05-48S12 → 12V rail (pump)
```

---

## Software/Firmware Compatibility

### ArduPilot Component Support

| Component | ArduPilot Support | Driver Required | Notes |
|-----------|-------------------|-----------------|-------|
| Pixhawk 6C | ✅ Native | None | Board ID: 105 |
| Cube Orange+ | ✅ Native | None | Board ID: 100 |
| HGLRC M100-5883 | ✅ Native | None | Protocol: UAVCAN or SERIAL |
| Holybro M9N | ✅ Native | None | Protocol: UAVCAN or SERIAL |
| Here4 RTK | ✅ Native | None | Protocol: UAVCAN |
| Holybro PM02V3 | ✅ Native | None | Analog current/voltage |
| MAUCH HS-200-LV | ✅ Native | None | Analog current sensor |
| FrSky R-XSR | ✅ Native | None | SBUS protocol |
| Skydroid H12 | ⚠️ Partial | None | Video/telemetry via MAVLink |
| Hobbywing X8 ESC | ✅ Native | None | PWM protocol |
| Hobbywing X9 G2L ESC | ✅ Native | None | DroneCAN protocol |
| Hobbywing 5L Pump | ✅ Native | None | PWM controlled |
| MAPIR Survey3W | ⚠️ External | None | Trigger via AUX PWM |
| Parrot Sequoia+ | ⚠️ External | None | Separate capture system |

### Firmware Versions

| Firmware | Recommended Version | Notes |
|----------|-------------------|-------|
| ArduPilot | 4.4.x | Latest stable for Pixhawk 6C |
| PX4 | 1.14.x | Alternative firmware |
| Jiyi Assistant | Latest | Closed-source, no alternatives |

### Parameter Dependencies

| Parameter | Depends On | Affects |
|-----------|------------|---------|
| `BATT_MONITOR` | PM02V3 connected | Battery current/voltage reading |
| `BATT_CURR_PIN` | MAUCH HS-200-LV | Current sensor channel |
| `GPS_TYPE` | GPS module selected | GNSS configuration |
| `COMPASS_EXTERNAL` | External compass | Magnetometer selection |
| `RC_PROTOCOLS` | Receiver type | RC input method |
| `MOT_PWM_MIN/MAX` | ESC type | Motor output range |
| `SPRAY_ENABLE` | Pump connected | Spray system activation |
| `ARSPD_ENABLE` | Airspeed sensor | Not needed for spray drone |

---

## Physical Compatibility

### Mounting Dimensions

| Component | Dimensions | Mounting | Compatible Frames |
|-----------|------------|----------|-------------------|
| Pixhawk 6C | 39 x 54.3mm | 4x M3 holes | All frames |
| Cube Orange+ | 38.25 x 38.25mm | Cube carrier | Cube-compatible frames |
| Jiyi K++V2 | 72.6 x 48mm | DJI mounting | DJI frames |
| HGLRC M100 | 15 x 15mm | M2/M3 | Any (with mast) |
| Holybro M9N | 25 x 25mm | M2/M3 | Any (with mast) |
| Here4 RTK | 30 x 30mm | M3 | Any (with mast) |
| Tarot TL2996 | 110 x 55mm | M3 center | EFT E616P ✅ |
| Tattu 30Ah | 212 x 90.5 x 132mm | Strap mount | EFT E616P ✅ |
| Tattu 22Ah Pro | 238 x 174 x 117mm | Strap mount | EFT E616P ✅ |
| Hobbywing X8 | 88.6mm OD motor | 35/40mm tube | EFT E616P ✅ |
| Hobbywing 5L Pump | 123 x 76 x 52mm | Bracket | Custom mount |

### Weight Budget

| Configuration | Dry Weight | Battery | Liquid | Total | MTOW Margin |
|---------------|------------|---------|--------|-------|-------------|
| **Path A** (X8 + 22Ah) | 19,961g | 6,300g | 0g | 26,261g | 9,739g ✅ |
| **Path B** (X8 + 22Ah + 16L) | 24,161g | 6,300g | 16,000g | 46,461g | ⚠️ Over MTOW |
| **Path C** (X8 + 30Ah) | 19,961g | 4,900g | 0g | 24,861g | 11,139g ✅ |
| **Path D** (Quad + 22Ah) | 14,153g | 6,300g | 0g | 20,453g | 4,547g ✅ |
| **Path G-A** (X8 + 30Ah + 16L) | 24,161g | 4,900g | 16,000g | 45,061g | ⚠️ Over MTOW |

**Note:** With 16L liquid (16kg), total exceeds 36kg MTOW. **Must reduce liquid to ~10L or use lighter battery.**

---

## Known Incompatibilities (Critical)

### ❌ DO NOT USE Combinations

| Component A | Component B | Issue | Risk Level |
|-------------|-------------|-------|------------|
| Ag++ Flight Controller | Any ESC | Discontinued, no firmware | 🔴 Critical |
| DJI DB1560 Battery | 12S ESCs | 14S voltage mismatch | 🔴 Critical |
| DJI DB1560 Battery | Tarot TL2996 PDB | 14S voltage mismatch | 🔴 Critical |
| DJI DB1560 Battery | Matek 12V BEC | 14S exceeds input range | 🔴 Critical |
| Pixhawk 6C | DJI E800 Pro ESC | DJI CAN not supported | 🔴 Critical |
| Pixhawk 6C | Jiyi K++V2 GPS | DJI connector incompatible | 🔴 Critical |
| Jiyi K++V2 | Hobbywing X9 G2L ESC | DroneCAN not supported | 🔴 Critical |
| Jiyi K++V2 | Here4 RTK GPS | DroneCAN not supported | 🔴 Critical |
| Jiyi K++V2 | FrSky R-XSR | SBUS not supported (DJI RC only) | 🔴 Critical |
| Generic PDB | Any system | No current sensing, fire risk | 🔴 Critical |
| Mean Well NSD10-12S5 | 12S battery | Input voltage exceeds rating | 🔴 Critical |
| Mean Well NSD05-12S12 | 12S battery | Input voltage exceeds rating | 🔴 Critical |
| Any 6S charger | 12S battery | Fire risk | 🔴 Critical |
| PC1080-neo | 12S battery | 6S only, fire risk | 🔴 Critical |
| 2500mAh 3S receiver battery | Any system | Insufficient for 12S | 🟡 Warning |
| 12Ah Li-ion | X8 hexacopter | Insufficient capacity | 🟡 Warning |
| 30Ah LiPo | Quad frame | Too heavy for MTOW | 🟡 Warning |
| Tarot TL2996 PDB | Cube Orange+ | No CAN bus support | 🟡 Warning |
| Holybro PM02V3 | Jiyi K++V2 | Jiyi uses DJI power system | 🟡 Warning |

---

## Recommended Combinations

### 🏆 Path A-F: Best Value (In-Stock)

```
Frame:          EFT E616P                          ₹44,999
Motors:         6x Hobbywing X8 Combo              ₹84,000
FC:             Pixhawk 6C + PM02V3                ₹32,499
GPS:            HGLRC M100-5883                    ₹1,599
Battery:        GenX 22Ah HV (25C)                 ₹23,838
PDB:            Tarot TL2996                       ₹3,768
Current Sensor: MAUCH HS-200-LV                    ₹6,000
BEC:            Matek 12V/15A                      ₹1,500
Pump:           Hobbywing 5L Brushless             ₹6,533
Nozzles:        8x TeeJet XR11002                  ₹9,600
Tank:           16L custom                         ₹8,500
Receiver:       FrSky R-XSR                        ₹2,125
Wiring:         6AWG + AS150 + XT150 adapters      ₹3,000
Safety:         Smoke stopper, fuses, straps       ₹3,000
TOTAL:          ~₹230,962
```

**Flight Time:** ~15-18 min hover, ~10-12 min spray

### 🏆 Path G-A: Best Flight Time

```
Frame:          EFT E616P                          ₹44,999
Motors:         6x Hobbywing X8 Combo              ₹84,000
FC:             Pixhawk 6C + PM02V3                ₹32,499
GPS:            HGLRC M100-5883                    ₹1,599
Battery:        Tattu 30Ah Semi-Solid              ₹1,06,000
PDB:            Tarot TL2996                       ₹3,768
Current Sensor: MAUCH HS-200-LV                    ₹6,000
BEC:            Matek 12V/15A                      ₹1,500
Pump:           Hobbywing 5L Brushless             ₹6,533
Nozzles:        8x TeeJet XR11002                  ₹9,600
Tank:           16L custom                         ₹8,500
Receiver:       FrSky R-XSR                        ₹2,125
Wiring:         6AWG + AS150 + XT150 adapters      ₹3,000
Safety:         Smoke stopper, fuses, straps       ₹3,000
TOTAL:          ~₹313,123
```

**Flight Time:** ~20-25 min hover, ~15-18 min spray

### 🏆 Path D: Budget Quad

```
Frame:          Generic 1200mm Quad                ₹18,000
Motors:         4x Hobbywing X8 Combo              ₹56,000
FC:             Pixhawk 6C + PM02V3                ₹32,499
GPS:            HGLRC M100-5883                    ₹1,599
Battery:        Tattu 22Ah Pro                     ₹45,674
PDB:            Tarot TL2996                       ₹3,768
Current Sensor: MAUCH HS-200-LV                    ₹6,000
BEC:            Matek 12V/15A                      ₹1,500
Pump:           Hobbywing 5L Brushless             ₹6,533
Nozzles:        6x TeeJet XR11002                  ₹7,200
Tank:           10L EFT E-Series                   ₹5,825
Receiver:       FrSky R-XSR                        ₹2,125
Wiring:         6AWG + AS150 + XT150 adapters      ₹3,000
Safety:         Smoke stopper, fuses, straps       ₹3,000
TOTAL:          ~₹192,723
```

**Flight Time:** ~12-15 min hover, ~8-10 min spray

### 🏆 Path H: Premium (X9 G2L)

```
Frame:          EFT E616P                          ₹44,999
Motors:         6x Hobbywing X9 G2L Combo          ₹1,03,722
FC:             Pixhawk 6C + PM02V3                ₹32,499
GPS:            Holybro M9N                        ₹9,000
Battery:        Tattu 30Ah Semi-Solid              ₹1,06,000
PDB:            Tarot TL2996                       ₹3,768
Current Sensor: MAUCH HS-200-LV                    ₹6,000
BEC:            Matek 12V/15A                      ₹1,500
Pump:           Hobbywing 5L Brushless             ₹6,533
Nozzles:        8x TeeJet XR11002                  ₹9,600
Tank:           16L custom                         ₹8,500
Receiver:       FrSky R-XSR                        ₹2,125
Wiring:         6AWG + AS150 + XT150 adapters      ₹3,000
Safety:         Smoke stopper, fuses, straps       ₹3,000
TOTAL:          ~₹337,246
```

**Flight Time:** ~20-25 min hover, ~15-18 min spray
**Advantage:** DroneCAN telemetry per motor, 36-inch props, higher thrust margin

---

## Substitution Guide

### Direct Substitutions (Drop-in)

| Original | Substitute | Notes |
|----------|------------|-------|
| Pixhawk 6C | Cube Orange+ | Same ArduPilot, more features |
| HGLRC M100-5883 | Holybro M9N | Better compass, 25Hz |
| GenX 22Ah HV | GNB 22Ah | Higher C-rate, same capacity |
| Hobbywing 5L Pump | SHURflo 8000 | Better pressure, needs 12V BEC |
| FrSky R-XSR | FrSky XM+ | Similar SBUS receiver |
| Matek 12V BEC | Any 12V BEC | Standard buck converter |
| MAUCH HS-200-LV | Matek 50A sensor | Analog current sensor |

### Conditional Substitutions (Require Changes)

| Original | Substitute | Changes Required |
|----------|------------|------------------|
| Pixhawk 6C | Jiyi K++V2 | Must use DJI RC, DJI GPS, DJI ESCs |
| Tattu 22Ah Pro | GenX 22Ah HV | Different connector (XT150 vs AS150) |
| X8 Combo | X9 G2L Combo | Need DroneCAN-capable FC firmware |
| Hobbywing 5L Pump | SHURflo 8000 | Need 12V BEC added |
| M100-5883 GPS | Here4 RTK | Need DroneCAN configuration |
| Tarot TL2996 PDB | MAUCH PDB | Different mounting, same function |

### Emergency Substitutions

| Original | Emergency Substitute | Risk |
|----------|---------------------|------|
| Pixhawk 6C | Jiyi K++V2 | ⚠️ Closed source, limited features |
| Tattu 30Ah | GenX 22Ah | ⚠️ 25% less capacity |
| X8 Combo | X9 G2L | ⚠️ Heavier, needs DroneCAN |
| M100-5883 | BN-880 | ⚠️ Lower quality compass |
| PM02V3 | MAUCH sensor | ⚠️ Separate voltage sensor needed |

---

## Notes

1. **Connector adapters** are critical - AS150U-F to XT150 adapters are required when mixing Tattu batteries with Hobbywing ESCs
2. **12S vs 14S** - Never connect 14S components to 12S system or vice versa
3. **DJI ecosystem** is completely incompatible with open-source systems
4. **Jiyi K++V2** is a closed ecosystem - only DJI-compatible components work
5. **All prices** are from June 2026 Indian retail market
6. **Flight times** are estimates based on 50% throttle hover conditions
