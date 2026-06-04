# Glossary — Technical Terms for Project Managers

> Every term a non-engineer needs to understand this project. No jargon without explanation.

---

## Battery & Power

### 12S
**What:** Battery configuration — 12 lithium cells wired in series.
**Why it matters:** Each cell is 3.7V. 12 × 3.7 = **44.4V nominal**. At full charge: 12 × 4.2 = **50.4V**. This is HIGH VOLTAGE — can cause serious injury or fire.
**Comparison:** Consumer drones use 3S-6S (11-22V). Our 12S is industrial-grade.

### 30Ah
**What:** Battery capacity — 30 amp-hours. Can deliver 30 amps for 1 hour, or 15 amps for 2 hours.
**Why it matters:** Our drone draws ~87A at hover. 30Ah ÷ 87A = **~20 minutes hover time** (with 80% depth of discharge).

### C-Rating
**What:** How fast you can safely drain the battery.
**Example:** 3C on 30Ah = 90A continuous. 5C burst = 150A for short spikes (takeoff).
**Why it matters:** If you draw more than the C-rating allows, the battery overheats and can catch fire.

### Wh (Watt-hours)
**What:** Total energy stored. Voltage × Capacity.
**Example:** 44.4V × 30Ah = **1,332 Wh** per battery pack. Three packs = 3,996 Wh total.

### LiPo (Lithium Polymer)
**What:** Rechargeable battery chemistry. High energy density, lightweight, but volatile if damaged or overcharged.
**Why it matters:** Powers the entire drone. Mishandling = fire risk. ALWAYS balance charge. NEVER leave unattended.

### Semi-Solid State
**What:** Next-gen battery chemistry. Liquid electrolyte partially replaced with solid. More stable, higher energy density.
**Why it matters:** Our Tattu 30Ah uses NMC811 semi-solid. 500+ cycles vs 300 for standard LiPo.

### Pre-Charge Circuit
**What:** Safety circuit that limits inrush current when plugging in battery.
**Why it matters:** Without it: 5,040A instant spark (can melt connectors). With 110Ω resistor: 0.4A safe inrush. **Mandatory above 44V.**

### BEC (Battery Eliminator Circuit)
**What:** Voltage regulator that steps down high voltage (44V) to low voltage (5V or 12V).
**Why it matters:** Flight controller runs on 5V. Pump runs on 12V. Without BEC, they'd fry from 44V.

---

## Motors & Propulsion

### KV Rating
**What:** RPM per volt. Motor spins at KV × Volts (unloaded).
**Example:** 110KV × 44.4V = **4,884 RPM** at full throttle unloaded.
**Why it matters:** Lower KV = more torque = can turn bigger props = more lift efficiency. Higher KV = faster = smaller props = less lift.

### ESC (Electronic Speed Controller)
**What:** Device that converts flight controller commands into motor speed. Reads signal wire, adjusts power to motor.
**Why it matters:** Each motor has its own ESC. If one ESC fails, only that motor stops. Enables single-motor-failure survival.

### DShot
**What:** Digital protocol between flight controller and ESC. DShot600 = 600kbit/s.
**Why it matters:** Faster than old PWM (analog). No calibration needed. Bidirectional — ESC can report RPM back to FC.

### Thrust
**What:** Upward force a motor+prop combination produces. Measured in kg or Newtons.
**Why it matters:** Must exceed total weight. Our motors produce 24kg each × 6 = **144kg max thrust**. Drone weighs 36kg. TWR = 144/36 = **4.0**.

### TWR (Thrust-to-Weight Ratio)
**What:** Total thrust ÷ Total weight. Must be >1.0 to fly.
**Thresholds:** <1.0 = can't fly | 1.0-1.5 = barely flies | 1.5-2.0 = acceptable | 2.0-3.0 = good | >3.0 = excellent.
**Our config:** TWR = 3.33 at 36kg. Even with 1 motor failed, TWR = 2.44 (still flyable).

### Folding Props
**What:** Propellers that fold inward when not spinning. Reduce transport size by 60%.
**Why it matters:** Our 36" props would make the drone 2.4m wide. Folding lets it fit in a car trunk.

