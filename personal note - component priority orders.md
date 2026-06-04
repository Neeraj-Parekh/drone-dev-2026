# UAV Component Framework and Web App Specification

This document defines a standard taxonomy for multirotor UAV components, establishes a clear system-criticality grading matrix, and outlines the structural, database, and mathematical requirements for a web-based configuration modeling application.

## 1. System Taxonomy: Component Levels (Part A)

To support logical comparison and component grouping in a web database, all components are classified into seven structured levels representing their physical, electronic, and functional relationships.

```
                  ┌─────────────────────────────────────────┐
                  │          Level 0: UAV System            │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
│     Level 1     │           │     Level 2     │           │     Level 3     │
│   Structural    │           │    Avionics     │           │   Propulsion    │
│  & Mechanicals  │           │   & Control     │           │    & Power      │
└─────────────────┘           └─────────────────┘           └─────────────────┘
         │                             │                             │
         ├─ Frame Kit                  ├─ Flight Controller          ├─ Motors
         ├─ Landing Gear               ├─ External Sensors (IMU/Baro)├─ ESCs
         ├─ Liquid Tank                ├─ Power Distribution Board   ├─ Propellers
         └─ Payload Mounts             └─ DC-DC Converters / BECs    └─ Integrated Combos
         
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
│     Level 4     │           │     Level 5     │           │     Level 6     │
│ Energy Storage  │           │  Nav & Spatial  │           │  Communication  │
└─────────────────┘           └─────────────────┘           └─────────────────┘
         │                             │                             │
         ├─ Battery Packs              ├─ GPS / GNSS Receivers       ├─ RC Transmitters
         ├─ Balance Chargers           ├─ Magnetometers (Compass)    ├─ RC Receivers
         └─ Smart BMS Systems          ├─ Altimeters (LiDAR)         └─ Telemetry Modems
                                       └─ Imaging Payloads (NDVI)
                                       
                                       ▼
                              ┌─────────────────┐
                              │     Level 7     │
                              │ Mission Payload │
                              └─────────────────┘
                                       │
                                       ├─ Spray Pumps
                                       ├─ Nozzles
                                       └─ Flowmeters
```

## 2. Component Criticality & Swap-Rating Matrix (Part B)

When designing custom drones, substituting components to save cost can introduce hidden safety failures or operational bottlenecks. This matrix groups components by their **existence rating** and defines the consequences of downgrading.

| Criticality Grade                             | Definition                                                                                                                   | Core Components Included                                                                                                  | Safe Downgrade Options                                                                                                                            | Consequences of Bad Substitutions                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Grade 1: Critical Non-Negotiable (G1-CNN)** | Components that dictate the physical survival and safe control of the aircraft. Absolutely no compromises on specs.          | • Flight Controller<br><br>• Primary GPS + Compass<br><br>• System-matched BECs<br><br>• Battery Fuses                    | • None.<br><br>• Must be certified, official hardware (e.g., Holybro, CubePilot).                                                                 | • Total loss of control (flyaway / crash).<br><br>• Structural/electrical fire (e.g., using a 6S BEC on a 12S battery).             |
| **Grade 2: Core Negotiable (G2-CN)**          | Required for flight, but variables like capacity, weight, and price can be adjusted based on project targets.                | • Frame Kit<br><br>• Battery Packs<br><br>• Propellers<br><br>• Motors & ESCs                                             | • Dropping from premium batteries (Tattu) to custom local Li-ion builds.<br><br>• Swapping composite frames to standard G10/Carbon tube variants. | • Reduced flight times.<br><br>• Elevated structural vibrations (causing sensor noise).<br><br>• Slower mechanical response curves. |
| **Grade 3: Mission-Dependent (G3-MD)**        | Only required when executing specific commercial work. Can be fully omitted for bench testing or dry-run validation flights. | • Spray Pumps<br><br>• Liquid Tanks<br><br>• Nozzles<br><br>• Flowmeters<br><br>• Multi-spectral Cameras                  | • Manual flow valves instead of digital flowmeters.<br><br>• Commercial RGB camera instead of multispectral NDVI camera.                          | • Inability to execute specific payload operations.<br><br>• Loss of precise fluid application modeling.                            |
| **Grade 4: Premium Optimization (G4-PO)**     | Features that enhance reliability, tracking, and telemetry, but are non-essential for basic operation.                       | • DroneCAN ESC Telemetry<br><br>• Redundant GPS Modules<br><br>• Terrain-following LiDAR<br><br>• Smart BMS Pack Monitors | • Standard PWM-signal ESC control instead of DroneCAN serial feedback.<br><br>• Omitting LiDAR and flying manually or on GPS baro-hold.           | • Higher pilot workload during missions.<br><br>• Loss of real-time diagnostics per motor (current, RPM, temperature).              |
| **Grade 5: Support Tooling (G5-ST)**          | External hardware mandatory for assembly, validation, and safe workspace charging.                                           | • Smoke Stoppers<br><br>• Prop Balancers<br><br>• Precision Scales<br><br>• Safe-Charging Bags                            | • Shared bench equipment (if borrowing from partner labs).                                                                                        | • Component damage during first bench power-up.<br><br>• Blade-tracking issues causing major structural fatigue.                    |

