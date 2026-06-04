# 27 - Maiden Flight: Complete First Hover Test Procedure

## ⚠️ CRITICAL SAFETY WARNING

The maiden flight is the most dangerous phase of drone building. A newly built drone has never been tested in real conditions. **Follow every step. Do not rush.**

---

## Prerequisites

Before attempting maiden flight, you MUST have completed:

| Requirement | Status |
|-------------|--------|
| ArduPilot setup complete (26_ardupilot_setup_guide.md) | □ |
| All pre-arm checks passing | □ |
| Compass calibrated | □ |
| Radio calibrated | □ |
| ESC calibrated | □ |
| Flight modes configured | □ |
| Failsafe configured | □ |
| Battery fully charged | □ |
| Weather suitable (wind <15 km/h, no rain) | □ |
| Safe area identified (open field, no people) | □ |
| Tether available | □ |
| Fire extinguisher accessible | □ |

---

## Pre-Flight Checklist

```
    ┌─────────────────────────────────────────────────────┐
    │           PRE-FLIGHT CHECKLIST                       │
    ├─────────────────────────────────────────────────────┤
    │                                                      │
    │  1. VISUAL INSPECTION                                │
    │  □ All bolts tight (arm bolts, motor bolts, FC)     │
    │  □ No loose wires                                    │
    │  □ No damaged components                             │
    │  □ Props installed correctly (CW/CCW per motor)     │
    │  □ Props tight (use prop wrench)                     │
    │  □ Battery secured (cannot shift)                    │
    │  □ Battery connector fully seated                    │
    │  □ GPS antenna mounted (arrow forward)               │
    │  □ No debris in motors or on props                   │
    │  □ Landing gear intact                               │
    │                                                      │
    │  2. ELECTRICAL CHECKS                                │
    │  □ All connectors secure                             │
    │  □ No exposed wires                                  │
    │  □ Fuses installed and correct rating                │
    │  □ BEC output voltage correct (5V, 12V)             │
    │  □ No shorts (smoke test passed)                     │
    │                                                      │
    │  3. SOFTWARE CHECKS                                  │
    │  □ Firmware up to date                               │
    │  □ Compass calibration verified (in Mission Planner) │
    │  □ Accelerometer calibration verified                │
    │  □ Radio calibration verified                        │
    │  □ ESC calibration verified                          │
    │  □ Flight modes configured                           │
    │  □ Failsafe configured                               │
    │  □ Geofence configured                               │
    │  □ Battery monitoring configured                     │
    │                                                      │
    │  4. SAFETY CHECKS                                    │
    │  □ Tether available and tested                       │
    │  □ Clear area (10m minimum radius)                   │
    │  □ No people or animals in flight path               │
    │  □ Class D fire extinguisher accessible              │
    │  □ LiPo-safe bag for battery                         │
    │  □ Emergency plan reviewed                           │
    │  □ Communication established (hand signals)          │
    │  □ Weather suitable (wind <15 km/h, no rain)        │
    │                                                      │
    │  5. FINAL CHECKS                                     │
    │  □ GPS lock acquired (10+ satellites)                │
    │  □ Home position set                                 │
    │  □ Mission Planner shows "Ready to Arm"             │
    │  □ All pre-arm checks pass (green)                   │
    │  □ Battery voltage correct (~50.4V for 12S)         │
    │  □ Cell voltages balanced (within 0.1V)             │
    │                                                      │
    └─────────────────────────────────────────────────────┘
```

---

## Phase 1: Tethered Test (First Power-On)

### Setup

