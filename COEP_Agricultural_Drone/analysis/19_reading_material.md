# 19. Reading Material & Learning Resources

> **Curated for:** COEP Agricultural Drone Project Team
> **Last Updated:** May 2026
> **Scope:** YouTube, books, courses, papers, GitHub repos, blogs, and India-specific resources

---

## 1. YouTube Channels (Essential for Drone Building)

| Channel | Focus Area | Subscribers | Why Watch |
|---------|-----------|-------------|-----------|
| Chris Rosser (AOS) | ArduPilot tuning, PID, vibration analysis, FPV science | 80K+ | Best technical deep-dives on flight controller tuning and vibration isolation. Essential for understanding why your drone oscillates. |
| Joshua Bardwell | FPV builds, troubleshooting, everything FPV | 500K+ | The " encyclopedia" of FPV. If something is broken, JB has a video on it. Unparalleled troubleshooting depth. |
| Oscar Liang | FPV drones, parts selection, tutorials | 300K+ | Clean, well-organized tutorials. Excellent for component selection guides and "best of" lists. |
| Drone U | Commercial drone training, Part 107 | 200K+ | Business side of drones. Covers regulations, commercial operations, and scaling a drone service business. |
| Hobbywing Official | Product demos, setup guides | 50K+ | Official setup videos for X9, X8, and ESC configurations. Reference for motor/ESC calibration procedures. |
| ArduPilot Official | Firmware updates, tuning guides | 30K+ | Official channel for ArduPilot project. Firmware release notes, feature walkthroughs, and developer interviews. |
| PX4 | PX4 firmware, QGroundControl | 25K+ | Official PX4 channel. Companion to ArduPilot for those considering alternative firmware stacks. |
| IFlight | Build tutorials, product reviews | 100K+ | Professional build tutorials. Good for understanding frame assembly and motor mounting. |
| Mepsking | Drone building tutorials for beginners | 40K+ | Beginner-friendly. Step-by-step build guides from unboxing to first flight. |
| FPV Know-It-All (Joshua Bardwell) | Comprehensive FPV guides | 150K+ | Playlist-organized deep dives. Excellent for systematic learning. |

### Recommended Watching Order

1. **Start:** Mepsking (beginner basics) → Oscar Liang (component selection) → Joshua Bardwell (build process)
2. **Intermediate:** Chris Rosser (tuning science) → ArduPilot Official (firmware setup) → Hobbywing (motor config)
3. **Advanced:** FPV Know-It-All (troubleshooting) → Drone U (commercial operations) → PX4 (alternative stack)

---

## 2. YouTube Videos (Specific Topics)

### ArduPilot & Flight Controller Setup
| Video | Creator | Duration | Key Takeaway |
|-------|---------|----------|--------------|
| "Complete ArduPilot Tuning Guide" (3-part series) | Chris Rosser | ~3 hours | PID tuning methodology, filter setup, vibration analysis. Watch all 3 parts in order. |
| "How to Setup ArduPilot on Pixhawk" | ArduPilot Official | 45 min | Step-by-step firmware flash, initial configuration, first arm. |
| "ArduPilot SITL Simulation Setup" | ArduPilot Official | 30 min | Software-in-the-loop testing without hardware. Essential for safe development. |
| "ArduPilot Frame Type Configuration" | Joshua Bardwell | 20 min | Correct frame type selection for X4, X8, and custom configurations. |
| "ArduPilot Motor Order and Direction" | Joshua Bardwell | 15 min | Common mistakes in motor wiring and how to verify motor order. |

### Drone Building & Assembly
| Video | Creator | Duration | Key Takeaway |
|-------|---------|----------|--------------|
| "Agriculture Sprayer Drone Assembly & Test with ArduPilot" | Various | 1–2 hours | Full assembly walkthrough of a spraying drone. Covers tank mounting, pump wiring, and calibration. |
| "How to Build a Spray Drone" | Drone U | 45 min | Commercial spray drone build from start to finish. |
| "LiPo Battery Safety Guide" | Joshua Bardwell | 30 min | Safe charging, storage, handling, and disposal of LiPo batteries. Critical for workshop safety. |
| "Drone PID Tuning Explained" | Chris Rosser | 45 min | The science behind PID controllers. Why default PIDs often don't work. |
| "Vibration Analysis for Drones" | Chris Rosser | 30 min | Using logs and spectrum analysis to identify vibration sources. |

