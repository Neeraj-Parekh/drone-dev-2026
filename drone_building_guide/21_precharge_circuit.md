# 21. Pre-Charge Circuit Design

## The Problem

A 12S LiPo battery at full charge outputs 50.4V. When you connect this to an ESC with empty capacitors, the capacitors act like a short circuit. The instantaneous inrush current can exceed **1000A** for milliseconds.

This current spike:
- Welds XT90 connectors shut
- Pits contactor relay contacts
- Damages capacitor ESR
- Creates a fire risk at high-current junctions

For a 12S hexacopter with 6 ESCs, each containing ~2000µF of capacitance, the total capacitance is approximately 12,000µF. Without pre-charge, the physics are unforgiving.

## The Solution

A pre-charge circuit uses a series resistor to limit inrush current, charging the capacitors gradually before the main contactor closes.

The sequence:
1. Battery connects through pre-charge resistor
2. Capacitors charge slowly (limited current)
3. After ~450ms, bus voltage reaches 95% of battery voltage
4. Main contactor closes, bypassing the resistor
5. ESC operates normally with full current capability

## Calculation

### Inrush Current Without Pre-Charge

```
I = V / R_wiring

Where:
  V = 50.4V (12S full charge)
  R_wiring = 0.01Ω (cable + connector resistance)

I = 50.4 / 0.01 = 5040A

Duration: ~1-5ms (depends on capacitor ESR)
Energy: Potentially destructive to connectors
```

### Pre-Charge Resistor Selection

Using two 25Ω 50W resistors in parallel:

```
R_total = (R1 × R2) / (R1 + R2)
R_total = (25 × 25) / (25 + 25) = 12.5Ω

I_peak = V / R_total
I_peak = 50.4 / 12.5 = 4.03A ← SAFE

Time constant (τ):
τ = R × C
τ = 12.5Ω × 0.012F = 0.15s

95% charge time = 3τ = 0.45s
```

### Energy and Thermal Analysis

```
Energy stored per cycle:
E = ½CV²
E = ½ × 0.012 × 50.4²
E = 15.2 Joules

Power dissipated per resistor (during charge):
P_peak = V² / (4 × R)    ← per resistor in parallel
P_peak = 50.4² / (4 × 25)
P_peak = 25.4W

Duration: 450ms (3τ)
Energy per resistor: 25.4 × 0.45 = 11.4J

Thermal mass of 50W resistor: sufficient for 11.4J pulse
No active cooling needed.
```

## Thermal Fuse Protection

If one resistor fails short-circuit, the remaining resistor sees double current (8.06A, 80.8W continuous). A **100°C thermal fuse** in series provides single-failure protection:

- If either resistor fails short, current rises
- Resistor temperature increases
- Thermal fuse blows at 100°C
- Circuit opens, preventing fire

Mount the thermal fuse in thermal contact with both resistors.

## Contactor Configuration

The pre-charge circuit works in sequence with the main contactor:

```
State 1: Battery Connected
  - Main contactor: OPEN
  - Pre-charge: ACTIVE
  - Current flows through R1+R2
  - Capacitors charging

State 2: Pre-Complete (after 450ms)
  - Bus voltage > 95% of battery voltage
  - Main contactor: CLOSES
  - Pre-charge: BYPESSED
  - Current flows through contactor only

State 3: Normal Operation
  - Pre-charge resistor: disconnected
  - All current through contactor
  - Contactors rated for continuous current
```

## Sensing Pre-Charge Completion

The FC or power module monitors bus voltage. When it reaches 95% of battery voltage, the contactor closes. Methods:

1. **Voltage divider to ADC**: Simple, accurate
2. **Comparator circuit**: Fast, hardware-based
3. **FC monitoring**: Read bus voltage via MAVLink

The FC should also timeout if pre-charge doesn't complete within 2 seconds — indicates a fault.

## Component Selection

| Component | Specification | Purpose | Cost (₹) |
|-----------|--------------|---------|-----------|
| R1, R2 | 25Ω 50W wirewound | Limit inrush current | 200 each |
| Thermal Fuse | 100°C, 10A | Single-fault protection | 50 |
| Contactor | 100A DC, 60V | Main power switching | 800 |
| Pre-charge Contactor | 10A DC, 60V | Pre-charge path | 200 |
| Voltage Divider | 10kΩ/2kΩ | Bus voltage sensing | 10 |

**Total cost: ~₹1,460**

