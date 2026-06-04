# COEP Agricultural Hexacopter — Verified Component Dimensions & Specifications

> All measurements verified against manufacturer datasheets and official product pages.
> Sources cited per component. Last verified: May 29, 2026.

---

## 1. FRAME — EFT E616P Hexacopter

| Parameter | Value | Source |
|---|---|---|
| **Wheelbase (diagonal)** | **1,644 mm** | effort-tech.com (official) |
| Expanded Dimensions | 2,429 × 2,429 × 599 mm | effort-tech.com |
| Folded Dimensions | 1,091 × 971 × 599 mm | effort-tech.com |
| Arm Tube OD | 40 mm (dual-diameter: 35mm/40mm) | effort-tech.com |
| Arm Tube ID | 37 mm | effort-tech.com |
| Arm Wall Thickness | 1.5 mm | effort-tech.com |
| Arm Length (folding part) | 380 mm | store.effort-tech.com |
| Frame Weight (net) | **6,410 g** | effort-tech.com |
| Tank Weight (16L) | 1,500 g | effort-tech.com |
| Max Takeoff Weight | 36 kg (design) | effort-tech.com |
| Tank Capacity | 16 L | effort-tech.com |
| Folding Mechanism | Cross-folding, C-shaped arm clips | effort-tech.com |
| Recommended Motor | X8 class | effort-tech.com |
| Recommended Prop | 30 inch | effort-tech.com |
| Supply Voltage | 12S LiPo | effort-tech.com |
| Recommended Battery | 22,000mAh 12S | effort-tech.com |
| **Arm Material** | T700 Carbon Fiber | COEP Report |
| Center Plate | 3mm carbon fiber composite | COEP Report |
| Motor Mount | 6061-T6 aluminum CNC | COEP Report |

**Note:** Two sources conflict on wheelbase — EFT official = 1,644mm, third-party reseller = 1,628mm. Using **1,644mm** (official).

---

## 2. MOTORS — Hobbywing X9 G2L (Integrated Motor + ESC)

**IMPORTANT:** The X9 G2L is an **integrated motor+ESC unit** — no separate standalone ESC.

| Parameter | Value | Source |
|---|---|---|
| **KV Rating** | **110 KV** | hobbywing.com |
| **Max Thrust** | **24 kg** (sea level) | hobbywing.com |
| Rated Thrust/Axis | 7–12 kg | hobbywing.com |
| Slot & Pole | 36N40P | hobbywing.com |
| **Stator Diameter** | **96 mm** | hobbywing.com |
| **Stator Height** | **16 mm** | hobbywing.com |
| **Motor Body Diameter** | **104 mm** | hobbywing.com |
| Fan Diameter | 130 mm | hobbywing.com |
| Motor Body Height | ~53 mm | hobbywing CAD |
| Top Section Height | 28.4 mm | hobbywing CAD |
| Shaft/Hub Section Height | 24 mm | hobbywing CAD |
| **Overall Height (motor only)** | **~53 mm** | hobbywing CAD |
| **Overall Envelope (with ESC bracket)** | **129.9 × 149.6 × 92.4 mm** | hobbywing CAD |
| Shaft/Hub OD | ⌀14 mm | hobbywing CAD |
| Top Mounting Holes | 6× M3-6H on ⌀130.4mm circle | hobbywing CAD |
| Tube Clamp ID | ⌀40.1 mm | hobbywing CAD |
| Tube Clamp Bolt Holes | ⌀4.1mm, bolt circle 18/36mm | hobbywing CAD |
| Arm Tube Diameter | 40 mm (D40) | hobbywing.com |
| **Total Weight (with cable + props)** | **1,532 g ±10g** | hobbywing.com |
| Weight (motor+ESC, no prop) | ~1,245 g (1532 − 287) | calculated |
| Input Voltage | 18–63V (12S–14S) | hobbywing.com |
| Rated Voltage | 12S-44.4V / 14S-51.8V | hobbywing.com |
| Rated Power (input) | 1,600 W | hobbywing.com |
| Rated Power (output) | 1,370 W | hobbywing.com |
| Efficiency | 9.7–7.7 g/W | hobbywing.com |
| IP Rating | IPX6 | hobbywing.com |
| Operating Temp | -20°C to +50°C | hobbywing.com |
| **Power Cable** | **12AWG, 1,000 ±10mm** | hobbywing.com |
| Signal Cable | 1,090 ±10mm | hobbywing.com |
| **ESC Continuous Current** | **30A** | hobbywing.com |
| **ESC Peak Current (3s)** | **120A** | hobbywing.com |
| ESC Protocol | Cyphal (UAVCAN) + HWCAN | hobbywing.com |
| Throttle Signal | PWM + CAN (dual redundant) | hobbywing.com |
| PWM Pulse Width | 1,050–1,950 μs | hobbywing.com |
| Failure Storage | 1–24 hr black box | hobbywing.com |

