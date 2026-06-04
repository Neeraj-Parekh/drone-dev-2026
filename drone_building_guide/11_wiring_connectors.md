# Wiring and Connectors for Drones

## Overview

Proper wiring and connectors ensure reliable power delivery, signal integrity, and safety. Wrong gauge wire or poor solder joints cause failures and fire hazards.

```mermaid
graph LR
    subgraph CONNECTOR["Connector Selection"]
        XT30["XT30<br/><60A<br/>Micro builds"]
        XT60["XT60<br/>30-60A<br/>5" FPV standard"]
        XT90["XT90<br/>60-90A<br/>Large builds"]
        AS150["AS150<br/>150A+<br/>Industrial"]
    end

    XT30 -->|"Upgrade"| XT60
    XT60 -->|"Upgrade"| XT90
    XT90 -->|"Upgrade"| AS150

    XT30 -.->|"Wire: 14AWG"| W1[Light]
    XT60 -.->|"Wire: 12AWG"| W2[Medium]
    XT90 -.->|"Wire: 10AWG"| W3[Heavy]
    AS150 -.->|"Wire: 8AWG"| W4[Industrial]

    style XT30 fill:#c8e6c9
    style XT60 fill:#bbdefb
    style XT90 fill:#fff3e0
    style AS150 fill:#ffcdd2
```

## Connector Types

### Power Connectors