---

## Flight Controller & Sensors

### Flight Controller (FC)
**What:** Small computer that reads sensors 500×/second and adjusts motor speeds to keep drone stable.
**Analogy:** Inner ear + cerebellum. Senses orientation, calculates corrections, sends commands.
**Our choice:** Pixhawk 6C — STM32H743 processor, dual IMU, runs ArduCopter firmware.

### IMU (Inertial Measurement Unit)
**What:** Sensor containing gyroscope (measures rotation) and accelerometer (measures acceleration).
**Why it matters:** Primary sensor for flight stability. Our FC has TWO IMUs for redundancy. If one fails, the other takes over.

### EKF2 (Extended Kalman Filter 2)
**What:** Algorithm that fuses data from GPS, IMU, barometer, compass to estimate position and velocity.
**Why it matters:** GPS alone is noisy and slow (10Hz). IMU alone drifts. EKF2 combines both for smooth, accurate position estimates.

### Barometer
**What:** Measures air pressure to estimate altitude.
**Why it matters:** GPS altitude is inaccurate (±10m). Barometer gives ±1m accuracy for low-altitude flight.

### Compass (Magnetometer)
**What:** Measures Earth's magnetic field to determine heading (north direction).
**Why it matters:** GPS gives position but not heading when stationary. Compass provides yaw reference.

### GNSS
**What:** Global Navigation Satellite System. Includes GPS (US), GLONASS (Russia), Galileo (EU), BeiDou (China).
**Why it matters:** Our HGLRC M10 uses ALL four systems. More satellites = better accuracy and reliability.

### HDOP (Horizontal Dilution of Precision)
**What:** Measure of GPS accuracy. Lower = better.
**Thresholds:** <2.0 = good | 2.0-5.0 = acceptable | >5.0 = poor.
**Why it matters:** HDOP < 2.0 means position error < 2.5m. We require this before takeoff.

---

## Communication

### Telemetry
**What:** Wireless data link between drone and ground station. Sends flight data to pilot, receives commands.
**Our choice:** RFD868x — 868MHz, 1W, 40+ km range.

### MAVLink
**What:** Lightweight communication protocol designed for drones. Used by ArduPilot.
**Why it matters:** Standard protocol. Ground station (Mission Planner) uses it to talk to flight controller.

### CRSF (Crossfire)
**What:** RC control protocol by Team BlackSheep. Low latency (4ms), long range.
**Why it matters:** ELRS (open-source version of CRSF) is what we use for pilot control. 10+ km range.

### ELRS (ExpressLRS)
**What:** Open-source RC link. 2.4GHz or 915MHz. Up to 1000Hz refresh rate.
**Why it matters:** Cheaper than Crossfire, same performance. Community-maintained.

### NPNT (No Permission, No Takeoff)
**What:** Indian government requirement. Drone must get digital permission from DGCA before takeoff.
**Why it matters:** Hardware module on drone communicates with DGCA servers. Without it, drone is illegal to fly.

---

## Sensors & AI

### NDVI (Normalized Difference Vegetation Index)
**What:** Formula: (NIR - Red) / (NIR + Red). Measures plant health.
**Range:** -1.0 to +1.0.
**Interpretation:**
- \> 0.6 = Healthy vegetation (dense, green)
- 0.4-0.6 = Moderate stress
- 0.2-0.4 = Severe stress
- < 0.2 = Bare soil, dead plants, water

### NIR (Near-Infrared)
**What:** Light just beyond visible red (780-900nm). Humans can't see it.
**Why it matters:** Healthy plant cells (mesophyll) strongly reflect NIR. Stressed cells don't. This is the basis of NDVI.

### NoIR Camera
**What:** Camera WITHOUT the infrared-cut filter. Normal cameras block NIR to make colors look natural. NoIR lets NIR through.
**Why it matters:** Lets us capture NIR light for NDVI calculation. Add blue filter → red channel captures NIR, blue channel captures visible blue.