## Testing the Pre-Charge Circuit

1. Connect oscilloscope across bus terminals
2. Energize pre-charge circuit
3. Observe voltage rise on oscilloscope
4. Verify 95% voltage reached within 500ms
5. Verify no voltage overshoot when contactor closes
6. Repeat 10 times to confirm reliability

## Source

- COEP report Section 7.8
- Electrical Engineering Stack Exchange (pre-charge design)
- Texas Instruments application notes on inrush limiting

---

```
Pre-Charge Circuit Schematic:

Battery (+) ────┬─────────────────────────────── Busbar (+)
                │
                ├──── Thermal Fuse (100°C) ────┐
                │                               │
                │    ┌──── R1 (25Ω 50W) ────┐  │
                │    │                      │  │
                └────┤                      ├──┘
                     │                      │
                     └──── R2 (25Ω 50W) ───┘
                           (Parallel)
                           
After 450ms: Main contactor closes, bypassing R1+R2
```

```
Voltage vs Time During Pre-Charge:

Voltage (V)
    50 ┤                            ┌──────────── 95% threshold
       │                         ┌──┘
    45 ┤                      ┌──┘
       │                   ┌──┘
    40 ┤                ┌──┘
       │             ┌──┘
    35 ┤          ┌──┘
       │       ┌──┘
    30 ┤    ┌──┘
       │ ┌──┘
    25 ┤─┘
       │
    20 ┤
       │
    15 ┤
       │
    10 ┤
       │
     5 ┤
       │
     0 ┼──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
       0  50 100 150 200 250 300 350 400 450 500
                      Time (ms)
                      
       τ = 150ms, 3τ = 450ms (95% charge)
```

```
Current Profile During Pre-Charge:

Current (A)
     5 ┤
       │╲
     4 ┤ ╲
       │  ╲
     3 ┤   ╲
       │    ╲
     2 ┤     ╲
       │      ╲
     1 ┤       ╲──────────────────────────
       │
     0 ┼──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
       0  50 100 150 200 250 300 350 400 450 500
                      Time (ms)
                      
       Peak: 4.03A at t=0
       Settles to <0.1A after 3τ
```

---

## EFT E616P Build Connection

> **Pre-charge circuit is MANDATORY for our 12S (50.4V) system.**

### Our Pre-Charge Specifications
| Parameter | Value | Source |
|---|---|---|
| Battery Voltage | 50.4V (12S full charge) | COEP Report |
| ESC Capacitance | 12,000µF (6× ESCs × 2,000µF) | COEP Report |
| Pre-Charge Resistors | 2× 25Ω 50W wirewound (parallel = 12.5Ω) | COEP Report |
| Peak Current (without) | 5,040A | Calculated |
| Peak Current (with) | 4.03A | Calculated |
| Time Constant (τ) | 150ms | Calculated |
| 95% Charge Time | 450ms (3τ) | Calculated |
| Thermal Fuse | 100°C, 10A | COEP Report |
| Total Cost | ~₹1,460 | COEP Report |

### Pre-Charge Sequence
1. Battery connects through pre-charge resistors
2. Capacitors charge slowly (limited current)
3. After ~450ms, bus voltage reaches 95% of battery voltage
4. Main contactor closes, bypassing resistors
5. ESC operates normally with full current capability

### ⚠️ Without Pre-Charge
- 5,040A inrush current
- Welds connectors shut
- Damages capacitor ESR
- Creates fire risk at high-current junctions

---

## Common Mistakes & Pitflies

| Mistake | Consequence | Prevention |
|---|---|---|
| No pre-charge on 12S | Connector welding, 5,040A inrush | Install pre-charge circuit (mandatory) |
| Wrong resistor value | Too slow or too fast charging | Calculate τ = R×C, target 3τ = 450ms |
| No thermal fuse | Fire if resistor fails short | Add 100°C thermal fuse |
| Skipping pre-charge test | Circuit not working | Test with oscilloscope before first power-up |
| Wrong contactor rating | Contactor welds | Use 100A+ DC contactor |

---

## Datasheet & Product Links

| Resource | URL |
|---|---|
| Wirewound resistors | https://www.mouser.com/wirewound-resistors |
| Thermal fuses | https://www.mouser.com/thermal-fuses |
| DC contactors | https://www.mouser.com/contactors |
| Pre-charge design guide | https://www.electronics-tutorials.ws |

---

*Enrichment added: May 29, 2026 | Template v1.0*
