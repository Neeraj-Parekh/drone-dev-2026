# COEP Agricultural Hexacopter — Architecture Diagrams

> All mermaid diagrams for the drone project. Open in Obsidian for live rendering.

---

## 1. System Architecture

```mermaid
graph TB
    subgraph BATTERY["🔋 BATTERY — 3× Tattu 12S 30Ah"]
        B1["Pack 1: 44.4V 30Ah 1332Wh"]
        B2["Pack 2: 44.4V 30Ah 1332Wh"]
        B3["Pack 3: 44.4V 30Ah 1332Wh"]
    end

    subgraph POWER["⚡ POWER DISTRIBUTION"]
        BUS["Copper Busbar 15×5mm"]
        MFUSE["300A MEGA Main Fuse"]
        F1["150A Fuse 1"] & F2["150A Fuse 2"] & F3["150A Fuse 3"]
        F4["150A Fuse 4"] & F5["150A Fuse 5"] & F6["150A Fuse 6"]
        B12V["12V BEC → Pump, LEDs"]
        B5V["5V BEC → FC, GPS, Jetson, Telemetry, RC"]
    end

    subgraph PROPULSION["🚁 PROPULSION — 6× Hobbywing X9 G2L"]
        E1["ESC 1"] --> M1["Motor 1: 110KV 24kg"] --> P1["MFP 36×11"]
        E2["ESC 2"] --> M2["Motor 2: 110KV 24kg"] --> P2["MFP 36×11"]
        E3["ESC 3"] --> M3["Motor 3: 110KV 24kg"] --> P3["MFP 36×11"]
        E4["ESC 4"] --> M4["Motor 4: 110KV 24kg"] --> P4["MFP 36×11"]
        E5["ESC 5"] --> M5["Motor 5: 110KV 24kg"] --> P5["MFP 36×11"]
        E6["ESC 6"] --> M6["Motor 6: 110KV 24kg"] --> P6["MFP 36×11"]
    end

    subgraph FLIGHT["🛩️ FLIGHT CONTROL"]
        FC["Pixhawk 6C<br/>STM32H743<br/>ArduCopter 4.4"]
        GPS1["GPS #1 M10"]
        GPS2["GPS #2 M10 (Redundancy)"]
        COMP["Compass (Internal)"]
        BARO["Barometer (Internal)"]
    end

    subgraph COMM["📡 COMMUNICATION"]
        TEL["RFD868x 865-867MHz 1W 40+km"]
        RC["FrSky R-XSR 2.4GHz"]
        GCS["Ground Control Station"]
    end

    subgraph SPRAY["💧 SPRAY SYSTEM"]
        TANK["16L HDPE Tank (4 baffles)"]
        PUMP["SHURflo 8000 5.3L/min"]
        FS["YF-S402 Flow Sensor"]
        N1["XR11002"] & N2["XR11002"] & N3["XR11002"] & N4["XR11002"]
    end

    subgraph AI["🤖 AI COMPUTE"]
        JET["Jetson Orin Nano 40TOPS"]
        CAM["Multispectral Camera"]
    end

    BATTERY -->|"AS150"| POWER
    BUS --> MFUSE
    MFUSE --> F1 & F2 & F3 & F4 & F5 & F6
    MFUSE --> B12V & B5V
    F1-->E1 & F2-->E2 & F3-->E3 & F4-->E4 & F5-->E5 & F6-->E6
    B12V --> PUMP
    B5V --> FC & JET & GPS1 & GPS2 & TEL & RC
    FC --- GPS1 & GPS2 & COMP & BARO
    TEL <--> GCS
    TANK --> PUMP --> FS --> N1 & N2 & N3 & N4
    JET --- CAM
    JET <-->|"CAN bus"| FC
    FC -.->|"PWM"| PUMP

    style BATTERY fill:#c8e6c9,stroke:#2e7d32
    style POWER fill:#fff9c4,stroke:#f9a825
    style PROPULSION fill:#bbdefb,stroke:#1565c0
    style FLIGHT fill:#e1bee7,stroke:#7b1fa2
    style COMM fill:#ffccbc,stroke:#d84315
    style SPRAY fill:#b3e5fc,stroke:#0277bd
    style AI fill:#dcedc8,stroke:#558b2f
```

---

## 2. Power Distribution Tree