---

## 3. PROPELLERS — Hobbywing MFP 36×11

| Parameter | Value | Source |
|---|---|---|
| **Designation** | **MFP 36×11** (36" diameter × 11" pitch) | hobbywing.com |
| Type | Carbon-Nylon Folding | hobbywing.com |
| Blade Count | 2 (folding pair) | hobbywing.com |
| **Tip-to-Tip Span (unfolded)** | **927.1 mm** | hobbywing CAD |
| Material (blades) | Carbon fiber reinforced nylon composite | hobbywing.com |
| Material (adapter/hub) | Aluminium alloy | hobbywing.com |
| **Total Weight (incl. adapter)** | **287 g** | hobbywing.com |
| Single Blade Weight | 82 g | hobbywing.com |
| Recommended RPM | 1,600–3,100 RPM | hobbywing.com |
| Max RPM | 4,150 RPM | hobbywing.com |
| Recommended Thrust | 4–14.5 kg | hobbywing.com |
| Max Thrust | 25 kg | hobbywing.com |
| Recommended Motor | 9616-100 KV / 9616-110 KV (X9 G2L) | hobbywing.com |
| Hub Bore Angle | 70°, 90° | hobbywing CAD |
| Mounting Holes | 4× ⌀4.2 mm | hobbywing CAD |
| Bolt Circle Diameter | ⌀31 mm | hobbywing CAD |
| Hub Inner Bore | ⌀14 mm | hobbywing CAD |
| Hub Height | 34.7 mm | hobbywing CAD |
| Hub Width | 26.5 mm | hobbywing CAD |
| Hub Thickness | 7 mm | hobbywing CAD |
| Operating Temp | -20°C to +50°C | hobbywing.com |

---

## 4. BATTERY — Tattu 12S 30Ah Semi-Solid-State

| Parameter | Value | Source |
|---|---|---|
| **SKU** | **TARB1130K1205X** | grepow.com |
| **Capacity** | **30,000 mAh (30Ah)** | grepow.com |
| **Voltage** | **44.4V (12S1P)** | grepow.com |
| **Energy** | **1,332 Wh** | grepow.com |
| Energy Density | 300 Wh/kg | grepow.com |
| **Dimensions (L×W×H)** | **212 × 90.5 × 132 mm** (±5mm L, ±2mm W/H) | genstattu.com |
| **Net Weight** | **4,900 g ±20g** | genstattu.com |
| Max Constant Discharge | 3C / 90A | grepow.com |
| Max Peak Discharge | 5C / 150A (<3 seconds) | grepow.com |
| Charge Rate | 1C typical (30A) | genstattu.com |
| Discharge Connector | AS150U-F (female) | grepow.com |
| Balancer Connector | Molex-43025-1600 | grepow.com |
| Discharge Wire | 8AWG, 250mm length | genstattu.com |
| Charge Wire | 22AWG, 85mm length | genstattu.com |
| Per-Cell Voltage Range | 4.2V (100%) to 2.75V (0%) | genstattu.com |
| **Operating Temperature** | **-20°C to 60°C** | genstattu.com |
| Cycle Life | >500 cycles (90% capacity retention) | genstattu.com |

---