```
    TETHER SETUP:
    
    ┌─────────────────────────────────────────────────────┐
    │                                                      │
    │                    TETHER                            │
    │                      │                               │
    │                      │ 5m length                     │
    │                      │                               │
    │    ┌─────────────────┼─────────────────┐            │
    │    │                 │                 │            │
    │    │    ANCHOR       │    DRONE        │            │
    │    │    POINT        │                 │            │
    │    │                 │                 │            │
    │    │   ▓▓▓▓▓▓▓▓▓   │    ═══════      │            │
    │    │   ▓ Heavy  ▓   │    ║     ║      │            │
    │    │   ▓ Weight ▓   │    ║  FC ║      │            │
    │    │   ▓▓▓▓▓▓▓▓▓   │    ║     ║      │            │
    │    │                 │    ═══════      │            │
    │    │                 │                 │            │
    │    └─────────────────┴─────────────────┘            │
    │                                                      │
    │    Tether specifications:                            │
    │    - Length: 5 meters maximum                        │
    │    - Material: Nylon rope (6mm diameter)            │
    │    - Rating: 200kg+ breaking strength               │
    │    - Attachment: Secure to frame center plate       │
    │    - Anchor: Heavy object (concrete block, sandbag) │
    │                                                      │
    └─────────────────────────────────────────────────────┘
```

### Tethered Test Procedure

```
    ┌─────────────────────────────────────────────────────┐
    │           TETHERED TEST PROCEDURE                    │
    ├─────────────────────────────────────────────────────┤
    │                                                      │
    │  STEP 1: Setup (10 minutes)                         │
    │  □ Place drone on flat, open area                   │
    │  □ Attach tether to drone center plate              │>
    │  □ Attach tether to anchor point                    │
    │  □ Verify tether is taut but not straining          │
    │  □ Connect battery                                  │
    │  □ Verify Mission Planner connection                │
    │  □ Verify GPS lock (10+ satellites)                 │
    │  □ Verify all pre-arm checks pass                   │
    │                                                      │
    │  STEP 2: Motor Test (5 minutes)                     │
    │  □ Remove all propellers                            │
    │  □ Arm in Stabilize mode                            │
    │  □ Slowly increase throttle to ~20%                 │
    │  □ Verify all motors spin                           │
    │  □ Verify correct directions                        │
    │  □ Verify no unusual vibration                      │
    │  □ Land and disarm                                  │
    │  □ Check motor temperature                          │
    │                                                      │
    │  STEP 3: Low-Throttle Hover (5 minutes)             │
    │  □ Reinstall propellers (correct CW/CCW)            │
    │  □ Verify tether is secure                          │
    │  □ Clear all personnel from area                    │
    │  □ Arm in Stabilize mode                            │
    │  □ Slowly increase throttle to ~40%                 │
    │  □ Drone should lift off (tether will hold)         │
    │  □ Hover at 0.5-1m (tether tension)                 │
    │  □ Hold for 30 seconds                              │
    │  □ Verify stability                                 │
    │  □ Verify controls respond                          │
    │  □ Land gently                                      │
    │  □ Disarm and inspect                               │
    │                                                      │
    │  STEP 4: Post-Tether Inspection (10 minutes)        │
    │  □ Check motor temperature (should be warm, not hot)│
    │  □ Check ESC temperature                            │
    │  □ Check for loose bolts                            │
    │  □ Check for loose wires                            │
    │  □ Check prop condition                             │
    │  □ Check battery voltage                            │
    │  □ Review flight logs for warnings                  │
    │                                                      │
    │  IF ANY ISSUES:                                     │
    │  □ Stop immediately                                 │
    │  □ Diagnose problem                                 │
    │  □ Fix before continuing                            │
    │                                                      │
    └─────────────────────────────────────────────────────┘
```

---

## Phase 2: First Untethered Hover

### Setup