## 3. Web Application Blueprint & Database Schema (Part C)

To resolve the discrepancy between "best-of-the-best" premium components and low-feature budget configurations, the proposed web platform will utilize a relational database to model performance against structural architectures.

### 3.1 Component Database Entity Schema (JSON Definition)

Each component class in the database must implement a standardized JSON format detailing physical properties, limits, and interfaces.

```
{
  "$schema": "[http://json-schema.org/draft-07/schema#](http://json-schema.org/draft-07/schema#)",
  "title": "UAV_Component_Definition",
  "type": "object",
  "required": ["component_id", "level", "criticality", "manufacturer", "model_name", "weight_g", "cost_inr"],
  "properties": {
    "component_id": { "type": "string", "pattern": "^[A-Z]{3}-[0-9]{4}$" },
    "level": { "type": "integer", "minimum": 1, "maximum": 7 },
    "criticality": { "type": "string", "enum": ["G1-CNN", "G2-CN", "G3-MD", "G4-PO", "G5-ST"] },
    "manufacturer": { "type": "string" },
    "model_name": { "type": "string" },
    "weight_g": { "type": "number", "minimum": 0 },
    "cost_inr": { "type": "number", "minimum": 0 },
    "power_specs": {
      "type": "object",
      "properties": {
        "min_voltage_v": { "type": "number" },
        "max_voltage_v": { "type": "number" },
        "continuous_current_a": { "type": "number" },
        "peak_current_a": { "type": "number" }
      }
    },
    "protocols": {
      "type": "array",
      "items": { "type": "string", "enum": ["PWM", "DSHOT", "DroneCAN", "UART", "I2C", "SPI", "SBUS", "MAVLink"] }
    },
    "performance_data": {
      "type": "object",
      "properties": {
        "efficiency_g_w": { "type": "number" },
        "max_thrust_g": { "type": "number" },
        "capacity_mah": { "type": "number" },
        "discharge_c_rating": { "type": "integer" }
      }
    }
  }
}
```

## 4. Web Application Mathematical Engine

The system design relies on physics-based estimations derived from mechanical and electrical component values stored in the database.

### 4.1 System Weight and MTOW Formulations

The dry weight of the aircraft $W_{\text{dry}}$ is the summation of all structural, propulsion, and electronic assemblies:

$$W_{\text{dry}} = m_{\text{frame}} + \left( N_{\text{rotor}} \times m_{\text{prop\_unit}} \right) + m_{\text{battery}} + \sum m_{\text{avionics}} + m_{\text{payload\_dry}}$$

Where:

- $m_{\text{frame}}$ is the empty structural airframe weight (g).
    
- $N_{\text{rotor}}$ is the number of active rotors (e.g., $6$ for a hexacopter).
    
- $m_{\text{prop\_unit}}$ is the combined weight of one motor, ESC, propeller, and mount (g).
    
- $m_{\text{battery}}$ is the total weight of the onboard energy pack (g).
    
- $\sum m_{\text{avionics}}$ represents the sum of the flight controller, GPS, telemetry modems, and internal cabling.
    
- $m_{\text{payload\_dry}}$ is the dry weight of the mission payload (pumps, dry tank, empty camera gimbals).
    

The Maximum Take-Off Weight (MTOW) is calculated by adding the fluid payload mass and any active imaging payload:

$$W_{\text{takeoff}} = W_{\text{dry}} + \left( V_{\text{tank}} \times \rho_{\text{fluid}} \right) + m_{\text{camera}}$$

Where:

- $V_{\text{tank}}$ is the fluid payload volume in Liters ($\text{L}$).
    
- $\rho_{\text{fluid}}$ is the density of the fluid (nominally $1000\text{ g/L}$ for water-based mixtures).
    
- $m_{\text{camera}}$ is the physical mass of the camera payload (g).
    

### 4.2 Flight Safety Constraints

The web application must evaluate whether a specific configuration violates safety profiles by assessing the Thrust-to-Weight Ratio ($TWR$) and frame rating boundaries.

1. **Frame Limit Check:**
    
    $$W_{\text{takeoff}} \le F_{\text{max}}$$
    - _Where_ $F_{\text{max}}$ _is the manufacturer's rated maximum payload limit for the selected frame (e.g.,_ $36000\text{ g}$ _for the EFT E616P)._
        