```mermaid
graph TD
    subgraph BATTERY_BANK["BATTERY BANK — 3× Tattu 12S 30Ah · 44.4V · 3996Wh"]
        BAT1["Pack 1: AS150"]
        BAT2["Pack 2: AS150"]
        BAT3["Pack 3: AS150"]
    end

    subgraph MAIN_BUS["MAIN POWER BUS"]
        BUSBAR["Copper Busbar 15×5mm"]
        PRE["Pre-Charge: 2× 25Ω 50W"]
        MAINFUSE["300A MEGA Fuse"]
    end

    subgraph ESC_FUSES["ESC FUSE BANK"]
        FX1["150A→ESC1"] & FX2["150A→ESC2"] & FX3["150A→ESC3"]
        FX4["150A→ESC4"] & FX5["150A→ESC5"] & FX6["150A→ESC6"]
    end

    subgraph BECS["BEC BRANCHES"]
        B12V["12V BEC → Pump, LEDs"]
        B5V["5V BEC → FC, GPS, Jetson, Telemetry, RC"]
    end

    BAT1 & BAT2 & BAT3 -->|"AS150 8AWG"| BUSBAR
    BUSBAR -.->|"Pre-charge (power-up)"| PRE
    BUSBAR --> MAINFUSE
    MAINFUSE --> FX1 & FX2 & FX3 & FX4 & FX5 & FX6
    MAINFUSE --> B12V & B5V

    FX1-->|"XT90"| ESC1["ESC 1 → Motor 1"]
    FX2-->|"XT90"| ESC2["ESC 2 → Motor 2"]
    FX3-->|"XT90"| ESC3["ESC 3 → Motor 3"]
    FX4-->|"XT90"| ESC4["ESC 4 → Motor 4"]
    FX5-->|"XT90"| ESC5["ESC 5 → Motor 5"]
    FX6-->|"XT90"| ESC6["ESC 6 → Motor 6"]

    classDef battery fill:#c8e6c9,stroke:#2e7d32
    classDef busbar fill:#fff9c4,stroke:#f9a825
    classDef fuse fill:#ffcdd2,stroke:#c62828
    classDef bec fill:#e1bee7,stroke:#7b1fa2
```

---

## 3. Signal Flow Diagram

```mermaid
graph TB
    subgraph FC["Pixhawk 6C — Central Hub"]
        FC_CORE["STM32H743<br/>ArduCopter 4.4"]
    end

    subgraph UART["UART Ports"]
        GPS1["UART1→GPS1 M10 115200"]
        GPS2["UART2→GPS2 M10 115200"]
        TEL["UART3→RFD868x 115200 MAVLink"]
        RC["UART6→R-XSR 420000 CRSF"]
    end

    subgraph SPI["SPI Bus (Internal)"]
        IMU["SPI→ICM-42688 IMU 8kHz"]
        BARO["SPI→MS5611 Baro 50Hz"]
    end

    subgraph I2C["I2C Bus"]
        COMP["I2C→IST8310 Compass 150Hz"]
    end

    subgraph DSHOT["DShot600 (1.2Mbps)"]
        ESC1["→ESC1 Motor1"] & ESC2["→ESC2 Motor2"] & ESC3["→ESC3 Motor3"]
        ESC4["→ESC4 Motor4"] & ESC5["→ESC5 Motor5"] & ESC6["→ESC6 Motor6"]
    end

    subgraph PWM["PWM / GPIO"]
        PUMP["PWM→Pump MOSFET CH5"]
        VALVE["PWM→Bypass Valve CH6"]
        FLOW["GPIO→YF-S402 Flow Pulse"]
    end

    subgraph CAN["CAN Bus (1Mbps)"]
        JET["CAN→Jetson Orin Nano"]
    end

    FC_CORE --- UART & SPI & I2C & DSHOT & PWM & CAN
    GPS1 & GPS2 -.->|"EKF3 Fusion"| FC_CORE

    classDef fc fill:#fce4ec,stroke:#c62828,stroke-width:3px
    classDef uart fill:#ffccbc,stroke:#d84315
    classDef spi fill:#c8e6c9,stroke:#2e7d32
    classDef dshot fill:#bbdefb,stroke:#1565c0
    classDef pwm fill:#e1bee7,stroke:#7b1fa2
    classDef can fill:#b3e5fc,stroke:#0277bd
```

---

## 4. Spray System Fluid Path

