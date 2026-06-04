# System Wiring Diagrams — Mermaid (Obsidian Compatible)

> All diagrams render natively in Obsidian. No plugins needed.

---

## 1. Power Distribution — 12S 44.4V System

```mermaid
graph TB
    subgraph BATTERY["BATTERY — 12S 30Ah"]
        BAT["Tattu 12S 30Ah<br/>44.4V nominal<br/>50.4V full charge<br/>39.6V critical low<br/>AS150U connector"]
    end

    subgraph PRECHARGE["PRE-CHARGE CIRCUIT"]
        R1["R1: 110Ω 50W<br/>wirewound"]
        R2["R2: 110Ω 50W<br/>wirewound"]
        FUSE["Thermal Fuse<br/>100°C cutoff"]
        RELAY["Relay/MOSFET<br/>bypass after 450ms"]
    end

    subgraph PDB["POWER DISTRIBUTION BOARD"]
        FUSE300["Main Fuse<br/>300A MEGA"]
        BUSBAR["Copper Busbar<br/>15×5mm (75mm²)"]
    end

    subgraph ESCS["ESC × 6"]
        ESC1["ESC 1<br/>150A MEGA fuse"]
        ESC2["ESC 2<br/>150A MEGA fuse"]
        ESC3["ESC 3<br/>150A MEGA fuse"]
        ESC4["ESC 4<br/>150A MEGA fuse"]
        ESC5["ESC 5<br/>150A MEGA fuse"]
        ESC6["ESC 6<br/>150A MEGA fuse"]
    end

    subgraph MOTORS["MOTORS × 6"]
        M1["M1: X9 G2L<br/>110KV 24kg thrust"]
        M2["M2: X9 G2L<br/>110KV 24kg thrust"]
        M3["M3: X9 G2L<br/>110KV 24kg thrust"]
        M4["M4: X9 G2L<br/>110KV 24kg thrust"]
        M5["M5: X9 G2L<br/>110KV 24kg thrust"]
        M6["M6: X9 G2L<br/>110KV 24kg thrust"]
    end

    subgraph BEC["VOLTAGE REGULATION"]
        BEC5V["BEC 5V<br/>→ FC, GPS, RC"]
        BEC12V["BEC 12V<br/>→ Pump"]
    end

    subgraph LOADS["LOW-VOLTAGE LOADS"]
        FC["Pixhawk 6C<br/>5V input"]
        GPS["GPS × 2<br/>3.3-5V input"]
        RC["ELRS Receiver<br/>5V input"]
        PUMP["SHURflo Pump<br/>12V DC 6.8L/min"]
    end

    BAT -->|"8 AWG<br/>136A max"| PRECHARGE
    R1 & R2 -->|"parallel 55Ω"| RELAY
    FUSE --> RELAY
    PRECHARGE -->|"post-charge<br/>8 AWG"| FUSE300
    FUSE300 --> BUSBAR

    BUSBAR -->|"14 AWG 25A"| ESC1 & ESC2 & ESC3
    BUSBAR -->|"14 AWG 25A"| ESC4 & ESC5 & ESC6
    BUSBAR -->|"14 AWG"| BEC5V & BEC12V

    ESC1 -->|"12 AWG 30A"| M1
    ESC2 -->|"12 AWG 30A"| M2
    ESC3 -->|"12 AWG 30A"| M3
    ESC4 -->|"12 AWG 30A"| M4
    ESC5 -->|"12 AWG 30A"| M5
    ESC6 -->|"12 AWG 30A"| M6

    BEC5V -->|"20 AWG"| FC
    BEC5V -->|"20 AWG"| GPS
    BEC5V -->|"20 AWG"| RC
    BEC12V -->|"16 AWG"| PUMP
```

---

## 2. Signal/Wiring — Pixhawk 6C Port Map