```
    UNTETHERED TEST AREA:
    
    ┌─────────────────────────────────────────────────────┐
    │                                                      │
    │                   FLIGHT AREA                        │
    │                                                      │
    │        30m                                            │
    │    ←──────────→                                      │
    │                                                      │
    │    ┌───────────────────────────────────┐  ↑         │
    │    │                                   │  │         │
    │    │        CLEAR ZONE                 │  30m       │
    │    │                                   │  │         │
    │    │     ┌─────────────────┐          │  │         │
    │    │     │                 │          │  ↓         │
    │    │     │   HOVER ZONE    │          │            │
    │    │     │    (5m × 5m)   │          │            │
    │    │     │                 │          │            │
    │    │     └─────────────────┘          │            │
    │    │                                   │            │
    │    └───────────────────────────────────┘            │
    │                                                      │
    │    ● PILOT POSITION (10m away)                       │
    │                                                      │
    │    ○ SAFETY OBSERVER (5m from pilot)                 │
    │                                                      │
    │    ▲ FIRE EXTINGUISHER (nearby)                     │
    │                                                      │
    └─────────────────────────────────────────────────────┘
```

### First Hover Procedure

```
    ┌─────────────────────────────────────────────────────┐>
    │           FIRST HOVER PROCEDURE                      │>
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  STEP 1: Area Check (5 minutes)                     │>
    │  □ Verify clear area (30m radius)                   │>
    │  □ Verify no people or animals                      │>
    │  □ Verify wind speed <15 km/h                       │>
    │  □ Verify GPS lock (10+ satellites)                 │>
    │  □ Verify all pre-arm checks pass                   │>
    │  □ Brief safety observer on procedures              │>
    │                                                      │>
    │  STEP 2: Takeoff (1 minute)                         │>
    │  □ Position pilot 10m from drone                    │>
    │  □ Arm in Stabilize mode                            │>
    │  □ Announce "Taking off"                            │>
    │  □ Slowly increase throttle to ~45%                 │>
    │  □ Drone should lift off smoothly                    │>
    │  □ Climb to 2m altitude                             │>
    │  □ Hold position                                    │>
    │                                                      │>
    │  STEP 3: Hover Check (2 minutes)                    │>
    │  □ Verify drone holds position                      │>
    │  □ Verify no drift                                  │>
    │  □ Verify no oscillation                            │>
    │  □ Verify controls respond                          │>
    │  □ Check motor sound (should be smooth)             │>
    │  □ Check for vibration                              │>
    │                                                      │>
    │  STEP 4: Control Test (2 minutes)                   │>
    │  □ Test yaw (rotate left/right)                     │>
    │  □ Test pitch (forward/back)                        │>
    │  □ Test roll (left/right)                           │>
    │  □ Return to center position                        │>
    │  □ Verify smooth responses                          │>
    │                                                      │>
    │  STEP 5: Landing (1 minute)                         │>
    │  □ Announce "Landing"                               │>
    │  □ Slowly decrease throttle                         │>
    │  □ Land gently                                      │>
    │  □ Disarm immediately after landing                 │>
    │  □ Verify motors stop                               │>
    │                                                      │>
    │  STEP 6: Post-Flight Inspection (10 minutes)        │>
    │  □ Check motor temperature                          │>
    │  □ Check ESC temperature                            │>
    │  □ Check for loose bolts                            │>
    │  □ Check prop condition                             │>
    │  □ Check battery voltage                            │>
    │  □ Review flight logs                               │>
    │  □ Note any issues for tuning                        │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

---

## Phase 3: Mode Testing

### Test Each Flight Mode

```
    ┌─────────────────────────────────────────────────────┐>
    │           MODE TESTING PROCEDURE                     │>
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  Test in order of complexity:                        │>
    │                                                      │>
    │  1. STABILIZE MODE                                  │>
    │  □ Arm in Stabilize                                 │>
    │  □ Hover at 2m                                      │>
    │  □ Verify manual control                            │>
    │  □ Verify self-leveling when sticks centered        │>
    │  □ Test yaw, pitch, roll                            │>
    │  □ Land and disarm                                  │>
    │                                                      │>
    │  2. LOITER MODE                                     │>
    │  □ Switch to Loiter                                 │>
    │  □ Verify GPS position hold                         │>
    │  □ Verify altitude hold                             │>
    │  □ Push drone and verify it returns                 │>
    │  □ Test yaw in Loiter                               │>
    │  □ Land and disarm                                  │>
    │                                                      │>
    │  3. RTL MODE (Return To Launch)                     │>
    │  □ Arm and climb to 10m                             │>
    │  □ Switch to RTL                                    │>
    │  □ Verify drone climbs to RTL_ALT (default 15m)     │>
    │  □ Verify drone returns to home position            │>
    │  □ Verify drone lands                               │>
    │  □ Verify motors stop after landing                 │>
    │                                                      │>
    │  4. LAND MODE                                       │>
    │  □ Arm and climb to 5m                              │>
    │  □ Switch to Land                                   │>
    │  □ Verify drone descends vertically                 │>
    │  □ Verify drone lands                               │>
    │  □ Verify motors stop                               │>
    │                                                      │>
    │  5. GUIDED MODE                                     │>
    │  □ Arm in Guided                                    │>
    │  □ Click location on Mission Planner map            │>
    │  □ Verify drone flies to clicked location           │>
    │  □ Click new location                               │>
    │  □ Verify drone flies to new location               │>
    │  □ Command RTL from ground station                  │>
    │  □ Verify drone returns home                        │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