### AI & Computer Vision
| Video | Creator | Duration | Key Takeaway |
|-------|---------|----------|--------------|
| "TensorRT Deployment on Jetson" | NVIDIA | 1 hour | Official NVIDIA guide for deploying models with TensorRT on Jetson platforms. |
| "YOLOv8 on Jetson Nano/Orin" | QEngineering | 45 min | Running YOLOv8 object detection on Jetson with real-time performance. |
| "NDVI Drone Mapping Tutorial" | Pix4D | 30 min | Generating NDVI maps from drone imagery for crop health assessment. |
| "Edge AI for Agriculture" | NVIDIA | 1 hour | Use cases and deployment patterns for edge AI in precision agriculture. |
| "Custom YOLO Training for Drone Imagery" | Roboflow | 1 hour | Training a custom YOLO model on aerial/satellite imagery. |

### Specific Systems
| Video | Creator | Duration | Key Takeaway |
|-------|---------|----------|--------------|
| "How to Setup Variable Rate Spraying" | Drone U | 30 min | Configuring flow-rate-controlled spray systems with ArduPilot. |
| "RTK GPS Setup for Drones" | ArduPilot Official | 45 min | Base station setup, rover configuration, and achieving cm-level accuracy. |
| "CAN Bus Setup in ArduPilot" | ArduPilot Official | 30 min | Configuring CAN peripherals (ESCs, GPS, rangefinders). |

---

## 3. Books & Guides

### Flight Controller & Firmware
| Title | Author/Source | Format | Relevance |
|-------|--------------|--------|-----------|
| ArduCopter Tuning Guide | ArduPilot.org | Online Wiki | Definitive reference for ArduPilot tuning parameters, filter configuration, and flight modes. |
| PX4 User Guide | PX4 Team | Online (docs.px4.io) | Alternative firmware documentation. Useful for understanding autopilot architecture. |
| ArduPilot Developer Guide | ArduPilot.org | Online Wiki | For those modifying firmware. Covers build environment, code architecture, and contribution guidelines. |

### Drone Building & Design
| Title | Author/Source | Format | Relevance |
|-------|--------------|--------|-----------|
| "Building and Flying Multicopter Drones" | Various online guides | PDF/Web | Covers frame design, motor selection, ESC configuration, and first flight procedures. |
| "Multirotor Aircraft Design" | Various engineering resources | PDF | Engineering-level design methodology for multirotor aircraft. |
| "Carbon Fiber Fabrication Guide" | DragonPlate / EasyComposites | Online | Essential for arm and frame fabrication using carbon fiber composites. |

### Agriculture & Spraying
| Title | Author/Source | Format | Relevance |
|-------|--------------|--------|-----------|
| "Precision Agriculture with Drones" | ICAR Guidelines | PDF | Indian government guidelines for drone use in agriculture. Regulatory compliance reference. |
| "Drone Spraying Best Practices" | FAO | PDF | International standards for aerial application of pesticides and fertilizers. |
| "Variable Rate Application Technology" | Various ag-tech papers | Journal | Academic perspective on variable-rate spraying efficiency and chemical savings. |

### Edge AI & Computing
| Title | Author/Source | Format | Relevance |
|-------|--------------|--------|-----------|
| NVIDIA JetPack Documentation | NVIDIA | Online | Official SDK documentation for Jetson platforms. Essential for Jetson Orin Nano setup. |
| "Edge AI: A Survey" | Various academic papers | Journal | Overview of edge AI architectures, frameworks, and deployment strategies. |
| TensorRT Developer Guide | NVIDIA | Online | Model optimization and inference on NVIDIA GPUs. Critical for YOLO deployment. |

---

## 4. Online Courses

### Free Courses
| Course | Platform | Duration | Topics Covered |
|--------|----------|----------|----------------|
| ArduPilot Copter Documentation | ardupilot.org/copter/ | Self-paced | Complete ArduPilot reference: setup, configuration, tuning, flight modes, peripherals. |
| PX4 User Guide | docs.px4.io | Self-paced | PX4 firmware setup, QGroundControl configuration, flight testing. |
| NVIDIA Jetson Tutorials | developer.nvidia.com/embedded | Self-paced | JetPack SDK, TensorRT, DeepStream, camera integration, edge AI deployment. |
| Drone Programming with Python | TutorialsPoint | 4 hours | MAVLink protocol, drone control via Python, Mission Planner scripting. |
| Introduction to UAS | Coursera (audit free) | 6 weeks | Fundamentals of unmanned aerial systems, aerodynamics, and regulations. |