```mermaid
flowchart LR
    subgraph TankAssembly["Tank Assembly"]
        T["16L HDPE Tank<br/>4 Baffles"]
        BF["80-mesh Filter<br/>180µm"]
        RV["Pressure Relief<br/>4 bar"]
    end

    subgraph PumpModule["Pump Module"]
        P["SHURflo 8000<br/>5.3L/min 2.1bar"]
        FS["YF-S402<br/>4078 pulses/L"]
        PG["Pressure Gauge<br/>0-6 bar"]
    end

    subgraph Distribution["Distribution"]
        M4["4-Way Manifold<br/>6mm push-fit"]
        BV["Bypass Valve<br/>PWM controlled"]
    end

    subgraph NozzleArray["Nozzle Array"]
        N1["XR11002 0.79L/min"]
        N2["XR11002 0.79L/min"]
        N3["XR11002 0.79L/min"]
        N4["XR11002 0.79L/min"]
    end

    T --> BF --> P --> FS --> PG --> M4
    M4 --> N1 & N2 & N3 & N4
    BV -->|"Recirculate"| T
    PG -.->|"Overflow"| BV
    RV -.->|"Overpressure"| T

    style TankAssembly fill:#e3f2fd,stroke:#1565c0
    style PumpModule fill:#fff3e0,stroke:#ef6c00
    style Distribution fill:#f3e5f5,stroke:#7b1fa2
    style NozzleArray fill:#e8f5e9,stroke:#2e7d32
```

---

## 5. AI Inference Pipeline

```mermaid
flowchart LR
    A["📷 Camera<br/>4-band MIPI CSI-2<br/>30 FPS"]:::input
    B["🖼️ Capture<br/>~5ms"]:::capture
    C["📐 Preprocess<br/>Resize+Normalize<br/>~5ms"]:::process
    D["📊 NDVI<br/>(NIR-Red)/(NIR+Red)<br/>~2ms"]:::process
    E["🧠 TensorRT<br/>EfficientNet-Lite0<br/>INT8 ~45ms"]:::inference
    F["🏷️ Classify<br/>Healthy/Stressed/Weed<br/>~12ms"]:::inference
    G["🎯 Decision<br/>NDVI→Spray Rate<br/>~5ms"]:::decision
    H["📡 MAVLink<br/>To Pixhawk<br/>~5ms"]:::output
    I["⚡ PWM<br/>Pump Control<br/>~100ms"]:::output
    J["🔄 Flow Sensor<br/>Feedback"]:::feedback

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J
    J -.->|"Closed-loop"| G

    classDef input fill:#e1f5fe,stroke:#0277bd
    classDef capture fill:#f3e5f5,stroke:#7b1fa2
    classDef process fill:#fff8e1,stroke:#f9a825
    classDef inference fill:#fce4ec,stroke:#c62828
    classDef decision fill:#e8f5e9,stroke:#2e7d32
    classDef output fill:#e0f2f1,stroke:#00695c
    classDef feedback fill:#ede7f6,stroke:#512da8
```

**Total Latency: ~179ms** ✅ (< 200ms target)

---

## 6. Failsafe Decision Tree

```mermaid
flowchart TD
    START(("Flight Monitor")):::start

    RC{"RC Signal Loss?"}:::check
    RC_RTL["RTL"]:::action
    RC_OK["Continue"]:::ok

    BAT{"Battery Voltage?"}:::check
    BAT_LOW["<42V: Stop spray, land"]:::warning
    BAT_CRIT["<39.6V: Immediate land"]:::critical
    BAT_OK["Nominal"]:::ok

    GPS{"GPS Loss?"}:::check
    GPS_HOVER["Hover/Position Hold"]:::warning
    GPS_LAND["Land if persists >10s"]:::action
    GPS_OK["Continue"]:::ok

    MOTOR{"Motor Failure?"}:::check
    MOTOR_SMF["SMF: Throttle opposite 40%, auto land"]:::critical
    MOTOR_OK["Normal"]:::ok

    JET{"Jetson Failure?"}:::check
    JET_YES["Stop spray, continue flight"]:::warning
    JET_OK["Normal"]:::ok

    GEOFENCE{"Geofence Breach?"}:::check
    GEOFENCE_YES["RTL with 50m buffer"]:::action
    GEOFENCE_OK["Normal"]:::ok

    START --> RC & BAT & GPS & MOTOR & JET & GEOFENCE
    RC -- Yes >1.5s --> RC_RTL
    RC -- No --> RC_OK
    BAT -- "<42V" --> BAT_LOW
    BAT -- "<39.6V" --> BAT_CRIT
    BAT -- "≥42V" --> BAT_OK
    GPS -- Yes --> GPS_HOVER
    GPS_HOVER -- Persists --> GPS_LAND
    GPS -- No --> GPS_OK
    MOTOR -- Yes --> MOTOR_SMF
    MOTOR -- No --> MOTOR_OK
    JET -- Yes --> JET_YES
    JET -- No --> JET_OK
    GEOFENCE -- Yes --> GEOFENCE_YES
    GEOFENCE -- No --> GEOFENCE_OK

    classDef start fill:#90caf9,stroke:#1565c0,stroke-width:3px
    classDef check fill:#fff9c4,stroke:#f9a825
    classDef ok fill:#c8e6c9,stroke:#2e7d32
    classDef warning fill:#ffe0b2,stroke:#ef6c00
    classDef critical fill:#ffcdd2,stroke:#c62828
    classDef action fill:#b3e5fc,stroke:#0277bd
```