---

## Phase 4: Emergency Procedures

### Emergency Shutdown Procedure

```
    ┌─────────────────────────────────────────────────────┐
    │           EMERGENCY PROCEDURES                       │
    ├─────────────────────────────────────────────────────┤
    │                                                      │
    │  EMERGENCY STOP (Critical):                         │>
    │  □ Flip safety switch (if equipped)                 │>
    │  □ OR: Switch to Stabilize and throttle down        │>
    │  □ OR: Press disarm in Mission Planner              │>
    │  □ OR: Turn off RC transmitter (triggers failsafe)  │>
    │                                                      │>
    │  DRIFTING AWAY:                                     │>
    │  □ Switch to RTL immediately                        │>
    │  □ If no response: Switch to Land                   │>
    │  □ If no response: Turn off transmitter             │>
    │  □ If drone leaves VLOS: Do NOT follow             │>
    │                                                      │>
    │  VIOLENT OSCILLATION:                               │>
    │  □ Throttle down immediately                        │>
    │  □ Land as soon as possible                         │>
    │  □ Check PID tuning                                 │>
    │  □ Check motor/prop balance                         │>
    │                                                      │>
    │  MOTOR FAILURE:                                     │>
    │  □ Switch to Land immediately                       │>
    │  □ Land as quickly as safe                          │>
    │  □ For hexacopter: can fly with 1 motor out        │>
    │  □ For quadcopter: will tumble                      │>
    │                                                      │>
    │  BATTERY WARNING:                                   │>
    │  □ Land immediately                                 │>
    │  □ Do not attempt missions                          │>
    │  □ Monitor voltage closely                          │>
    │                                                      │>
    │  FIRE:                                               │>
    │  □ Land immediately (if possible)                   │>
    │  □ If battery fire: evacuate, use Class D           │>
    │  □ Do NOT use water                                 │>
    │  □ Call emergency services                          │>
    │                                                      │>
    │  AFTER EMERGENCY:                                   │>
    │  □ Disarm drone                                     │>
    │  □ Disconnect battery                               │>
    │  □ Inspect for damage                               │>
    │  □ Review logs to determine cause                   │>
    │  □ Fix before next flight                           │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘
```

---

## Phase 5: Post-Flight Inspection

### Post-Flight Checklist