```mermaid
graph TB
    subgraph FC["PIXHAWK 6C — STM32H743"]
        UART1["UART1"]
        UART2["UART2"]
        UART3["UART3"]
        UART6["UART6"]
        CAN1["CAN1"]
        PWM5["PWM CH5"]
        PWM6["PWM CH6"]
        SPI["SPI"]
        I2C["I2C"]
    end

    subgraph DEVICES["DEVICES"]
        GPS1["GPS 1 — Primary<br/>HGLRC M100<br/>UART → UBX Binary<br/>Baud: 115200"]
        GPS2["GPS 2 — Backup<br/>HGLRC M100<br/>UART → UBX Binary<br/>Baud: 115200"]
        TELEM["Telemetry — RFD868x<br/>868MHz 1W<br/>UART → MAVLink<br/>Baud: 115200"]
        ELRS["RC Receiver — ELRS<br/>2.4GHz CRSF<br/>UART → CRSF<br/>Baud: 420000"]
        JET["Jetson Orin Nano<br/>CAN → 1 Mbps<br/>NDVI + AI inference"]
        PUMP["Spray Pump<br/>PWM 50Hz<br/>12V Diaphragm"]
        VALVE["Bypass Valve<br/>PWM 50Hz"]
    end

    UART1 -->|"2 wires + GND<br/>TX/RX"| GPS1
    UART2 -->|"2 wires + GND<br/>TX/RX"| GPS2
    UART3 -->|"2 wires + GND<br/>TX/RX"| TELEM
    UART6 -->|"2 wires + GND<br/>TX/RX"| ELRS
    CAN1 -->|"2 wires + GND<br/>CAN_H/CAN_L"| JET
    PWM5 -->|"3 wires<br/>Signal+5V+GND"| PUMP
    PWM6 -->|"3 wires<br/>Signal+5V+GND"| VALVE

    style FC fill:#ffcdd2,stroke:#b71c1c,stroke-width:2px
    style GPS1 fill:#c8e6c9,stroke:#2e7d32
    style GPS2 fill:#c8e6c9,stroke:#2e7d32
    style TELEM fill:#c8e6c9,stroke:#2e7d32
    style ELRS fill:#c8e6c9,stroke:#2e7d32
    style JET fill:#e1bee7,stroke:#7b1fa2
    style PUMP fill:#ffe0b2,stroke:#e65100
    style VALVE fill:#ffe0b2,stroke:#e65100
```

---

## 3. Communication Protocol Map

```mermaid
graph LR
    subgraph GROUND["GROUND STATION"]
        GCS["Mission Planner<br/>Laptop"]
        GCS_TX["RFD868x TX<br/>868MHz"]
    end

    subgraph DRONE["DRONE"]
        RX_TELEM["RFD868x RX<br/>868MHz"]
        FC["Pixhawk 6C<br/>ArduCopter"]
        RC["ELRS RX<br/>2.4GHz"]
        JET["Jetson Orin<br/>CAN bus"]
        GPS["GPS × 2<br/>UART"]
        ESC["ESC × 6<br/>DShot600"]
        PUMP["Pump<br/>PWM"]
    end

    subgraph TX["TRANSMITTER"]
        TX_RC["FrSky/ELRS TX<br/>2.4GHz"]
    end

    GCS -->|"MAVLink<br/>224 kbps"| GCS_TX
    GCS_TX -->|"868MHz RF<br/>40+ km"| RX_TELEM
    RX_TELEM -->|"UART 115200"| FC

    TX_RC -->|"CRSF 420kbps<br/>10+ km"| RC
    RC -->|"UART 420000"| FC

    FC <-->|"CAN 1 Mbps"| JET
    FC <-->|"UART 115200"| GPS
    FC -->|"DShot600<br/>600kbit/s"| ESC
    FC -->|"PWM 50Hz"| PUMP

    style GCS fill:#e3f2fd,stroke:#1565c0
    style FC fill:#ffcdd2,stroke:#b71c1c,stroke-width:2px
    style JET fill:#e1bee7,stroke:#7b1fa2
```

---

## 4. NDVI Processing Pipeline

```mermaid
graph TB
    subgraph INPUT["INPUT"]
        CAM["Pi NoIR v3 Camera<br/>12MP 4608×2592<br/>MIPI CSI-2"]
        SUN["Sunlight<br/>400-1000nm"]
    end

    subgraph FILTER["OPTICAL FILTER"]
        BLUE["Rosco #2007<br/>Blue Gel Filter<br/>Blocks visible red<br/>Passes blue + NIR"]
    end

    subgraph SENSOR["SENSOR (NoIR)"]
        BAYER["Bayer Matrix"]
        R_CH["Red Channel<br/>← Captures NIR only<br/>(red blocked by filter)"]
        G_CH["Green Channel<br/>← Flatlined (blocked)"]
        B_CH["Blue Channel<br/>← Captures visible blue"]
    end

    subgraph COMPUTE["JETSON ORIN NANO"]
        CAPTURE["Frame Capture<br/>33ms"]
        SPLIT["Channel Split<br/>2ms"]
        NDVI["NDVI Compute<br/>(NIR-Red)/(NIR+Red)<br/>2ms"]
        CLASSIFY["TensorRT Inference<br/>EfficientNet-Lite0<br/>12ms"]
        DECIDE["Spray Decision<br/>1ms"]
    end

    subgraph OUTPUT["OUTPUT"]
        MAP["NDVI Health Map<br/>-1.0 to +1.0"]
        CMD["MAVLink Command<br/>Spray rate L/ha"]
        PWM["PWM → Pump<br/>100ms response"]
    end

    SUN --> CAM
    CAM --> BLUE
    BLUE --> R_CH & G_CH & B_CH
    R_CH & B_CH --> SPLIT
    SPLIT --> NDVI
    NDVI --> CLASSIFY
    CLASSIFY --> DECIDE
    DECIDE --> MAP & CMD
    CMD --> PWM
```