### Paid Courses
| Course | Platform | Duration | Topics Covered |
|--------|----------|----------|----------------|
| TiHAN IIT Hyderabad Certification | TiHAN (tihan.iith.ac.in) | 6 months | AI/ML with drone tech. Covers perception, planning, and edge computing for autonomous systems. |
| Drone Pilot Training (DGCA RPC) | Approved DGCA training schools | 5–10 days | Remote Pilot Certificate preparation. Mandatory for legal drone operations in India. |
| UAV Software Development | Udemy | 20 hours | ROS for drones, PX4/ArduPilot integration, simulation with Gazebo. |
| Computer Vision for Drones | Coursera | 4 weeks | Object detection, tracking, and aerial image analysis. |

---

## 5. Key Papers & Standards

### Research Papers
| Paper Title | Source | Year | Relevance |
|------------|--------|------|-----------|
| "Edge-enabled smart agriculture framework for real-time crop monitoring and pest detection" | ScienceDirect | 2025 | Edge AI architecture for agricultural drones. Directly applicable to Jetson-based crop monitoring. |
| "Variable rate spraying for precise spray requirements in orchards using unmanned aerial vehicles" | ScienceDirect | 2024 | Variable-rate spraying methodology and efficiency analysis. Validates the 30–50% chemical savings claim. |
| "Numerical modelling of variable rate spraying drone for agricultural applications" | Smart Ag Tech | 2025 | Computational fluid dynamics (CFD) modeling of spray patterns from drone-mounted nozzles. |
| "UAV Variable-Rate Spraying Method for Orchards Based on Canopy Density" | Agriculture (MDPI) | 2026 | Canopy-density-based variable-rate spraying. Relevant to NDVI-guided spray systems. |
| "Drone-based multispectral imaging for crop health assessment" | Remote Sensing (MDPI) | 2024 | Multispectral analysis methodology for agricultural drones. |
| "LiDAR-based terrain mapping for precision agriculture" | Computers and Electronics in Agriculture | 2025 | LiDAR integration for terrain-following spray systems. |

### Indian Standards & Regulations
| Standard/Regulation | Issuing Body | Year | Relevance |
|--------------------|-------------|------|-----------|
| DGCA Drone Rules 2021 | DGCA, MoCA | 2021 | Primary regulatory framework for drone operations in India. Mandatory reading. |
| BIS IS 17081:2023 | Bureau of Indian Standards | 2023 | Indian standard for unmanned aircraft systems. Covers design, safety, and performance requirements. |
| ISO 21384-3:2019 | ISO | 2019 | Unmanned aerial systems — Agricultural aircraft systems — Part 3: Requirements for spraying. |
| Kisan Drone Scheme Guidelines | Ministry of Agriculture | 2023 | Government subsidy scheme for agricultural drones. Up to 100% subsidy for SC/ST farmers. |
| Namo Drone Didi Scheme | Ministry of Rural Development | 2023 | Women empowerment through drone technology. Subsidies for women-led drone enterprises. |
| Digital Sky Platform Guidelines | DGCA | 2022 | Online platform for drone registration, pilot certification, and operational approvals. |

---

## 6. GitHub Repositories

### Core Autopilot & Control
| Repository | URL | Stars | Description |
|-----------|-----|-------|-------------|
| ArduPilot | github.com/ArduPilot/ardupilot | 10K+ | The most popular open-source autopilot. Supports Copter, Plane, Rover, Sub. Primary firmware for this project. |
| PX4-Autopilot | github.com/PX4/PX4-Autopilot | 7K+ | Professional-grade autopilot. Used by many commercial drone companies. Alternative to ArduPilot. |
| Betaflight | github.com/betaflight/betaflight | 8K+ | FPV racing/freestyle firmware. Not for agricultural drones but excellent for understanding flight controller internals. |
| INAV | github.com/iNavFlight/inav | 3K+ | Navigation-focused firmware. Good for fixed-wing and hybrid VTOL applications. |