---

## 7. Build & Test Sequence

```mermaid
flowchart TD
    A1["1. Frame Assembly"] --> A2["2. Motor Mounting 6×"] --> A3["3. ESC + Fuses"] --> A4["4. Power Dist + Pre-charge"] --> A5["5. FC + GPS Mount"] --> A6["6. Wiring Harness"]
    A6 --> D1{"Assembly OK?"}
    D1 -- Fail --> A6
    D1 -- Pass --> B1

    B1["7. Smoke Stopper"] --> B2["8. ESC Cal"] --> B3["9. Compass Cal"] --> B4["10. Radio Cal"] --> B5["11. Flight Modes"] --> B6["12. Failsafe Config"]
    B6 --> D2{"Bench OK?"}
    D2 -- Fail --> B1
    D2 -- Pass --> C1

    C1["13. Ground Sweep"] --> C2["14. Prop Balancing"] --> C3["15. Tethered Hover"]
    C3 --> D3{"Ground OK?"}
    D3 -- Fail --> C1
    D3 -- Pass --> E1

    E1["16. Free Hover"] --> E2["17. Mode Testing"] --> E3["18. Flight Envelope"] --> E4["19. Spray Integration"] --> E5["20. Mission Waypoints"]
    E5 --> D4{"Flight OK?"}
    D4 -- Fail --> E1
    D4 -- Pass --> F1["✅ READY FOR OPERATIONS"]

    style A1 fill:#1e3a5f,color:#fff
    style B1 fill:#1a4d2e,color:#fff
    style C1 fill:#8b4513,color:#fff
    style E1 fill:#6b1a1a,color:#fff
    style F1 fill:#006400,color:#fff,stroke:#00ff00,stroke-width:3px
```

---

## 8. Testing Gate Protocol (G0-G6)

```mermaid
flowchart TD
    START(["🚀 BEGIN TESTING"]):::start
    G0["G0: Bench Test 1-2d<br/>Thrust≥80%, vib<0.5g"]:::gate
    G0F["FAIL: Replace component"]:::fail
    G1["G1: Ground Sweep 0.5d<br/>VIB<30m/s², temps OK"]:::gate
    G1F["FAIL: Balance props"]:::fail
    G2["G2: Tethered Hover 1d<br/>Drift<0.5m, alt±0.3m"]:::gate
    G2F["FAIL: Recal compass"]:::fail
    G3["G3: Free Hover 1-2d<br/>Endurance≥10min"]:::gate
    G3F["FAIL: Check battery"]:::fail
    G4["G4: Flight Envelope 2-3d<br/>Alt≥20m, speed≥10m/s"]:::gate
    G4F["FAIL: Improve telemetry"]:::fail
    G5["G5: Spray Integration 1-2d<br/>Flow±10%, cutoff<2s"]:::gate
    G5F["FAIL: Recal sensor"]:::fail
    G6["G6: Mission Validation 1-2d<br/>100% waypoints, AI>80%"]:::gate
    G6F["FAIL: Retune/retrain"]:::fail
    DONE(["✅ ALL GATES PASSED<br/>14-17 days total"]):::done

    START --> G0 --> G0 -->|"Pass"| G1
    G0F -.->|retest| G0
    G1 -->|"Pass"| G2
    G1F -.->|retest| G1
    G2 -->|"Pass"| G3
    G2F -.->|retest| G2
    G3 -->|"Pass"| G4
    G3F -.->|retest| G3
    G4 -->|"Pass"| G5
    G4F -.->|retest| G4
    G5 -->|"Pass"| G6
    G5F -.->|retest| G5
    G6 -->|"Pass"| DONE
    G6F -.->|retest| G6

    G0 -- Fail --> G0F
    G1 -- Fail --> G1F
    G2 -- Fail --> G2F
    G3 -- Fail --> G3F
    G4 -- Fail --> G4F
    G5 -- Fail --> G5F
    G6 -- Fail --> G6F

    classDef start fill:#333,stroke:#fff,color:#fff
    classDef gate fill:#1a3a5c,stroke:#5c9aff,color:#fff
    classDef fail fill:#5c1a1a,stroke:#ff5c5c,color:#fff
    classDef done fill:#006400,stroke:#00ff00,color:#fff,stroke-width:3px
```

---

*All diagrams verified against component datasheets and COEP analysis documents.*