```
    ┌─────────────────────────────────────────────────────┐>
    │           POST-FLIGHT CHECKLIST                      │>
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  IMMEDIATE (after landing):                         │>
    │  □ Disarm drone                                     │>
    │  □ Disconnect battery                               │>
    │  □ Remove propellers (for inspection)               │>
    │  □ Check motor temperature (should be warm, not hot)│>
    │  □ Check ESC temperature                            │>
    │  □ Check frame for cracks                           │>
    │  □ Check for loose bolts                            │>
    │  □ Check for loose wires                            │>
    │                                                      │>
    │  INSPECTION (within 1 hour):                        │>
    │  □ Check all motor bolts                            │>
    │  □ Check all arm bolts                              │>
    │  □ Check FC mounting bolts                          │>
    │  □ Check prop condition                             │>
    │  □ Check battery condition                          │>
    │  □ Check connector condition                        │>
    │  □ Check GPS antenna mount                          │>
    │                                                      │>
    │  DATA REVIEW:                                        │>
    │  □ Download flight logs                             │>
    │  □ Review in Mission Planner                        │>
    │  □ Check for warnings/errors                        │>
    │  □ Review vibration levels                          │>
    │  □ Review motor outputs                             │>
    │  □ Review battery performance                       │>
    │  □ Note any issues for tuning                        │>
    │                                                      │>
    │  DOCUMENTATION:                                     │>
    │  □ Record flight time                               │>
    │  □ Record battery usage                             │>
    │  □ Record any issues observed                       │>
    │  □ Record weather conditions                        │>
    │  □ Update maintenance log                           │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

### Log Analysis

```
    KEY PARAMETERS TO REVIEW:
    
    ┌─────────────────────────────────────────────────────┐
    │  LOG ANALYSIS CHECKLIST                              │>
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  VIBRATION:                                          │>
    │  □ Accel X, Y, Z should be within ±5 m/s²         │>
    │  □ Vibration spikes indicate balance issues         │>
    │                                                      │>
    │  MOTOR OUTPUTS:                                      │>
    │  □ All motors should be similar (within 10%)        │>
    │  □ One motor much higher = balance issue            │>
    │  □ Oscillations indicate PID issues                 │>
    │                                                      │>
    │  BATTERY:                                            │>
    │  □ Voltage sag under load (should be <5V for 12S)  │>
    │  □ Current draw at hover (baseline for tuning)      │>
    │  □ Cell voltage balance                              │>
    │                                                      │>
    │  GPS:                                                │>
    │  □ Number of satellites (should be >10)             │>
    │  □ HDOP (should be <2.0)                           │>
    │  □ Position accuracy                                │>
    │                                                      │>
    │  CONTROLS:                                           │>
    │  □ RC inputs vs actual response                     │>
    │  □ Desired vs actual attitude                       │>
    │  □ PID error values                                 │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

---

## Flight Log Template

```
    ┌─────────────────────────────────────────────────────┐>
    │           MAIDEN FLIGHT LOG                          │>
    ├─────────────────────────────────────────────────────┤>
    │                                                      │>
    │  Date: ____________  Time: ____________             │>
    │  Location: ________________________________         │>
    │  Weather: Wind __ km/h  Temp __°C  Conditions ____ │>
    │                                                      │>
    │  PRE-FLIGHT:                                         │>
    │  □ All checks passed                                │>
    │  □ GPS satellites: ______                           │>
    │  □ HDOP: ______                                     │>
    │  □ Battery voltage: ______V                         │>
    │                                                      │>
    │  FLIGHT DATA:                                        │>
    │  Phase          Duration    Notes                   │>
    │  ─────────────  ──────────  ─────────────────────  │>
    │  Tethered test  _________   ___________________    │>
    │  First hover    _________   ___________________    │>
    │  Mode testing   _________   ___________________    │>
    │  Total flight   _________   ___________________    │>
    │                                                      │>
    │  BATTERY:                                            │>
    │  Start voltage: ______V                             │>
    │  End voltage:   ______V                             │>
    │  Capacity used: ______mAh                           │>
    │  End cell voltages: ________________________        │>
    │                                                      │>
    │  OBSERVATIONS:                                       │>
    │  □ Vibration level: Low / Medium / High             │>
    │  □ Motor temperature: OK / Warm / Hot               │>
    │  □ Flight stability: Good / Fair / Poor             │>
    │  □ Control response: Good / Fair / Poor             │>
    │  □ GPS hold: Good / Fair / Poor                     │>
    │                                                      │>
    │  ISSUES FOUND:                                       │>
    │  1. ________________________________________        │>
    │  2. ________________________________________        │>
    │  3. ________________________________________        │>
    │                                                      │>
    │  NEXT STEPS:                                         │>
    │  □ PID tuning needed                                │>
    │  □ Compass recalibration needed                     │>
    │  □ Mechanical adjustment needed                     │>
    │  □ Other: ________________________________          │>
    │                                                      │>
    │  PILOT SIGNATURE: ________________                  │>
    │                                                      │>
    └─────────────────────────────────────────────────────┘>
```