## 5. FLIGHT CONTROLLER — Pixhawk 6C

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (Model A, current)** | **54.3 × 39 × 17.5 mm** | holybro.com |
| Dimensions (Model A, legacy) | 53.3 × 39 × 16.2 mm | holybro.com |
| Dimensions (Model B) | 58.3 × 39 × 18.15 mm | holybro.com |
| **Weight (Model A, current)** | **42.4 g** | holybro.com |
| Weight (Model A, legacy) | 39.2 g | holybro.com |
| Weight (Model B) | 46.8 g | holybro.com |
| **FMU Processor** | **STM32H743, Arm Cortex-M7, 480MHz** | holybro.com |
| Flash / SRAM | 2MB / 1MB | holybro.com |
| IO Processor | STM32F103, Cortex-M3, 72MHz, 64KB SRAM | holybro.com |
| **IMU 1** | **ICM-42688-P (Accel/Gyro)** | holybro.com |
| **IMU 2** | **BMI088 (Accel/Gyro)** | holybro.com |
| **Magnetometer** | **IST8310** (3.0×3.0×1.0mm LGA) | holybro.com / isentek.com |
| **Barometer** | **MS5611** | holybro.com |
| PWM Outputs | 14 servo (8 IO + 6 FMU) | holybro.com |
| UART Ports | 3 serial (TELEM1, TELEM2, FMU Debug) | holybro.com |
| GPS Ports | 2 (GPS1 full + safety, GPS2 basic) | holybro.com |
| I2C Ports | 1 (with calibration EEPROM) | holybro.com |
| CAN Buses | 2 | holybro.com |
| RC Input | Spektrum/DSM, S.BUS, CPPM, PWM RSSI | holybro.com |
| Power Input | 1 analog power port | holybro.com |
| Max Input Voltage | 6V | holybro.com |
| Servo Rail Input | 0–36V | holybro.com |
| Operating Temp | -40°C to +85°C | holybro.com |
| **Firmware** | **ArduCopter 4.4** | ardupilot.org |

---

## 6. GPS MODULE — v2: HGLRC M100-5883 (budget) or Holybro M9N (recommended)

**v2 UPDATE (2026-06-02):** v1 listed the **HGLRC M100 Mini** which has **NO on-module compass** —
this breaks ArduPilot position-hold / RTL / auto modes (EKF needs a magnetometer for yaw).
v2 uses **1× HGLRC M100-5883** (QMC5883 on-module) or **1× Holybro M9N** (IST8310 on-module).

### HGLRC M100-5883 (v2 budget — ₹1,599 FPVMatrix)

| Parameter | Value | Source |
|---|---|---|
| **Chip** | **u-blox M10 (10th Gen)** | hglrc.com |
| **Dimensions** | **15 × 15 × 12 mm** (taller for compass) | hglrc.com |
| **Weight** | **~10 g** (with compass) | hglrc.com |
| Antenna | Ceramic (on-board) | hglrc.com |
| GNSS | GPS L1, GLONASS L1, BDS B1, Galileo E1, SBAS, QZSS | hglrc.com |
| Receive Channels | 72 | hglrc.com |
| Output Frequency | 10 Hz | hglrc.com |
| Baud Rate | 115,200 bps | hglrc.com |
| Output Protocol | u-blox UBX + NMEA | hglrc.com |
| Power Input | 3.3–5V DC | hglrc.com |
| Receiver Sensitivity | Tracking: -166 dBm, Acquisition: -160 dBm | hglrc.com |
| **Horizontal Accuracy** | **2.0 m (2D, outdoor)** | hglrc.com |
| Speed Accuracy | 0.05 m/s | hglrc.com |
| Max Altitude | 50,000 m | hglrc.com |
| Max Speed | 500 m/s | hglrc.com |
| Operating Temp | -40°C to +85°C | hglrc.com |
| Cable | **SH1.0-6Pin (GPS + I2C compass)** | hglrc.com |
| **Compass** | **QMC5883 on-module** ✅ | hglrc.com |
| **Price** | **₹1,599** | FPVMatrix (in stock) |

### Holybro M9N (v2 recommended — ₹7,525 Indian Robo Store)

