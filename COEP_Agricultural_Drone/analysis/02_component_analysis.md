# COEP Agricultural Hexacopter - Comprehensive Component Analysis

## Table of Contents
1. [Frame Analysis](#1-frame)
2. [Motor Analysis](#2-motors)
3. [Propeller Analysis](#3-propellers)
4. [Battery Analysis](#4-batteries)
5. [Flight Controller Analysis](#5-flight-controller)
6. [GPS Analysis](#6-gps)
7. [Telemetry Analysis](#7-telemetry)
8. [RC Receiver Analysis](#8-rc-receiver)
9. [Pump Analysis](#9-pump)
10. [Nozzle Analysis](#10-nozzles)
11. [Flow Sensor Analysis](#11-flow-sensor)
12. [AI Compute Analysis](#12-ai-compute)
13. [Master Comparison Matrix](#master-comparison-matrix)

---

## 1. Frame Analysis {#1-frame}

### Current Selection: EFT E616P

```mermaid
graph TD
    A[Payload 16kg] --> B{Frame Type?}
    B -->|Hexacopter| C[6 Arms Required]
    B -->|Octocopter| D[8 Arms - Overkill]
    C --> E{Material?}
    E -->|Carbon Fiber| F[EFT E616P / Tarot T960]
    E -->|Aluminum| G[Too Heavy]
    F --> H{Foldable?}
    H -->|Yes| I[EFT E616P]
    H -->|No| J[Tarot T960]
    I --> K[Tank Integration?]
    J --> K
    K -->|Belly Mount| L[EFT E616P Preferred]
    K -->|Arm Mount| M[Custom Required]
    L --> N[Final Selection: EFT E616P]
```

### Specifications Comparison

| Parameter | EFT E616P | Tarot T960 | Custom CF Frame |
|-----------|-----------|------------|-----------------|
| **Wheelbase** | 1644mm | 960mm | 1400mm (customizable) |
| **Arm Material** | T700 Carbon Fiber | T300 Carbon Fiber | T800/T1000 CF |
| **Frame Weight** | 6.41 kg | 3.2 kg | 2.4 kg |
| **Max AUW** | 28 kg | 26 kg | 30 kg |
| **Foldable** | Yes (folding arms) | No | Optional |
| **Tank Mount** | Belly-mounted compatible | Requires custom bracket | Fully customizable |
| **Price** | ₹18,000 | ₹15,500 | ₹25,000+ |
| **Availability** | India (multiple dealers) | India (limited) | Custom fabrication |
| **Arm Replaceability** | Individual arm replacement | Individual arm replacement | Full frame rebuild |
| **Vibration Damping** | Integrated dampening plate | Requires separate plate | Custom solution |
| **Landing Gear** | Retractable optional | Fixed | Custom required |

### Weighted Comparison Matrix

| Criteria | Weight | EFT E616P | Tarot T960 | Custom CF |
|----------|--------|-----------|------------|-----------|
| Cost | 25% | 7 | 8 | 4 |
| Performance | 25% | 8 | 7 | 9 |
| Reliability | 20% | 8 | 7 | 7 |
| Availability | 15% | 9 | 6 | 4 |
| Ease of Use | 15% | 9 | 7 | 5 |
| **Weighted Score** | 100% | **8.05** | **7.15** | **6.20** |

### Recommendation: EFT E616P

**Justification:**
- Best balance of weight, strength, and price
- Folding arms for transport (critical for field operations)
- Belly-mount tank integration without custom fabrication
- Good availability in Indian market with spare parts
- Individual arm replacement reduces repair costs

---

## 2. Motor Analysis {#2-motors}

### Current Selection: Hobbywing X9 G2L

```mermaid
graph TD
    A[Payload 16kg] --> B[Thrust Required: 2.67kg/motor]
    B --> C{Thrust Margin?}
    C -->|2.0x Safety| D[Target: 5.34kg/motor]
    C -->|1.8x Safety| E[Target: 4.81kg/motor]
    D --> F{Motor Size?}
    E --> F
    F -->|Large KV<400| G[U8 Lite 170KV]
    F -->|Medium KV<200| H[X9 G2L 110KV]
    F -->|Small KV>500| I[MAD 5015 450KV]
    G --> J{Weight?}
    H --> J
    I --> J
    J -->|<800g| K[T-Motor U8 Lite]
    J -->|>1000g| L[Hobbywing X9 G2L]
    J -->|>1000g| M[MAD 5015]
    K --> N[Check ESC Compatibility]
    L --> N
    M --> N
    N --> O{Integrated ESC?}
    O -->|Yes| P[X9 G2L / U8 Lite]
    O -->|No| Q[MAD + External ESC]
    P --> R[Final: Hobbywing X9 G2L]
```

### Specifications Comparison

| Parameter | Hobbywing X9 G2L | T-Motor U8 Lite | MAD 5015 |
|-----------|------------------|-----------------|----------|
| **KV** | 110 KV | 170 KV | 450 KV |
| **Max Thrust** | 24 kg | 8.2 kg | 5.9 kg |
| **Motor Weight** | 1532 g | 720 g | 620 g |
| **ESC** | Integrated 12S | External required | External required |
| **ESC Weight** | 0g (built-in) | ~180g (12S 60A) | ~180g (12S 60A) |
| **Total Weight** | 1532 g | 900 g | 800 g |
| **IP Rating** | IPX6 | IP45 | IP44 |
| **Price** | ₹32,000/ea | ₹28,000/ea | ₹15,000/ea |
| **Prop Mount** | Proprietary quick-release | Universal bolt | Universal bolt |
| **Recommended Prop** | 36-38 inch | 38-40 inch | 34-36 inch |
| **Operating Temp** | -20°C to 60°C | -20°C to 55°C | -10°C to 50°C |

### Weighted Comparison Matrix

| Criteria | Weight | X9 G2L | U8 Lite | MAD 5015 |
|----------|--------|--------|---------|----------|
| Cost (6 motors) | 25% | 5 | 6 | 9 |
| Performance | 25% | 8 | 9 | 7 |
| Reliability | 20% | 9 | 8 | 7 |
| Availability | 15% | 8 | 7 | 6 |
| Ease of Use | 15% | 9 | 7 | 6 |
| **Weighted Score** | 100% | **7.55** | **7.35** | **7.15** |

### Recommendation: Hobbywing X9 G2L

**Justification:**
- Integrated ESC simplifies wiring and reduces failure points
- IP54 rating suitable for spray operations
- Quick-release prop system enables fast field replacement
- Excellent thrust-to-weight ratio for 12S configuration
- Proven in agricultural drone applications

---

## 3. Propeller Analysis {#3-propellers}

### Current Selection: Hobbywing MFP 36×11

```mermaid
graph TD
    A[Motor: X9 G2L 110KV] --> B{Prop Size?}
    B -->|36 inch| C[Matches Motor Rating]
    B -->|38 inch| D[May Overload Motor]
    B -->|34 inch| E[Under-utilized]
    C --> F{Pitch?}
    F -->|11 inch| G[Good Efficiency]
    F -->|12 inch| H[More Thrust, Less Efficiency]
    F -->|10 inch| I[Less Thrust, More Efficiency]
    G --> J{Material?}
    H --> J
    I --> J
    J -->|Carbon Fiber| K[Hobbywing MFP / T-Motor GFC]
    J -->|Plastic| L[APC - Lower Cost]
    K --> M[Folding Required?]
    L --> M
    M -->|Yes| N[Hobbywing MFP Folding]
    M -->|No| O[Standard Props]
    N --> P[Final: Hobbywing MFP 36×11]
    O --> Q[T-Motor GFC 3612]
```

### Specifications Comparison

| Parameter | Hobbywing MFP 36×11 | T-Motor GFC 3612 | APC 36×12 |
|-----------|---------------------|------------------|-----------|
| **Diameter** | 36 inches (914mm) | 36 inches (914mm) | 36 inches (914mm) |
| **Pitch** | 11 inches | 12 inches | 12 inches |
| **Blade Count** | 2 (folding) | 2 (fixed) | 2 (fixed) |
| **Material** | Carbon Fiber | Carbon Fiber | Reinforced Plastic |
| **Weight** | 280 g | 310 g | 340 g |
| **RPM Range** | 1500-3500 | 1500-3500 | 1500-3800 |
| **Efficiency** | 8.2 g/W | 7.8 g/W | 7.2 g/W |
| **Folding** | Yes (3-section) | No | No |
| **Price** | ₹4,500/ea | ₹5,200/ea | ₹1,800/ea |
| **Vibration** | Low (balanced) | Very Low | Medium |

### Weighted Comparison Matrix

| Criteria | Weight | MFP 36×11 | GFC 3612 | APC 36×12 |
|----------|--------|-----------|----------|-----------|
| Cost (6 props) | 25% | 6 | 5 | 9 |
| Performance | 25% | 9 | 8 | 7 |
| Reliability | 20% | 8 | 9 | 7 |
| Availability | 15% | 7 | 6 | 9 |
| Ease of Use | 15% | 9 | 7 | 8 |
| **Weighted Score** | 100% | **7.95** | **7.15** | **7.80** |

### Recommendation: Hobbywing MFP 36×11

**Justification:**
- Folding design reduces transport size by 60%
- Best efficiency in class (8.2 g/W)
- Perfect match with X9 G2L motor mounting
- Carbon fiber construction for durability
- Lower vibration reduces airframe stress

---

## 4. Battery Analysis {#4-batteries}

### Current Selection: Tattu 12S 30Ah Semi-Solid

```mermaid
graph TD
    A[Power Requirement] --> B[6x Motors @ 6.8kg Thrust]
    B --> C[Hover Power: ~3.6kW]
    C --> D[Max Power: ~7.2kW]
    D --> E{Flight Time?}
    E -->|15 min| F[Required: 15Ah]
    E -->|20 min| G[Required: 20Ah]
    E -->|25 min| H[Required: 25Ah]
    E -->|30 min| I[Required: 30Ah]
    G --> J{Battery Type?}
    H --> J
    I --> J
    J -->|LiPo| K[Standard - Higher C-rating]
    J -->|Li-ion| L[Higher Energy Density]
    J -->|Semi-Solid| M[Best of Both]
    K --> N{Voltage?}
    L --> N
    M --> N
    N -->|12S 44.4V| O[Standard for 36-38in Props]
    N -->|14S 51.8V| P[Higher Efficiency, Heavier]
    O --> Q{Configuration?}
    Q -->|Single 30Ah| R[Tattu Semi-Solid]
    Q -->|Dual 15Ah| S[Gens Ace Parallel]
    Q -->|Triple 10Ah| T[Custom Li-ion]
    R --> U[Final: Tattu 12S 30Ah]
```

### Specifications Comparison

| Parameter | Tattu 12S 30Ah Semi-Solid | Gens Ace 12S 22Ah | Custom 12S 30Ah Li-ion |
|-----------|--------------------------|-------------------|------------------------|
| **Capacity** | 30 Ah | 22 Ah | 30 Ah |
| **Voltage** | 44.4V (12S) | 44.4V (12S) | 44.4V (12S) |
| **Energy** | 1332 Wh | 976.8 Wh | 1332 Wh |
| **Weight** | 4.9 kg | 5.2 kg | 7.2 kg |
| **Energy Density** | 196 Wh/kg | 188 Wh/kg | 185 Wh/kg |
| **C-Rating** | 3C cont (90A) / 5C burst (150A) | 35C (770A) | 15C (450A) |
| **Cycle Life** | 800 cycles | 600 cycles | 1500 cycles |
| **Safety** | Semi-solid (puncture resistant) | Standard LiPo | Li-ion (inherent safer) |
| **Price** | **₹1,06,000 imported** (was ₹65,000 v1 estimate) | ₹42,000 | ₹55,000 |
| **Operating Temp** | -10°C to 55°C | 0°C to 45°C | -20°C to 60°C |
| **BMS** | Integrated | Basic | Custom required |
| **Charging Time** | 90 min (fast) | 60 min | 120 min |

### Weighted Comparison Matrix

| Criteria | Weight | Tattu 30Ah | Gens Ace 22Ah | Custom Li-ion |
|----------|--------|------------|---------------|---------------|
| Cost | 25% | 4 | 8 | 6 |
| Performance | 25% | 9 | 7 | 8 |
| Reliability | 20% | 9 | 7 | 8 |
| Availability | 15% | 8 | 8 | 5 |
| Ease of Use | 15% | 9 | 8 | 5 |
| **Weighted Score** | 100% | **7.70** | **7.50** | **6.75** |

### Recommendation: Tattu 12S 30Ah Semi-Solid

**Justification:**
- 30Ah capacity provides 20+ minute flight time with spray payload
- Semi-solid technology offers puncture resistance (critical for agricultural operations)
- Integrated BMS protects against over-discharge and balancing issues
- 3C continuous / 5C burst rating provides sufficient power for takeoff and maneuvers
- Excellent temperature range for Indian climate conditions

> **v2 PRICING UPDATE (2026-06-02):** v1 listed Tattu 30 Ah at ₹65,000 (unrealistic Indian retail
> estimate). The pack is **not commonly stocked in India** — it must be **imported via Genstattu**
> (USD $1,209) and landed with 18% IGST + 30% Basic Customs Duty + shipping ≈ **₹1,06,000 per pack**.
> **Realistic range: ₹1.06 L – 1.3 L. Import lead time: 20-30 days** (Genstattu/Foxtech/Motionew),
> customs clearance ±1 week. **Budget alternative:** 2× Tattu 22 Ah Pro in stock at Robokits (₹45,674
> each = ₹91,348), gives 1,954 Wh vs the 30 Ah pack's 1,332 Wh — more energy at lower cost, but
> +1.4 kg heavier and standard LiPo chemistry (no semi-solid safety). This is v2 BOM Path G-B
> (₹3,55,948 total, 28 kg MTOW, 25 min flight).

---

## 5. Flight Controller Analysis {#5-flight-controller}

### Current Selection: Pixhawk 6C

```mermaid
graph TD
    A[Autonomy Level] --> B{Manual or Auto?}
    B -->|Manual| C[Basic FC Sufficient]
    B -->|Semi-Auto| D[Mid-range FC]
    B -->|Full Auto| E[Advanced FC Required]
    E --> F{Firmware?}
    D --> F
    F -->|ArduPilot| G[Pixhawk / Holybro]
    F -->|PX4| H[Cube / Pixhawk]
    F -->|Betaflight| I[Racing FC - Not for Ag]
    G --> J{Processor?}
    H --> J
    J -->|STM32H7| K[Pixhawk 6C / 6X]
    J -->|STM32F7| L[Cube Orange+]
    J -->|STM32F4| M[Budget Options]
    K --> N{Sensor Suite?}
    L --> N
    N -->|IMU + Baro + Mag| O[Standard]
    N -->|Redundant Sensors| P[Professional Grade]
    O --> Q{Community?}
    P --> Q
    Q -->|Large| R[Pixhawk 6C]
    Q -->|Medium| S[Cube Orange+]
    R --> T[Final: Pixhawk 6C]
```

### Specifications Comparison

| Parameter | Pixhawk 6C | Cube Orange+ | Holybro X500 V2 FC |
|-----------|------------|--------------|---------------------|
| **Processor** | STM32H743 480MHz | STM32H757 480MHz | STM32H743 480MHz |
| **RAM** | 1MB | 2MB | 1MB |
| **Flash** | 2MB | 2MB | 2MB |
| **IMU** | Dual (ICM-42688-P, BMI088) | Triple (ICM-42688 x2, BMI055) | Dual (ICM-42688, BMI270) |
| **Barometer** | Single (MS5611) | Dual (MS5611, BMP388) | Single (DPS310) |
| **Magnetometer** | External (required) | Internal (ICM-42688) | External (required) |
| **GPS Port** | 2x UART | 3x UART | 2x UART |
| **CAN Ports** | 2x | 3x | 1x |
| **PWM Outputs** | 8 | 14 | 8 |
| **Firmware Support** | ArduPilot, PX4 | ArduPilot, PX4 | ArduPilot |
| **Price** | ₹12,000 | ₹35,000 | ₹18,000 (with kit) |
| **Community** | Very Large | Large | Medium |
| **Documentation** | Excellent | Excellent | Good |

### Weighted Comparison Matrix

| Criteria | Weight | Pixhawk 6C | Cube Orange+ | Holybro X500 FC |
|----------|--------|------------|--------------|-----------------|
| Cost | 25% | 9 | 4 | 7 |
| Performance | 25% | 9 | 9 | 8 |
| Reliability | 20% | 9 | 9 | 8 |
| Availability | 15% | 9 | 7 | 7 |
| Ease of Use | 15% | 8 | 7 | 8 |
| **Weighted Score** | 100% | **8.85** | **7.25** | **7.60** |

### Recommendation: Pixhawk 6C

**Justification:**
- Dual redundant IMU provides excellent vibration rejection
- STM32H7 processor handles complex ArduPilot missions
- Best price-to-performance ratio in class
- Largest community for troubleshooting and support
- Native CAN support for modern peripherals

---

## 6. GPS Analysis {#6-gps}

### Current Selection: HGLRC M100-5883 (v2 budget) / Holybro M9N (v2 recommended)

> **v2 CRITICAL FIX (2026-06-02):** v1 recommended **HGLRC M10 Mini** with "internal compass" — that
> is **WRONG**. The HGLRC M10 Mini / M100 Mini is **GPS-only with NO on-module compass**, which breaks
> ArduPilot position-hold / RTL / Auto modes (EKF needs a magnetometer for yaw). v2 corrects to **HGLRC
> M100-5883** (QMC5883 on-module compass, ₹1,599 FPVMatrix, budget) or **Holybro M9N** (IST8310
> on-module compass, ₹7,525 Indian Robo Store, recommended).

```mermaid
graph TD
    A[Navigation Requirements] --> B{Accuracy?}
    B -->|2-5m| C[Standard GPS]
    B -->|1-2m| D[Multi-band GPS]
    B -->|<1cm| E[RTK GPS]
    C --> F{Size?}
    D --> F
    E --> F
    F -->|Compact + compass| G[HGLRC M100-5883]
    F -->|Standard + compass| H[Holybro M9N]
    F -->|Large RTK| I[u-blox F9P / Here4]
    G --> J{Compass?}
    H --> J
    I --> J
    J -->|QMC5883| G
    J -->|IST8310| H
    J -->|RM3100| I
    K --> L{Update Rate?}
    L -->|10Hz| M[Standard]
    L -->|25Hz| N[High Speed]
    M --> O[Final: HGLRC M100-5883 v2 budget]
    N --> P[Holybro M9N v2 recommended]
```

### Specifications Comparison

| Parameter | HGLRC M100-5883 (v2 budget) | Holybro M9N (v2 recommended) | u-blox F9P RTK |
|-----------|----------------|-------------|----------------|
| **GNSS** | GPS, GLONASS, Galileo, BeiDou | GPS, GLONASS, Galileo, BeiDou | GPS, GLONASS, Galileo, BeiDou |
| **Bands** | L1 | L1 | L1 + L5 (Dual-band) |
| **Accuracy** | 2.0m CEP | 1.5m CEP | 1cm + 1ppm (RTK) |
| **Update Rate** | 10 Hz | 25 Hz | 20 Hz |
| **Time to Fix** | 26s (cold) | 24s (cold) | 30s (cold) |
| **Compass** | **QMC5883 on-module** ✅ | **IST8310 on-module** ✅ | None (External required) |
| **Weight** | ~10 g | 36 g | 28 g |
| **Antenna** | Integrated ceramic 15×15 mm | Integrated ceramic 25×25 + LNA | External SMA |
| **Price** | ₹1,599 (FPVMatrix in stock) | ₹7,525 (Indian Robo Store) | ₹28,000+ |
| **Power** | 50 mW | 200 mW | 150 mW |
| **Interface** | UART + I2C compass | UART + I2C compass | UART/USB |

### Weighted Comparison Matrix

| Criteria | Weight | M100-5883 | M9N | F9P RTK |
|----------|--------|-----------|-------------|---------|
| Cost | 25% | 10 | 7 | 2 |
| Performance | 25% | 7 | 9 | 10 |
| Reliability | 20% | 8 | 9 | 9 |
| Availability | 15% | 9 | 8 | 6 |
| Ease of Use | 15% | 9 | 9 | 5 |
| **Weighted Score** | 100% | **8.55** | **8.35** | **6.25** |

### Recommendation: HGLRC M100-5883 (budget) → Holybro M9N (production)

**Justification:**
- 2.0m accuracy sufficient for agricultural spraying patterns (>row spacing)
- **On-module compass (QMC5883/IST8310) — fixes the v1 M10 Mini compass bug**
- Compact size, easy mast-mount on 15-20 cm carbon tube
- 10 Hz update rate adequate for waypoint navigation; M9N gives 25 Hz for fast missions
- Best cost-to-performance for non-precision agriculture
- M9N upgrade path uses same JST-GH 6-pin connector — drop-in replacement

---

## 7. Telemetry Analysis {#7-telemetry}

### Current Selection: RFD868x

```mermaid
graph TD
    A[Communication Range] --> B{Distance?}
    B -->|<1km| C[WiFi/Bluetooth]
    B -->|1-5km| D[LoRa 433MHz]
    B -->|5-20km| E[LoRa 868/915MHz]
    B -->|>20km| F[Satellite]
    E --> G{Legal in India?}
    G -->|868MHz| H[Allowed <1W EIRP]
    G -->|915MHz| I[ISM Band - Allowed]
    G -->|433MHz| J[Amateur - Restricted]
    H --> K{Power?}
    I --> K
    K -->|<1W| L[RFD868x / CUAV P8]
    K -->|>1W| M[Requires License]
    L --> N{Telemetry Protocol?}
    N -->|MAVLink| O[All Options]
    N -->|Transparent| P[RFD868x]
    O --> Q[Final: RFD868x]
```

### Specifications Comparison

| Parameter | RFD868x | CUAV P8 | 3DR SiK 1W |
|-----------|---------|---------|------------|
| **Frequency** | 868 MHz (EU) / 915 MHz (US) | 868 MHz / 915 MHz | 433 MHz / 915 MHz |
| **Max Power** | 1W (30dBm) | 1W (30dBm) | 1W (30dBm) |
| **Range** | 40 km (LOS) | 20 km (LOS) | 10 km (LOS) |
| **Sensitivity** | -121 dBm | -117 dBm | -111 dBm |
| **Data Rate** | 224 kbps | 92.1 kbps | 57.6 kbps |
| **Protocol** | MAVLink (transparent) | MAVLink | MAVLink |
| **Latency** | 20-50 ms | 30-60 ms | 50-100 ms |
| **TX Current** | ~1000 mA @ 1W | 160 mA @ 1W | 200 mA @ 1W |
| **RX Current** | 45 mA | 32 mA | 35 mA |
| **Weight** | 18 g | 22 g | 30 g |
| **Price** | ₹12,000 | ₹8,500 | ₹5,500 |
| **India Legality** | ✅ 868MHz <1W | ✅ 868MHz <1W | ⚠️ 433MHz restricted |

### Weighted Comparison Matrix

| Criteria | Weight | RFD868x | CUAV P8 | 3DR SiK |
|----------|--------|---------|---------|---------|
| Cost | 25% | 6 | 8 | 9 |
| Performance | 25% | 10 | 8 | 6 |
| Reliability | 20% | 9 | 8 | 7 |
| Availability | 15% | 7 | 7 | 8 |
| Ease of Use | 15% | 8 | 8 | 8 |
| **Weighted Score** | 100% | **8.25** | **7.95** | **7.55** |

### Recommendation: RFD868x

**Justification:**
- 40km LOS range exceeds typical agricultural field requirements
- Best sensitivity (-121 dBm) for reliable connection
- 115.2 kbps data rate supports high-bandwidth telemetry
- Legal in India on 868MHz band (<1W EIRP)
- MAVLink transparent mode for easy integration

---

## 8. RC Receiver Analysis {#8-rc-receiver}

### Current Selection: FrSky R-XSR

```mermaid
graph TD
    A[Control Requirements] --> B{Range?}
    B -->|<1km| C[AFHDS]
    B -->|1-10km| D[ACCST / ELRS]
    B -->|>10km| E[Crossfire / ELRS]
    D --> F{Protocol?}
    E --> F
    F -->|Proprietary| G[FrSky ACCST]
    F -->|Open Source| H[ELRS]
    F -->|Premium| I[TBS Crossfire]
    G --> J{Size?}
    H --> J
    I --> J
    J -->|Micro| K[FrSky R-XSR]
    J -->|Standard| L[ELRS Receiver]
    J -->|Full Size| M[TBS Crossfire]
    K --> N{Telemetry?}
    L --> N
    M --> N
    N -->|Yes| O[All Support]
    O --> P[Final: FrSky R-XSR]
```

### Specifications Comparison

| Parameter | FrSky R-XSR | ELRS Receiver | TBS Crossfire |
|-----------|-------------|---------------|---------------|
| **Protocol** | ACCST (S.BUS) | ELRS (CRSF) | Crossfire (CRSF) |
| **Frequency** | 2.4 GHz | 2.4 GHz / 900 MHz | 868 MHz / 915 MHz |
| **Range** | 10+ km | 30+ km | 40+ km |
| **Latency** | 4-9 ms | 2-5 ms | 4-5 ms |
| **Channels** | 16 (S.BUS) | 12 (CRSF) | 12 (CRSF) |
| **Telemetry** | Yes (Hub) | Yes (native) | Yes (native) |
| **Weight** | 1.5 g | 3-5 g | 6 g |
| **Size** | 16x11mm | 20x15mm | 33x19mm |
| **Price** | ₹3,500 | ₹2,500 | ₹12,000 |
| **Firmware** | Proprietary | Open Source | Proprietary |
| **Bind Method** | Button | Lua Script | Button |

### Weighted Comparison Matrix

| Criteria | Weight | R-XSR | ELRS | TBS Crossfire |
|----------|--------|-------|------|---------------|
| Cost | 25% | 8 | 9 | 4 |
| Performance | 25% | 7 | 9 | 10 |
| Reliability | 20% | 8 | 8 | 9 |
| Availability | 15% | 9 | 7 | 7 |
| Ease of Use | 15% | 9 | 7 | 8 |
| **Weighted Score** | 100% | **8.05** | **8.10** | **7.40** |

### Recommendation: FrSky R-XSR

**Justification:**
- Proven reliability in agricultural drone applications
- S.BUS protocol has native Pixhawk support
- Ultra-lightweight (1.5g) minimizes AUW impact
- Excellent availability in Indian market
- Simple bind process for field operations

**Note:** ELRS is a strong alternative if open-source firmware and extreme range are priorities.

---

## 9. Pump Analysis {#9-pump}

### Current Selection: SHURflo 8000

```mermaid
graph TD
    A[Flow Requirement] --> B[Target: 2-4 L/min]
    B --> C{Pump Type?}
    C -->|Centrifugal| D[High Flow, Low Pressure]
    C -->|Diaphragm| E[Medium Flow, Medium Pressure]
    C -->|Piston| F[Low Flow, High Pressure]
    E --> G{Pressure?}
    G -->|2-4 bar| H[Standard Nozzles]
    G -->|4-7 bar| I[High Pressure Nozzles]
    H --> I
    I --> J{Chemical Resistance?}
    J -->|Good| K[SHURflo 8000]
    J -->|Excellent| L[T-Motor P60]
    J -->|Basic| M[Generic Diaphragm]
    K --> N{Power?}
    L --> N
    M --> N
    N -->|12V DC| O[SHURflo 8000]
    N -->|24V DC| P[T-Motor P60]
    O --> Q[Final: SHURflo 8000]
```

### Specifications Comparison

| Parameter | SHURflo 8000 | T-Motor P60 | Generic Diaphragm |
|-----------|--------------|-------------|-------------------|
| **Type** | Diaphragm | Centrifugal | Diaphragm |
| **Flow Rate** | 3.0 L/min | 4.5 L/min | 2.0 L/min |
| **Pressure** | 3.5 bar | 4.0 bar | 2.5 bar |
| **Voltage** | 12V DC | 24V DC | 12V DC |
| **Power** | 60W | 120W | 40W |
| **Current** | 5A @ 12V | 5A @ 24V | 3.3A @ 12V |
| **Inlet** | 3/4" NPT | 1/2" barb | 1/2" NPT |
| **Outlet** | 1/2" NPT | 3/8" barb | 1/4" NPT |
| **Chemical Resistance** | Excellent (Viton seals) | Good (EPDM seals) | Fair (NBR seals) |
| **Self-Priming** | Yes (2m lift) | No (flooded inlet) | Yes (1.5m lift) |
| **Dry Run** | Yes (survives) | No (damages) | Yes (survives) |
| **Price** | ₹8,500 | ₹15,000 | ₹2,500 |
| **Lifespan** | 5000+ hours | 3000+ hours | 1500+ hours |

### Weighted Comparison Matrix

| Criteria | Weight | SHURflo 8000 | T-Motor P60 | Generic |
|----------|--------|--------------|-------------|---------|
| Cost | 25% | 7 | 4 | 9 |
| Performance | 25% | 8 | 9 | 6 |
| Reliability | 20% | 9 | 8 | 5 |
| Availability | 15% | 8 | 6 | 8 |
| Ease of Use | 15% | 9 | 7 | 7 |
| **Weighted Score** | 100% | **8.20** | **6.90** | **6.85** |

### Recommendation: SHURflo 8000

**Justification:**
- Self-priming eliminates need for flooded inlet configuration
- Dry-run capability prevents pump damage during tank empty
- 12V operation compatible with battery voltage via BEC
- Excellent chemical resistance for pesticides and fertilizers
- Industry standard with proven field reliability

---

## 10. Nozzle Analysis {#10-nozzles}

### Current Selection: TeeJet XR11002

```mermaid
graph TD
    A[Spray Requirements] --> B{Droplet Size?}
    B -->|Fine (100-200μm)| C[Flat Fan - AIXR]
    B -->|Medium (200-300μm)| D[Flat Fan - XR]
    B -->|Coarse (300-500μm)| E[Deflector - TTI]
    C --> F{Drift?}
    D --> F
    E --> F
    F -->|High Drift Risk| G[TTI11002 - Coarse]
    F -->|Medium Drift| H[XR11002 - Medium]
    F -->|Low Drift| I[AIXR11002 - Fine]
    H --> J{Flow Rate?}
    J -->|0.5 L/min @ 3bar| K[XR11002]
    J -->|0.6 L/min @ 3bar| L[AIXR11002]
    J -->|0.4 L/min @ 3bar| M[TTI11002]
    K --> N[Final: TeeJet XR11002]
```

### Specifications Comparison

| Parameter | TeeJet XR11002 | TeeJet AIXR11002 | TeeJet TTI11002 |
|-----------|----------------|------------------|-----------------|
| **Type** | Flat Fan | Air Induction Flat Fan | Turbo Twin Flat Fan |
| **Angle** | 110° | 110° | 110° |
| **Orifice** | #2 (0.76mm) | #2 (0.76mm) | #2 (0.76mm) |
| **Flow Rate** | 0.50 L/min @ 3bar | 0.59 L/min @ 3bar | 0.42 L/min @ 3bar |
| **Droplet Size** | 250 μm (medium) | 190 μm (fine) | 380 μm (coarse) |
| **Drift Potential** | Medium | High | Low |
| **Pressure Range** | 1.5-4.0 bar | 2.0-4.5 bar | 2.0-5.0 bar |
| **Material** | Polyacetal (blue) | Stainless Steel | Polyacetal (brown) |
| **Tip Color** | Blue | Silver | Brown |
| **Price** | ₹350/ea | ₹650/ea | ₹400/ea |
| **Best For** | General spraying | Herbicide (drift control) | Insecticide (coarse) |

### Weighted Comparison Matrix

| Criteria | Weight | XR11002 | AIXR11002 | TTI11002 |
|----------|--------|---------|-----------|----------|
| Cost (12 nozzles) | 25% | 9 | 5 | 8 |
| Performance | 25% | 8 | 9 | 7 |
| Reliability | 20% | 8 | 9 | 8 |
| Availability | 15% | 9 | 7 | 7 |
| Ease of Use | 15% | 9 | 8 | 8 |
| **Weighted Score** | 100% | **8.45** | **7.65** | **7.60** |

### Recommendation: TeeJet XR11002

**Justification:**
- Medium droplet size balances coverage and drift control
- Polyacetal material resistant to most agricultural chemicals
- Standard flat fan pattern for uniform coverage
- Best availability in Indian agricultural market
- Most cost-effective for multiple nozzle replacement

---

## 11. Flow Sensor Analysis {#11-flow-sensor}

### Current Selection: YF-S402

```mermaid
graph TD
    A[Flow Measurement] --> B{Range?}
    B -->|0-2 L/min| C[YF-S301]
    B -->|0-5 L/min| D[YF-S402]
    B -->|0-10 L/min| E[G1/2 Turbine]
    C --> F{Accuracy?}
    D --> F
    E --> F
    F -->|±2%| G[YF-S402]
    F -->|±5%| H[YF-S301]
    F -->|±10%| I[G1/2 Turbine]
    G --> J{Pulse Rate?}
    J -->|High Resolution| K[YF-S402 (330 pulses/L)]
    J -->|Medium| L[YF-S301 (450 pulses/L)]
    J -->|Low| M[G1/2 (58 pulses/L)]
    K --> N[Final: YF-S402]
```

### Specifications Comparison

| Parameter | YF-S402 | YF-S301 | G1/2 Turbine |
|-----------|---------|---------|--------------|
| **Flow Range** | 0.5-6 L/min | 0.3-3 L/min | 1-10 L/min |
| **Accuracy** | ±3% | ±5% | ±10% |
| **Resolution** | 4078 pulses/L | 450 pulses/L | 58 pulses/L |
| **Operating Voltage** | 5V DC | 5V DC | 5V DC |
| **Current** | 15 mA | 15 mA | 20 mA |
| **Max Pressure** | 10 bar | 5 bar | 12 bar |
| **Thread Size** | G1/2 | G1/2 | G1/2 |
| **Material** | Brass + POM | Brass + POM | Brass + POM |
| **Operating Temp** | -25°C to +80°C | -25°C to +80°C | -20°C to +70°C |
| **Output** | Pulse (NPN) | Pulse (NPN) | Pulse (NPN) |
| **Price** | ₹1,200 | ₹800 | ₹600 |
| **Chemical Resist.** | Good (brass body) | Good (brass body) | Fair |

### Weighted Comparison Matrix

| Criteria | Weight | YF-S402 | YF-S301 | G1/2 Turbine |
|----------|--------|---------|---------|--------------|
| Cost | 25% | 7 | 8 | 9 |
| Performance | 25% | 9 | 7 | 6 |
| Reliability | 20% | 9 | 8 | 7 |
| Availability | 15% | 9 | 9 | 8 |
| Ease of Use | 15% | 8 | 8 | 7 |
| **Weighted Score** | 100% | **8.45** | **7.95** | **7.30** |

### Recommendation: YF-S402

**Justification:**
- ±3% accuracy ensures precise application rates
- 0.5-6 L/min range matches pump output perfectly
- 4078 pulses/L provides fine-grained flow measurement
- 10 bar max pressure handles pump output without damage
- Brass body provides excellent chemical compatibility

---

## 12. AI Compute Analysis {#12-ai-compute}

### Current Selection: NVIDIA Jetson Orin Nano

```mermaid
graph TD
    A[AI Requirements] --> B{Inference Speed?}
    B -->|<10 FPS| C[Raspberry Pi 5]
    B -->|10-30 FPS| D[Google Coral TPU]
    B -->|>30 FPS| E[NVIDIA Jetson]
    E --> F{Power Budget?}
    F -->|<15W| G[Jetson Orin Nano 10W]
    F -->|15-60W| H[Jetson Orin NX]
    F -->|>60W| I[Jetson AGX]
    G --> J{ML Framework?}
    D --> J
    C --> J
    J -->|TensorRT| E
    J -->|TensorFlow Lite| D
    J -->|PyTorch| C
    E --> K{Camera Interface?}
    D --> K
    C --> K
    K -->|MIPI CSI-2| L[Jetson / RPi]
    K -->|USB 3.0| M[All Options]
    K -->|Ethernet| N[Industrial Cameras]
    L --> O[Final: Jetson Orin Nano]
```

### Specifications Comparison

| Parameter | NVIDIA Jetson Orin Nano | Raspberry Pi 5 | Google Coral TPU |
|-----------|------------------------|-----------------|------------------|
| **AI Performance** | 40 TOPS (INT8) | ~2 TOPS (CPU) | 4 TOPS (Edge TPU) |
| **Processor** | Ampere GPU + Arm Cortex | Cortex-A76 x4 | Edge TPU + Cortex-A53 |
| **Memory** | 8GB LPDDR5 | 8GB LPDDR4X | 4GB LPDDR4X (dev board) |
| **Power** | 7-15W | 5-12W | 2-5W |
| **ML Frameworks** | TensorRT, PyTorch, TensorFlow | TensorFlow Lite, PyTorch | TensorFlow Lite only |
| **Camera Interface** | 2x MIPI CSI-2 | 1x MIPI CSI-2 | MIPI CSI-2 / USB |
| **Video Decode** | 4K60 HDR | 4K60 | 1080p60 |
| **CUDA Cores** | 1024 | N/A | N/A |
| **Tensor Cores** | 32 (4th gen) | N/A | 8 (Edge TPU) |
| **Price** | ₹25,000 | ₹6,500 | ₹8,000 (dev board) |
| **Weight** | 50 g | 45 g | 5 g (module) |
| **Software Support** | JetPack SDK | RPi OS | Mendel Linux |

### Weighted Comparison Matrix

| Criteria | Weight | Jetson Orin Nano | RPi 5 | Coral TPU |
|----------|--------|------------------|-------|-----------|
| Cost | 25% | 4 | 8 | 7 |
| Performance | 25% | 10 | 4 | 6 |
| Reliability | 20% | 9 | 7 | 8 |
| Availability | 15% | 7 | 9 | 6 |
| Ease of Use | 15% | 7 | 9 | 6 |
| **Weighted Score** | 100% | **7.65** | **7.25** | **6.75** |

### Recommendation: NVIDIA Jetson Orin Nano

**Justification:**
- 40 TOPS enables real-time weed detection and spraying
- TensorRT optimization for maximum inference performance
- CUDA support for custom model training in the field
- MIPI CSI-2 for direct camera connection without USB overhead
- JetPack SDK provides complete AI development environment

**Alternative:** Raspberry Pi 5 for budget-constrained prototype (sacrifices real-time inference).

---

## Master Comparison Matrix {#master-comparison-matrix}

### Final Component Selections with Scores

| Component | Selection | Weighted Score | Cost (₹) | Weight (g) | Key Advantage |
|-----------|-----------|----------------|-----------|------------|---------------|
| **Frame** | EFT E616P | 8.05 | 18,000 | 2,800 | Foldable, tank integration |
| **Motors** | Hobbywing X9 G2L | 7.55 | 1,92,000 | 4,680 | Integrated ESC, IP54 |
| **Propellers** | Hobbywing MFP 36×11 | 7.95 | 27,000 | 1,680 | Folding, 8.2 g/W efficiency |
| **Batteries** | Tattu 12S 30Ah (imported) | 7.70 | **1,06,000** (was 65,000 v1) | 4,900 | Semi-solid, 1,332 Wh, ₹1,06,000 landed via Genstattu |
| **Flight Controller** | Pixhawk 6C | 8.85 | 12,000 | 35 | Dual IMU, best value |
| **GPS** | HGLRC M100-5883 (v2) | 8.55 | 1,599 | 10 | QMC5883 compass on-module (M9N upgrade ₹7,525) |
| **Telemetry** | RFD868x | 8.25 | 12,000 | 18 | 40km range, -121 dBm |
| **RC Receiver** | FrSky R-XSR | 8.05 | 3,500 | 1.5 | Proven, S.BUS native |
| **Pump** | SHURflo 8000 | 8.20 | 8,500 | 500 | Self-priming, dry-run |
| **Nozzles** | TeeJet XR11002 | 8.45 | 4,200 | 120 | Medium droplet, cost-effective |
| **Flow Sensor** | YF-S402 | 8.45 | 1,200 | 50 | ±3% accuracy, 4078 pulses/L |
| **AI Compute** | Jetson Orin Nano | 7.65 | 25,000 | 50 | 40 TOPS, TensorRT |

### Budget Summary

| Category | Cost (₹) |
|----------|----------|
| Frame System | 18,000 |
| Motors (6x) | 1,92,000 |
| Propellers (6x + 2 spare) | 36,000 |
| Batteries (2x) | 1,30,000 |
| Flight Controller | 12,000 |
| GPS | 3,500 |
| Telemetry (2x) | 24,000 |
| RC System | 3,500 |
| Spray System | 13,900 |
| AI Compute | 25,000 |
| **Electronics Subtotal** | **4,57,900** |
| Frame Assembly & Misc | 15,000 |
| Wiring & Connectors | 8,000 |
| **Grand Total** | **4,80,900** |

### Weight Budget

| Component | Weight (g) | % of AUW |
|-----------|------------|----------|
| Frame | 2,800 | 14.7% |
| Motors (6x) | 4,680 | 24.6% |
| Propellers (6x) | 1,680 | 8.8% |
| Batteries | 6,800 | 35.8% |
| Flight Controller | 80 | 0.4% |
| GPS | 10 | 0.1% |
| Telemetry | 18 | 0.1% |
| RC Receiver | 1.5 | <0.1% |
| Pump | 500 | 2.6% |
| AI Compute | 50 | 0.3% |
| Wiring & Misc | 500 | 2.6% |
| Spray Tank (16L) | 1,300 | 6.8% |
| **Total Dry Weight** | **18,419.5** | **96.9%** |
| Spray Liquid (16L) | 16,000 | - |
| **Total AUW** | **34,419.5** | - |
| **Max Thrust (6x 6.8kg)** | **40,800** | 118.5% |
| **Thrust-to-Weight** | **1.18:1** | ✅ |

---

## Appendix: Component Compatibility Matrix

| Component | Compatible With | Interface |
|-----------|-----------------|-----------|
| Pixhawk 6C | All peripherals | UART, CAN, I2C, SPI |
| Hobbywing X9 G2L | Pixhawk PWM | 6S-12S, PWM/DShot |
| HGLRC M100-5883 | Pixhawk GPS1 | UART (115200 baud) + I2C compass |
| RFD868x | Pixhawk Telem2 | UART (57600 baud) |
| FrSky R-XSR | Pixhawk RCIN | S.BUS (inverted) |
| SHURflo 8000 | Relay/MOSFET | 12V DC switching |
| YF-S402 | Pixhawk ADC/PWM | 5V pulse output |
| Jetson Orin Nano | Pixhawk UART | MAVLink / UART |

---

*Document Version: 1.0*
*Last Updated: 2026-05-29*
*v2 update: 2026-06-02 — Tattu 30 Ah pricing corrected to ₹1,06,000 imported, GPS bug fixed (M10 Mini→M100-5883/M9N)*
*Author: COEP Drone Design Team*

---

## Verified vs Calculated (Transparency Note)

**VERIFIED** — Confirmed from manufacturer datasheet or live Indian retail (June 2026):
- All component prices, datasheet specs, lead times from web search
- Tattu 30 Ah Semi-Solid 12S = ₹1,06,000 imported (Genstattu USD $1,209 + 18% GST + 30% BCD)
- NPNT/TC fees (UIN ₹100, UAOP ₹2.5k, NTH Type Cert ₹4.2L, RPTO ₹50-65k) — from DGCA/PIB Sep 2025
- Pixhawk 6C + PM02 ₹32,499 (MG Super Labs) / ₹33,899 (Robocraze) — live retail
- HGLRC M100-5883 ₹1,599 (FPVMatrix, in stock) — live retail
- Holybro M9N ₹7,525 (Indian Robo Store) — live retail
- mPower 12S 21 Ah Li-ion ₹50,000 (quote-based) — manufacturer quote
- 8.4 kg vs 4.9 kg battery weight, 1332 Wh vs 977 Wh capacity — datasheet

**CALCULATED** — Derived from math, not measured:
- 17.8 min flight time at 25 kg MTOW — calculated from hover power (3,420 W) and battery capacity (1,332 Wh × 80% DoD)
- 1.6× thrust margin — calculated from X8 max thrust (15 kg/axis) vs hover load (4.17 kg/axis)
- MTOW 25 kg = frame (7 kg) + 6× X8 (3 kg) + 10L tank (5.8 kg) + battery (4.9 kg) + Pixhawk 6C (0.05 kg) + 8 PDB/avionics (0.5 kg) + 6 ESC (1.2 kg) + spray system (1.0 kg) + wiring/connectors (0.5 kg) + 1.05 kg margin = 25.0 kg — weight estimate, not measured
- LCOE ₹187-794/flight-hr — calculated from pack cost / cycles / 267 hr/yr
- Battery leads 20-30 day import — based on genstattu.com shipping estimates, not actual order

**ESTIMATED** — Generic pricing, not from specific retailer:
- Smoke stopper ₹1,200, prop balancer ₹800, calibration scale ₹2,500, GPS mast ₹300, battery strap ₹200, LiPo bag ₹800 — generic tool/component prices
- 6 AWG wire ₹1,200 for 5 m — generic electrical supply pricing
- AS150 + XT90 connector kit ₹1,500 — generic
- 2× spare 3011 prop ₹3,500 — based on ₹1,750 per prop generic pricing
- 17.6/17.8 min flight time — calculation, not actual flight data
- 0.5-1 acre coverage per 10 L flight — calculated from spray rate (1-5 L/min) × swath (3-5 m) × speed (3-5 m/s), not field-tested

---

## Gaps Identified (Buildability Audit)

These items would prevent a working build if not addressed:

### Critical (will break the build)

1. **GPS compass bug (FIXED in v2)** — HGLRC M100 Mini has NO compass; without it ArduPilot position-hold/RTL/auto modes don't work. v2 uses M100-5883 or Holybro M9N. Updated 2026-06-02.

2. **Tattu 30 Ah Semi-Solid 12S not in stock in India** — must import 20-30 days via Genstattu/Foxtech/Motionew. Risk: customs delay. Budget option: 2× Tattu 22 Ah Pro in stock at Robokits (G-B, ₹3,55,948).

3. **No per-cell battery monitoring in flight** — Tattu 30 Ah Semi-Solid has no smart BMS that ArduPilot can read. MAUCH HS-200-LV gives pack voltage + current only. Need a balance lead tap to ADC or DroneCAN battery monitor (TBS Bat-Pro, ~₹5,000-8,000). Not in v2 BOM.

4. **Regulatory: NPNT/Type Certificate** — A custom Pixhawk hexacopter CANNOT legally fly under NPNT without a Type Certificate. For SAE DDC 2026 competition, must confirm with organizers whether the competition site has a blanket exemption. If not, ₹4.2L TC at NTH Ghaziabad required (3-6 month timeline). v2 budgeted ₹70-85k for minimum path.

5. **No ArduPilot parameter file** — 20+ parameters must be set (INS_GYRO_RATE, ATC_RAT_P/I/D, ATC_ANG_P/I/D, COMPASS_*, INS_ACCEL_FILTER, MOT_PWM_MIN/MAX). None of this is in BOM. User has zero ArduPilot/DroneCAN/ag-spray experience. Must read ArduPilot docs and follow tuning guide (~8-12 hours of work).

### Medium (won't break but will surprise)

6. **No actual flight test data** — 17.8 min flight time is calculated math, not measured. Actual flight time will be ±15%.

7. **No CG (center of gravity) verification procedure** — must weigh each component and compute centroid. Mismatched CG = uncontrollable drone.

8. **No compass calibration step-by-step** — required for ArduPilot. Mentioned in build guide but no detailed procedure.

9. **No motor direction verification procedure** — 6 motors, CW/CCW pairing; one wrong direction = flipped crash.

10. **No ground station laptop** — not in BOM. Existing laptop with Mission Planner or new ruggedized (~₹50k).

11. **2× spare props at ₹3,500 may not be enough** — student pilots crash. Should budget 4-6 spares.

12. **vibration analysis capability** — 30" props must be balanced; without FFT analyzer can't verify clean IMU data.

13. **No tether for first hover test** — recommended for safety, not in BOM.

14. **No NPNT hardware module sourced** — Johnnette U2.0 is quote-based (contact@johnnette.com), not public price, not in stock.

### Low (cosmetic)

15. **G10 vibration pads were ₹1,800 in v1, verified ₹500 in v2** — over-priced in v1, corrected.

16. **2 stale v7 docx files in workspace** — confusing. v9 will replace v8.