| Connector | Current | Voltage | Use Case            | Price    |
|-----------|---------|---------|----------------------|----------|
| XT30      | 60A     | <60V    | Small drones (<5")   | $1-2     |
| XT60      | 60A     | <60V    | Medium drones (5-7") | $1-3     |
| XT90      | 90A     | <60V    | Large drones (7-10") | $2-5     |
| AS150     | 150A    | <60V    | Heavy-lift           | $5-10    |
| AS250     | 250A    | <60V    | Industrial           | $10-20   |
| EC3       | 60A     | <60V    | Legacy, diminishing  | $1-2     |
| EC5       | 120A    | <60V    | Legacy, diminishing  | $2-4     |

### Connector Selection Guide

```
Current Rating = Total Motor Current × 1.5 (safety margin)

Example:
- 4 motors × 30A = 120A total
- Safety margin: 120 × 1.5 = 180A
- Connector: AS150 (150A) or AS250 (250A)
```

### Signal Connectors

| Connector   | Pins | Pitch  | Use Case               |
|-------------|------|--------|------------------------|
| JST-GH      | 6-10 | 1.25mm | GPS, sensors           |
| JST-SH      | 4-8  | 1.0mm  | Compact sensors        |
| Molex Pico  | 4-6  | 1.5mm  | ESC signal             |
| Dupont      | 1-3  | 2.54mm | Prototyping            |
| DF13        | 4-10 | 1.25mm | Flight controller ports|

## Wire Gauge (AWG)

### AWG System

- **Lower Number = Thicker Wire**
- **Higher Current = Thicker Wire Needed**
- **Flexibility:** Thicker wire is less flexible

### Common Gauges for Drones

| Gauge | Diameter | Current Capacity | Use Case              |
|-------|----------|------------------|------------------------|
| 28 AWG| 0.32mm   | 1-2A            | Signal wires, LEDs    |
| 24 AWG| 0.51mm   | 3-5A            | Sensor connections     |
| 22 AWG| 0.64mm   | 5-7A            | Low-power peripherals |
| 20 AWG| 0.81mm   | 7-10A           | Receiver power        |
| 18 AWG| 1.02mm   | 10-16A          | ESC signal, VTX power |
| 16 AWG| 1.29mm   | 16-25A          | ESC power (small)     |
| 14 AWG| 1.63mm   | 25-35A          | ESC power (medium)    |
| 12 AWG| 2.05mm   | 35-50A          | Battery leads, ESC    |
| 10 AWG| 2.59mm   | 50-75A          | High-current leads    |
| 8 AWG | 3.26mm   | 75-100A         | Industrial drones     |

### Current Capacity Formula

```
Wire Current Capacity = (Cross-Section Area in mm²) × 6-10 A/mm²

Example:
- 12 AWG = 3.31 mm²
- Capacity: 3.31 × 8 = 26.5A (conservative)
```

## Silicone Wire

### Advantages

- **Flexibility:** Easy to route and bend
- **Heat Resistance:** -60°C to 200°C operating range
- **Durability:** Resistant to abrasion and cuts
- **Solderability:** Easy to solder
- **Lightweight:** Lighter than PVC-insulated wire

### Specifications

- **Temperature Rating:** 200°C continuous
- **Voltage Rating:** 600V
- **Conductor:** Tinned copper strands
- **Insulation:** Silicone rubber
- **Strand Count:** Varies by gauge (more strands = more flexible)

### Recommended Suppliers

- **Turnigy:** Budget-friendly, good quality
- **T-Motor:** Premium quality
- **Berkshire Robotics:** High-flex silicone
- **Hobbyking:** Wide selection

## Soldering

### Solder Types

| Type     | Composition | Melting Point | Use Case            |
|----------|-------------|---------------|----------------------|
| 60/40    | 60% Sn, 40% Pb | 183°C     | General purpose      |
| 63/37    | 63% Sn, 37% Pb | 183°C     | Eutectic, best flow  |
| Lead-Free| 96.5% Sn, 3.5% Ag | 217°C | RoHS compliance      |
| Flux Core| Varies      | Varies        | Electronics work     |

### Recommended: 63/37 Lead-Free

- **Melting Point:** 183°C
- **Flow:** Excellent
- **Wetting:** Good on copper pads
- **Strength:** Adequate for drone applications

### Soldering Equipment

- **Iron:** Temperature-controlled station (not pencil iron)
- **Temperature:** 350-400°C for lead-free
- **Tip:** Conical or chisel for different tasks
- **Flux:** No-clean flux pen
- **Solder Sucker:** For desoldering
- **Brass Sponge:** For tip cleaning

### Soldering Procedure

1. **Clean:** Remove oxidation with brass sponge
2. **Tin:** Apply thin layer of solder to tip
3. **Heat:** Touch iron to joint (1-2 seconds)
4. **Feed:** Apply solder to joint (not iron)
5. **Flow:** Let solder flow naturally
6. **Remove:** Lift iron, let joint cool naturally
7. **Inspect:** Check for shiny, smooth joint

### Common Soldering Mistakes

| Mistake              | Result                   | Fix                       |
|---------------------|--------------------------|---------------------------|
| Cold joint          | Dull, grainy surface     | Reheat and add flux       |
| Overheated          | Burnt flux, black residue| Reduce temperature        |
| Too much solder     | Bulky joint              | Use solder sucker         |
| No flux             | Poor wetting             | Add flux before soldering |
| Moving joint        | Disturbed joint          | Hold still while cooling  |

## Heat Shrink

### Types

- **Standard:** Single-wall, basic insulation
- **Adhesive-Lined:** Double-wall, moisture resistant
- **Dual-Wall:** Adhesive-lined, best protection
- **Clear:** Allows visual inspection

### Sizing

```
Heat Shrink Diameter = 2-3× Wire Diameter (before shrinking)

Example:
- 12 AWG wire = 2.05mm diameter
- Heat shrink: 5-6mm diameter before shrinking
```

### Application Procedure

1. **Select Size:** 2-3× wire diameter
2. **Cut Length:** 2× connector length
3. **Position:** Slide over wire before soldering
4. **Solder:** Complete connection
5. **Shrink:** Use heat gun (not lighter)
6. **Cool:** Let cool naturally

### Heat Shrink Tips

- **Heat Source:** Heat gun (200-300°C), not open flame
- **Distance:** Hold 2-3 inches from heat shrink
- **Rotation:** Rotate wire for even shrinking
- **Adhesive-Lined:** Use for waterproof connections
- **Kapton Tape:** Wrap before heat shrink for added insulation

## Wire Routing

### Best Practices

1. **Signal Wires:** Route away from power wires
2. **Twisted Pairs:** Use for signal wires (reduce interference)
3. **Short Runs:** Minimize wire length
4. **Secure:** Use zip ties or adhesive mounts
5. **Avoid Sharp Bends:** Use gentle curves
6. **Service Loop:** Leave slack for maintenance

### Wire Separation

| Wire Type | Separation | Reason                  |
|-----------|------------|--------------------------|
| Power     | 10mm min   | Prevents inductive coupling|
| Signal    | 5mm min    | Reduces interference     |
| VTX       | 20mm min   | Prevents video noise     |
| GPS       | 15mm min   | Prevents EMI interference|

### Cable Management

- **Zip Ties:** Secure bundles every 50mm
- **Adhesive Mounts:** For non-vibrating surfaces
- **Spiral Wrap:** For flexible routing
- **Braided Sleeve:** Professional appearance
- **Heat Shrink Tubing:** Bundle protection

## Connector Installation

### XT60 Installation

1. **Tin Wires:** Apply thin layer of solder
2. **Tin Connector:** Apply thin layer to connector cups
3. **Heat:** Touch iron to connector cup
4. **Insert:** Push tinned wire into cup
5. **Cool:** Hold still for 5 seconds
6. **Insulate:** Apply heat shrink over joint
7. **Test:** Check for continuity and resistance

### JST-GH Installation

1. **Strip:** Remove 3mm insulation
2. **Tin:** Apply thin layer of solder
3. **Insert:** Push into connector housing
4. **Crimp:** Use proper crimping tool
5. **Lock:** Ensure locking tab engages
6. **Test:** Verify pin retention

### Strain Relief

- **Heat Shrink:** Cover connector and 10mm of wire
- **Adhesive:** Use hot glue for added strength
- **Zip Tie:** Secure cable to frame
- **Molded:** Use connector with integrated strain relief

## Wire Color Coding

### Standard Colors

| Color  | Function | Notes                    |
|--------|----------|--------------------------|
| Red    | VCC      | Positive power           |
| Black  | GND      | Ground                   |
| Yellow | Signal   | ESC signal               |
| White  | Signal   | I2C SDA, UART TX        |
| Green  | Signal   | I2C SCL, UART RX        |
| Orange | Signal   | PPM, SBUS               |
| Blue   | Signal   | Telemetry               |

### Consistency

- Use same colors throughout build
- Document non-standard wiring
- Label wires at both ends
- Use heat shrink labels for identification

## Wire Length Guidelines

### Motor Wires

- **Shortest Possible:** Minimize resistance
- **Equal Length:** Balance resistance across motors
- **Route:** Along arms, secured with zip ties

### Battery Leads

- **Short as Possible:** Reduce voltage drop
- **Equal Length:** For parallel batteries
- **Strain Relief:** At connector and frame entry

### Signal Wires

- **100-300mm:** Typical length
- **Routing:** Away from power wires
- **Service Loop:** 20mm extra for maintenance

## Common Wiring Issues

| Issue              | Cause                    | Solution                    |
|-------------------|--------------------------|------------------------------|
| Voltage drop      | Undersized wire          | Upgrade gauge                |
| EMI interference  | Poor routing             | Separate signal/power wires  |
| Connector failure | Poor solder joint       | Reflow with proper technique |
| Wire break        | Vibration, sharp bends   | Add strain relief, use silicone|
| Short circuit     | Exposed wire             | Use heat shrink everywhere   |
| Intermittent      | Cold solder joint       | Resolder with flux           |

## Sources

- components101.com - Wire gauge specifications
- renewspark.com - Soldering techniques
- beyondsky.xyz - Drone wiring guides
- mouser.com - Connector specifications
- adafruit.com - Soldering tutorials
- sparkfun.com - Wire and connector guides

---

## EFT E616P Build Connection

> **Our build wiring specifications:**

### Wire Gauge Selection for Our Build
| Circuit | Current | Gauge | Wire Type |
|---|---|---|---|
| Battery → Busbar | 136A max | 8 AWG | Silicone |
| Busbar → ESC branches | 25A each | 14 AWG | Silicone |
| 12V BEC output | 7.5A | 14 AWG | Silicone |
| 5V BEC output | 2A | 20 AWG | Silicone |
| DShot signal wires | <1A | 26 AWG | Silicone |
| UART/I2C/CAN | <100mA | 24–26 AWG | Shielded twisted pair |
| Flow sensor | <15mA | 26 AWG | Standard |

### Connector Selection for Our Build
| Connection | Connector | Rating | Wire Gauge |
|---|---|---|---|
| Battery → Busbar | AS150U | 150A | 8 AWG |
| Busbar → ESCs | XT90 | 90A | 10 AWG |
| GPS modules | JST-GH 6-pin | Signal | 26 AWG |
| Telemetry | JST-GH 6-pin | Signal | 26 AWG |
| RC Receiver | JST-GH 4-pin | Signal | 26 AWG |
| CAN Bus | JST-GH 4-pin | Signal | 24 AWG STP |
| Motor phases | Bullet 3.5mm | 60A | 12 AWG |

### Wire Color Coding
| Color | Function |
|---|---|
| Red | VCC (positive power) |
| Black | GND (ground) |
| White | Signal (UART TX, I2C SDA) |
| Green | Signal (UART RX, I2C SCL) |
| Yellow | DShot signal, PWM |
| Blue | Telemetry, CAN |

---

## Common Mistakes & Pitfalls

| Mistake | Consequence | Prevention |
|---|---|---|
| Wrong wire gauge | Overheating, voltage drop | Calculate current × safety margin |
| Poor solder joints | Intermittent connection, fire risk | Use flux, proper temperature, inspect joints |
| No heat shrink on joints | Short circuits, exposed conductors | Heat shrink ALL exposed joints |
| Wires near props | Cut wires, crash | Route wires away from prop arc |
| Signal wires near power | EMI interference | Separate signal from power wiring |
| Wrong connector polarity | Reverse polarity damage | Always verify + and - before connecting |

---

## Quick Troubleshooting

| Problem | Likely Wiring Issue | Fix |
|---|---|---|
| Intermittent power | Loose connector, cold solder joint | Resolder, check connector fit |
| EMI on telemetry | Signal wire near power wire | Separate signal from power, use shielded cable |
| Voltage drop at ESC | Undersized wire | Upgrade to thicker gauge |
| Connector melting | Poor connection, overcurrent | Resolder with proper technique |
| No signal on UART | TX/RX swapped | Cross TX/RX between devices |

---

## Datasheet & Product Links

| Resource | URL |
|---|---|
| Silicone wire suppliers | https://www.amazon.com/silicone+wire+drone |
| AS150 connectors | https://www.amass.net |
| XT90 connectors | https://www.amass.net |
| JST-GH connectors | https://www.molex.com |
| Soldering guide | https://oscarliang.com/soldering-guide/ |

---

*Enrichment added: May 29, 2026 | Template v1.0*