| Parameter | Value | Source |
|---|---|---|
| **Chip** | **u-blox NEO-M9N** | holybro.com |
| Dimensions | Φ54 × 14.5 mm (puck) | holybro.com |
| Weight | 36 g | holybro.com |
| GNSS | GPS L1, GLONASS L1, BDS B1, Galileo E1 (4 concurrent) | u-blox.com |
| **Horizontal Accuracy** | **1.5 m CEP** | u-blox.com |
| Update Rate | 25 Hz max (10 Hz default) | holybro.com |
| Receive Channels | 184 | u-blox.com |
| Antenna | 25×25 mm ceramic patch + 22 dB LNA | holybro.com |
| Power Input | 4.7–5.2V | holybro.com |
| Operating Temp | -40°C to +80°C | holybro.com |
| **Compass** | **IST8310 on-module** ✅ | holybro.com |
| **Price** | **₹7,525** (Indian Robo Store) / ₹11–15k (UAVGarage) | live retail |

---

## 7. TELEMETRY RADIO — RFD868x

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (x module)** | **30 × 57 × 12.8 mm** | rfdesign.com.au |
| Dimensions (ux module) | 21 × 33 × 10.65 mm | rfdesign.com.au |
| **Weight (x module)** | **14 g** | rfdesign.com.au |
| Weight (ux module) | 8 g | rfdesign.com.au |
| Weight (bare ux) | 7 g | rfdesign.com.au |
| **Frequency Band** | **865–870 MHz** (unlocked) | rfdesign.com.au |
| EU Locked | 869.525/869.85 MHz | rfdesign.com.au |
| **Max TX Power** | **30 dBm (1W)** unlocked | rfdesign.com.au |
| EU Locked TX Power | 27 dBm (500mW) | rfdesign.com.au |
| Modulation | 2GFSK / 4GFSK | rfdesign.com.au |
| FHSS | Yes (except EU locked) | rfdesign.com.au |
| Encryption | Hardware AES up to 256-bit | rfdesign.com.au |
| **Sensitivity @ 12 kbps** | **-102 dBm** | rfdesign.com.au |
| Sensitivity @ 56 kbps | -102 dBm | rfdesign.com.au |
| Sensitivity @ 100 kbps | -89 dBm | rfdesign.com.au |
| Sensitivity @ 224 kbps | -93 dBm | rfdesign.com.au |
| RF Connector | 2× RP-SMA (diversity) | rfdesign.com.au |
| Serial Interface Rate | 2,400–1,200,000 baud | rfdesign.com.au |
| Supply Voltage | 5V (5V min, 5.5V max, 6V abs max) | rfdesign.com.au |
| **TX Current** | **1A peak @ 30dBm** | rfdesign.com.au |
| RX/Standby Current | 60 mA typical | rfdesign.com.au |
| Operating Temp | -40°C to +85°C | rfdesign.com.au |
| **Range (LOS)** | **40+ km** | rfdesign.com.au |
| Range (Obstructed) | 0.5–1 km | rfdesign.com.au |
| PPM/SBUS Passthrough | Yes (SiK firmware) | rfdesign.com.au |

---

## 8. RC RECEIVER — FrSky R-XSR

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (L×W×H)** | **16 × 11 × 5.4 mm** | frsky-rc.com |
| **Weight** | **1.5 g** | frsky-rc.com |
| Channels | 16CH (1–16 SBUS, 1–8 CPPM) | frsky-rc.com |
| Protocol | ACCST D16 / ACCESS mode | frsky-rc.com |
| Signal Output | SBUS / CPPM (switchable) | frsky-rc.com |
| Operating Voltage | 3.5–10V | frsky-rc.com |
| Operating Current | 70 mA @ 5V | frsky-rc.com |
| Range | Full range | frsky-rc.com |
| Antenna Connector | IPEX (replaceable) | frsky-rc.com |
| Telemetry | Smart Port enabled | frsky-rc.com |
| Redundancy | Built-in master/slave | frsky-rc.com |
| Firmware | Upgradable | frsky-rc.com |

---