### Ground Control & Mission Planning
| Repository | URL | Stars | Description |
|-----------|-----|-------|-------------|
| QGroundControl | github.com/mavlink/qgroundcontrol | 3K+ | Cross-platform ground control station. Works with both ArduPilot and PX4. |
| Mission Planner | github.com/ArduPilot/MissionPlanner | 2K+ | Windows-based ground control station. Full-featured mission planning and telemetry. |
| MAVLink | github.com/mavlink/mavlink | 500+ | Micro Air Vehicle Link protocol. The communication standard between autopilot and ground station. |

### AI & Computer Vision
| Repository | URL | Stars | Description |
|-----------|-----|-------|-------------|
| YOLOv8-TensorRT-Jetson | github.com/Qengineering/YoloV8-TensorRT-Jetson_Nano | 1K+ | Pre-built YOLOv8 models optimized for Jetson with TensorRT. Drop-in deployment. |
| Ultralytics YOLOv8 | github.com/ultralytics/ultralytics | 30K+ | Official YOLOv8 repository. Training, validation, and export tools. |
| OpenDroneMap | github.com/OpenDroneMap/ODM | 3K+ | Open-source photogrammetry toolkit. Generates orthomosaics, DSMs, and 3D models from drone imagery. |
| AI-UAV-Precision-Farming | github.com/RanadeepMahendra2000/AI-UAV-Precision-Farming | 100+ | End-to-end AI pipeline for precision farming with UAVs. Includes weed detection, crop health analysis. |
| DeepLearningVideoAnalytics | github.com/stella-bot/DeepLearningVideoAnalytics | 50+ | Real-time video analytics for drone feeds. Object detection and tracking. |

### Mapping & Analysis
| Repository | URL | Stars | Description |
|-----------|-----|-------|-------------|
| DroneDeploy | github.com/dronedeploy/dd-sdk-android | 200+ | SDK for building drone mapping applications. |
| Pix4D | Closed source | — | Commercial mapping software. Reference implementation for agricultural mapping workflows. |
| QGIS | github.com/qgis/QGIS | 9K+ | Open-source GIS software. Essential for analyzing drone-collected geospatial data. |
| GDAL | github.com/OSGeo/gdal | 5K+ | Geospatial Data Abstraction Library. Standard for raster/vector data processing. |

---

## 7. Blogs & Websites

### FPV & Drone Building
| Website | URL | Focus | Why Read |
|---------|-----|-------|----------|
| Oscar Liang | oscarliang.com | FPV drones, tutorials, gear reviews | The "bible" of FPV. Component selection guides, build tutorials, and troubleshooting. Updated frequently. |
| Joshua Bardwell / FPV Know-It-All | fpvknowitall.com | FPV builds, reviews, troubleshooting | Companion to his YouTube channel. Written guides with product links and setup details. |
| ArduPilot Documentation | ardupilot.org | Autopilot firmware | Official documentation. Essential reference for all ArduPilot configuration. |
| PX4 Documentation | docs.px4.io | PX4 firmware | Official PX4 reference. Clean, well-organized documentation. |

### Agriculture & Commercial Drones
| Website | URL | Focus | Why Read |
|---------|-----|-------|----------|
| Pix4D Agriculture | pix4d.com/industry/agriculture | Precision agriculture mapping | Industry leader in drone-based agricultural mapping. NDVI, crop health, yield estimation. |
| DroneLife India | insidedronelife.com | Indian drone industry news | India-specific drone news, regulations, and industry developments. |
| TiHAN IIT Hyderabad | tihan.iith.ac.in | AI/ML drone research | Research publications, courses, and industry collaborations. |
| GetFPV Learn | getfpv.com/learn | FPV tutorials, product guides | Beginner-friendly tutorials. Good for understanding component compatibility. |

### Industry & Regulatory
| Website | URL | Focus | Why Read |
|---------|-----|-------|----------|
| UAV Association of India | uja.in | Indian drone industry data | Industry statistics, regulatory updates, and networking. |
| InsideFPV | insidefpv.com | Indian FPV community | Local FPV community, events, and Indian market availability. |
| DroneDJ | dronedj.com | Drone industry news | Global drone industry coverage. New products, regulations, and business developments. |

---

## 8. India-Specific Resources