---

## 5. Spray Hydraulic Flow

```mermaid
graph LR
    subgraph TANK["TANK"]
        T["16L HDPE<br/>4 baffles"]
    end

    subgraph FILTER_STAGE["FILTER"]
        F["80-mesh<br/>180µm inlet"]
    end

    subgraph PUMP_STAGE["PUMP"]
        P["SHURflo 8000<br/>6.8 L/min<br/>10 bar<br/>12V DC"]
    end

    subgraph SENSOR_STAGE["FLOW METER"]
        S["YF-S402<br/>4078 pulses/L<br/>±3% accuracy"]
    end

    subgraph MANIFOLD["MANIFOLD"]
        M["4-way brass<br/>equal split"]
    end

    subgraph NOZZLES["NOZZLES"]
        N1["XR11002<br/>0.79 L/min"]
        N2["XR11002<br/>0.79 L/min"]
        N3["XR11002<br/>0.79 L/min"]
        N4["XR11002<br/>0.79 L/min"]
    end

    subgraph BYPASS["BYPASS"]
        B["Pressure relief<br/>4 bar limit"]
    end

    T -->|"gravity feed"| F
    F -->|"low pressure<br/>0.5-1 bar"| P
    P -->|"high pressure<br/>2-4 bar"| S
    S -->|"flow data<br/>to FC"| M
    M --> N1 & N2 & N3 & N4
    P -.->|"overpressure<br/>return"| B
    B -.->|"return flow"| T
```

---

## 6. Motor Layout & Control Moments

```mermaid
graph TB
    subgraph HEXACOPTER["HEXACOPTER — TOP VIEW"]
        direction TB
        M1["M1 — CW<br/>Front-Right"]
        M2["M2 — CCW<br/>Front-Left"]
        M3["M3 — CW<br/>Mid-Left"]
        M4["M4 — CCW<br/>Rear-Left"]
        M5["M5 — CW<br/>Rear-Right"]
        M6["M6 — CCW<br/>Mid-Right"]
        FC["FC<br/>CENTER"]
    end

    M2 -->|"Roll: -"| FC
    M4 -->|"Roll: -"| FC
    M6 -->|"Roll: -"| FC
    M1 -->|"Roll: +"| FC
    M3 -->|"Roll: +"| FC
    M5 -->|"Roll: +"| FC

    M1 -->|"Pitch: +"| FC
    M2 -->|"Pitch: +"| FC
    M4 -->|"Pitch: -"| FC
    M5 -->|"Pitch: -"| FC

    M1 -->|"Yaw: CW"| FC
    M3 -->|"Yaw: CW"| FC
    M5 -->|"Yaw: CW"| FC
    M2 -->|"Yaw: CCW"| FC
    M4 -->|"Yaw: CCW"| FC
    M6 -->|"Yaw: CCW"| FC
```

---

## 7. Single Motor Failure (SMF) Response

```mermaid
sequenceDiagram
    participant Sensor as IMU/GPS
    participant FC as Pixhawk 6C
    participant ESC as ESC (opposite motor)
    participant Pilot as GCS Pilot

    Sensor->>FC: Motor 3 RPM drop detected
    FC->>FC: EKF2 fusion: thrust imbalance
    
    alt Motor 3 failed
        FC->>ESC: Throttle M6 (opposite) to 40%
        FC->>FC: Recalculate thrust budget
        FC->>FC: Engage position hold (GPS)
        FC->>Pilot: MAVLink warning: SMF active
        FC->>FC: Initiate auto-land sequence
        FC->>ESC: Gradual descent rate: 0.5 m/s
    end
```