---

## Success Criteria

```
    MAIDEN FLIGHT IS SUCCESSFUL IF:
    
    □ Drone takes off smoothly
    □ Drone hovers stably
    □ Drone responds to controls
    □ Drone holds position (in Loiter)
    □ Drone returns home (in RTL)
    □ Drone lands safely
    □ No components overheated
    □ No loose parts found
    □ No errors in logs
    
    IF NOT SUCCESSFUL:
    
    1. Do not fly again until issues are fixed
    2. Review logs to identify problems
    3. Fix mechanical issues first
    4. Then fix software issues
    5. Re-test from Phase 1
```

---

## Common Maiden Flight Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| Drifting | Drone moves without input | Recalibrate compass, check GPS |
| Oscillating | Rapid shaking | Tune PIDs, check motor balance |
| Drifting | Drone moves without input | Recalibrate compass, check GPS |
| Motor wrong direction | Drone flips on takeoff | Swap motor wires or reverse ESC |
| Vibration | buzzing sound, blurry video | Balance props, check motor mounts |
| Failsafe trigger | Drone lands unexpectedly | Check RC failsafe settings |
| GPS not locking | No position hold | Check GPS antenna, wait for lock |
| Weak battery | Quick voltage drop | Check battery health, charge fully |

---

## After Maiden Flight

Once maiden flight is successful:

1. **Tune PIDs** (see 15_tuning_calibration.md)
2. **Test autonomous missions** in SITL
3. **Test payload operation** (spray system)
4. **Plan operational flights** with safety protocols
5. **Document everything** in maintenance log

**Congratulations! Your drone is now flight-worthy.**

---

## EFT E616P Build Connection

> **Maiden flight checklist for our 45 kg MTOW hexacopter.**

### Pre-Flight Checklist (Our Build)
| Check | Status | Detail |
|---|---|---|
| Battery charged | □ | 50.4V (12S full), cells balanced ±0.1V |
| Props tight | □ | MFP 36×11, CW/CCW correct |
| GPS lock | □ | 10+ satellites, HDOP < 2.0 |
| Radio connected | □ | R-XSR bound, S.BUS active |
| Failsafe tested | □ | RC/battery/GPS failsafe configured |
| Frame tight | □ | All bolts torqued, threadlocker cured |
| Area clear | □ | 30m radius, no people |
| Weather OK | □ | Wind < 15 km/h, no rain |
| Fire extinguisher | □ | ABC class, accessible |
| Tether available | □ | 5m nylon, 200kg rated |

### Flight Test Phases
1. **Tethered Hover** (5 min): Secure with tether, 0.5m altitude
2. **Free Hover** (5 min): 1-2m altitude, position hold
3. **Mode Testing**: Stabilize → Loiter → RTL → Land → Guided
4. **Flight Envelope**: Max altitude, max speed, range test
5. **Spray Integration**: Pump test, flow calibration
6. **Mission Waypoints**: Autonomous flight

---

## Common Mistakes & Pitflies

| Mistake | Consequence | Prevention |
|---|---|---|
| Skipping tethered test | Crash on first untethered flight | Always tether first |
| Not testing failsafe | Flyaway during maiden | Test failsafe before maiden |
| Flying in wind >15 km/h | Unstable, crash | Check weather, postpone if windy |
| No fire extinguisher nearby | Injury, property damage | Have ABC extinguisher ready |
| Not logging flight | Can't diagnose issues | Download and review logs after flight |

---

*Enrichment added: May 29, 2026 | Template v1.0*