2. **Thrust-to-Weight Ratio Calculation:**
    
    $$TWR = \frac{N_{\text{rotor}} \times T_{\text{max\_motor}}}{W_{\text{takeoff}}}$$
    - _Where_ $T_{\text{max\_motor}}$ _is the maximum burst thrust achievable per motor (g) at nominal system voltage._
        
    - _Threshold Criteria:_
        
        - $TWR < 1.5$: **Critical Failure (Cannot Take Off / Insufficient Control Control)**
            
        - $1.5 \le TWR < 2.0$: **Marginal Performance (Unstable in gusty environments)**
            
        - $2.0 \le TWR \le 2.5$: **Optimal Safety Margin (Standard for heavy-lift industrial applications)**
            
        - $TWR > 2.5$: **Aggressive Propulsion Over-spec**
            

### 4.3 Hover Electrical Consumption Modeling

To determine the system's hover current draw, we compute the hover thrust required per motor:

$$T_{\text{hover\_motor}} = \frac{W_{\text{takeoff}}}{N_{\text{rotor}}}$$

The total hover power consumption $P_{\text{hover}}$ is computed based on the empirical efficiency curve of the motor/propeller combo at that specific thrust level:

$$P_{\text{hover\_total}} = \frac{W_{\text{takeoff}}}{\eta} + P_{\text{payload\_aux}}$$

Where:

- $\eta$ is the thrust-to-power efficiency metric of the motor at hover load ($\text{g/W}$).
    
- $P_{\text{payload\_aux}}$ is the constant auxiliary power draw of the avionics, sensors, and pumps ($\text{W}$).
    

The nominal operating system current draw $I_{\text{hover}}$ is modeled as:

$$I_{\text{hover\_total}} = \frac{P_{\text{hover\_total}}}{V_{\text{nominal}}}$$

Where:

- $V_{\text{nominal}}$ is the voltage based on cell configuration ($N_{\text{series\_cells}} \times 3.7\text{ V}$). For a standard $12\text{S}$ configuration, $V_{\text{nominal}} = 44.4\text{ V}$.
    

### 4.4 Flight Time Estimations

Hover flight time $t_{\text{flight}}$ in minutes is bounded by the usable Depth of Discharge ($DoD$) to protect battery chemistry:

$$t_{\text{flight}} = \frac{C_{\text{battery}} \times DoD \times 60}{I_{\text{hover\_total}}}$$

Where:

- $C_{\text{battery}}$ is the storage capacity of the battery pack in Ampere-hours ($\text{Ah}$).
    
- $DoD$ is the safety discharge coefficient (typically set to $0.80$ to preserve a $20\%$ reserve).
    

## 5. Comparative Layout Model (UI Structure)

To help users contrast a premium build with a budget configuration, the system generates a unified side-by-side comparative table mapping performance and component statuses.

```
+------------------------------------+------------------------------------+
|            Structure A             |            Structure B             |
|         (Premium Config)           |          (Budget/Normie)           |
+------------------------------------+------------------------------------+
|  Frame: EFT E616P                  |  Frame: EFT E616P                  |
|  Motors: Hobbywing X9 G2L          |  Motors: Hobbywing X8 Plus         |
|  GPS: Holybro M9N (IST8310)        |  GPS: HGLRC M100 Mini (No Compass) |
|  Battery: Tattu 30Ah Semi-Solid    |  Battery: GenX 22Ah Lipo           |
+------------------------------------+------------------------------------+
|  MTOW: 38.2 kg                     |  MTOW: 36.4 kg                     |
|  Thrust Margin: 3.7x (Safe)        |  Thrust Margin: 2.5x (Safe)        |
|  Flight Time: 18.0 min             |  Flight Time: 11.7 min             |
|  Critical Errors: None             |  Critical Errors: 1 Found          |
|                                    |  (Missing compass blocks Auto)     |
+------------------------------------+------------------------------------+
|  Estimated Cost: ₹3,77,557         |  Estimated Cost: ₹2,88,448         |
+------------------------------------+------------------------------------+
```

## 6. Implementation Checkpoints

When building the comparison tool, developers must implement three structural guardrails:

1. **Protocol Handshake Checker:** If a selected motor/ESC utilizes a specialized protocol (e.g., DroneCAN), the application must verify that the selected Flight Controller contains a compatible bus transceiver and port allocation.
    
2. **Magnetometer Presence Check:** If the flight controller's internal IMU does not have an integrated compass, the application must throw a warning if the primary GPS selection does not contain an onboard magnetometer.
    
3. **Voltage Compliance Engine:** Any Level 2 components (BECs, Power Modules) connected directly to the primary battery bus must be flagged if their input voltage tolerance is lower than the fully charged state of the Level 4 battery ($4.2\text{ V} \times N_{\text{series\_cells}}$).