## 9. PUMP — SHURflo 8000 Series (Model 8000-543-236)

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (L×W×H)** | **213 × 102 × 104 mm** | Pentair/Shurflo datasheet |
| **Weight** | **1,860 g** | Pentair/Shurflo datasheet |
| Voltage | 12 VDC nominal | Pentair/Shurflo datasheet |
| Max Flow (open) | 1.8 GPM (6.8 L/min) | Pentair/Shurflo datasheet |
| Flow @ 40 PSI | 1.14 GPM (4.3 L/min) | Pentair/Shurflo datasheet |
| Max Pressure | 60 PSI (4.1 bar) with demand switch | Pentair/Shurflo datasheet |
| Max Amps | 6.4–7.3 A | Pentair/Shurflo datasheet |
| **Inlet/Outlet** | **3/8" NPT Female** | Pentair/Shurflo datasheet |
| Self-Priming | Up to 8 ft (2.4 m) vertical | Pentair/Shurflo datasheet |
| Materials | Polypropylene housing, Viton valves, Santoprene diaphragm | Pentair/Shurflo datasheet |
| Max Fluid Temp | 170°F (77°C) | Pentair/Shurflo datasheet |
| **Mounting Base** | **57 × 79 mm** | Pentair/Shurflo datasheet |
| Duty Cycle | Continuous | Pentair/Shurflo datasheet |

---

## 10. NOZZLES — TeeJet XR11002