### TensorRT
**What:** NVIDIA's tool to optimize neural networks for their GPUs. Converts PyTorch models to run 3-10× faster.
**Why it matters:** Enables real-time AI inference on Jetson Orin (45ms per frame).

### EfficientNet-Lite0
**What:** Small neural network (5.3MB) for image classification. Optimized for edge devices.
**Why it matters:** Classifies each image frame as: healthy crop, stressed crop, weed, or bare soil. 75.1% accuracy, 12ms latency.

### CAN Bus
**What:** Industrial communication bus. Robust, error-resistant, supports multiple devices on same wire.
**Why it matters:** Connects Jetson to flight controller. More reliable than UART for high-data-rate communication.

---

## Spray System

### Diaphragm Pump
**What:** Pump using flexible membrane to move fluid. Self-priming, can run dry, chemical-resistant.
**Our choice:** SHURflo 8000 — 6.8 L/min, 10 bar, 12V DC.

### VMD (Volume Median Diameter)
**What:** Average droplet size. 50% of volume is in droplets smaller than VMD, 50% larger.
**Our nozzle:** 220µm = "medium" classification.
**Too fine (<100µm):** Drifts away in wind. **Too coarse (>400µm):** Wastes chemical.

### Swath Width
**What:** Width of spray pattern on ground. Ours: 2.0m.
**Why it matters:** Drone flies parallel passes with 20% overlap. At 2m swath, passes are 1.6m apart.

### App Rate
**What:** Amount of liquid applied per unit area. Measured in L/ha (liters per hectare).
**Our range:** 200-300 L/ha for ground spraying. Drone spraying: 15-25 L/ha (much less water, same chemical concentration).

---

## Regulatory

### DGCA
**What:** Directorate General of Civil Aviation. India's aviation regulator.
**Why it matters:** All drones >250g must be registered. Commercial operations require type certificate and RPL.

### RPL (Remote Pilot License)
**What:** License to fly drones commercially. 5-7 day training. ₹50,000-75,000. Valid 10 years.
**Why it matters:** Required by law. Our team needs this before any field operations.

### Type Certificate
**What:** Government certification that a drone model meets safety standards.
**Why it matters:** Required for commercial sale/deployment. Issued by QCI-approved agency. Takes 6-12 months, ₹2-5 lakhs.

### TRL (Technology Readiness Level)
**What:** Scale 1-9 measuring how mature a technology is.
- TRL 1-3: Basic research
- TRL 4-6: Lab/prototype demonstration
- TRL 7-8: System demonstrated in relevant environment
- TRL 9: Proven in operational environment
**Our target:** TRL-6 (demonstrate in relevant environment).

### FMEA (Failure Mode and Effects Analysis)
**What:** Systematic method to identify what can fail, how likely, how bad.
**RPN (Risk Priority Number):** Severity × Occurrence × Detection. RPN > 125 = critical.
**Why it matters:** Required for certification. Shows we've thought about everything that can go wrong.

---

## Build & Testing

### Threadlocker
**What:** Chemical (Loctite) applied to bolt threads to prevent loosening from vibration.
**Why it matters:** Drones vibrate intensely. Bolts WILL loosen without it. Blue = removable. Red = permanent.

### Smoke Stopper
**What:** Device that limits current when first powering on. Catches wiring mistakes before they destroy components.
**Why it matters:** First thing you do before connecting battery. If it lights up bright = short circuit. If dim = safe.

### Ground Sweep
**What:** Test with props removed. Run motors to full speed to check for vibration, ESC issues, motor direction.
**Why it matters:** Safest way to verify motor rotation and ESC calibration before risking prop damage.

### Tethered Hover
**What:** Drone tied to ground with 5m rope. Flows just enough to hover at 0.5m.
**Why it matters:** If something goes wrong, drone can't fly away. Safest first hover test.

### Dynamic Notch Filter
**What:** Software filter in ArduPilot that tracks motor RPM and removes vibration at that frequency.
**Why it matters:** Motors vibrate at specific frequencies that change with throttle. Static filters can't keep up. Dynamic notch does.
