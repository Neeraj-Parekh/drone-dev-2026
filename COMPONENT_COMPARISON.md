# RFQ vs Design Comparison — COEP Hexacopter

> **Purpose** — Cross-reference the components listed in `COEP RFQ.xlsx` (teacher's procurement list) and `drone.xlsx` (your own BOM) against (a) the **v7 technical design report** that justifies the actual selections, and (b) **manufacturer datasheets** from the web. One component per section, with: spec table, real price (Zbotic / Robu / Hobbywing / u-blox / Cubepilot / Tattu), pros, cons, fit-for-purpose verdict, source links.

> **Conventions**
> - **RFQ** = `COEP RFQ.xlsx` (the Zbotic procurement list the teacher shared).
> - **BOM** = `drone.xlsx` (your own BOM).
> - **Design v7** = `COEP_Hexacopter_Technical_Report_v7.docx` — the design that was actually justified.
> - **All prices in ₹ (INR), ex-GST unless noted. GST rates in the RFQ: 18% on electronics, 5% on airframes/tanks/PDB.**
> - **Status legend** — ✅ = selected in v7 design · ⚠️ = listed but not selected (trade-off / future upgrade) · ❌ = not in design at all · 🔴 = mismatch / red flag in the BOM.

---

## 0. The 30-Second Summary

| #   | Component (per RFQ)                                 | RFQ Status   | v7 Design Choice                                  | Verdict                                                                                                                 |
| --- | --------------------------------------------------- | ------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hobbywing X8 Plus motor+ESC+prop combo (CW/CCW)** | RFQ line 1–2 | **Hobbywing X9 G2L** (X8 → X9 upgrade)            | 🔴 **MISMATCH** — X8 is **15 kg/axis max**, v7 needs **24 kg/axis**                                                     |
| 2   | **EFT E616P 16L 6-axis frame**                      | RFQ line 3   | **EFT E616P** (same frame)                        | ✅ MATCH                                                                                                                 |
| 3   | **EFT E-series 10L tank + battery plate**           | RFQ line 4   | **16L HDPE tank with 4 baffles** (custom)         | ⚠️ 10 L insufficient — design needs 15.8 L operational                                                                  |
| 4   | **Jiyi K++ V2 flight controller**                   | RFQ line 5   | **Pixhawk 6C (Holybro)**                          | 🔴 **REJECTED in v7** — K++ V2 is closed-source; v7 needs ArduPilot                                                     |
| 5   | **Ag++ Flight Controller + AeroGCS**                | RFQ line 6   | —                                                 | ❌ NOT IN DESIGN                                                                                                         |
| 6   | **Agriculture spraying system 5L pump**             | RFQ line 7   | **SHURflo 8000-543-236 diaphragm pump**           | 🔴 **MISMATCH** — Hobbywing 5L pump is not pressure-rated; SHURflo is                                                   |
| 7   | **SKYDROID H12 12CH RC + R12 RX**                   | RFQ line 8   | **FrSky R-XSR** + custom data link                | 🔴 **REJECTED** — Skydroid is proprietary Android-link, not SBUS/CRSF native                                            |
| 8   | **Here4 Multiband RTK GPS**                         | RFQ line 9   | **1× HGLRC M100-5883** (v2 budget) / **1× Holybro M9N** (v2 recommended)       | ⚠️ Here4 reserved as RTK upgrade only — see v2 GPS fix in §7                                                            |
| 9   | **TF02-Pro LiDAR 40 m**                             | RFQ line 10  | — (built-in MS5611 baro only)                     | ❌ NOT IN DESIGN                                                                                                         |
| 10  | **Vibration remover pad**                           | RFQ line 11  | **G10 fiberglass isolators (6×)**                 | ✅ MATCH (different brand)                                                                                               |
| 11  | **12S 25,000 mAh Li-ion**                           | RFQ line 12  | **3× Tattu 12S 30Ah semi-solid** (3,996 Wh total) | 🔴 **WRONG FAMILY** — Tattu 25k doesn't exist; design uses 30Ah LiPo semi-solid                                         |
| 12  | **12S 35,000 mAh Li-ion**                           | RFQ line 13  | —                                                 | ❌ NOT IN DESIGN                                                                                                         |
| 13  | **12S 30,000 mAh LiPo**                             | RFQ line 14  | **Tattu 12S 30Ah semi-solid**                     | ⚠️ Right capacity, different chemistry — design = semi-solid (safer)                                                    |
| 14  | **SkyRC PC1080 Neo dual charger**                   | RFQ line 15  | — (no charger specified)                          | 🔴 **WRONG CHARGER** — PC1080/neo is **6S only**; for 12S you need **PC1260**                                           |
| 15  | **Holybro DroneCAN M9N GPS**                        | RFQ line 16  | **1× HGLRC M100-5883** (UART+I2C, v2 budget) or **1× Holybro M9N** (UART+I2C, v2 recommended) | ⚠️ Both M9N-based; v2 GPS picks **module with on-module compass** (M10 Mini had none — bug fixed)                  |
| 16  | **Power distribution board (PDB)**                  | RFQ line 17  | **15×5 mm C110 copper busbar (200 A)**            | 🔴 **MISMATCH** — generic PDB replaced by custom busbar                                                                 |
| 17  | **Pixhawk Cube Orange+ ADS-B**                      | RFQ line 18  | **Pixhawk 6C** (₹12k vs ₹40k)                     | 🔴 **OVER-SPEC** — Orange+ rejected in favour of 6C                                                                     |
| 18  | **TAROT TL2996 12S 480 A PDB**                      | RFQ line 19  | **Custom copper busbar**                          | 🔴 **REJECTED** — TL2996 is a hobby PDB, not 200 A continuous rated                                                     |
| 19  | **HOLYBRO PM02D Power Module**                      | RFQ line 20  | **MAUCH HS-200-LV hall sensor** (separate)        | 🔴 **REJECTED** — PM02D = 60 A cont PCB; design needs 200 A measurement                                                 |
| 20  | **MEAN WELL NSD10-12S5**                            | RFQ line 21  | **2× 15 A BEC** (built into ESC stack)            | 🔴 **WRONG PART NUMBER** — NSD10-12S5 is **9.8–36 V input**; on 12S (44.4 V) it will die. Need **NSD10-48S5** (22–72 V) |
| 21  | **MEAN WELL NSD05-12S12**                           | RFQ line 22  | —                                                 | 🔴 **WRONG PART NUMBER** — same voltage issue; also part doesn't exist (NSD10-12S12 is the right prefix)                |

**Big-picture:** Of the 22 RFQ lines, **only 1 (EFT E616P frame) is a direct match** to the v7 design. The BOM and the v7 design are on different architectures: BOM is the "Hobbywing+Skydroid+Jiyi closed-source stack" path, v7 is the "open ArduPilot+Pixhawk+Holybro+custom busbar" path. **Only the frame, vibration pads, and tank capacity survive.**

---

## 1. Frame — EFT E616P 16L 6-Axis Agricultural Drone Frame

### Specs (datasheet)
| Parameter | Value | Source |
|---|---|---|
| Wheelbase | **1,628 mm** (Zbotic) / **1,644 mm** (EFT official) | 3DXR, EFT, Zbotic |
| Motor pattern | X8 (8-series motor) — X6 8118 also compatible | EFT official |
| Propeller | 28–32 inch folding | Zbotic, Robu |
| ESC | 80 A FOC | EFT official |
| Supply voltage | 12S LiPo (44.4 V nom) | All |
| Frame weight | **6.41 kg** (EFT) / **7 kg** (Zbotic) | Conflict: Robu = 7 kg |
| Max take-off weight | 36 kg | EFT / Zbotic |
| Tank capacity | 16 L | All |
| Opening size | 1,720 × 1,500 × 556 mm | Robu / Zbotic |
| Folding size | 1,073 × 956 × 546 mm | Robu / Zbotic |
| Arm tube OD | 35 / 40 mm (X8 clamps) | Hobbywing X8 datasheet |
| Material | 3K carbon fiber center plates + 6061-T6 Al arms | EFT product page |
| Arm length | 380 mm | 3DXR |

### Pricing (India)
| Vendor | Price (ex-GST) | GST | Total |
|---|---|---|---|
| Zbotic | ₹33,782 | 5% | ₹35,471 |
| Robu | ~₹38,000–45,000 | 5% | ~₹40–47k |
| GearWings | listed | — | — |
| v7 design quote | ₹52,000 | 5% | ₹54,600 |

### Pros
- **Heavy-lift proven**: 36 kg MTOW, 16 L tank, foldable — perfect for 6L+ class agricultural drone.
- **Direct match to Hobbywing X8/X9 clamp (40 mm OD)** — no adapter needed.
- **Ecosystem**: EFT makes the matching 10L/16L tank, pump mounts, and propulsion combos (E410P, E616S, G616). Plug-and-play with their PNP set.
- **Folding design** fits in a small pickup / van.

### Cons
- **No integrated PDB / signal hub** — the TL2996 (see §18) is a *separate* purchase that the Zbotic listing suggests is needed. Frame alone is just carbon + clamps.
- **Frame weight disputed**: EFT official = 6.41 kg, Zbotic = 7 kg, Robu PNP = 20 kg shipping weight. **Treat 7 kg as the build weight**.
- **Branding is murky**: `effort-tech.com` vs `eftmodel.com` vs Zbotic/3DXR — EFT has multiple regional dealers and SKU drift.
- **Wheelbase conflict**: 1,628 mm vs 1,644 mm — minor, but the user should measure arm length and verify motor PCD.

### Verdict
✅ **MATCH** — both RFQ and v7 pick the same frame. The v7 design quote is ~₹13k higher than Zbotic's spot price; this is **expected** because the v7 BOM is from a different vendor (likely a domestic integrator with installation/training in the price).

**Sources:**
- EFT official: https://www.effort-tech.com/en/e6
- Zbotic listing: https://zbotic.in/product/eft-e616p-6-axis-agricultural-drone-frame-without-tank/
- Robu listing: https://robu.in/product/eft-e616p-16l-6-axis-agricultural-drone-frame/
- GearWings: https://gearwings.com/product/eft-e616p-frame/
- 3DXR: https://www.3dxr.co.uk/multirotor-c3/multirotor-frames-c97/eft-e616p-16l-agricultural-crop-sprayer-drone-frame-kit-p4307
- Datasheet PDF: https://5.imimg.com/data5/SELLER/Doc/2026/1/579947123/BW/KH/KG/251800034/eft-e616p-16l-6-axis-agricultural-drone.pdf

---

## 2. Propulsion — Hobbywing XRotor X8 Combo vs Hobbywing XRotor X9 G2L

### Two completely different products
This is the **biggest BOM-vs-design mismatch** in the entire report. The X8 and X9 G2L are not the same motor in a different box — different stators, different KV, different thrust class.

### Spec comparison (datasheet)
| Parameter                           | **X8 (RFQ)**                               | **X9 G2L (v7 design)**                                           |
| ----------------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| KV                                  | **100 KV**                                 | **110 KV**                                                       |
| Stator                              | 81 × 20 mm                                 | **96 × 16 mm**                                                   |
| Slot/pole                           | 36N40P                                     | 36N40P                                                           |
| Motor OD                            | Φ 88.6 mm                                  | **Φ 104 mm** (fan 130 mm)                                        |
| Max thrust                          | **15 kg/axis**                             | **24 kg/axis** (sea level)                                       |
| Recommended takeoff / axis          | 5–7 kg                                     | **7–12 kg**                                                      |
| Propeller                           | **MFP 30×11** (29–30 inch)                 | **MFP 36×11** (36 inch folding)                                  |
| Combo weight (motor+ESC+prop+cable) | 1,040–1,150 g                              | **1,532 g**                                                      |
| Input voltage                       | 18–54 V (12S LiPo)                         | 18–63 V (12S–14S)                                                |
| Rated power input                   | 950 W                                      | **1,600 W**                                                      |
| Rated power output                  | 810 W                                      | **1,370 W**                                                      |
| ESC cont. current                   | 80 A (good cooling)                        | **30 A** (120 A peak / 3 s)                                      |
| ESC comm. protocol                  | PWM only (UART)                            | **DroneCAN / HWCAN + PWM** (dual redundant)                      |
| Waterproof                          | IPX6 / IPX7                                | IPX6                                                             |
| Bearing                             | NSK waterproof                             | NSK (high-temp enamel 200 °C)                                    |
| Operating temp                      | -20 to +65 °C                              | -20 to +50 °C                                                    |
| Throttle pulse                      | 1,100–1,940 μs                             | 1,050–1,950 μs                                                   |
| Efficiency @ rec. takeoff           | 9.5–8.6 g/W                                | **9.7–7.7 g/W**                                                  |
| Compatibility                       | E410S, E616S, E410P, **E616P**, G616, G410 | 16 L agricultural drones, **Class IV UAV**                       |
| ESC data                            | XRotor 80A-FOC (UART only)                 | Dual-loop (PWM + CAN), flatland/highland modes, DroneCAN + HWCAN |

### Pricing
| Source | X8 combo (CW+CCW) | X9 G2L |
|---|---|---|
| Zbotic | **₹12,500 each** (RFQ lists 4+4 = 8 total) | not stocked |
| Robu | **₹14,000 each** (3+2 spares) | ₹32,000+ each |
| Hobbywing official (X9) | — | ~₹32,000–40,000 each |
| v7 design quote | — | **₹12,000 each** (motor) + ₹8,000 each (ESC) = ₹20k/axis |

### Pros & Cons

#### X8 (what the BOM has)
**Pros**
- Cheaper (₹12.5k–14k/axis vs X9's ₹20k/axis).
- Proven on EFT E616P — multiple dealers explicitly bundle them.
- 30-inch prop = smaller, lighter, more rigid; folding mechanism simpler.
- IPX7-rated versions available (Bharat Skytech lists IPX7).
- Compatible with E616P frame clamps (35/40 mm).

**Cons**
- **Only 15 kg/axis max thrust** → with 6 motors, total = 90 kg, but hover = ~30 kg MTOW at TWR 3. **Insufficient for v7's 36–45 kg MTOW.**
- **PWM-only ESC** — no CAN bus, no DroneCAN, no telemetry per-motor, no smart dual-loop. Every motor parameter blind.
- ESC current sensor not exposed — no per-motor current logging.
- 80 A continuous ESC at full throttle = 480 A draw on 6 motors. 6× 80A MEGA fuses required.
- No black box, no fault log, no firmware update path.

#### X9 G2L (what v7 picked)
**Pros**
- **24 kg/axis max** → 6×24 = 144 kg total, hover at ~40 kg MTOW at TWR 3.6. Plenty of margin.
- **DroneCAN + HWCAN + PWM** = real-time per-motor RPM, current, voltage, temperature, fault log. Pixhawk/ArduPilot can monitor and EKF-correct.
- **1,000 Hz ESC control**, dual CPU, dual-loop, highland mode.
- Black box: 1–24 hour fault log.
- IPX6 + 200 °C enamel = survives chemical washdown.
- Bluetooth tuning via DataLinkBox G3 + Hobbywing app.

**Cons**
- **30% more expensive** per axis (₹20k vs ₹12.5k BOM).
- **36-inch prop** is bigger, heavier, more whip in turbulence. Slightly less efficient in still air.
- **Heavier combo** (1,532 g vs 1,150 g) — ~2.3 kg of extra mass = ~6% of 36 kg MTOW.
- ESC continuous 30 A is **low for the rating** — relies heavily on peak (120 A / 3 s) for transient. Cooling matters.

### Verdict
🔴 **CRITICAL MISMATCH.** The v7 design has been justified to **45 kg MTOW**. The X8 at 15 kg/axis × 6 = 90 kg peak, but at TWR 3:1 = 30 kg MTOW. **Cannot lift the 36–45 kg design MTOW.** Three options:

1. **Stay on X8 and downgrade MTOW to ≤25 kg** — drop 10L tank, 6-axis to 4-axis. Loses redundancy.
2. **Stay on X8 with 30" prop at 14S** — slightly higher thrust, but ESC max input is 52.2 V, so 14S nominal (50.4 V) is right at the edge. Not recommended.
3. **Switch to X9 G2L (v7 choice)** — this is what the design report already does.

**Your BOM's `14000*3` line = ₹42,000 for 3 CW = ₹14,000 each. If you stay on X8, you save ₹48,000 vs X9, but you must revise the entire MTOW calculation in the v7 report.**

**Sources:**
- Hobbywing X8 product page: https://www.hobbywing.com/en/products/xrotor-x8108
- Hobbywing X9 G2L product page: https://www.hobbywing.com/en/products/x9-g2l
- X8 datasheet PDF: https://5.imimg.com/data5/SELLER/Doc/2021/6/NY/KA/LQ/94954033/x8-hobbywing-propulsion-unit-motor-esc-propeller.pdf
- X9 distributor (Bharat Skytech CW): https://bharatskytech.com/product/hobbywing-xrotor-x8-motor-only-cw-for-agriculture-drones/
- Hobbywing UAV official: https://hobbywinguav.com/product/x8cw/ and https://hobbywinguav.com/product/x8ccw/
- X8 ArrisHobby: https://www.arrishobby.com/products/hobbywing-x8-power-system-for-agricultural-drones

---

## 3. Tank — EFT E-Series 10L vs 16L HDPE (v7 custom)

### Specs
| Parameter | **EFT 10L (RFQ)** | **16L HDPE (v7)** |
|---|---|---|
| Capacity | 10 L | 16 L nominal / **15.8 L operational** |
| Baffles | unknown | 4 compartments @ 150 mm spacing |
| Material | HDPE | HDPE rotomolded, 3 mm wall |
| Battery plate | included (RFQ) | separate mount |
| Use case | 10 L → ~25 kg MTOW drone | 16 L → 36–45 kg MTOW drone |
| Price (Zbotic) | **₹5,548** | not stocked; **v7 quotes ₹6,500** (custom fab) |

### Pros
- 10L is **cheaper** (₹5.5k vs ₹6.5k) and **lighter** (likely ~600 g vs ~800 g).
- Battery plate integrated → saves an extra fabrication step.

### Cons
- **10 L is 37% less spray capacity** → mission time per battery drops from ~12 min to ~7 min. More landings, more refills, more downtime.
- With a 36–45 kg MTOW design, a 10 L tank means you fly mostly dry weight + minimal payload → wasting the thrust margin the X9 motors give you.
- Custom 16L HDPE with 4-baffle design **controls slosh-induced CG shift**, which is a known cause of agricultural drone crashes during aggressive turns at full fill.

### Verdict
⚠️ **TRADE-OFF** — if you stick with 16L, you must revise mission-planning to account for shorter range. If you go 10L, you must redo the weight/CG/flight-time analysis. v7 already justified 16L; the BOM's 10L line is from a smaller-class drone template.

**Sources:**
- Zbotic 10L: https://zbotic.in/product/eft-e-series-10l-tank-with-battery-plate/
- EFT frame product page (mentions 16L): https://www.effort-tech.com/en/e6

---

## 4. Flight Controller — Jiyi K++ V2 vs Pixhawk 6C vs Pixhawk Cube Orange+

### Three completely different products on the BOM/RFQ list

#### Spec comparison
| Parameter | **Jiyi K++ V2 (RFQ line 5)** | **Pixhawk 6C (v7 design)** | **Cube Orange+ ADS-B (RFQ line 18)** |
|---|---|---|---|
| MCU | Dual CPU (TI Sitara-class) | **STM32H743 Cortex-M7 480 MHz**, 1 MB RAM | **STM32H757 Cortex-M7 400 MHz**, 1 MB RAM, 2 MB Flash |
| Failsafe co-processor | not documented | not present | **STM32F103 24 MHz** |
| IMU | 3× redundant | 2× (ICM-42688-P + BMI088) | **3× (ICM42688p, ICM20948, ICM20649)** |
| Barometer | 2× redundant | 1× MS5611 | **2× MS5611** (temp-controlled, vibration-isolated) |
| Magnetometer | integrated GPS includes compass | IST8310 | ICM20948 (built-in) + AK099916 external |
| PWM outputs | 8 channels | 14 (8 IO + 6 FMU) | 14 (8 IO + 6 FMU) |
| GPS ports | integrated (62×14.3 mm) | 2 dedicated GPS ports | 2 GPS via carrier |
| CAN bus | 1 (CAN-HUB for expansion) | 2 | 2 |
| UART | not documented | 3 | 5 (2 with flow control) |
| I2C | not documented | 1 | 2 |
| Software | **JIYI Assistant (closed-source)** | **ArduPilot 4.4 / PX4 (open-source)** | ArduPilot 4.4 / PX4 (open-source) |
| ADS-B | not built-in | not built-in | **Yes — uAvionix 1090 MHz receiver** |
| Power input | PMU 11.1–50 V | 6 V max FC, 0–36 V servo rail | 4.1–5.7 V (Power Brick Mini in box) |
| Power consumption | < 5 W | < 2 W | < 2.5 A (14 W total) |
| Working temp | -10 to +60 °C | -40 to +85 °C | -10 to +55 °C |
| Storage temp | -25 to +60 °C | -40 to +85 °C | -40 to +85 °C |
| Vibration rating | < 1 G (designed for ag) | not specified | not specified (industrial) |
| Supported frames | Quad/Hexa/Octo (4–8) | Any (up to 16 motors) | Any (carrier-board I/O) |
| Built-in spray features | **YES** — pump switch, dual pump, AB route, terrain following radar, RTK, out-of-drug, no-fly zone, motor seq detect, vibration analysis | Via ArduPilot scripting — `RELAY_PIN`, `RPM_SENSOR_PIN`, `RPL.SERIAL1_PROTOCOL` etc. | Same as 6C + carrier-board flexibility |
| Mounting | 4 bolt pattern, **72.6 × 48.0 × 22.8 mm FC + 53.4 × 34.4 × 14.5 mm PMU + UPS** | 39 × 54.3 mm standard Pixhawk | Cube 38.25 × 38.25 × 22.3 mm + carrier 94.5 × 44.3 × 17.3 mm |
| Weight | **321 g** (FC 87 + PMU 41 + PMU2/UPS 44 + GPS 24) | **42.4 g** | **246 g** (cube + ADS-B carrier) |
| Waterproofing | not stated | no | no ("external waterproof protection needed") |
| Price (Zbotic/Robu/Spektre) | **out of stock at Zbotic** (RFQ says so). Bharat Skytech ₹9,200 (ex-GST). | ₹12,000–18,000 | **$400** (SpektreWorks), €450 (Ercmarket), ₹40–50k in India |

### Pros & Cons

#### Jiyi K++ V2
**Pros**
- **Built for agriculture** — pump on/off, dual pump, AB route, drug-out protection, no-fly zones, terrain-following radar, RTK, flow-meter, level-meter. The whole spray mission stack is **pre-integrated**.
- Triple IMU + dual barometer redundancy (industrial-grade).
- Includes GPS, LED, PMU, UPS, and CAN-HUB in the box. **One SKU, everything you need.**
- Cheapest of the three (₹9,200 ex-GST).
- Proven in Indian ag market — every Bharat Skytech / Robosync / XBOOM dealer stocks it.

**Cons**
- **Closed-source firmware** — you cannot modify the spray logic, add a custom sensor, or upgrade to new ArduPilot features.
- **Out of stock at Zbotic** (per RFQ). Sourcing from Bharat Skytech adds lead time.
- **PMU/UPS architecture is proprietary** — you must use Jiyi's PMU2 UPS, not a generic BEC.
- No ADS-B for manned-aircraft avoidance (Cube Orange+ has this).
- Heavier (321 g vs 42 g Pixhawk 6C).
- Working temp -10 °C (vs Pixhawk -40 °C) — limit at high altitude / cold mornings.
- ESC protocol: only "PWM ESC < 490 Hz" — **does not support DroneCAN ESCs like X9 G2L**. The v7 design's X9 G2L ESCs use CAN bus; Jiyi cannot read per-motor telemetry from them.

#### Pixhawk 6C (v7 choice)
**Pros**
- **ArduPilot 4.4** = full open-source, custom scripts, Lua bindings, RTL, terrain following, geo-fence, precision landing, etc.
- **DroneCAN native** — reads per-motor RPM, current, voltage, temp from X9 G2L.
- **Tiny + light** (42.4 g, 39×54.3 mm).
- Industrial temp range -40 to +85 °C.
- Half the price of Cube Orange+.

**Cons**
- **No built-in pump/spray logic** — must configure `RELAY_PIN=54`, `RPM_SENSOR_PIN=55`, `RPM_SCALING=4078` etc. manually. ~2 hours of Mission Planner setup.
- Only 2 IMU (vs 3 on Cube Orange+ and Jiyi).
- No ADS-B receiver.

#### Pixhawk Cube Orange+ (RFQ line 18)
**Pros**
- **3 IMU + 2 baro, vibration-isolated, thermally controlled** — best sensor redundancy in any hobby FC.
- **STM32H757 dual-core** — Cortex-M7 + dedicated failsafe co-processor (STM32F103) for in-flight manual override.
- **80-pin DF17 carrier** — plug-and-play with any Cube carrier board; designed for **commercial integrators** to design their own carrier.
- **ADS-B built-in** (uAvionix 1090 MHz) — detects manned aircraft, automatic avoidance in PX4.
- **Servo rail high-power (7 V)** ready.
- Power input 4.1–5.7 V via included Power Brick Mini.

**Cons**
- **₹40,000–50,000 in India** (vs ₹12k for 6C). 3-4× cost.
- **2.5 A rated input** — needs Power Brick Mini or Mauch.
- **No DroneCAN ESC telemetry integration** out-of-the-box on ArduPilot (PX4 supports it better).
- Larger / heavier than 6C (246 g vs 42 g).
- **Out of stock at Zbotic** (per RFQ).
- Power Brick Mini is required and is **not in the RFQ** — additional cost.

### Verdict
🔴 **RFQ has all three controllers but the design only needs one.** v7 picked 6C for cost+open-source. Jiyi K++ V2 is the **right pick for closed-source commercial ag** — but it is **incompatible with the v7 choice of X9 G2L CAN ESCs**.

**Cross-compatibility matrix:**

| FC | X8 (PWM only) | X9 G2L (DroneCAN) | Sprayer control |
|---|---|---|---|
| Jiyi K++ V2 | ✅ native | ❌ no CAN ESC support | ✅ built-in |
| Pixhawk 6C | ✅ (PWM/DShot) | ✅ (DroneCAN) | ⚠️ manual config |
| Cube Orange+ | ✅ (PWM/DShot) | ✅ (DroneCAN) | ⚠️ manual config |

**This is the architectural fork:** if you go Jiyi+K++V2, you **must** use the **X8 (PWM) motor**, not the X9. If you go Pixhawk 6C, you can use **X9 G2L and its per-motor CAN telemetry**.

The v7 report explicitly justifies the 6C+X9 path. The RFQ is a mishmash of both paths.

**Sources:**
- Jiyi K++ V2: https://www.jiyiuav.com/en/kjjv2.html
- Jiyi support manual: https://support.jiyiuav.com/docs/skring/skring-1c8budam56e06
- Bharat Skytech: https://bharatskytech.com/product/jiyi-kv2-flight-controller-agriculture-drones/
- Pixhawk 6C (Holybro): https://holybro.com/products/pixhawk-6c
- Cube Orange+ (PX4 docs): https://docs.px4.io/v1.16/en/flight_controller/cubepilot_cube_orangeplus
- Cube Orange+ (ArduPilot): https://ardupilot.org/copter/docs/common-thecubeorange-overview.html
- SpektreWorks Cube Orange+ ADS-B: https://spektreworks.com/product/cube-orange-standard-set-ads-b/

---

## 5. Spray Pump — Hobbywing 5L Brushless vs SHURflo 8000-543-236

### Spec comparison
| Parameter | **Hobbywing 5L (RFQ line 7)** | **SHURflo 8000-543-236 (v7)** |
|---|---|---|
| Type | Brushless centrifugal (integrated ESC) | **Diaphragm** (positive displacement) |
| Working voltage | **12–14S (44–60.9 V DC)** — direct from battery | 12 V DC (separate BEC) |
| Rated power | 60 W | 60 W (normal) / 90 W (peak) |
| Working pressure | **0.35 MPa = 3.5 bar** | **2.1 bar (30 PSI)** max continuous |
| Max flow | 5 L/min (open) | 5.3 L/min (open) / 4.3 L/min @ 40 PSI |
| Working current | ≤ 2.5 A (avg) | **7.5 A @ 12 V** |
| Peak current | 10 A (limit) | ~12 A |
| PWM range | 1,050–1,950 μs | analog 0–100% or relay on/off |
| Protection | IP67, current + temperature (>110 °C cut) | IP65 (splash), thermal fuse |
| Operating life | > 500 h (brushless) | ~500–1,000 h (diaphragm) |
| Weight | 388 g (338 g without wire) | 1,860 g |
| Size | 123 × 76 × 52 mm | 213 × 102 × 104 mm |
| Mount | direct bolt-on | 57 × 79 mm pattern |
| Suction / discharge port | 6 mm push-to-connect (typical) | 3/8" NPT female |
| Compatibility with Jiyi K++ V2 | **YES** — 1050–1950 μs native | ⚠️ needs PWM-to-relay board or analog 0–5V control |
| Compatibility with Pixhawk 6C | ✅ via DShot or AUX PWM | ✅ via RELAY_PIN |
| Control algorithm | closed-loop PWM (flow vs pressure curve) | open-loop (pressure regulated by bypass valve) |
| Nozzle match (TeeJet XR11002) | ⚠️ 3.5 bar > 2.76 bar spec — over-pressure, drift risk | ✅ 2.1 bar matches XR11002 40 PSI design point |
| Price (Zbotic) | **₹8,788** | — (v7 quotes ₹8,500) |
| Price (Robu) | **₹6,300** | — |

### Pros & Cons

#### Hobbywing 5L (RFQ)
**Pros**
- **Direct battery power** (12S, 44 V) — **no 12V BEC needed**, smaller wiring.
- **PWM-tunable flow** — Jiyi K++ V2 can vary flow rate per waypoint for variable-rate spraying.
- 388 g vs 1,860 g = **4.8× lighter**.
- IP67 = survives chemical washdown.
- > 500 h life (vs SHURflo's ~500 h).
- Cheaper (₹6,300–8,788).

**Cons**
- **0.35 MPa = 3.5 bar** is **above the TeeJet XR11002 spec window** (1.4–4.1 bar / 20–60 PSI nominal, optimal 2.8 bar / 40 PSI). At 3.5 bar you get **finer droplets (150–200 μm VMD)** → **more drift**, less deposition on crop.
- Centrifugal pump **flow varies with back-pressure** — at the spray height (~2 m above crop, ~0.3 bar back-pressure), flow drops by 30–50% from rated 5 L/min.
- Cannot self-prime if inlet runs dry.
- 12S direct battery means **the pump shares the high-current busbar with 6× ESCs at peak**. Injecting 10A peak inrush on the same rail as 600A motor inrush = noise.

#### SHURflo 8000-543-236 (v7)
**Pros**
- **Diaphragm** = positive displacement = **constant flow regardless of pressure**. Predictable spray rate.
- **2.1 bar working pressure** = **exact match to TeeJet XR11002 datasheet** (40 PSI = 2.76 bar; SHURflo 30 PSI = 2.07 bar). Droplet VMD in 250–400 μm sweet spot.
- Self-priming (can run dry briefly).
- Standard 3/8" NPT = easy replacement, available everywhere.
- Viton seals = chemical-compatible with most pesticides.

**Cons**
- **4.8× heavier** (1,860 g vs 388 g) = eats 1.5 kg of MTOW.
- **Separate 12V BEC required** (PMU/UPS or 15A BEC) — additional component, additional failure point.
- **Open-loop control** — no flow feedback unless you add YF-S402 flow sensor + bypass valve.
- Brush DC motor → EMI noise on the avionics rail (mitigated by separate 15A BEC in v7).
- No PWM-tunable flow — on/off only unless you add a PWM-controlled bypass valve.
- 7.5A continuous at 12V = **90W heat dissipation in the pump head** → can warm the tank slightly.

### Verdict
🔴 **MISMATCH** — but not necessarily a wrong choice. The v7 design picked SHURflo because **TeeJet XR11002 was the chosen nozzle**, and SHURflo at 2.1 bar matches its 40 PSI design point. The Hobbywing 5L is a **better pump** in isolation (lighter, sealed, direct battery) but it **doesn't match the nozzle's pressure curve**.

**If you switch to Hobbywing 5L, you must also switch to a nozzle rated for 3+ bar (e.g., TeeJet XR11003 or AIXR110025).** The whole spray system is co-designed.

**Sources:**
- Hobbywing 5L: https://www.hobbywing.com/en/products/one-piece-brushless-water-pump-5l105
- Hobbywing UAV: https://hobbywinguav.com/product/5l_water_pump/
- Hobbywing NA: https://www.hobbywingdirect.com/products/eps-pump-5l
- Zbotic listing: https://zbotic.in/product/5l-spraying-system-set/
- Robu listing: https://robokits.co.in/multirotor-spare-parts/agriculture-drone-parts/hobbywing-5l-brushless-water-pump-and-spray-system-with-pressure-nozzles-for-agricultural-drone
- SHURflo / Pentair: https://www.shurflo.com

---

## 6. RC & Telemetry — Skydroid T12 vs FrSky R-XSR + RFD868x

### Spec comparison
| Parameter | **Skydroid T12 + R12 (RFQ line 8)** | **FrSky R-XSR + RFD868x (v7)** |
|---|---|---|
| Type | **Integrated** Android touchscreen RC with embedded video + telemetry | **Two separate systems** — RC link + telemetry link |
| Frequency | 2.4 GHz FHSS | RC: 2.4 GHz (FrSky ACCESS); Telemetry: **865–867 MHz** (India-legal) |
| Channels | 12 | 16 (R-XSR), telemetry unlimited |
| Range | **20 km SD video / 30 km telemetry** | RC: 2–5 km; Telemetry: **10–40 km LOS** (with 8 dBi Yagi) |
| RF power | 20 dBm (CE) | RC: 100 mW; Telemetry: **1 W (30 dBm)** |
| Receiver | R12 (12 ch, 14 g, 51×41×13 mm) | FrSky R-XSR (16 ch, 1.5 g, 16×11×5.4 mm) |
| RC protocol | Skydroid proprietary (PPM/SBUS out) | **ACCESS D16, SBUS or CPPM output, SmartPort telemetry** |
| Battery | 4,000 mAh built-in (25 h) | separate (use FC BEC) |
| Screen | none on T12 / 5.5" on H12 | none (use QGroundControl / Mission Planner) |
| Camera / FPV | T12 includes FPV camera; H12 has HD video | not included |
| Weight (TX) | 560 g (T12) / ~1.1 kg (H12) | 0 g (R-XSR is RX only) |
| Gimbal | Hall-effect spring-centred, single-axis | not applicable |
| Field-replaceable gimbals | yes (modular) | n/a |
| Android onboard | H12 only (Snapdragon 625) | none |
| Charging | Micro-USB (T12) / Type-C (H12) | n/a |
| Price | **₹13,500 (T12) / ₹19,000 (H12) at Zbotic/Elecfy** | R-XSR ₹3,500 + RFD868x ₹12,000–28,000 = ~₹15,500–31,500 |
| Pros for ag | all-in-one, less wiring | open ArduPilot, India-legal high-power telemetry |
| Cons for ag | proprietary, 2.4 GHz only | two systems to wire, more SW config |

### Pros & Cons

#### Skydroid T12 (RFQ)
**Pros**
- **All-in-one**: 12 ch RC + FPV video + telemetry data link in one device.
- 25-hour battery life on TX.
- 20–30 km range on a single 2.4 GHz link — works in India without HAM license.
- Android app (H12) for mission planning on the controller itself.
- Modular gimbals, field-replaceable antennas.
- Plug-and-play with Jiyi K++ V2 (both use SBUS + proprietary data).

**Cons**
- **Proprietary protocol** — not standard MAVLink telemetry. Cannot integrate with Mission Planner / QGroundControl directly without Skydroid's ground-station app.
- **2.4 GHz only** — in India the 2.4 GHz ISM band allows 1 W EIRP for license-free use, but the band is **crowded** with WiFi, Bluetooth, and other RC pilots. Range falls off in urban / industrial areas.
- **H12 version** = 1.1 kg with Android — heavy for long flights.
- R12 receiver is **14 g** vs R-XSR's **1.5 g** — ~10× heavier.
- **No SmartPort / S.Port telemetry** — Jiyi K++ V2 has its own telemetry port; you can't share with ArduPilot.
- **Cannot talk to Pixhawk 6C's SERIAL ports natively** without Skydroid's converter box (sold separately, ₹3,500+).
- Firmware updates are app-based only, no Mission Planner integration.

#### FrSky R-XSR + RFD868x (v7)
**Pros**
- **ArduPilot-native** — R-XSR is detected automatically by 6C via `RC_PROTOCOLS=512` (SBUS). RFD868x talks MAVLink directly.
- **Separate RC and telemetry bands** — RC on 2.4 GHz (short-range, low-latency) + telemetry on 865–867 MHz (long-range, high-power, India-legal).
- **RFD868x at 1W + 8 dBi Yagi = 10 km guaranteed** with **+19.8 dB link margin** in the link budget.
- **RFD868x is MAVLink**, fully integrated into Mission Planner / QGroundControl.
- **R-XSR is 1.5 g** — negligible weight penalty.
- ELRS/ACCESS firmware upgradable, future-proof.

**Cons**
- **Two separate systems** — R-XSR needs SBUS port on FC, RFD868x needs a UART. Wiring more complex.
- RFD868x is **₹12,000–28,000** — comparable to Skydroid T12 alone.
- **RFD900x (915 MHz) is BANNED in India** — only 868 MHz variant legal. Must verify SKU.
- No FPV video. Need separate 5.8 GHz analog or 2.4 GHz digital link.
- No built-in screen on TX — need tablet/phone for QGroundControl.
- Mission Planner setup takes ~30 min on first install.

### Verdict
🔴 **ARCHITECTURE MISMATCH.** Skydroid T12 is the right pick **if you also pick Jiyi K++ V2 + Hobbywing 5L pump** (all the Jiyi-ecosystem parts). FrSky + RFD868x is the right pick **if you also pick Pixhawk 6C + ArduPilot**. They are two complete stacks; you cannot mix.

**Sources:**
- Skydroid T12 (UAVGarage): https://uavgarage.com/shop/skydroid-t12-2-4ghz-12ch-intergrated-video-and-telemtry-system/
- Skydroid H12 (Bharat Skytech): https://bharatskytech.com/product/skydroid-h12-transmitter-remote-controller-for-agriculture-drones/
- Skydroid R12 receiver (Hobbydrone): https://www.hobbydrone.cz/en/receiver-skydroid-r12-multilink-v1-0--suitable-for-h12-t12/
- FrSky R-XSR: https://www.frsky-rc.com/product/r-xsr/
- RFD868x (RFDesign): https://rfdesign.com.au/products/rfd868x
- RFD900x: https://rfdesign.com.au/products/rfd900x (India-banned)

---

## 7. GPS — Here4 RTK vs HGLRC M100-5883 (v2 budget) vs Holybro M9N (v2 recommended)

> **v2 UPDATE (2026-06-02) — CRITICAL FIX:** v1 of this comparison recommended **2× HGLRC M10 Mini** as
> the "v7 choice". That was wrong: the M10 Mini / M100 Mini is a **GPS-only module with NO on-module
> compass**, and ArduPilot's EKF requires a compass for yaw estimation when stationary or moving slowly.
> Without a compass, **position-hold, RTL, Auto, and Guided modes refuse to arm or behave erratically**.
> A 2nd compass-less GPS adds **no redundancy** for compass faults. The Pixhawk 6C does **not** have an
> internal magnetometer in the FMU, so an external compass is mandatory. v2 replaces the v7 GPS choice with
> **1× HGLRC M100-5883** (QMC5883 on-module compass, ₹1,599 FPVMatrix, budget) or **1× Holybro M9N**
> (IST8310 on-module compass, ₹7,525 Indian Robo Store, recommended for production/research).

### Spec comparison
| Parameter | **Here4 (RFQ line 9)** | **HGLRC M100-5883 (v2 budget choice)** | **Holybro M9N (v2 recommended choice)** |
|---|---|---|---|
| GNSS chip | u-blox **NEO-F9P** (L1/L5 dual-band) | u-blox **NEO-M10** (L1) | u-blox **NEO-M9N** (L1) |
| Constellations | GPS+GLO+GAL+BDS+QZSS (4 concurrent) | GPS+GLO+GAL+BDS (4 concurrent) | GPS+GLO+GAL+BDS (4 concurrent) |
| Bands | **L1 + L5** (B1I, B2a, E1B/C, E5a, L1C/A, L1OF, L5) | L1 only | L1 only |
| Accuracy (PVT) | 1.5 m CEP | **2.0 m CEP** | **1.5 m CEP** |
| Accuracy (RTK) | **0.01 m + 1 ppm** (1 cm) | n/a | n/a |
| Update rate | **up to 20 Hz (RTK)** | 10 Hz | up to 25 Hz |
| Heading | 0.3 deg | derived from compass | derived from compass |
| Cold start | 25 s | 26 s | 24 s |
| Sensitivity (tracking) | -167 dBm | -166 dBm | -167 dBm |
| **Compass on module** | **RM3100** ✅ | **QMC5883** ✅ (v2 fix) | **IST8310** ✅ |
| IMU on board | ICM42688 + barometer | none | none |
| Communication | **DroneCAN 8 Mbit/s** | **UART (NMEA/UBX) + I2C compass** at 115,200 baud | **UART + I2C** (or DroneCAN variant) |
| Antenna | Taoglas dual-band L1/L5 patch | 15×15 mm ceramic patch | 25×25×4 mm ceramic + 22 dB LNA |
| Operating temp | -40 to +80 °C | -40 to +85 °C | -40 to +80 °C |
| Voltage | 4.7–5.2 V | 3.3–5 V | 4.7–5.2 V |
| Power | < 200 mA @ 5 V | < 50 mA @ 5 V | < 200 mA @ 5 V |
| Size | 40×41×11 mm | 15×15×12 mm | Φ54×14.5 mm |
| Weight | 43 g (with cable) | **~10 g (with compass)** | 36 g |
| Base station required | **YES** (Here+ or any F9P base) | NO | NO |
| NTRIP support | YES (RTCM 3.3, SPARTN 2.0.1) | NO | NO |
| Spoofing detection | advanced | yes (M10 chip) | yes (M9N chip) |
| **Price (live retail, June 2026)** | **₹36,538** (Zbotic) | **₹1,599** (FPVMatrix, in stock) | **₹7,525** (Indian Robo Store) / ₹11–15k (UAVGarage) |

### Pros & Cons

#### Here4 RTK (RFQ)
**Pros**
- **1 cm + 1 ppm RTK accuracy** — survey-grade. Required for precision spraying, mapping, agricultural photogrammetry.
- L1+L5 dual-band — **better multipath rejection near trees/structures** vs L1-only modules.
- Built-in IMU + barometer + compass → less wiring.
- Anti-spoofing algorithms (important for BVLOS and regulated airspace).

**Cons**
- **₹36,538** — **23× cost of HGLRC M100-5883** (₹1,599) or **4.9× cost of Holybro M9N** (₹7,525).
- **Requires base station** — either a ₹25–40k Here+ base, or NTRIP subscription (₹500–2,000/month in India). Hidden cost.
- Larger 40×41 mm — needs mast mount.
- 43 g — heavier than alternatives.
- Overkill for the v2 design's mission (basic spray pattern, no survey).

#### HGLRC M100-5883 (v2 budget choice)
**Pros**
- **₹1,599** — **cheapest module in the comparison with a compass**.
- **QMC5883 on-module** — fixes the v1 compass bug.
- **~10 g** — still light, even with the compass.
- 2.0 m CEP — slightly worse than M9N's 1.5 m, but acceptable for non-precision spraying.
- UART + I2C — simple wiring to Pixhawk 6C GPS1 port (single JST-GH 6-pin cable).
- M10 chip has built-in anti-spoofing.
- **In stock at FPVMatrix India** (no import lead time).

**Cons**
- **L1 only** — worse multipath than F9P.
- 15×15 mm — small patch antenna. **GPS mast height ≥ 200 mm critical** to avoid frame multipath. Build guide uses 350 mm.
- 10 Hz max update rate (vs M9N's 25 Hz).
- No RTK.
- QMC5883 compass is OK but less stable than IST8310 in EMI-heavy environments (near ESCs). Mount **≥ 200 mm from frame**.

#### Holybro M9N (v2 recommended choice)
**Pros**
- **IST8310 on-module compass** — Pixhawk standard, well-tested in ArduPilot.
- **1.5 m CEP** — better PVT accuracy than M10.
- **25 Hz update rate** — useful for fast aerial photography or auto-spray missions.
- 25×25 mm patch antenna + 22 dB LNA → **stronger signal** than M100-5883.
- ArduPilot + PX4 native support, plug-and-play.
- Holybro is a Pixhawk ecosystem company — high QA, India warranty via dealers.

**Cons**
- **₹7,525** — **4.7× cost** of M100-5883.
- 36 g — heavier than M100-5883's 10 g.
- 5 Hz default (configurable to 25 Hz; need to flash u-center).
- Larger footprint (Φ54 mm puck) requires standard GPS mast.

### Verdict
✅ **v2 BUDGET PATH: 1× HGLRC M100-5883 (₹1,599 FPVMatrix)** — fixes the compass bug, cheapest, in stock.

✅ **v2 RECOMMENDED PATH: 1× Holybro M9N (₹7,525 Indian Robo Store)** — production-grade, IST8310 compass, 25 Hz, larger antenna.

⚠️ **RTK upgrade path: 1× Here4 RTK (₹36,538 + base station ₹25k)** — only needed for precision tree-by-tree spraying or photogrammetry < 2 cm GSD.

**For a spraying drone that does NOT do mapping, RTK is overkill.** A 1–2 m CEP GPS gives sub-row-spacing accuracy, which is fine for 2 m swath spraying. RTK is needed only if you do **autonomous tree-by-tree orchard spraying** or **post-flight photogrammetry**.

**Recommendation:** Start with 1× HGLRC M100-5883 (₹1,599) for SAE DDC 2026 competition or first prototype. Upgrade to 1× Holybro M9N (₹7,525) before any commercial deployment. Add Here4 RTK as Phase-3 when you add mapping/payload.

**v1 vs v2 GPS choice comparison**
| Path | Module | Compass | Cost | Issue |
|---|---|---|---|---|
| v1 (DEPRECATED) | 2× HGLRC M100 Mini | ❌ none | ₹3,000 | EKF refuses position-hold/RTL/auto |
| **v2 budget** | **1× HGLRC M100-5883** | ✅ QMC5883 | **₹1,599** | Fixes bug, cheapest |
| **v2 recommended** | **1× Holybro M9N** | ✅ IST8310 | **₹7,525** | Pixhawk-standard compass |
| Premium dual | 2× Holybro M9N | ✅✅ 2× IST8310 | ₹15,050 | True compass redundancy |
| RTK | 1× Here4 RTK | ✅ RM3100 | ₹36,538 + base | Survey-grade, overkill for spray |

**Sources:**
- Here4 manual (CubePilot): https://docs.cubepilot.org/user-guides/here-4
- u-blox NEO-F9P: https://www.u-blox.com/en/product/neo-f9p-module
- u-blox NEO-M9N datasheet: https://content.u-blox.com/sites/default/files/NEO-M9N_ProductSummary_UBX-19027207.pdf
- Holybro M9N: https://holybro.com/products/m9n-gps
- HGLRC M100-5883 (with QMC5883 compass): https://hglrc.com (FPVMatrix India listing for v2 stock)
- ArduPilot compass setup: https://ardupilot.org/copter/docs/common-compass-setup-advanced.html

---

## 8. LiDAR — Benewake TF02-Pro (RFQ line 10) — NOT in v7

### Specs
| Parameter | **TF02-Pro (RFQ)** |
|---|---|
| Range | 0.1–40 m @ 90% reflectivity / 0.1–13.5 m @ 10% |
| Accuracy | ±5 cm (0.1–5 m), ±1% (5–40 m) |
| Resolution | 1 cm |
| Frame rate | 1–1000 Hz (default 100 Hz) |
| Repeatability | 1σ: < 2 cm (0.1–35 m @ 90%) |
| Ambient light | 100 Klux (sunlight) |
| FoV | 3° (theoretical) |
| Wavelength | 850 nm VCSEL (Class 1 eye-safe) |
| Voltage | **DC 5–12 V** |
| Power | ≤ 1 W (avg 200 mA, peak 300 mA) |
| Interface | UART / I2C / I/O |
| IP rating | IP65 |
| Dimensions | 69 × 41.5 × 26 mm |
| Weight | 50 g (with cables) |
| Operating temp | -20 to +60 °C |
| Price (Zbotic) | **₹4,863 each** (2 units = ₹9,726) |

### Why is this in RFQ but not in v7?
- v7 relies on **MS5611 barometer** for altitude hold (10 cm noise in still air, ~30 cm in turbulence).
- TF02-Pro is a **terrain-following radar / altimeter** — useful for **automated terrain following** on hilly fields.
- v7 likely considered it but excluded because:
  - Adds 100 g + wiring complexity
  - 5–12 V supply needs separate BEC
  - ArduPilot supports it via `RNGFND1_TYPE=8`, but needs a clean UART.
  - The 16L design at 36 kg MTOW is already over-powered for terrain following (motors can lift straight up easily).

### Pros
- 40 m range = covers crop height + AGL margin.
- 100 Klux ambient rejection = works in direct sun.
- IP65 = survives chemical washdown.
- ArduPilot native (RNGFND1_TYPE=8 = Benewake TF02).

### Cons
- **Adds 100 g** (2 units) to a 36 kg MTOW drone — negligible.
- Needs **5 V or 12 V BEC** (not 44 V battery direct).
- UART conflict with GPS — needs a UART splitter or SERIAL5 port.
- **3° FoV** at 2 m AGL = 10 cm spot diameter — fine for flat fields, but on a 30° slope the ground reflection is at 4 m = 21 cm spot.
- 1 cm resolution at 100 Hz = great for control loops, but adds **sensor noise** in the altitude EKF unless filtered.

### Verdict
❌ **NOT IN v7 DESIGN** — possibly dropped for cost. Worth adding if you do **hilly orchards or uneven terrain spraying**. For flat-land agriculture (the v7 mission), barometer + GPS altitude is sufficient.

**Sources:**
- Benewake official: https://en.benewake.com/TF02Pro/index_proid_327.html
- TF02-Pro datasheet PDF: https://en.benewake.com/uploadfiles/2024/04/20240426135509321.pdf
- TF02-Pro alldatasheet: https://www.alldatasheet.com/datasheet-pdf/pdf/...

---

## 9. Battery — Tattu 12S 22Ah / 25Ah / 30Ah family

### Spec comparison
| Parameter | **Tattu 12S 22Ah (RFQ, "Plus 1.0")** | **Tattu 12S 30Ah Semi-Solid (v7)** |
|---|---|---|
| Capacity | 22,000 mAh | 30,000 mAh |
| Configuration | 12S1P | 12S1P |
| Nominal voltage | 44.4 V | 44.4 V |
| Energy | 976.8 Wh | **1,332 Wh** |
| Energy density | 168 Wh/kg | **284.62 Wh/kg** (semi-solid) / 300 Wh/kg (G-Tech) |
| Continuous discharge | 25 C = 550 A (typical) / 100 A (Pro) | 3 C = **90 A** |
| Peak discharge | 50 C / 150 A <3 s (Pro) | 5 C = **150 A <3 s** |
| Charge rate | 1 C standard, 3 C fast (Pro) | 1 C (5 C max for some) |
| Cycle life | 600+ (Pro/Plus) | **300–500+** |
| Weight | 5,800 g (Plus) / 6,300 g (Pro) | **4,900 g** |
| Dimensions | 235 × 172 × 116 mm (Plus) / 238 × 174 × 117 mm (Pro) | **212 × 90.5 × 132 mm** |
| Connector | AS150U-F | AS150U-F |
| Balancer | JST-XHR / micro USB | Molex-430251600 |
| Smart features | SOC, data log, BT (Pro only) | semi-solid electrolyte, Si-C anode, high-Ni |
| Operating temp | -20 to +60 °C | -20 to +60 °C |
| Storage self-discharge | 3.95 V/cell auto-discharge to storage | similar |
| Price (genstattu) | **$665 (Agri) / $869 (Plus) / $978 (Pro) ≈ ₹55–82k** | **₹43,624–58,000 each** (v7 quote) |
| Price (Robokits India) | **₹45,674–46,081** (Tattu Pro 22Ah) | not stocked in India widely |

### v7 design choice
- **3× Tattu 12S 30Ah Semi-Solid** in series-parallel configuration = 90 Ah total (3,996 Wh).
- Reasoning: 36 kg MTOW × 1 hour hover @ 16 A/motor = 4,990 W → 1.5 hours of total endurance in 3,996 Wh pack, but practical flight time is 15–25 min with 16 L of spray.

### Why the BOM has 25 Ah and 35 Ah that don't exist
- **Tattu 12S 25,000 mAh (RFQ line 12):** does not exist as a standard SKU. Closest is Tattu 22,000 mAh (Plus/Pro) or 30,000 mAh (Semi-Solid).
- **Tattu 12S 35,000 mAh (RFQ line 13):** does not exist in Tattu's catalog. The largest single-pack 12S is 30,000 mAh. 35 Ah would need to be a custom build.
- **Tattu 12S 30,000 mAh (RFQ line 14):** matches the v7 choice (semi-solid).

### Pros & Cons

#### Tattu 12S 22Ah (Plus/Pro) — BOM equivalent
**Pros**
- **₹45,674** (Pro India price) — 25% cheaper than 30Ah.
- 600+ cycle life (Pro) — better than semi-solid's 300+ cycles.
- Smart BMS with BT, SOC, data log, automatic storage mode.
- Lighter than 30Ah (5.8 kg vs 4.9 kg — wait, this is wrong, 22Ah is heavier per Ah).
- **Wider availability in India** (Robokits, Robu, Xboom all stock it).

**Cons**
- **36% less capacity** than 30Ah (976 Wh vs 1,332 Wh).
- Heavier per Wh: 5.8 kg / 976 Wh = 168 Wh/kg vs 30Ah's 272 Wh/kg.
- Pro's 25C is fine for X9 G2L (peak 150 A <3s = 6.8 C), but 22Ah pack is stressed harder.
- 5,800 g + 30Ah = 10,700 g vs 2× 30Ah = 9,800 g. Need **2× 22Ah packs in parallel** to match 30Ah capacity.

#### Tattu 12S 30Ah Semi-Solid (v7)
**Pros**
- **284.62 Wh/kg** energy density = 36% more flight time per kg.
- **Semi-solid electrolyte** = safer in puncture/overcharge, less swelling.
- 4,900 g = 800 g lighter per pack than 22Ah.
- 3 C continuous (90 A) = perfect match for X9 G2L's 16 A hover × 6 = 96 A.
- Lighter means **lower MTOW** or **more spray payload**.

**Cons**
- **3 C continuous** (90 A) is low for an X8 system (which can pull 80 A continuous × 6 = 480 A = 16 C from a 30 Ah pack — borderline). X9 G2L is fine, X8 isn't.
- **300+ cycles** vs Pro's 600+ — shorter lifetime in commercial service.
- **₹43,624–58,000 each** = ₹1,30,872–1,74,000 for 3 packs vs ₹1,37,000 for 3× 22Ah Pro.
- **Less availability in India** — mostly genstattu.com or Alibaba.

### Verdict
🔴 **BOM ENTRIES 12, 13, 14 ARE WRONG:** Tattu 12S 25k and 12S 35k **do not exist**. The closest match is **12S 22Ah (Plus/Pro)** or **12S 30Ah (Semi-Solid)**.

**Recommended v7 path:** **3× Tattu 12S 30Ah Semi-Solid (₹1.3–1.7 lakh)** for 3,996 Wh total. This gives ~25 min flight time with 16 L spray at 36 kg MTOW.

**Sources:**
- Tattu Agri 22Ah: https://genstattu.com/tattu-agri-22000mah-44-4v-25c-12s1p-lipo-battery-pack-with-as150-f/
- Tattu Plus 22Ah: https://genstattu.com/tattu-plus-22000mah-44-4v-25c-12s1p-lipo-smart-battery-pack-with-as150-plug/
- Tattu Pro 22Ah: https://robokits.co.in/batteries-chargers/drone-batteries/tattu-lipo-batteries/tattu-12s-smart-lipo-battery/tattu-pro-44-4v-22000mah-25c-12s1p-lipo-smart-battery-pack-with-as150u-f-plug
- Tattu Semi-Solid 30Ah: https://genstattu.com/tattu-semi-solid-state-30000mah-5c-44-4v-12s1p-lipo-battery-pack-with-as150u-f/
- Tattu G-Tech 30Ah datasheet: https://www.grepow.com/semi-solid-state-battery/tattu-12s-30000mah-44-4v-5c-lipo-drone-nmc-battery.html
- Genspow EU: https://gensace.de/products/tattu-nmc811-semi-solid-state-30000mah-5c-44-4v-12s1p-as150u

---

## 10. Charger — SkyRC PC1080 / PC1080neo vs PC1260 (12S)

### 🔴 CRITICAL FINDING

The RFQ lists **SkyRC PC1080 Neo** (line 15). The PC1080 and PC1080neo are **6S chargers**. For a 12S LiPo battery (44.4 V), the correct SkyRC charger is the **PC1260**.

### Spec comparison
| Parameter | **PC1080 (old)** | **PC1080neo** | **PC1260 (correct for 12S)** |
|---|---|---|---|
| Max power | 1,080 W (540 × 2) | 1,080 W (540 × 2) | **1,260 W (630 × 2)** |
| Max current | 20 A × 2 | 20 A × 2 | **12 A × 2** |
| Max cell count | **6S × 2** | **6S × 2** | **12S × 2** |
| Battery type | LiPo / LiHV | LiPo / LiHV | LiPo / LiHV |
| Weight | 4.88 kg | **2.43 kg** (lighter) | 4.88 kg |
| Size | 272×202×118.6 mm | **255×124.6×120 mm** (smaller) | 272×202×118.6 mm |
| Storage mode | YES | YES | YES |
| Balance current | 1.2 A | 1.8 A | 1.5 A |
| Charge time for 22Ah 12S @ 0.5C = 11A | **N/A — won't charge 12S** | **N/A — won't charge 12S** | ~2 hours per pack |
| Price (Zbotic) | **₹18,700 (neo)** | — | not in stock at Zbotic |

### Verdict
🔴 **WRONG CHARGER IN RFQ.** To charge a 12S pack:
- **SkyRC PC1260** (1,260 W, 12 A × 2, 12S max) — the only SkyRC dual-channel 12S charger.
- Or **iCharger 308B Duo / 4010B** (30 A × 2, 12S, 1,300 W) — popular for hobby/ag drones.
- Or **Tattu TA3200 Smart Charger** (Tattu's own 12S charger, ~$800).

**The PC1080neo at ₹18,700 is wasted money** if you have 12S packs. PC1260 is around ₹25–30k in India; iCharger 4010B is ~₹35–45k.

**Sources:**
- PC1080 (SkyRC): https://www.skyrc.com/PC1080_Charger
- PC1080neo: https://www.skyrc.com/pc1080neo
- PC1260 (12S): https://www.skyrc.com/PC1260_CHARGER
- PC1080 manual PDF: https://robu.in/wp-content/uploads/2020/01/PC1080-manual.pdf

---

## 11. PDB — Tarot TL2996 vs Custom 15×5 mm Copper Busbar

### Spec comparison
| Parameter | **Tarot TL2996 (RFQ line 19)** | **Custom 15×5 mm C110 Cu busbar (v7)** |
|---|---|---|
| Topology | PCB with XT90 + XT60 sockets | Bare copper bar with bolt-on lugs |
| Rated current | **480 A** (peak, with 6× ESC connectors) | **200 A continuous**, derated by thermal |
| Max voltage | 12S (50.4 V) | unlimited (insulated bar) |
| Mount | 4× M3 on 44×120 / 36×110 mm | custom CNC bracket |
| Weight | 240 g | ~200 g (bar) + lugs |
| ESC connectors | 6× coaxial | wired directly to busbar with ring lugs |
| Signal hub | **6× PWM signal ports** integrated | separate signal harness to FC |
| Fuse protection | **None** (per-branch fuses NOT included) | 6× 150A MEGA fuses + 300A main fuse |
| XT90 sockets | 2× (12S) + 2× (6S aux) | wired |
| Battery input | 2× 6S in series for 12S, or 1× 12S | single 12S direct |
| IP rating | none (exposed PCB) | IP65 if conformal coated |
| Price (Zbotic) | **₹3,090** | v7 quotes ₹2,500 for bar + ₹800 for pre-charge + ₹800 per fuse = ~₹8,000 total |

### Pros & Cons

#### Tarot TL2996 (RFQ)
**Pros**
- **Plug-and-play** — XT90 sockets, signal hub, screw mounts. 15-minute install.
- Cheap (₹3,090).
- 480 A peak rating handles 6× 80 A motor inrush.
- Built for E616P (Tarot's own 12S agriculture drone frame).
- 2× 6S XT60 aux outputs (for 6S BECs, LED, etc.) — convenient.

**Cons**
- **No fuses on PCB** — a single ESC short will burn the PCB. The 6× 150A MEGA fuses are a separate buy.
- **PCB-trace resistance** at 480 A burst → ~50°C rise in still air. Not designed for **continuous 200 A+** (which the X9 G2L system demands at 36 kg MTOW).
- **XT90 sockets** are 90 A rated each. 6 sockets in parallel = 540 A theoretical, but the PCB traces are the bottleneck.
- **No pre-charge circuit** — connecting a 12S battery to discharged 6× 6800 µF ESC caps = **5,000 A inrush** for 1 ms, welding the XT90 contacts.
- **Signal hub** is PWM only — no CAN bus pass-through for X9 G2L telemetry.

#### Custom busbar (v7)
**Pros**
- **75 mm² cross-section** = 0.26 mΩ end-to-end. At 100 A continuous, voltage drop = 26 mV (negligible).
- **Field-serviceable fuses** — each branch fused with 150A MEGA, replaceable in 30 seconds.
- **Pre-charge circuit** (2× 25Ω 50W in parallel = 12.5Ω, 4 A peak) — **prevents connector welding** on plug-in.
- **Busbar thermal**: hover 87A → +26°C, peak 150A → +77°C (within limits).
- **No PCB to burn** — open copper is more robust to chemical washdown.

**Cons**
- **More assembly** — 30–60 min of wiring vs 15 min for TL2996.
- **No signal hub** — must wire 6× PWM/SBUS signals to FC separately.
- **Heavier wiring** — 8 AWG silicone wire (75 mm²) is heavy and stiff.
- **No plug-and-play** — not for beginners.

### Verdict
🔴 **MISMATCH.** v7's busbar is the **engineering-grade** choice for a 45 kg MTOW drone. TL2996 is fine for **20 kg class** drones (where it was designed), but **at 36 kg MTOW with X9 G2L, the busbar is the right call**.

**However:** if you go with X8 (15 kg/axis) at 25 kg MTOW, the TL2996 is **perfectly adequate** and saves assembly time.

**Sources:**
- Tarot TL2996: http://www.tarotrc.com/Product/Detail.aspx?Id=c602138f-55e7-4be8-b4b5-768260bcddc3&Lang=en
- Flying Tech UK: https://www.flyingtech.co.uk/product/tarot-high-current-heavy-lift-quad-hexa-pdb-signal-hub-12s-480a-tl2996/
- ArrisHobby: https://www.arrishobby.com/products/tarot-12s-480a-high-current-pdb-for-agriculture-drones-tl2996

---

## 12. Power Module — Holybro PM02D vs MAUCH HS-200-LV Hall Sensor

### Spec comparison
| Parameter | **Holybro PM02D HV (RFQ line 20)** | **MAUCH HS-200-LV (v7)** |
|---|---|---|
| Type | **PCB power module with switching regulator** | **Hall-effect current sensor** (separate) |
| Input voltage | 2S–12S (7–50 V) | 5–24 V supply (senses 0–200 A through hole) |
| PCB continuous current | **60 A** | n/a (sensor only, no power throughput) |
| PCB burst current | 100 A <60 s | n/a |
| Max current sensing | **327 A** (with INA228) | 0–200 A (linear) |
| Output to FC | **5.2 V at 3 A max** (regulator) | **0.5–4.5 V analog** to FC ADC |
| Connector | XT60 (input) + Molex CLIK-Mate 6-pin (output) | 3-pin signal wire to FC |
| Compatible FC | **Pixhawk 5X/6X only** (I2C, not analog) | Any FC with analog current input |
| Sensor type | INA228 (I2C digital) | Hall-effect (analog) |
| Accuracy | ±0.5% (with calibration) | ±1% (linearity) |
| Response time | 1 ms (digital filtered) | < 20 µs (analog) |
| Weight | 20 g | ~30 g (sensor only) |
| Price (Zbotic) | **₹2,990** | v7 quotes ₹6,000 (sensor only, no regulator) |

### Pros & Cons

#### Holybro PM02D HV (RFQ)
**Pros**
- **5.2 V regulated output to Pixhawk** — replaces a separate BEC. **One less component.**
- I2C digital data = noise-immune.
- 327 A sensing range — covers full X9 G2L system peak.
- Molex CLIK-Mate 6-pin connector = plug-and-play with 6X.
- Small (20 g), cheap (₹2,990).

**Cons**
- **60 A continuous PCB rating** — at 36 kg MTOW with X9 G2L, peak system current is **100+ A**. **PM02D will overheat** at sustained hover.
- **XT60 input** — 60 A rated. 12S battery at 100 A will melt XT60.
- **5.2 V × 3 A = 15.8 W** — sufficient for FC + GPS + RC + telemetry, but **not for pump** (which is 60–90 W). Still need a separate 12V/15A BEC for the pump.
- **Pixhawk 5X/6X only** — not compatible with Cube Orange+ or Pixhawk 4.
- **Regulator failure = FC brownout** — single point of failure.

#### MAUCH HS-200-LV (v7)
**Pros**
- **0–200 A linear Hall sensor** — accurate to ±1%, < 20 µs response.
- **Separate from power throughput** — sensor is wired in-line with the main power wire, no PCB bottleneck.
- **Universal FC compatibility** — analog 0.5–4.5 V output to any FC's ADC pin.
- **5–24 V supply** — can run from the same 12V BEC as the pump (saves wiring).
- **Industrial-grade** — used in professional UAVs (Freefly, Aersense).

**Cons**
- **Sensor only — no regulator** — still need a 5V BEC (Pixhawk 6C has one built in via Power Brick).
- ₹6,000 vs ₹2,990 = 2× cost.
- Requires manual calibration via Mission Planner (`INS_GYR_CAL`, `BAT_VOLT_MULT`, `BAT_CURR_MULT`).
- 30 g — slightly heavier.

### Verdict
🔴 **MISMATCH.** v7's MAUCH is the **engineering choice** for accurate energy-budget logging on a 36 kg MTOW drone. PM02D is the **hobby choice** for a 5 kg drone. PM02D's 60A PCB will overheat in this application.

**Compromise option:** **MAUCH HS-200-LV + Matek 12V/5V BEC** (₹1,500) = same as v7 with PM02D's BEC function added, ~₹9k total. Slightly more expensive but properly rated.

**Sources:**
- PM02D HV (Holybro): https://holybro.com/products/pm02d-power-module
- PM02D (Flying Tech): https://www.flyingtech.co.uk/product/holybro-pm02d-120a-power-module-for-pixhawk-5x-6x/
- PM02D (NewBeeDrone): https://newbeedrone.com/products/holybro-pm02d-power-module
- MAUCH: not officially distributed online, sourced from UAVGarage/3DXR/RC-Engineer

---

## 13. DC/DC Converters — MEAN WELL NSD10-12S5 / NSD05-12S12 — 🔴 WRONG PART NUMBERS

### The problem

The RFQ lists:
- Line 21: **MEAN WELL NSD10-12S5** — input **9.8–36 VDC**, output 5 V/2 A
- Line 22: **MEAN WELL NSD05-12S12** — **DOES NOT EXIST** in MEAN WELL's catalog

The 12S LiPo battery outputs **44.4 V nominal (50.4 V full charge)**. The NSD10-12S5's input is **9.8–36 VDC** — meaning **it will be destroyed within microseconds** when connected to a 12S battery.

### The correct part numbers for 12S

| Part | Input | Output | Use case |
|---|---|---|---|
| **NSD10-12S5** | 9.8–36 V | 5 V/2 A | 2S–6S battery (NOT 12S) |
| **NSD10-12S12** | 9.8–36 V | 12 V/0.83 A | 2S–6S battery (NOT 12S) |
| **NSD10-48S5** | **22–72 V** | 5 V/2 A | **6S–12S battery** ✅ |
| **NSD10-48S12** | **22–72 V** | 12 V/0.83 A | **6S–12S battery** ✅ |

### Specs (correct NSD10-48S5 for 12S)
| Parameter | Value |
|---|---|
| Input | 22–72 VDC (covers 6S–12S LiPo) |
| Output | 5 V / 2 A (10 W) |
| Efficiency | 75% (at 48 V input) |
| I/O isolation | 1 KVDC |
| Dimensions | 50.8 × 25.4 × 10 mm |
| Weight | 20 g |
| Operating temp | -25 to +70 °C |
| Safety | UL60950-1 |
| EMC | EN55022 class B |
| Price (Mouser/Digi-Key India) | ~₹800–1,200 each |

### Verdict
🔴 **CRITICAL BOM ERROR.** The MEAN WELL NSD10-12S5 and NSD05-12S12 part numbers in the RFQ are **physically incompatible with a 12S battery**. If anyone connects them to the 12S pack, they will **burn out instantly** and possibly catch fire.

**Replace with:**
- **NSD10-48S5** (5 V/2 A for FC + GPS + RC) — ₹1,000
- **NSD10-48S12** (12 V/0.83 A for low-power accessories) — ₹1,000
- Or use a **Vicor DCM3623 or similar** for higher current (12 V/10 A) for the pump BEC.

**v7 design uses 2× 15A BEC** (built into the ESC stack, not external) — different architecture. v7's BECs handle pump + avionics separately to isolate pump noise.

**Sources:**
- MEAN WELL NSD10-S series: https://www.meanwell.co.uk/power-supplies/dc-dc-power-supplies/nsd10-series
- MEAN WELL NSD10-12S5 datasheet (Alldatasheet): https://www.alldatasheet.com/datasheet-pdf/pdf/259066/MEANWELL/NSD10-12S5.html
- MEAN WELL Australia: https://www.meanwellaustralia.com.au/products/NSD10-S
- Alldatasheet PDF: https://www.allelcoelec.de/datasheets.19/nsd10-12s5.pdf

---

## 14. Vibration Pads — RFQ "Vibration Remover pad" vs v7 "G10 Fiberglass"

### Spec comparison
| Parameter | **Generic "vibration remover pad" (RFQ line 11)** | **G10 Fiberglass isolator (v7)** |
|---|---|---|
| Material | usually silicone or rubber | G10/FR4 fiberglass |
| Durometer | varies (15–60 Shore A) | N/A (rigid fiberglass) |
| Natural frequency | 10–30 Hz | depends on geometry, 30–60 Hz typical |
| Use | between FC and frame | between FC and frame |
| Cost | ₹100–500/set | ₹300 each × 6 = ₹1,800 |
| Temp range | -20 to +80 °C (silicone) | -50 to +150 °C (G10) |
| Chemical resistance | poor (silicone) → good (viton) | excellent (fiberglass) |

### Verdict
✅ **MATCH** in function. Generic pads (silicone/rubber) work for most hobby FCs at 5–10 kg drone class. For 36 kg MTOW with X9 G2L (high-vibration 36" prop), **G10 fiberglass pads are recommended** because they don't deform under load (silicone pads can compress and let the FC touch the frame, shorting the vibration isolation).

**Sources:**
- v7 design uses 6× ₹300 G10 pads.
- Hobby-grade alternatives: M3 silicone gimbals (₹50–200).

---

## 15. Summary Tables

### 15.1 Total BOM cost (RFQ vs v7 design vs revised)

| Component | RFQ Price | v7 Price | Notes |
|---|---|---|---|
| 6× propulsion combo (X8 vs X9 G2L) | ₹75,000 (X8) / ₹84,000 (X8) | **₹1,20,000 (X9 motor) + ₹48,000 (ESC) = ₹1,68,000** | X9 is 2.2× cost |
| 1× frame | ₹33,782 | ₹52,000 | v7 includes installation |
| 1× tank | ₹5,548 (10L) | ₹6,500 (16L) | 10L is 17% cheaper, 38% less capacity |
| Flight controller | Jiyi ₹9,200 + Skydroid ₹13,500 | Pixhawk 6C ₹18,000 + RFD868x ₹12,000 + R-XSR ₹3,500 = ₹33,500 | v7 is 3× cost but open-source |
| Pump system | Hobbywing 5L ₹8,788 | SHURflo 8000 ₹8,500 | comparable |
| 2× GPS | Here4 ₹36,538 (1 unit) | **v2: 1× HGLRC M100-5883 = ₹1,599** (budget) / **1× Holybro M9N = ₹7,525** (recommended) | v2 budget is 23× cheaper than Here4; v1 "2× HGLRC M10 Mini" had compass bug |
| 2× LiDAR | ₹9,726 (2× TF02-Pro) | not in design | -₹9,726 if dropped |
| 6× vibration pads | ~₹1,000 | ₹1,800 | comparable |
| 1× battery | ₹60,661 (Tattu 22Ah Pro) | 3× Tattu 30Ah semi-solid = ₹1,30,872 | v7 is 2.2× cost, 2.2× capacity |
| 1× charger | ₹18,700 (PC1080 neo, 6S) | unspecified (PC1260 needed, ~₹25,000) | **PC1080 wrong charger** |
| 1× PDB | Tarot TL2996 ₹3,090 | custom busbar + fuses = ~₹8,000 | v7 is 2.6× cost, 4× engineering |
| 1× power module | PM02D ₹2,990 | MAUCH HS-200-LV ₹6,000 | v7 is properly rated |
| 2× DC/DC | NSD10-12S5 + NSD05-12S12 (wrong) | 2× 15A BEC (in ESC stack) | **RFQ parts are wrong for 12S** |
| **TOTAL (excl. charger/misc)** | **₹2,77,723** | **₹4,55,172** | v7 is 64% more, but justified by MTOW, redundancy, open-source |

### 15.2 Decision matrix

| If you want... | Then choose... | BOM cost |
|---|---|---|
| **Cheapest possible (20 kg class, basic ag drone)** | X8 + Jiyi K++V2 + Skydroid T12 + Here4 + Tarot TL2996 + Hobbywing 5L pump + 10L tank + 1× 22Ah Tattu | ~₹2.2 lakh |
| **Mid-tier (25–30 kg, open-source, ArduPilot)** | X8 + Pixhawk 6C + FrSky R-XSR + RFD868x + 1× M100-5883 (v2) + TL2996 + Hobbywing 5L pump + 10L tank + 2× 22Ah Tattu | ~₹2.8 lakh |
| **v2 design (Path G-A, 25 kg MTOW, open-source, ArduPilot, full engineering)** | **X8 + Pixhawk 6C + R-XSR + RFD868x + 1× HGLRC M100-5883 (or M9N) + custom busbar + MAUCH + SHURflo + 10L tank + 1× Tattu 30 Ah Semi-Solid imported (₹1,06,000) + PC1260 charger + 8 build tools + 6 AWG wire** | **~₹3,70,448** (G-A) / **~₹3,55,948** (G-B with 2× 22Ah) |
| **Commercial ag (Jiyi closed-source, 25 kg)** | X8 + Jiyi K++V2 + Ag++ GCS + Skydroid T12 + Hobbywing 5L pump + 10L tank + 2× 22Ah Tattu + Here4 RTK | ~₹2.6 lakh |

---

## 16. Critical Issues to Fix Before Ordering

1. **🔴 MEAN WELL NSD10-12S5 / NSD05-12S12 are WRONG parts for 12S battery.** Replace with **NSD10-48S5 / NSD10-48S12** (22–72 V input). The "-12S" in the part number means "12V nominal input", NOT "12S battery compatible". This is a dangerous BOM error.

2. **🔴 SkyRC PC1080 / PC1080neo is a 6S charger.** Cannot charge 12S packs. Replace with **SkyRC PC1260** (12S, 1,260 W, 12 A × 2) or **iCharger 4010B**.

3. **🔴 Hobbywing X8 (15 kg/axis) cannot lift v7's 36–45 kg MTOW.** Either downgrade to 25 kg MTOW (with corresponding airframe/ESC revisions) or upgrade to **X9 G2L** (₹20k/axis extra × 6 = ₹1.2 lakh delta).

4. **🔴 Pixhawk Cube Orange+ is over-spec** for v7's requirements. Pixhawk 6C (₹12–18k) is sufficient. Saves ₹20–30k.

5. **🔴 Flight controller architecture fork:** Jiyi K++V2 is **incompatible** with the v7 X9 G2L DroneCAN ESCs. **You cannot mix them.** Pick one path.

6. **🔴 Tattu 12S 25,000 mAh and 35,000 mAh packs don't exist.** Closest are 22,000 mAh (Pro/Plus) and 30,000 mAh (Semi-Solid).

7. **⚠️ The RFQ's 22 lines contain components from TWO different architectural paths** (Jiyi closed-source vs Pixhawk open-source). The v7 design picked the Pixhawk path. **You need to commit to one architecture before placing the order.**

8. **⚠️ The RFQ's spare-parts quantity ("3+2 spare" for X8/X9) is reasonable** — 5 of 6 motors flying is a 17% spare ratio. Industry standard is 10–20%.

---

## 17. Source Document References

### RFQ source
- `COEP RFQ.xlsx` (22 lines, Zbotic SKU mapping, 18%/5% GST, Zbotic product links)

### Design source
- `COEP_Hexacopter_Technical_Report_v7.docx` (the design that the BOM is being checked against)
- `COEP_Hexacopter_Avionics_BOM_Minimal.pdf` (subsidiary BOM)
- `drone_building_guide/00_INDEX.md` through `drone_building_guide/13_vibration_damping.md` (your obsidian build guide with Hobbywing X9, Pixhawk 6C, **HGLRC M100-5883 / Holybro M9N (v2)**, Tattu 30Ah, etc.)
- `COEP_Agricultural_Drone/analysis/02_component_analysis.md` through `22_wiring_diagrams_mermaid.md` (deep dives on cost, architecture, software)

### External datasheets (verified during this review)
- Hobbywing X9 G2L: https://www.hobbywing.com/en/products/x9-g2l
- Hobbywing X8: https://www.hobbywing.com/en/products/xrotor-x8108
- Hobbywing Pump 5L: https://www.hobbywing.com/en/products/one-piece-brushless-water-pump-5l105
- EFT E616P: https://www.effort-tech.com/en/e6
- Jiyi K++ V2: https://www.jiyiuav.com/en/kjjv2.html
- Pixhawk 6C: https://holybro.com/products/pixhawk-6c
- Cube Orange+: https://docs.px4.io/v1.16/en/flight_controller/cubepilot_cube_orangeplus
- Here4: https://docs.cubepilot.org/user-guides/here-4
- u-blox NEO-M9N: https://content.u-blox.com/sites/default/files/NEO-M9N_ProductSummary_UBX-19027207.pdf
- Benewake TF02-Pro: https://en.benewake.com/TF02Pro/index_proid_327.html
- Holybro DroneCAN M9N: https://holybro.com/products/dronecan-m9n-gps
- Holybro PM02D: https://holybro.com/products/pm02d-power-module
- Tarot TL2996: http://www.tarotrc.com/Product/Detail.aspx?Id=c602138f-55e7-4be8-b4b5-768260bcddc3
- Tattu 30Ah semi-solid: https://genstattu.com/tattu-semi-solid-state-30000mah-5c-44-4v-12s1p-lipo-battery-pack-with-as150u-f/
- Tattu 22Ah Pro: https://genstattu.com/tattu-agri-22000mah-44-4v-25c-12s1p-lipo-battery-pack-with-as150-f/
- SkyRC PC1080: https://www.skyrc.com/PC1080_Charger
- SkyRC PC1080neo: https://www.skyrc.com/pc1080neo
- SkyRC PC1260 (12S): https://www.skyrc.com/PC1260_CHARGER
- MEAN WELL NSD10-12S5: https://www.meanwell.co.uk/power-supplies/dc-dc-power-supplies/nsd10-series
- MEAN WELL datasheet PDF: https://www.allelcoelec.de/datasheets.19/nsd10-12s5.pdf
- FrSky R-XSR: https://www.frsky-rc.com/product/r-xsr/
- Skydroid T12: https://uavgarage.com/shop/skydroid-t12-2-4ghz-12ch-intergrated-video-and-telemtry-system/
- Skydroid H12: https://bharatskytech.com/product/skydroid-h12-transmitter-remote-controller-for-agriculture-drones/
- RFD868x: https://rfdesign.com.au/products/rfd868x

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