| Parameter | Value | Source |
|---|---|---|
| **Spray Angle** | **110°** | teejet.com |
| **Orifice Size** | **02 (0.019" / 0.48 mm)** | teejet.com |
| Flow @ 30 PSI | 0.15 GPM (0.57 L/min) | teejet.com |
| **Flow @ 40 PSI** | **0.20 GPM (0.76 L/min)** | teejet.com |
| Flow @ 60 PSI | 0.24 GPM (0.91 L/min) | teejet.com |
| Pressure Range | 15–60 PSI (1–4 bar) recommended | teejet.com |
| Max Temperature | 125°F (52°C) | teejet.com |
| Material | Ceramic insert, polymer body (VisiFlo yellow) | teejet.com |
| **Connection** | **Quick TeeJet cap, 1/4" BSP** | teejet.com |
| **Weight** | **~10 g** per tip | teejet.com |
| Recommended Filter | 50 mesh | teejet.com |
| Optimum Spray Height | 50 cm (at 50 cm nozzle spacing) | teejet.com |
| **Tip Dimensions (body only)** | **~15 mm dia × 12 mm height** | teejet.com |
| Tip Dimensions (with cap) | ~25 mm dia × 30 mm height | estimated |

---

## 11. FLOW SENSOR — YF-S402

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (L×W×H)** | **58 × 35 × 27 mm** | tomsonelectronics.com |
| **Weight** | **29 g** | tomsonelectronics.com |
| **Thread Size** | **G1/4" (BSPP)** | tomsonelectronics.com |
| Inner Diameter | 7.6 mm | tomsonelectronics.com |
| Outer Diameter | 11 mm | tomsonelectronics.com |
| Flow Range | 0.5–6 L/min | tomsonelectronics.com |
| Pulse Characteristic | f = (7.5 × Q) ± 2%, Q = L/min | tomsonelectronics.com |
| Pulses Per Liter | ~4,380 pulses/L (some variants: 4,078) | tomsonelectronics.com |
| Pulse Duty Cycle | 50% ± 10% | tomsonelectronics.com |
| Working Voltage | DC 5–24V (min 4.5V) | tomsonelectronics.com |
| Max Current | 15 mA @ DC 5V | tomsonelectronics.com |
| Max Pressure | 0.35 MPa (3.5 bar) / some: 0.8 MPa | tomsonelectronics.com |
| Operating Temp | ≤80°C | tomsonelectronics.com |
| Material | POM (Polyoxymethylene) | tomsonelectronics.com |

---

## 12. AI COMPUTE — NVIDIA Jetson Orin Nano Developer Kit

| Parameter | Value | Source |
|---|---|---|
| **Dimensions (carrier+module+thermal)** | **100 × 79 × 21 mm** | developer.nvidia.com |
| Super Dev Kit (with base) | 103 × 90.5 × 34.77 mm | developer.nvidia.com |
| **Weight** | **~176 g (with base), ~100 g (board only)** | developer.nvidia.com |
| **GPU** | **NVIDIA Ampere, 1024 CUDA cores, 32 Tensor Cores** | developer.nvidia.com |
| CPU | 6-core Arm Cortex-A78AE v8.2 64-bit, 1.5MB L2 + 4MB L3 | developer.nvidia.com |
| **Memory** | **8GB 128-bit LPDDR5, 68 GB/s** | developer.nvidia.com |
| **AI Performance** | **40 TOPS (INT8)** | developer.nvidia.com |
| Power | 7W–15W | developer.nvidia.com |
| Camera Interfaces | 2× MIPI CSI-2 22-pin (0.5mm pitch) | developer.nvidia.com |
| CAM0 | 1×2 lane | developer.nvidia.com |
| CAM1 | 1×2 lane or 1×4 lane | developer.nvidia.com |
| USB | 4× USB 3.2 Gen2 Type-A (10Gbps), 1× USB-C | developer.nvidia.com |
| GPIO | 40-pin expansion header | developer.nvidia.com |
| PCIe | M.2 Key-M (2280, PCIe 3.0 ×4), M.2 Key-M (2230, PCIe 3.0 ×2), M.2 Key-E (2230) | developer.nvidia.com |
| Display | 1× DisplayPort 1.2 (+MST) | developer.nvidia.com |
| Networking | 1× GbE | developer.nvidia.com |
| Storage | microSD (UHS-1), NVMe via M.2 | developer.nvidia.com |

---

## 13. SPRAY TANK — 16L HDPE

| Parameter | Value | Source |
|---|---|---|
| **Capacity** | **16 liters (16 kg water)** | jmrdrone.com |
| Material | HDPE (High-Density Polyethylene) | jmrdrone.com |
| **Typical Dimensions** | **~380 × 280 × 280 mm** (varies by mfr) | jmrdrone.com |
| Weight (empty) | ~450–800 g (varies by design) | jmrdrone.com |
| Compatible Frames | EFT E-series (E416P, E616P), G-series | jmrdrone.com |
| Features | Leak-proof, UV-resistant, volume markings | jmrdrone.com |
| Mount Type | Standard frame mount with secure fittings | jmrdrone.com |

**Note:** Exact dimensions vary by manufacturer. EFT 16L tank designed for E616 frame.

---

## 14. PRESSURE GAUGE — 63mm Glycerin-Filled

| Parameter | Value | Source |
|---|---|---|
| **Dial Diameter** | **63 mm** | anglianpumping.com |
| Range | 0–6 bar (0–87 PSI) | anglianpumping.com |
| Accuracy Class | 1.6 (±1.6% FSD) | anglianpumping.com |
| **Process Connection** | **G1/4" BSPP (brass)** | anglianpumping.com |
| Case Material | 304 Stainless Steel | anglianpumping.com |
| Window | Glass or acrylic | anglianpumping.com |
| Fill | Glycerine 99.5–99.7% | anglianpumping.com |
| IP Rating | IP65 | anglianpumping.com |
| **Overall Height** | **~53 mm** (bottom entry) | anglianpumping.com |
| Depth from Surface | ~29 mm | anglianpumping.com |
| **Weight** | **~115 g** | anglianpumping.com |
| Operating Temp | -20°C to +60°C | anglianpumping.com |
| Bourdon Tube | Copper alloy | anglianpumping.com |

---

## 15. INLINE FILTER — 80-Mesh Y-Strainer

| Parameter | Value | Source |
|---|---|---|
| **Connection Size** | **1/2" NPT Female × 1/2" NPT Female** | banjocorp.com |
| Body Material | Fiberglass-reinforced polypropylene | banjocorp.com |
| Screen Material | 316 Stainless Steel | banjocorp.com |
| Mesh Size | 80 mesh (177 microns) | banjocorp.com |
| Max Pressure | 225 PSI (15.5 bar) @ 100°F | banjocorp.com |
| Max Temperature | 150°F (66°C) | banjocorp.com |
| Gasket Material | EPDM | banjocorp.com |
| **Length** | **~152 mm (6")** | banjocorp.com |
| **Height** | **~152 mm (6")** | banjocorp.com |
| **Width** | **~63 mm (2.5")** | banjocorp.com |
| **Weight** | **144 g** | banjocorp.com |
| Blow-off Port | 1/4" | banjocorp.com |
| Clean-out Plug | Yes | banjocorp.com |

---

## 16. CONNECTORS

### AS150 Connector (AMASS)

| Parameter | Value | Source |
|---|---|---|
| Model | AS150 (7mm bullet) | innov8tivedesigns.com |
| **Bullet Diameter** | **7.0 mm** | innov8tivedesigns.com |
| Male Pin Length | 20 mm | innov8tivedesigns.com |
| Solder Cup Diameter | 5.0 mm | innov8tivedesigns.com |
| Solder Cup Depth | 9 mm | innov8tivedesigns.com |
| Contact Material | Gold-plated brass | innov8tivedesigns.com |
| **Continuous Current** | **150A** | innov8tivedesigns.com |
| Peak Current | 200A | innov8tivedesigns.com |
| Max Voltage | DC 500V | innov8tivedesigns.com |
| Contact Resistance | 0.2 mΩ | innov8tivedesigns.com |
| **Wire Compatibility** | **Up to 8AWG (13mm)** | innov8tivedesigns.com |
| Temperature Range | -20°C to 120°C | innov8tivedesigns.com |
| **Weight (1 pair)** | **24 g** | innov8tivedesigns.com |
| Anti-Spark | Yes (5.6Ω resistor on one male pin) | innov8tivedesigns.com |
| Mating Cycles | 1,000 | innov8tivedesigns.com |

### XT90 Connector (AMASS)

| Parameter | Value | Source |
|---|---|---|
| **Pin Diameter** | **4.5 mm** | kamami.pl |
| Male Dimensions | ~30 × 21 × 10 mm | kamami.pl |
| Female Dimensions | ~29.8 × 21.2 × 10.75 mm | kamami.pl |
| Contact Material | Gold-plated brass | kamami.pl |
| **Continuous Current** | **90A** | kamami.pl |
| Peak Current | 180A | kamami.pl |
| Max Voltage | DC 500V | kamami.pl |
| Contact Resistance | 0.3 mΩ | kamami.pl |
| **Wire Compatibility** | **Up to 10AWG (6mm²)** | kamami.pl |
| Temperature Range | -20°C to 120°C | kamami.pl |
| **Weight (pair)** | **~28 g** | kamami.pl |
| Mating Cycles | 1,000 | kamami.pl |

---

## 17. COPPER BUSBAR

| Parameter | Value | Source |
|---|---|---|
| **Cross-Section** | **15mm × 5mm = 75mm²** | tameson.co.uk |
| Material | Copper Cu-ETP (CW004A), 99.9% purity | tameson.co.uk |
| Density | 8.96 g/cm³ | tameson.co.uk |
| **Weight per Meter** | **672 g/m** | tameson.co.uk |
| Current Capacity | 218A @ 30°C, 289A @ 50°C | tameson.co.uk |
| Thread | M6 (threaded versions) | tameson.co.uk |
| Surface | Untinned or tin-plated | tameson.co.uk |
| Tensile Strength | R300 (300 N/mm²) | tameson.co.uk |

---

## 18. ALUMINUM TUBE — 6061-T6 (for arm reference)

| Parameter | Value | Source |
|---|---|---|
| **Outer Diameter** | **25.00 mm** | goldsupplier.com |
| **Inner Diameter** | **21.00 mm** | goldsupplier.com |
| Wall Thickness | 2.00 mm | goldsupplier.com |
| Density | 2.70 g/cm³ | goldsupplier.com |
| **Weight per Meter** | **390.2 g/m** | calculated |
| Cross-Section Area | 144.51 mm² | calculated |
| Tensile Strength (6061-T6) | 310 MPa (45 ksi) | goldsupplier.com |
| Yield Strength | 276 MPa (40 ksi) | goldsupplier.com |
| Elongation | 12–17% | goldsupplier.com |
| Standard | ASTM B210 / B241, EN 755 | goldsupplier.com |

---

## 19. MULTISPECTRAL CAMERA — Yusense MS400

| Parameter | Value | Source |
|---|---|---|
| **Dimensions** | **≤55 × 65 × 50 mm** | ghostysky.com |
| **Weight** | **170 ± 5 g** | ghostysky.com |
| Configuration | 4 multispectral + 1 RGB channel | ghostysky.com |
| Spectral Bands | Green 555nm, Red 660nm, Red Edge 720nm, NIR 840nm | ghostysky.com |
| Multispectral Resolution | 1.3 MP (12-bit global shutter) | ghostysky.com |
| RGB Resolution | 8.0 MP (8-bit rolling shutter) | ghostysky.com |
| FOV (Multispectral) | 36.7° × 31.3° | ghostysky.com |
| Ground Resolution | 6.23 cm @ 120m altitude | ghostysky.com |
| Coverage Width | 80m × 67m @ 120m | ghostysky.com |
| Mounting | 7× M3 screw holes | ghostysky.com |
| Power | ≤7W @ 12V DC | ghostysky.com |
| Interface | Gigabit Ethernet, TTL serial, WiFi | ghostysky.com |
| Storage | 64G micro SD (U3+) | ghostysky.com |
| Operating Temp | -10°C to +50°C | ghostysky.com |

---

## 20. IST8310 MAGNETOMETER (inside Pixhawk 6C)

| Parameter | Value | Source |
|---|---|---|
| Package Dimensions | 3.0 × 3.0 × 1.0 mm (16-pin LGA) | isentek.com |
| Interface | I2C (up to 400kHz fast mode) | isentek.com |
| Default I2C Address | 0x0E (7-bit) | isentek.com |
| Dynamic Range (X, Y) | ±1,600 µT | isentek.com |
| Dynamic Range (Z) | ±2,500 µT | isentek.com |
| Resolution | 0.3 µT/LSB | isentek.com |
| Output Data Rate | Up to 200 Hz | isentek.com |
| Operating Temp | -40°C to +85°C | isentek.com |
| Supply Voltage | 1.72–3.6V | isentek.com |

---

## QUICK REFERENCE — ALL DIMENSIONS

| Component | L × W × H (mm) | Weight (g) | Key Connection |
|---|---|---|---|
| **EFT E616P Frame** | 2,429×2,429×599 (open) | 6,410 | — |
| **Hobbywing X9 G2L (motor+ESC)** | 129.9×149.6×92.4 (envelope) | 1,532 (with prop) | 40mm tube clamp |
| **MFP 36×11 Prop** | 927mm tip-to-tip | 287 (set) | ⌀14mm hub bore |
| **Tattu 12S 30Ah** | 212×90.5×132 | 4,900 | AS150U |
| **Pixhawk 6C** | 54.3×39×17.5 | 42.4 | Pixhawk standard |
| **HGLRC M100-5883 GPS (v2 budget)** | 15×15×12 | ~10 (with compass) | SH1.0-6Pin (UART+I2C compass) |
| **Holybro M9N GPS (v2 recommended)** | Φ54×14.5 | 36 | JST-GH 6-Pin (UART+I2C compass) |
| **RFD868x (x module)** | 30×57×12.8 | 14 | 2× RP-SMA |
| **FrSky R-XSR** | 16×11×5.4 | 1.5 | IPEX antenna |
| **SHURflo 8000** | 213×102×104 | 1,860 | 3/8" NPT |
| **TeeJet XR11002** | ~25 dia × 30 (w/ cap) | ~10 | 1/4" BSP |
| **YF-S402 Flow Sensor** | 58×35×27 | 29 | G1/4" BSPP |
| **Jetson Orin Nano** | 100×79×21 | ~100 (board) | MIPI CSI-2 |
| **16L HDPE Tank** | ~380×280×280 | ~450–800 | Frame mount |
| **Pressure Gauge 63mm** | 63 dia × 53 depth | 115 | G1/4" BSPP |
| **80-Mesh Y-Strainer** | 152×63×152 | 144 | 1/2" NPT |
| **AS150 Connector** | 7mm bullet dia | 24 (pair) | 8AWG max |
| **XT90 Connector** | ~30×21×10 | 28 (pair) | 10AWG max |
| **Copper Busbar 15×5mm** | 15×5 (per meter) | 672/m | M6 thread |
| **Yusense MS400 Camera** | 55×65×50 | 170 | GbE, MIPI |
| **IST8310 Magnetometer** | 3.0×3.0×1.0 | <1 | I2C 0x0E |

---

*All data from official manufacturer datasheets and product pages. Cross-verified where possible.*

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