### Government & Regulatory
| Resource | URL/Platform | Description |
|----------|-------------|-------------|
| DGCA Digital Sky | digitalsky.dgca.gov.in | Official platform for drone registration, pilot certification, and operational approvals. Mandatory for all Indian drone operations. |
| Kisan Drone Scheme | Ministry of Agriculture | Subsidy of up to 100% for agricultural drones. Covers hardware, training, and operational costs. |
| Namo Drone Didi | Ministry of Rural Development | Drone training and entrepreneurship for women. Subsidies for women-led drone enterprises. |
| ICAR Drone Spray Guidelines | ICAR (icar.org.in) | Technical guidelines for drone-based pesticide and fertilizer application. Includes spray rates, safety protocols, and calibration procedures. |
| BIS IS 17081:2023 | Bureau of Indian Standards (bis.gov.in) | Indian standard for UAS design, safety, and performance. Compliance required for type certification. |

### Training & Certification
| Resource | Location | Description |
|----------|----------|-------------|
| DGCA-approved Remote Pilot Training Organizations | Listed on digitalsky.dgca.gov.in | Mandatory training for Remote Pilot Certificate (RPC). Required for legal commercial operations. |
| TiHAN IIT Hyderabad | Hyderabad, Telangana | AI/ML with drone technology certification. Research-focused with industry connections. |
| DRONE NEST | Various cities | Drone training academy with hands-on workshops. |
| UAV Solutions India | Pune, Maharashtra | DGCA-approved training center. Close to COEP campus. |

### Indian Market & Supply Chain
| Resource | Description |
|----------|-------------|
| India Drone Federation (IDF) | Industry body representing Indian drone companies. Advocacy, networking, and policy input. |
| FICCI Drone Committee | Federation of Indian Chambers of Commerce drone working group. Industry reports and business matchmaking. |
| Startup India Drone Hub | Government-backed incubator for drone startups. Funding and mentorship support. |
| Local Distributors | HobbyKing India, RC Bazaar, DroneVibes — Indian distributors for international drone components. |

### Research & Academic
| Institution | Focus | Relevance |
|------------|-------|-----------|
| IIT Hyderabad (TiHAN) | AI/ML for autonomous systems | Edge AI, computer vision, and autonomous drone research. |
| IIT Kanpur | Aerodynamics, flight mechanics | Fundamental aerospace engineering research. |
| IIST Thiruvananthapuram | Space and UAV technology | Academic programs in UAV design and operations. |
| NAL Bangalore | Aerospace R&D | Government aerospace research lab. Advanced drone technologies. |
| DRDO | Defense drone tech | Advanced UAV research, though not directly applicable to agricultural drones. |

---

## 9. Recommended Learning Path

### Phase 1: Foundations (Weeks 1–4)
1. Read ArduPilot Copter documentation (ardupilot.org/copter/)
2. Watch Oscar Liang's "FPV Drone Guide" playlist
3. Complete Joshua Bardwell's "Building Your First FPV Drone" series
4. Study DGCA Drone Rules 2021 and Digital Sky platform

### Phase 2: Build & Configure (Weeks 5–8)
1. Follow Mepsking's build tutorials step-by-step
2. Watch Chris Rosser's "Complete ArduPilot Tuning Guide" (all 3 parts)
3. Study Hobbywing X9 setup videos on Hobbywing Official channel
4. Set up ArduPilot SITL for simulation testing

### Phase 3: Specialization (Weeks 9–12)
1. NVIDIA Jetson tutorials for edge AI deployment
2. YOLOv8 training and TensorRT optimization
3. Pix4D Agriculture mapping workflow
4. Variable-rate spraying system design and calibration

### Phase 4: Advanced (Weeks 13–16)
1. Chris Rosser's vibration analysis and advanced tuning
2. RTK GPS configuration and survey workflows
3. CAN bus system design and troubleshooting
4. TiHAN IIT Hyderabad certification (if pursuing formal credential)

---

## 10. Quick Reference: Essential Links

| Category | Link |
|----------|------|
| ArduPilot Docs | ardupilot.org/copter/ |
| PX4 Docs | docs.px4.io |
| NVIDIA Jetson | developer.nvidia.com/embedded |
| DGCA Digital Sky | digitalsky.dgca.gov.in |
| Hobbywing Products | hobbywingdirect.com |
| Pixhawk Hardware | holybro.com |
| RFD Telemetry | rfdesign.com.au |
| FrSky Receivers | frsky-rc.com |
| YOLOv8 | github.com/ultralytics/ultralytics |
| TensorRT | developer.nvidia.com/tensorrt |

---

*This reading material list is maintained as a living document. Contributions and updates welcome from all project team members.*
