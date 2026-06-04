# Component Expansion Database
## Agricultural Drone Build – All Categories, All Tiers
**Format:** Each entry is ready for direct import into `components.json`.  
**Scope:** Covers Hexa / Octo / N-copter configurations; MTOW 20–50 kg; tank 5–20 L; flight time 10–30 min; range 5–20 km.  
**Sources:** Verified prices from IndiaMART, Zbotic, Robu.in, Bharat Skytech, Indian Robo Store, Moglix, UAVGarage (June 2026).

---

## KEY: JSON fields explained
| Field | Meaning |
|---|---|
| `id` | Unique snake_case identifier |
| `name` | Human-readable product name |
| `type` | A=Airframe B=Propulsion C=Power D=Avionics E=Sensor F=Payload G=Tool |
| `tier` | T1=Premium T2=Mid T3=Budget |
| `quality` | Q1=Best Q2=Good Q3=Acceptable |
| `category` | Parent category group |
| `necessity` | Non-Negotiable / Mission-Critical / Enhancement |
| `price_inr` | Base price INR (excl. GST) |
| `weight_g` | Flying weight in grams |
| `stock_status` | in_stock / import / order |
| `lead_time_days` | Expected sourcing time |
| `compare_group` | Used internally for build wizard comparisons |
| `v4_verified` | Set false for new additions |

---

## 1. TYPE A — AIRFRAME & STRUCTURE

### A1. EFT G620 — 20L Hexacopter Agricultural Frame
**Tier:** T1 (Good-tier mid-premium)  
**Price:** ₹85,000–₹1,07,000  
**Sources:** Moglix ₹1,07,786; IndiaMART ₹85,000–₹89,999

```json
{
  "id": "eft_g620_frame",
  "name": "EFT G620 20L 6-Axis Agricultural Drone Frame",
  "type": "A",
  "tier": "T1",
  "quality": "Q1",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 89999,
  "weight_g": 9660,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Moglix", "url": "https://www.moglix.com", "price": 107786, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 89999, "gst": "18%" },
    { "name": "Zbotic", "url": "https://zbotic.in", "price": 85000, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 2028,
    "motor_pattern": "X6_Hexa",
    "propeller_range_inches": "34",
    "supply_voltage": "14S",
    "frame_weight_kg": 9.66,
    "max_takeoff_weight_kg": 51.2,
    "tank_capacity_L": 20,
    "material": "3K carbon fiber + 6061-T6 Al arms",
    "arm_length_mm": 480,
    "arm_tube_OD_mm": 40,
    "ip_rating": "IP65"
  },
  "compatibility": {
    "motor_mount_mm": 40,
    "voltage": "14S",
    "fc": ["pixhawk_6c", "cube_orange+", "jiyi_k++v2"],
    "warnings": ["Requires X9 or X11 motors for safe 51kg MTOW"]
  },
  "v4_verified": false,
  "notes": "51.2 kg MTOW max. 20L tank. Suitable for 30–45 kg operational builds.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "51kg MTOW, 20L tank, IP65 rated. The step-up frame for heavier operations beyond EFT E616P.",
    "the_catch": "Requires X9/X11 motors. Heavier frame at 9.66kg adds to dry weight.",
    "savings_note": "₹85,000–₹1,07,000 depending on vendor.",
    "best_for": "20L spray systems needing 40–50 kg MTOW range."
  },
  "rating": 4.6
}
```

---

### A2. Generic Quadcopter Frame 650mm — Budget Entry Quad
**Tier:** T3 (Dirt cheap / Budget)  
**Price:** ₹2,500–₹4,000  
**Sources:** Robu.in, QuadKart.in

```json
{
  "id": "generic_quad_650mm",
  "name": "Generic 650mm Carbon Fiber Quadcopter Frame (Foldable)",
  "type": "A",
  "tier": "T3",
  "quality": "Q3",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 3200,
  "weight_g": 950,
  "stock_status": "in_stock",
  "lead_time_days": 2,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 3200, "gst": "18%" },
    { "name": "QuadKart", "url": "https://quadkart.in", "price": 2500, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 650,
    "motor_pattern": "X4_Quad",
    "propeller_range_inches": "15-18",
    "supply_voltage": "6S",
    "frame_weight_kg": 0.95,
    "max_takeoff_weight_kg": 8,
    "tank_capacity_L": 0,
    "material": "carbon fiber + nylon arms",
    "arm_length_mm": 230,
    "arm_tube_OD_mm": 16,
    "ip_rating": "None"
  },
  "compatibility": {
    "motor_mount_mm": 16,
    "voltage": "6S",
    "fc": ["pixhawk_6c", "betaflight_fc"],
    "warnings": ["Not suitable for agriculture spray payloads. Max 8kg MTOW — for survey/mapping only."]
  },
  "v4_verified": false,
  "notes": "Entry-level survey drone frame. NOT for spray. Suitable for camera/mapping payloads under 2kg.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "Ultra-low cost entry point for survey builds.",
    "the_catch": "8kg MTOW max. No IP rating. No tank compatibility.",
    "savings_note": "₹2,500–₹3,200. Cheapest viable airframe.",
    "best_for": "Mapping/survey drones under 5kg AUW, not agricultural spray."
  },
  "rating": 3.2
}
```

---

### A3. Tarot T960 Folding Hexacopter Frame — Budget-Mid Hexa
**Tier:** T2 (Budget-Mid)  
**Price:** ₹15,000–₹22,000  
**Sources:** IndiaMART, UAVGarage, Robu.in

```json
{
  "id": "tarot_t960_frame",
  "name": "Tarot T960 Folding 6-Axis Hexacopter Frame",
  "type": "A",
  "tier": "T2",
  "quality": "Q2",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 18500,
  "weight_g": 2950,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "UAVGarage", "url": "https://uavgarage.com", "price": 22000, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 18500, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 960,
    "motor_pattern": "X6_Hexa",
    "propeller_range_inches": "15-18",
    "supply_voltage": "6S-12S",
    "frame_weight_kg": 2.95,
    "max_takeoff_weight_kg": 20,
    "tank_capacity_L": 5,
    "material": "Aluminium alloy + carbon fiber tubes",
    "arm_length_mm": 340,
    "arm_tube_OD_mm": 22,
    "ip_rating": "None"
  },
  "compatibility": {
    "motor_mount_mm": 22,
    "voltage": "12S",
    "fc": ["pixhawk_6c", "cube_orange+"],
    "warnings": ["20kg MTOW is theoretical max. Practical safe limit ~15kg.", "No integrated spray system — requires custom tank mount."]
  },
  "v4_verified": false,
  "notes": "Popular Chinese mid-grade hex. 20kg MTOW with moderate motor choice. Good for light payload mapping or 5L spray trials.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "Affordable hexa entry point for 10–20kg MTOW builds.",
    "the_catch": "No IP rating, no integrated spray mount, basic aluminium construction.",
    "savings_note": "₹18,500 — 5x cheaper than EFT E616P.",
    "best_for": "Light spray (5L) or mapping under 15kg AUW."
  },
  "rating": 3.8
}
```

---

### A4. EFT E610P — 10L Hex, Compact Agricultural
**Tier:** T2 (Mid)  
**Price:** ₹32,000–₹45,000  
**Sources:** Bharat Skytech, IndiaMART

```json
{
  "id": "eft_e610p_frame",
  "name": "EFT E610P 10L 6-Axis Agricultural Drone Frame",
  "type": "A",
  "tier": "T2",
  "quality": "Q2",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 38000,
  "weight_g": 5800,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Bharat Skytech", "url": "https://bharatskytech.com", "price": 42000, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 38000, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 1350,
    "motor_pattern": "X6_Hexa",
    "propeller_range_inches": "28-30",
    "supply_voltage": "12S",
    "frame_weight_kg": 5.8,
    "max_takeoff_weight_kg": 25,
    "tank_capacity_L": 10,
    "material": "3K carbon fiber + Al arms",
    "arm_length_mm": 330,
    "arm_tube_OD_mm": 35,
    "ip_rating": "IP54"
  },
  "compatibility": {
    "motor_mount_mm": 35,
    "voltage": "12S",
    "fc": ["pixhawk_6c", "jiyi_k++v2"],
    "warnings": ["10L tank max. Do not exceed 25kg MTOW."]
  },
  "v4_verified": false,
  "notes": "Smaller sibling to E616P. 25 kg MTOW, 10L tank. Ideal for light spray missions.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "Compact foldable agri frame, 10L capacity, fits 12S X8 motors.",
    "the_catch": "Lower MTOW than E616P. Not suitable for 20L builds.",
    "savings_note": "₹38,000 — between budget Tarot and premium E616P.",
    "best_for": "5–10L spray missions, 20–25kg MTOW builds."
  },
  "rating": 4.2
}
```

---

### A5. Arris X8 Octocopter Frame — High-Redundancy Heavy Lift
**Tier:** T1 (Premium)  
**Price:** ₹65,000–₹90,000  
**Sources:** IndiaMART, import from Aliexpress (US$400–$600)

```json
{
  "id": "arris_x8_octo_frame",
  "name": "Arris X8 Octocopter Heavy Lift Agricultural Frame",
  "type": "A",
  "tier": "T1",
  "quality": "Q1",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 72000,
  "weight_g": 6200,
  "stock_status": "import",
  "lead_time_days": 21,
  "retailers": [
    { "name": "IndiaMART (import)", "url": "https://indiamart.com", "price": 72000, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 1200,
    "motor_pattern": "X8_Octo",
    "propeller_range_inches": "28-34",
    "supply_voltage": "12S-14S",
    "frame_weight_kg": 6.2,
    "max_takeoff_weight_kg": 45,
    "tank_capacity_L": 15,
    "material": "T700 carbon fiber",
    "arm_length_mm": 400,
    "arm_tube_OD_mm": 30,
    "ip_rating": "IP55"
  },
  "compatibility": {
    "motor_mount_mm": 30,
    "voltage": "14S",
    "fc": ["pixhawk_6c", "cube_orange+"],
    "warnings": ["Coaxial motor mounting requires careful vibration balancing.", "Import only — 3-week lead time."]
  },
  "v4_verified": false,
  "notes": "X8 octo provides motor redundancy. If one motor fails, drone can still land safely. 45kg MTOW.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "8-motor redundancy for commercial ops. 45kg MTOW for 15L tank with heavy sensor payload.",
    "the_catch": "Import only, complex vibration tuning needed for coaxial configuration.",
    "savings_note": "₹72,000 — justified by insurance and redundancy for commercial operations.",
    "best_for": "Commercial operators needing motor-fail safety. 15L tank + RTK + camera builds."
  },
  "rating": 4.4
}
```

---

### A6. Holybro S500 V2 — Survey/Mapping Quadcopter
**Tier:** T2 (Mid — Mapping focused)  
**Price:** ₹12,000–₹18,000  
**Sources:** Robu.in, HolyBro India distributors

```json
{
  "id": "holybro_s500v2_frame",
  "name": "Holybro S500 V2 550mm Quadcopter Frame Kit",
  "type": "A",
  "tier": "T2",
  "quality": "Q2",
  "category": "Airframe & Structure",
  "necessity": "Non-Negotiable",
  "price_inr": 14500,
  "weight_g": 510,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 14500, "gst": "18%" }
  ],
  "specs": {
    "wheelbase_mm": 550,
    "motor_pattern": "X4_Quad",
    "propeller_range_inches": "12-15",
    "supply_voltage": "6S",
    "frame_weight_kg": 0.51,
    "max_takeoff_weight_kg": 10,
    "tank_capacity_L": 0,
    "material": "Carbon fiber + PCB integrated PDB",
    "arm_length_mm": 200,
    "arm_tube_OD_mm": 16,
    "ip_rating": "None"
  },
  "compatibility": {
    "motor_mount_mm": 16,
    "voltage": "6S",
    "fc": ["pixhawk_6c", "pixhawk_6x"],
    "warnings": ["Survey/camera use only — no spray payload capability."]
  },
  "v4_verified": false,
  "notes": "Official Holybro companion frame for Pixhawk builds. Integrated PDB. Survey/mapping only.",
  "compare_group": "frame",
  "editorial": {
    "why_it_fits": "Integrated PDB, Holybro ecosystem. Clean survey/mapping build.",
    "the_catch": "10kg MTOW max. No spray capability.",
    "savings_note": "₹14,500 — integrated PDB saves extra cost.",
    "best_for": "Survey, mapping, and RTK camera quad builds under 6kg AUW."
  },
  "rating": 4.1
}
```

---

## 2. TYPE B — PROPULSION (Motors / Combos)

### B1. Hobbywing X11 Plus — Mid-Premium 30L Class
**Tier:** T1 (Premium)  
**Price:** ₹38,000–₹55,000/unit  
**Sources:** Indian Robo Store, Bharat Skytech

```json
{
  "id": "hobbywing_x11_plus_cw",
  "name": "Hobbywing XRotor X11 Plus Motor+ESC+Prop Combo CW",
  "type": "B",
  "tier": "T1",
  "quality": "Q1",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 42000,
  "weight_g": 2490,
  "stock_status": "in_stock",
  "lead_time_days": 7,
  "retailers": [
    { "name": "Bharat Skytech", "url": "https://bharatskytech.com", "price": 48000, "gst": "18%" },
    { "name": "Indian Robo Store", "url": "https://indianrobostore.com", "price": 42000, "gst": "18%" }
  ],
  "specs": {
    "kv": 85,
    "stator_mm": "104x24",
    "max_thrust_g": 37000,
    "recommended_thrust_g": "12000-18000",
    "efficiency_g_per_W": "8.2-10.1",
    "rated_power_W": 2800,
    "esc_current_A": 40,
    "esc_protocol": "DroneCAN/HWCAN+PWM",
    "voltage_range": "12S-14S",
    "propeller": "MFP 34x11",
    "ip_rating": "IPX6",
    "motor_od_mm": 104,
    "combo_weight_g": 2490
  },
  "compatibility": {
    "fc": ["pixhawk_6c", "cube_orange+"],
    "battery": ["12S_lipo", "14S_lipo"],
    "frame": ["eft_g620_frame", "arris_x8_octo_frame"],
    "esc_protocol": "DroneCAN",
    "warnings": ["Requires frame arms ≥ 40mm tube OD for proper mounting."]
  },
  "v4_verified": false,
  "notes": "37kg/axis max thrust. Designed for 30L agricultural builds. FOC vector control.",
  "compare_group": "motor",
  "editorial": {
    "why_it_fits": "37kg/axis — enables 40–50kg MTOW safely on a 6-motor build.",
    "the_catch": "2,490g weight per unit — 6 motors = 14.9kg. Significant dry weight addition.",
    "savings_note": "₹42,000–₹48,000/unit. 6 units = ₹2.5L+.",
    "best_for": "30L spray drones, 40–50kg MTOW range, professional builds."
  },
  "rating": 4.7
}
```

---

### B2. T-Motor U10 II — Premium Efficiency Motor (Bare + ESC)
**Tier:** T1 (Premium)  
**Price:** ₹35,000–₹51,000/motor  
**Sources:** Zbotic, IndiaMART

```json
{
  "id": "tmotor_u10_ii_motor",
  "name": "T-Motor U10 II 100KV Motor (Bare — pairs with Flame 80A ESC)",
  "type": "B",
  "tier": "T1",
  "quality": "Q1",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 38000,
  "weight_g": 415,
  "stock_status": "import",
  "lead_time_days": 14,
  "retailers": [
    { "name": "Zbotic", "url": "https://zbotic.in", "price": 38000, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 51000, "gst": "18%" }
  ],
  "specs": {
    "kv": 100,
    "stator_mm": "90x25",
    "max_thrust_g": 10600,
    "recommended_thrust_g": "3000-7000",
    "efficiency_g_per_W": "9.0-11.5",
    "rated_power_W": 1100,
    "esc_current_A": 80,
    "esc_protocol": "PWM (pair with Flame 80A)",
    "voltage_range": "12S",
    "propeller": "30-34 inch",
    "ip_rating": "IP45",
    "motor_od_mm": 102,
    "combo_weight_g": 415
  },
  "compatibility": {
    "fc": ["pixhawk_6c", "cube_orange+"],
    "battery": ["12S_lipo"],
    "frame": ["tarot_t960_frame", "eft_e616p_frame"],
    "esc_protocol": "PWM",
    "warnings": ["Bare motor — requires separate T-Motor Flame 80A ESC at ~₹11,000 each.", "IP45 — not suitable for direct spray exposure."]
  },
  "v4_verified": false,
  "notes": "Best-in-class efficiency for 20–25kg MTOW builds. Needs separate ESC. Not integrated like Hobbywing.",
  "compare_group": "motor",
  "editorial": {
    "why_it_fits": "Highest efficiency motor in class (11.5 g/W peak). Best for endurance builds.",
    "the_catch": "Bare motor — add ₹11,000 for Flame 80A ESC per axis. IP45 means needs shrouding near spray.",
    "savings_note": "₹38,000 motor + ₹11,000 ESC = ₹49,000/axis. Comparable to X9 G2L.",
    "best_for": "Long endurance survey or light spray builds under 25kg MTOW."
  },
  "rating": 4.5
}
```

---

### B3. ReadyToSky RS2312 Budget Motor — Cheap Entry Quad/Hex
**Tier:** T3 (Dirt Cheap)  
**Price:** ₹1,500–₹2,500/motor  
**Sources:** Robu.in, Amazon India

```json
{
  "id": "readytosky_rs2312_motor",
  "name": "ReadyToSky RS2312 960KV Brushless Motor (per unit)",
  "type": "B",
  "tier": "T3",
  "quality": "Q3",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 1800,
  "weight_g": 56,
  "stock_status": "in_stock",
  "lead_time_days": 2,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 1800, "gst": "18%" },
    { "name": "Amazon India", "url": "https://amazon.in", "price": 2500, "gst": "18%" }
  ],
  "specs": {
    "kv": 960,
    "stator_mm": "23x12",
    "max_thrust_g": 1300,
    "recommended_thrust_g": "300-900",
    "efficiency_g_per_W": "5.0-6.5",
    "rated_power_W": 160,
    "esc_current_A": 30,
    "esc_protocol": "PWM",
    "voltage_range": "3S-4S",
    "propeller": "10 inch",
    "ip_rating": "None",
    "motor_od_mm": 28,
    "combo_weight_g": 56
  },
  "compatibility": {
    "fc": ["betaflight_fc"],
    "battery": ["3S_lipo", "4S_lipo"],
    "frame": ["generic_quad_650mm", "holybro_s500v2_frame"],
    "esc_protocol": "PWM",
    "warnings": ["This motor is ONLY suitable for survey/hobby builds under 3kg AUW.", "NOT suitable for agricultural spray drones."]
  },
  "v4_verified": false,
  "notes": "Entry-level motor. Survey builds under 3kg only. No agricultural spray use.",
  "compare_group": "motor",
  "editorial": {
    "why_it_fits": "Cheapest viable motor for hobby/survey quad under 3kg.",
    "the_catch": "Not for spray use. Not for 12S builds. Low efficiency.",
    "savings_note": "₹1,800/unit. 4 units = ₹7,200. Ultra-budget survey build.",
    "best_for": "Survey/mapping entry-level builds under 3kg AUW."
  },
  "rating": 3.0
}
```

---

### B4. SunnySky X4112S 400KV — Mid Budget Heavy Motor
**Tier:** T2 (Budget-Mid)  
**Price:** ₹4,500–₹7,000/motor  
**Sources:** Robu.in, IndiaMART

```json
{
  "id": "sunnysky_x4112s_motor",
  "name": "SunnySky X4112S 400KV Brushless Motor (per unit)",
  "type": "B",
  "tier": "T2",
  "quality": "Q2",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 5500,
  "weight_g": 280,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 5500, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 7000, "gst": "18%" }
  ],
  "specs": {
    "kv": 400,
    "stator_mm": "41x12",
    "max_thrust_g": 5200,
    "recommended_thrust_g": "1500-3500",
    "efficiency_g_per_W": "7.5-9.0",
    "rated_power_W": 650,
    "esc_current_A": 40,
    "esc_protocol": "PWM",
    "voltage_range": "6S-12S",
    "propeller": "15-18 inch",
    "ip_rating": "IP33",
    "motor_od_mm": 46,
    "combo_weight_g": 280
  },
  "compatibility": {
    "fc": ["pixhawk_6c", "cube_orange+"],
    "battery": ["6S_lipo", "12S_lipo"],
    "frame": ["tarot_t960_frame", "holybro_s500v2_frame"],
    "esc_protocol": "PWM",
    "warnings": ["Requires separate ESC (40A recommended).", "Not IP-rated for direct spray."]
  },
  "v4_verified": false,
  "notes": "Mid-tier workhorse for 10–20kg MTOW builds. Requires separate 40A ESC.",
  "compare_group": "motor",
  "editorial": {
    "why_it_fits": "5.2kg thrust, 9 g/W efficiency. Suitable for 10–15kg MTOW builds.",
    "the_catch": "Needs separate ESC. IP33 — protect from spray.",
    "savings_note": "₹5,500/motor + ₹3,000 ESC = ₹8,500/axis. Budget mid-range.",
    "best_for": "Light survey or 5L spray builds under 15kg MTOW."
  },
  "rating": 3.9
}
```

---

### B5. Hobbywing X15 — Ultra Heavy Lift for 50kg MTOW
**Tier:** T1 (Ultra-Premium)  
**Price:** ₹90,000–₹1,30,000/unit (RFQ)  
**Sources:** Bharat Skytech (RFQ), IndiaMART importers

```json
{
  "id": "hobbywing_x15_combo_cw",
  "name": "Hobbywing XRotor X15 Motor+ESC+Prop Combo CW (18S)",
  "type": "B",
  "tier": "T1",
  "quality": "Q1",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 100000,
  "weight_g": 5908,
  "stock_status": "order",
  "lead_time_days": 30,
  "retailers": [
    { "name": "Bharat Skytech (RFQ)", "url": "https://bharatskytech.com", "price": 100000, "gst": "18%" }
  ],
  "specs": {
    "kv": 45,
    "stator_mm": "130x28",
    "max_thrust_g": 72000,
    "recommended_thrust_g": "30000-40000",
    "efficiency_g_per_W": "7.2-9.0",
    "rated_power_W": 6000,
    "esc_current_A": 50,
    "esc_protocol": "DroneCAN/HWCAN",
    "voltage_range": "18S",
    "propeller": "48 inch",
    "ip_rating": "IPX6",
    "motor_od_mm": 135,
    "combo_weight_g": 5908
  },
  "compatibility": {
    "fc": ["cube_orange+"],
    "battery": ["18S_lipo"],
    "frame": [],
    "esc_protocol": "DroneCAN",
    "warnings": ["Requires 18S battery system — incompatible with 12S/14S builds.", "Custom frame required for 135mm motor mounts.", "Each unit ~5.9kg — 6 motors = 35.4kg motors alone."]
  },
  "v4_verified": false,
  "notes": "X15 is for 50kg+ MTOW quad builds. 72kg/axis max. Requires custom 18S power system.",
  "compare_group": "motor",
  "editorial": {
    "why_it_fits": "Only motor capable of safe 50kg MTOW on a quad with 2:1 thrust margin.",
    "the_catch": "₹1L+/unit. Requires 18S custom battery. Motor weight alone is prohibitive for hex.",
    "savings_note": "For 50kg MTOW quad: 4 units = ₹4L+. Full build cost ₹10L+.",
    "best_for": "Industrial 40–50kg MTOW quadcopter cargo/spray builds only."
  },
  "rating": 4.3
}
```

---

## 3. TYPE C — POWER (Batteries + Chargers)

### C1. GenX 22000mAh 12S LiPo — Budget Battery
**Tier:** T3 (Budget)  
**Price:** ₹22,000–₹28,000  
**Sources:** Robokits, IndiaMART

```json
{
  "id": "genx_22ah_12s_lipo",
  "name": "GenX 22000mAh 12S 25C LiPo Battery",
  "type": "C",
  "tier": "T3",
  "quality": "Q2",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 24000,
  "weight_g": 4200,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Robokits", "url": "https://robokits.co.in", "price": 24000, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 28000, "gst": "18%" }
  ],
  "specs": {
    "capacity_Ah": 22,
    "configuration": "12S1P",
    "nominal_voltage_V": 44.4,
    "max_voltage_V": 50.4,
    "energy_Wh": 976.8,
    "energy_density_Wh_kg": 232.8,
    "continuous_discharge_C": 25,
    "continuous_discharge_A": 220,
    "peak_discharge_C": 50,
    "peak_discharge_A": 1100,
    "charge_rate_C": 2,
    "cycle_life": "200+",
    "connector": "AS150U",
    "dimensions_mm": "230x165x105",
    "chemistry": "LiPo"
  },
  "compatibility": {
    "charger": ["skyrc_pc1260"],
    "voltage": "12S",
    "warnings": [
      "Standard LiPo chemistry — fire risk. Use LiPo safe bag at all times.",
      "200 cycle life — plan replacement budget.",
      "25C is a peak/paper spec; sustained hover draw should not exceed 10C (220A)."
    ]
  },
  "v4_verified": false,
  "notes": "Budget entry battery. Suitable for 20–25kg MTOW builds. 15 min estimated flight at 20kg MTOW.",
  "compare_group": "battery",
  "rating": 3.8
}
```

---

### C2. GenX 22000mAh 14S Semi-Solid — Mid Tier Battery
**Tier:** T2 (Mid)  
**Price:** ₹45,000–₹60,000  
**Sources:** Robokits (B2B quote), IndiaMART

```json
{
  "id": "genx_22ah_14s_semi_solid",
  "name": "GenX 22000mAh 14S 15C Semi-Solid LiPo Battery",
  "type": "C",
  "tier": "T2",
  "quality": "Q2",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 52000,
  "weight_g": 5500,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Robokits (quote)", "url": "https://robokits.co.in", "price": 52000, "gst": "18%" }
  ],
  "specs": {
    "capacity_Ah": 22,
    "configuration": "14S1P",
    "nominal_voltage_V": 51.8,
    "max_voltage_V": 58.8,
    "energy_Wh": 1139.6,
    "energy_density_Wh_kg": 207.2,
    "continuous_discharge_C": 15,
    "continuous_discharge_A": 330,
    "peak_discharge_C": 25,
    "peak_discharge_A": 550,
    "charge_rate_C": 1,
    "cycle_life": "400+",
    "connector": "AS150U",
    "dimensions_mm": "235x170x110",
    "chemistry": "Semi-solid LiPo"
  },
  "compatibility": {
    "charger": ["ultrapower_up2800_14s"],
    "voltage": "14S",
    "warnings": ["Requires 14S compatible charger — skyrc_pc1260 only supports 12S.", "Semi-solid safer than LiPo but still needs safe bag."]
  },
  "v4_verified": false,
  "notes": "14S pack for X9/X11 motor builds. Better energy density than 12S equivalent. ~18 min at 30kg MTOW.",
  "compare_group": "battery",
  "rating": 4.2
}
```

---

### C3. Tattu 35000mAh 14S Smart Battery — Premium
**Tier:** T1 (Premium)  
**Price:** ₹1,30,000–₹1,60,000  
**Sources:** Genstattu.com (import)

```json
{
  "id": "tattu_35ah_14s_smart",
  "name": "Tattu 35000mAh 14S1P Smart LiPo Battery",
  "type": "C",
  "tier": "T1",
  "quality": "Q1",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 148000,
  "weight_g": 6800,
  "stock_status": "import",
  "lead_time_days": 30,
  "retailers": [
    { "name": "Genstattu (import)", "url": "https://genstattu.com", "price": 148000, "gst": "18%" }
  ],
  "specs": {
    "capacity_Ah": 35,
    "configuration": "14S1P",
    "nominal_voltage_V": 51.8,
    "max_voltage_V": 58.8,
    "energy_Wh": 1813,
    "energy_density_Wh_kg": 266.6,
    "continuous_discharge_C": 10,
    "continuous_discharge_A": 350,
    "peak_discharge_C": 15,
    "peak_discharge_A": 525,
    "charge_rate_C": 1,
    "cycle_life": "600+",
    "connector": "AS150U-F",
    "dimensions_mm": "260x195x130",
    "chemistry": "Smart LiPo with BMS"
  },
  "compatibility": {
    "charger": ["ultrapower_up2800_14s"],
    "voltage": "14S",
    "warnings": ["Import only — 30 day lead time.", "Smart BMS provides per-cell monitoring via CAN."]
  },
  "v4_verified": false,
  "notes": "35Ah 14S — highest capacity practical single pack. ~25 min at 40kg MTOW. Smart BMS for health monitoring.",
  "compare_group": "battery",
  "rating": 4.5
}
```

---

### C4. UltraPower UP2800-14S Dual Charger
**Tier:** T2 (Mid)  
**Price:** ₹55,000–₹62,000  
**Sources:** Indian Robo Store, IndiaMART

```json
{
  "id": "ultrapower_up2800_14s",
  "name": "UltraPower UP2800-14S Dual Channel 14S Battery Charger",
  "type": "C",
  "tier": "T2",
  "quality": "Q2",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 58000,
  "weight_g": 5800,
  "stock_status": "in_stock",
  "lead_time_days": 7,
  "retailers": [
    { "name": "Indian Robo Store", "url": "https://indianrobostore.com", "price": 58000, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 62000, "gst": "18%" }
  ],
  "specs": {
    "max_power_W": 2800,
    "max_current_A": "20 x 2",
    "max_cell_count": "14S x 2",
    "battery_types": "LiPo/LiHV/Li-ion",
    "weight_g": 5800,
    "dimensions_mm": "310x220x130",
    "balance_current_A": 2.0
  },
  "compatibility": {
    "battery": ["genx_22ah_14s_semi_solid", "tattu_35ah_14s_smart"],
    "voltage": "14S",
    "warnings": ["skyrc_pc1260 is 12S ONLY — do not use for 14S batteries."]
  },
  "v4_verified": false,
  "notes": "Required charger for 14S builds. PC1260 does not support 14S — always use this for 14S battery sets.",
  "compare_group": "charger",
  "rating": 4.4
}
```

---

### C5. Multistar 16000mAh 6S LiPo — Dirt Cheap Survey
**Tier:** T3 (Dirt Cheap)  
**Price:** ₹8,000–₹12,000  
**Sources:** HobbyKing India (import), IndiaMART

```json
{
  "id": "multistar_16ah_6s_lipo",
  "name": "Multistar High Capacity 16000mAh 6S 10C LiPo Battery",
  "type": "C",
  "tier": "T3",
  "quality": "Q3",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 9500,
  "weight_g": 1850,
  "stock_status": "import",
  "lead_time_days": 14,
  "retailers": [
    { "name": "HobbyKing (import)", "url": "https://hobbyking.com", "price": 9500, "gst": "18%" }
  ],
  "specs": {
    "capacity_Ah": 16,
    "configuration": "6S1P",
    "nominal_voltage_V": 22.2,
    "max_voltage_V": 25.2,
    "energy_Wh": 355.2,
    "energy_density_Wh_kg": 192.0,
    "continuous_discharge_C": 10,
    "continuous_discharge_A": 160,
    "peak_discharge_C": 20,
    "peak_discharge_A": 320,
    "charge_rate_C": 1,
    "cycle_life": "150+",
    "connector": "EC5",
    "dimensions_mm": "195x135x65",
    "chemistry": "LiPo"
  },
  "compatibility": {
    "charger": [],
    "voltage": "6S",
    "warnings": ["6S ONLY — for survey/hobby builds under 8kg AUW.", "NOT compatible with 12S or 14S agricultural drone builds.", "10C rating is low — monitor cell sag during flight."]
  },
  "v4_verified": false,
  "notes": "Entry-level survey battery. 6S only. Not for spray drones.",
  "compare_group": "battery",
  "rating": 3.1
}
```

---

## 4. TYPE D — AVIONICS (Flight Controllers + Radio)

### D1. Pixhawk 6X — Premium Open Standard FC
**Tier:** T1 (Premium)  
**Price:** ₹31,000–₹44,000  
**Sources:** Robu.in, XBoom, Robosynckits

```json
{
  "id": "pixhawk_6x_fc",
  "name": "Holybro Pixhawk 6X Flight Controller (Standard Set)",
  "type": "D",
  "tier": "T1",
  "quality": "Q1",
  "category": "Avionics & Control",
  "necessity": "Non-Negotiable",
  "price_inr": 36000,
  "weight_g": 59,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 36000, "gst": "18%" },
    { "name": "XBoom", "url": "https://xboom.in", "price": 44000, "gst": "18%" }
  ],
  "specs": {
    "processor": "STM32H753",
    "imu_count": 3,
    "barometer_count": 2,
    "firmware": "ArduPilot / PX4",
    "can_ports": 2,
    "uart_ports": 8,
    "pwm_outputs": 16,
    "usb": "USB-C",
    "ip_rating": "None",
    "weight_g": 59,
    "dimensions_mm": "38x38x12"
  },
  "compatibility": {
    "motor": ["hobbywing_x9_g2l_cw", "hobbywing_x11_plus_cw"],
    "gps": ["here4_rtk", "holybro_m9n"],
    "warnings": []
  },
  "v4_verified": false,
  "notes": "FMUv6X standard. Superior to Pixhawk 6C with H753 processor and triple IMU. CAN for DroneCAN ESCs.",
  "compare_group": "fc",
  "editorial": {
    "why_it_fits": "Top-tier open standard FC. Best for CAN-equipped motor builds.",
    "the_catch": "No ADS-B built-in unlike Cube Orange+.",
    "savings_note": "₹36,000 vs ₹50,000 Cube Orange+. ~30% cheaper with similar performance.",
    "best_for": "Premium agricultural builds needing ArduPilot reliability and CAN support."
  },
  "rating": 4.8
}
```

---

### D2. JIYI K++V2 — Agriculture-Specific FC
**Tier:** T1 (Agriculture Premium)  
**Price:** ₹45,000–₹60,000  
**Sources:** IndiaMART (agricultural FC dealers), Bharat Skytech

```json
{
  "id": "jiyi_k++_v2_fc",
  "name": "JIYI K++ V2 Agricultural Flight Controller",
  "type": "D",
  "tier": "T1",
  "quality": "Q1",
  "category": "Avionics & Control",
  "necessity": "Non-Negotiable",
  "price_inr": 52000,
  "weight_g": 320,
  "stock_status": "in_stock",
  "lead_time_days": 7,
  "retailers": [
    { "name": "Bharat Skytech", "url": "https://bharatskytech.com", "price": 52000, "gst": "18%" }
  ],
  "specs": {
    "processor": "Proprietary (JIYI custom)",
    "imu_count": 2,
    "barometer_count": 1,
    "firmware": "JIYI Agriculture SDK",
    "can_ports": 1,
    "uart_ports": 4,
    "pwm_outputs": 8,
    "radar_support": true,
    "spray_control": true,
    "autonomous_modes": "Terrain-following, AB-line, RTK waypoints",
    "weight_g": 320,
    "dimensions_mm": "120x80x32"
  },
  "compatibility": {
    "motor": ["hobbywing_x8_combo_cw", "hobbywing_x9_g2l_cw"],
    "gps": ["here4_rtk"],
    "warnings": ["Closed ecosystem — no ArduPilot/PX4. Use only JIYI app and accessories.", "Spray system control requires JIYI spray module add-on."]
  },
  "v4_verified": false,
  "notes": "Agriculture-specific FC with terrain following and spray integration. Widely used in China agri-drones.",
  "compare_group": "fc",
  "editorial": {
    "why_it_fits": "Native agriculture workflow: terrain follow, AB-line spray, flow meter integration.",
    "the_catch": "Proprietary system — vendor lock-in. No open-source tuning.",
    "savings_note": "₹52,000 — justified for production agri builds.",
    "best_for": "Full autonomous spray operations with JIYI ecosystem."
  },
  "rating": 4.5
}
```

---

### D3. Radiomaster TX16S MKII — Mid Radio System
**Tier:** T2 (Mid)  
**Price:** ₹18,500–₹31,500  
**Sources:** Zbotic, DroneCompany.in, XBoom

```json
{
  "id": "radiomaster_tx16s_mkii",
  "name": "Radiomaster TX16S Mark II Multi-Protocol RC Transmitter",
  "type": "D",
  "tier": "T2",
  "quality": "Q2",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 22000,
  "weight_g": 848,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Zbotic", "url": "https://zbotic.in", "price": 22000, "gst": "18%" },
    { "name": "XBoom", "url": "https://xboom.in", "price": 28000, "gst": "18%" }
  ],
  "specs": {
    "channels": 16,
    "frequency": "2.4GHz (ELRS 900MHz optional module)",
    "range_km": 10,
    "protocols": "ELRS, FrSky D, CRSF",
    "display": "4.3 inch color touchscreen",
    "battery": "2x 18650",
    "telemetry": true,
    "weight_g": 848
  },
  "compatibility": {
    "receiver": ["frsky_rxsr", "elrs_receiver"],
    "fc": ["pixhawk_6c", "pixhawk_6x", "cube_orange+"],
    "warnings": ["Default 2.4GHz range ~2km. Upgrade to ELRS 900MHz module for 10km+."]
  },
  "v4_verified": false,
  "notes": "Open-source EdgeTX radio. Most versatile option for ArduPilot builds. Upgrade to 900MHz ELRS for agri range.",
  "compare_group": "radio",
  "editorial": {
    "why_it_fits": "Open protocol, EdgeTX firmware, companion to ArduPilot builds.",
    "the_catch": "2.4GHz base unit — needs ELRS 900MHz module (₹6,000 extra) for 10km range.",
    "savings_note": "₹22,000 + ₹6,000 ELRS = ₹28,000 total. Cheaper than Skydroid H12.",
    "best_for": "Pixhawk-based custom builds needing versatile RC control."
  },
  "rating": 4.4
}
```

---

### D4. FrSky X9D Plus SE — Good Tier Radio
**Tier:** T2 (Good)  
**Price:** ₹19,000–₹26,000  
**Sources:** UAVGarage, IndiaMART

```json
{
  "id": "frsky_x9d_plus_se",
  "name": "FrSky Taranis X9D Plus Special Edition Transmitter",
  "type": "D",
  "tier": "T2",
  "quality": "Q2",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 21000,
  "weight_g": 820,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "UAVGarage", "url": "https://uavgarage.com", "price": 21000, "gst": "18%" }
  ],
  "specs": {
    "channels": 16,
    "frequency": "2.4GHz ACCESS",
    "range_km": 5,
    "protocols": "FrSky ACCESS, D16, ACCST",
    "display": "LCD monochrome",
    "telemetry": true,
    "weight_g": 820
  },
  "compatibility": {
    "receiver": ["frsky_rxsr", "frsky_r9m"],
    "fc": ["pixhawk_6c", "cube_orange+"],
    "warnings": ["2.4GHz base — pair with R9M 900MHz module for 8km+ range."]
  },
  "v4_verified": false,
  "notes": "Industry-standard open-source radio. OpenTX/EdgeTX compatible. R9M module adds 900MHz long range.",
  "compare_group": "radio",
  "rating": 4.3
}
```

---

### D5. Holybro M9N GPS — Mid Precision GPS
**Tier:** T2 (Mid)  
**Price:** ₹7,000–₹11,500  
**Sources:** Robu.in, XBoom

```json
{
  "id": "holybro_m9n_gps",
  "name": "Holybro M9N GNSS Multi-Constellation GPS Module",
  "type": "D",
  "tier": "T2",
  "quality": "Q2",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 8500,
  "weight_g": 36,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 8500, "gst": "18%" },
    { "name": "XBoom", "url": "https://xboom.in", "price": 11500, "gst": "18%" }
  ],
  "specs": {
    "gnss_module": "u-blox M9N",
    "constellations": "GPS+GLONASS+Galileo+BeiDou",
    "accuracy_m": 1.5,
    "update_rate_Hz": 25,
    "compass": "IST8310",
    "interface": "UART + I2C",
    "sensitivity_dBm": -167,
    "ip_rating": "IP44",
    "weight_g": 36,
    "dimensions_mm": "38x38x8.5"
  },
  "compatibility": {
    "fc": ["pixhawk_6c", "pixhawk_6x", "cube_orange+"],
    "warnings": ["Mount on mast 15cm+ away from ESCs and power cables to prevent compass interference."]
  },
  "v4_verified": false,
  "notes": "25Hz update rate, 1.5m accuracy. Good mid-range choice for spray/mapping builds.",
  "compare_group": "gps",
  "editorial": {
    "why_it_fits": "25Hz update, all 4 constellations, IST8310 compass. Upgrade from HGLRC M100.",
    "the_catch": "Not RTK — 1.5m accuracy. For centimetre-level, use Here4 RTK.",
    "savings_note": "₹8,500 vs ₹36,538 Here4 RTK. 77% cheaper with adequate accuracy for spray.",
    "best_for": "Standard spray missions where 1–2m accuracy is sufficient."
  },
  "rating": 4.4
}
```

---

### D6. CubePilot Here3+ RTK GPS — Premium Precision
**Tier:** T1 (Premium)  
**Price:** ₹36,000–₹45,000  
**Sources:** XBoom, UAV Marketplace

```json
{
  "id": "here3_plus_rtk_gps",
  "name": "CubePilot Here3+ Multi-Band RTK GPS + iStand",
  "type": "D",
  "tier": "T1",
  "quality": "Q1",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 42000,
  "weight_g": 48,
  "stock_status": "in_stock",
  "lead_time_days": 7,
  "retailers": [
    { "name": "XBoom", "url": "https://xboom.in", "price": 45000, "gst": "18%" },
    { "name": "UAV Marketplace", "url": "https://uavmarketplace.in", "price": 42000, "gst": "18%" }
  ],
  "specs": {
    "gnss_module": "u-blox F9P Multi-band RTK",
    "constellations": "GPS L1/L2 + GLONASS G1/G2 + Galileo E1/E5 + BeiDou",
    "accuracy_m": 0.01,
    "update_rate_Hz": 25,
    "compass": "ICM42688 + MMC5983",
    "interface": "DroneCAN",
    "sensitivity_dBm": -167,
    "ip_rating": "IP54",
    "weight_g": 48,
    "dimensions_mm": "56x56x14"
  },
  "compatibility": {
    "fc": ["pixhawk_6x_fc", "cube_orange+"],
    "warnings": ["RTK base station required for cm-level accuracy. Only DroneCAN — no UART mode.", "Requires RTCM3 base station stream for RTK fix."]
  },
  "v4_verified": false,
  "notes": "CubePilot's dual-band RTK GPS. 1cm accuracy with base station. DroneCAN only.",
  "compare_group": "gps",
  "rating": 4.8
}
```

---

## 5. TYPE E — SENSORS (LiDAR / Radar / Flow)

### E1. Benewake TFmini-S — Dirt Cheap LiDAR
**Tier:** T3 (Dirt Cheap)  
**Price:** ₹3,000–₹5,000  
**Sources:** Robu.in, Amazon India

```json
{
  "id": "benewake_tfmini_s",
  "name": "Benewake TFmini-S Short-Range LiDAR Distance Sensor",
  "type": "E",
  "tier": "T3",
  "quality": "Q2",
  "category": "Sensors",
  "necessity": "Enhancement",
  "price_inr": 3800,
  "weight_g": 5,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 3800, "gst": "18%" },
    { "name": "Amazon India", "url": "https://amazon.in", "price": 5000, "gst": "18%" }
  ],
  "specs": {
    "range_m": 12,
    "fov_deg": 3.6,
    "wavelength_nm": 850,
    "update_rate_Hz": 1000,
    "interface": "UART / I2C",
    "ip_rating": "IP65 (with case)",
    "weight_g": 5,
    "blind_zone_cm": 10
  },
  "compatibility": {
    "interface": "UART",
    "compatible_fc": ["pixhawk_6c", "pixhawk_6x", "cube_orange+"],
    "voltage_V": "5"
  },
  "v4_verified": false,
  "notes": "Ultra-light 5g LiDAR for altitude hold and terrain following up to 12m. Budget-tier for spray altitude consistency.",
  "compare_group": "sensor",
  "rating": 4.2
}
```

---

### E2. Benewake TF03-100 — Mid Precision LiDAR
**Tier:** T2 (Mid)  
**Price:** ₹17,000–₹25,000  
**Sources:** Indian Robo Store, Electronicscomp

```json
{
  "id": "benewake_tf03_100",
  "name": "Benewake TF03 100m Industrial LiDAR Altitude Sensor",
  "type": "E",
  "tier": "T2",
  "quality": "Q1",
  "category": "Sensors",
  "necessity": "Enhancement",
  "price_inr": 20000,
  "weight_g": 76,
  "stock_status": "in_stock",
  "lead_time_days": 7,
  "retailers": [
    { "name": "Indian Robo Store", "url": "https://indianrobostore.com", "price": 20000, "gst": "18%" },
    { "name": "Electronicscomp", "url": "https://electronicscomp.com", "price": 22000, "gst": "18%" }
  ],
  "specs": {
    "range_m": 100,
    "fov_deg": 2.0,
    "wavelength_nm": 905,
    "update_rate_Hz": 10000,
    "interface": "UART / CAN / RS232",
    "ip_rating": "IP67",
    "weight_g": 76,
    "blind_zone_cm": 10
  },
  "compatibility": {
    "interface": "UART",
    "compatible_fc": ["pixhawk_6c", "pixhawk_6x", "cube_orange+"],
    "voltage_V": "5-12"
  },
  "v4_verified": false,
  "notes": "IP67, 100m range, industrial-grade. For terrain-following agricultural spray and precision altitude hold.",
  "compare_group": "sensor",
  "rating": 4.6
}
```

---

### E3. Ainstein US-D1 Radar Altimeter — Premium Terrain Follow
**Tier:** T1 (Premium)  
**Price:** ₹55,000–₹80,000  
**Sources:** Import from Ainstein, UAV Marketplace India

```json
{
  "id": "ainstein_us_d1_radar",
  "name": "Ainstein US-D1 77GHz Radar Altimeter",
  "type": "E",
  "tier": "T1",
  "quality": "Q1",
  "category": "Sensors",
  "necessity": "Enhancement",
  "price_inr": 68000,
  "weight_g": 60,
  "stock_status": "import",
  "lead_time_days": 21,
  "retailers": [
    { "name": "UAV Marketplace (import)", "url": "https://uavmarketplace.in", "price": 68000, "gst": "18%" }
  ],
  "specs": {
    "range_m": 45,
    "fov_deg": 13,
    "frequency_GHz": 77,
    "update_rate_Hz": 100,
    "interface": "UART",
    "ip_rating": "IP67",
    "weight_g": 60
  },
  "compatibility": {
    "interface": "UART",
    "compatible_fc": ["pixhawk_6x_fc", "cube_orange+"],
    "voltage_V": "5"
  },
  "v4_verified": false,
  "notes": "mmWave radar — immune to dust, spray droplets, and fog unlike optical LiDAR. Best for crop canopy terrain following.",
  "compare_group": "sensor",
  "editorial": {
    "why_it_fits": "Works through spray mist and dust unlike LiDAR. 45m range, 13° FOV for canopy following.",
    "the_catch": "₹68,000 — premium cost. Import only.",
    "savings_note": "Worth it for commercial spray ops where LiDAR fails in heavy spray conditions.",
    "best_for": "Commercial spray operators needing reliable terrain following in dense spray environments."
  },
  "rating": 4.7
}
```

---

## 6. TYPE F — PAYLOAD (Pumps + Tanks + Cameras)

### F1. Hobbywing 8L Brushless Pump — Mid Flow Spray
**Tier:** T2 (Mid)  
**Price:** ₹7,500–₹9,700  
**Sources:** IndiaMART, Zbotic

```json
{
  "id": "hobbywing_8l_pump",
  "name": "Hobbywing XRotor 8L Brushless Agricultural Pump",
  "type": "F",
  "tier": "T2",
  "quality": "Q2",
  "category": "Mission Payload",
  "necessity": "Mission-Critical",
  "price_inr": 8500,
  "weight_g": 450,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 8500, "gst": "18%" },
    { "name": "Zbotic", "url": "https://zbotic.in", "price": 9700, "gst": "18%" }
  ],
  "specs": {
    "type": "Brushless centrifugal",
    "voltage": "12-14S direct",
    "power_W": 120,
    "pressure_bar": 3.5,
    "flow_L_per_min": 8,
    "current_A": "2.5 avg / 4 peak",
    "pwm_range": "1050-1950us",
    "ip_rating": "IP67",
    "weight_g": 450,
    "size_mm": "143x85x60"
  },
  "compatibility": {
    "fc": ["jiyi_k++_v2_fc", "pixhawk_6c", "pixhawk_6x_fc"],
    "battery": ["12S_lipo", "14S_lipo"],
    "nozzle_pressure_bar": "2.0-4.0",
    "warnings": ["Higher flow rate than 5L pump — use 6-8 nozzles for even coverage."]
  },
  "v4_verified": false,
  "notes": "8L/min flow. Better for 10–20L tanks needing faster cycle time. Compatible with 12S and 14S builds.",
  "compare_group": "pump",
  "rating": 4.5
}
```

---

### F2. EFT G-Series 16L Tank with Pump Plate
**Tier:** T2 (Mid)  
**Price:** ₹8,000–₹13,000  
**Sources:** IndiaMART, Bharat Skytech

```json
{
  "id": "eft_16l_tank",
  "name": "EFT G-Series 16L Agricultural Spray Tank with Mounting Plate",
  "type": "F",
  "tier": "T2",
  "quality": "Q2",
  "category": "Mission Payload",
  "necessity": "Mission-Critical",
  "price_inr": 9500,
  "weight_g": 1800,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Bharat Skytech", "url": "https://bharatskytech.com", "price": 9500, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 12000, "gst": "18%" }
  ],
  "specs": {
    "capacity_L": 16,
    "material": "HDPE chemical-resistant",
    "battery_plate": "included",
    "baffles": "Yes — 2 internal",
    "fill_port": "Top-fill",
    "drain_port": "Quick-release bottom",
    "level_sensor": "Float type"
  },
  "compatibility": {
    "frame": ["eft_e616p_frame"],
    "voltage": "N/A",
    "fc": [],
    "warnings": ["16L of water = 16kg. Verify total MTOW before using. EFT E616P MTOW = 36kg — leaves only 13kg margin for dry weight.", "USE RULE R10: Verify frame MTOW allows 16L tank payload."]
  },
  "v4_verified": false,
  "notes": "16L tank. Pairs with EFT E616P frame. NOTE: Frame MTOW check required — may overload at full capacity.",
  "compare_group": "tank",
  "rating": 4.1
}
```

---

### F3. EFT 20L Agricultural Tank for G620
**Tier:** T1 (Premium)  
**Price:** ₹12,000–₹18,000  
**Sources:** Bharat Skytech, IndiaMART

```json
{
  "id": "eft_20l_tank",
  "name": "EFT G620 20L Agricultural Spray Tank (Baffled HDPE)",
  "type": "F",
  "tier": "T1",
  "quality": "Q2",
  "category": "Mission Payload",
  "necessity": "Mission-Critical",
  "price_inr": 13500,
  "weight_g": 2200,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Bharat Skytech", "url": "https://bharatskytech.com", "price": 13500, "gst": "18%" },
    { "name": "IndiaMART", "url": "https://indiamart.com", "price": 18000, "gst": "18%" }
  ],
  "specs": {
    "capacity_L": 20,
    "material": "HDPE chemical-resistant",
    "battery_plate": "included",
    "baffles": "Yes — 4 internal baffles (anti-slosh)",
    "fill_port": "Wide-mouth top-fill",
    "drain_port": "Quick-release bottom valve",
    "level_sensor": "Capacitive type"
  },
  "compatibility": {
    "frame": ["eft_g620_frame"],
    "voltage": "N/A",
    "fc": [],
    "warnings": ["20L water = 20kg liquid payload. EFT G620 MTOW = 51.2kg. Dry weight must stay below 31.2kg."]
  },
  "v4_verified": false,
  "notes": "20L baffled tank for EFT G620. Anti-slosh design critical for stable flight with full tank.",
  "compare_group": "tank",
  "rating": 4.3
}
```

---

### F4. 7L Budget Custom Tank (Generic HDPE)
**Tier:** T3 (Budget)  
**Price:** ₹2,500–₹4,000  
**Sources:** Local fabricators, IndiaMART

```json
{
  "id": "generic_7l_hdpe_tank",
  "name": "Generic 7L HDPE Drone Spray Tank (Custom Fabricated)",
  "type": "F",
  "tier": "T3",
  "quality": "Q3",
  "category": "Mission Payload",
  "necessity": "Mission-Critical",
  "price_inr": 3000,
  "weight_g": 800,
  "stock_status": "order",
  "lead_time_days": 10,
  "retailers": [
    { "name": "Local HDPE Fabricator", "url": "", "price": 3000, "gst": "18%" }
  ],
  "specs": {
    "capacity_L": 7,
    "material": "HDPE",
    "battery_plate": "None",
    "baffles": "None",
    "fill_port": "Top-fill cap",
    "drain_port": "1/2 inch NPT bottom"
  },
  "compatibility": {
    "frame": ["tarot_t960_frame", "eft_e610p_frame"],
    "voltage": "N/A",
    "fc": [],
    "warnings": ["No baffles — significant COG shift during partially filled flight.", "Custom fabricated — no warranty or fit guarantee for specific frames."]
  },
  "v4_verified": false,
  "notes": "Budget 7L tank for light spray trials. No baffles = COG shift risk at partial fill. For trial/testing only.",
  "compare_group": "tank",
  "rating": 2.9
}
```

---

### F5. Sony A7R V + Gimbal (RGB Mapping) — Premium Camera
**Tier:** T1 (Ultra Premium)  
**Price:** ₹3,90,000–₹4,50,000 (body only)  
**Sources:** Sony India authorized dealers

```json
{
  "id": "sony_a7r5_mapping_camera",
  "name": "Sony A7R V 61MP Full-Frame Camera (RGB Mapping Payload)",
  "type": "F",
  "tier": "T1",
  "quality": "Q1",
  "category": "Camera & Survey Payload",
  "necessity": "Enhancement",
  "price_inr": 400000,
  "weight_g": 723,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Sony India", "url": "https://www.sony.co.in", "price": 400000, "gst": "18%" }
  ],
  "specs": {
    "sensor_type": "Full-frame BSI-CMOS 61MP",
    "resolution_mp": 61,
    "focal_length_mm": "35 (standard lens)",
    "gsd_cm_at_100m": 1.2,
    "ndvi_capable": false,
    "thermal": false,
    "shutter_type": "Electronic/Mechanical",
    "connector": "Sony Multi-interface",
    "weight_g": 723,
    "dimensions_mm": "131x97x76"
  },
  "compatibility": {
    "fc": ["pixhawk_6x_fc", "cube_orange+"],
    "warnings": ["Requires gimbal (add ₹40,000 for T1 gimbal).", "Camera trigger integration via hotshoe or IR cable.", "RGB only — no spectral analysis."]
  },
  "v4_verified": false,
  "notes": "Highest resolution RGB mapping camera. GSD 1.2cm/px at 100m AGL. Photogrammetry use only.",
  "compare_group": "camera",
  "rating": 4.9
}
```

---

### F6. RunCam Split 4 — Budget Survey Camera
**Tier:** T3 (Dirt Cheap)  
**Price:** ₹7,000–₹10,000  
**Sources:** Robu.in, FPV shops

```json
{
  "id": "runcam_split4_camera",
  "name": "RunCam Split 4 4K Action Camera (Budget Survey)",
  "type": "F",
  "tier": "T3",
  "quality": "Q2",
  "category": "Camera & Survey Payload",
  "necessity": "Enhancement",
  "price_inr": 8000,
  "weight_g": 28,
  "stock_status": "in_stock",
  "lead_time_days": 2,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 8000, "gst": "18%" }
  ],
  "specs": {
    "sensor_type": "1/3 inch CMOS 8MP",
    "resolution_mp": 8,
    "focal_length_mm": "2.1",
    "gsd_cm_at_100m": 18,
    "ndvi_capable": false,
    "thermal": false,
    "shutter_type": "Rolling shutter",
    "connector": "Micro USB",
    "weight_g": 28,
    "dimensions_mm": "38x38x23"
  },
  "compatibility": {
    "fc": ["pixhawk_6c"],
    "warnings": ["Rolling shutter — causes jello effect. Use ND filters at speed.", "18cm GSD at 100m — only for broad coverage, not precision mapping."]
  },
  "v4_verified": false,
  "notes": "Ultra-light budget camera for broad area FPV and rough mapping. Not for precision photogrammetry.",
  "compare_group": "camera",
  "rating": 3.2
}
```

---

## 7. TYPE G — TOOLS & SAFETY

### G1. Hobbymate H6AC Drone Battery Charger (Budget 6S)
**Tier:** T3 (Budget)  
**Price:** ₹4,500–₹7,000  
**Sources:** Robu.in, QuadKart

```json
{
  "id": "hobbymate_h6ac_charger",
  "name": "Hobbymate H6AC 80W 6S Balance Charger",
  "type": "C",
  "tier": "T3",
  "quality": "Q3",
  "category": "Power & Electrical",
  "necessity": "Non-Negotiable",
  "price_inr": 5000,
  "weight_g": 480,
  "stock_status": "in_stock",
  "lead_time_days": 2,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 5000, "gst": "18%" }
  ],
  "specs": {
    "max_power_W": 80,
    "max_current_A": 6,
    "max_cell_count": "6S",
    "battery_types": "LiPo/LiHV/NiMH",
    "weight_g": 480,
    "balance_current_A": 0.3
  },
  "compatibility": {
    "battery": ["multistar_16ah_6s_lipo"],
    "voltage": "6S",
    "warnings": ["6S MAXIMUM. DO NOT USE on 12S or 14S batteries — fire risk.", "Only for survey/hobby 6S builds."]
  },
  "v4_verified": false,
  "notes": "Budget 6S charger for survey drones only.",
  "compare_group": "charger",
  "rating": 3.5
}
```

---

### G2. FrSky R9 Slim+ Long Range Receiver — Budget Long-Range RX
**Tier:** T3 (Budget)  
**Price:** ₹2,500–₹4,000  
**Sources:** TheEngineerStore, ElectronicsComp

```json
{
  "id": "frsky_r9_slim_plus_rx",
  "name": "FrSky R9 Slim+ 900MHz Long Range Receiver",
  "type": "D",
  "tier": "T3",
  "quality": "Q2",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 3200,
  "weight_g": 5.2,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "TheEngineerStore", "url": "https://theengineerstore.in", "price": 3200, "gst": "18%" }
  ],
  "specs": {
    "frequency": "900MHz FHSS",
    "range_km": 8,
    "channels": 16,
    "telemetry": true,
    "weight_g": 5.2,
    "dimensions_mm": "39x13x5"
  },
  "compatibility": {
    "tx": ["frsky_x9d_plus_se"],
    "fc": ["pixhawk_6c", "pixhawk_6x_fc"],
    "warnings": ["Requires R9M 900MHz module on transmitter.", "Not compatible with 2.4GHz transmitters."]
  },
  "v4_verified": false,
  "notes": "900MHz long-range receiver. 8km range with R9M TX module. Budget long-range option.",
  "compare_group": "receiver",
  "rating": 4.1
}
```

---

### G3. BetaFPV ELRS Lite Receiver — Dirt Cheap RX
**Tier:** T3 (Dirt Cheap)  
**Price:** ₹1,500–₹2,500  
**Sources:** Robu.in, QuadKart

```json
{
  "id": "betafpv_elrs_lite_rx",
  "name": "BetaFPV ELRS Lite 2.4GHz Receiver",
  "type": "D",
  "tier": "T3",
  "quality": "Q2",
  "category": "Avionics & Control",
  "necessity": "Mission-Critical",
  "price_inr": 1800,
  "weight_g": 1.5,
  "stock_status": "in_stock",
  "lead_time_days": 2,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 1800, "gst": "18%" }
  ],
  "specs": {
    "frequency": "2.4GHz ELRS",
    "range_km": 2,
    "channels": 16,
    "telemetry": true,
    "weight_g": 1.5
  },
  "compatibility": {
    "tx": ["radiomaster_tx16s_mkii"],
    "fc": ["pixhawk_6c", "pixhawk_6x_fc"],
    "warnings": ["2.4GHz 2km range only — upgrade to 900MHz ELRS receiver for agriculture (10km+)."]
  },
  "v4_verified": false,
  "notes": "Ultra-cheap receiver for 2.4GHz builds. Insufficient range for agriculture — upgrade to 900MHz for field use.",
  "compare_group": "receiver",
  "rating": 3.5
}
```

---

### G4. Holybro 10A 5V/12V BEC — Mid Dual BEC
**Tier:** T2 (Mid)  
**Price:** ₹2,000–₹3,500  
**Sources:** Robu.in, Holybro resellers

```json
{
  "id": "holybro_10a_bec",
  "name": "Holybro 10A Dual 5V/12V BEC (Power Regulator)",
  "type": "C",
  "tier": "T2",
  "quality": "Q2",
  "category": "Power & Electrical",
  "necessity": "Mission-Critical",
  "price_inr": 2500,
  "weight_g": 38,
  "stock_status": "in_stock",
  "lead_time_days": 3,
  "retailers": [
    { "name": "Robu.in", "url": "https://robu.in", "price": 2500, "gst": "18%" }
  ],
  "specs": {
    "input_voltage_V": "7-50V (12S compatible)",
    "output_5V_A": 10,
    "output_12V_A": 5,
    "efficiency_percent": 95,
    "protection": "Short circuit, over-temperature",
    "weight_g": 38,
    "dimensions_mm": "50x30x15"
  },
  "compatibility": {
    "battery": ["12S_lipo", "14S_lipo"],
    "fc": ["pixhawk_6c", "pixhawk_6x_fc"],
    "warnings": []
  },
  "v4_verified": false,
  "notes": "Dual-output BEC for 12S/14S systems. Provides 5V for FC and 12V for accessories (lights, pump relay).",
  "compare_group": "bec",
  "rating": 4.3
}
```

---

### G5. PDB Matek HV APD — Premium High-Voltage PDB
**Tier:** T1 (Good)  
**Price:** ₹4,500–₹7,500  
**Sources:** Indian Robo Store, Robu.in

```json
{
  "id": "matek_hv_pdb",
  "name": "Matek FCHUB-12S High-Voltage PDB with BEC",
  "type": "B",
  "tier": "T1",
  "quality": "Q1",
  "category": "Propulsion",
  "necessity": "Non-Negotiable",
  "price_inr": 5500,
  "weight_g": 28,
  "stock_status": "in_stock",
  "lead_time_days": 5,
  "retailers": [
    { "name": "Indian Robo Store", "url": "https://indianrobostore.com", "price": 5500, "gst": "18%" },
    { "name": "Robu.in", "url": "https://robu.in", "price": 4800, "gst": "18%" }
  ],
  "specs": {
    "voltage": "12S",
    "peak_current_A": 300,
    "continuous_current_A": 200,
    "esc_outputs": 8,
    "built_in_5V_bec_A": 3,
    "current_sensing": true,
    "current_sensing_A": 200
  },
  "compatibility": {
    "compatible_frame": ["eft_e616p_frame", "eft_g620_frame", "tarot_t960_frame"],
    "max_current_A": 300,
    "note": "Built-in current sensing — no external MAUCH sensor needed"
  },
  "v4_verified": false,
  "notes": "Compact PDB with integrated 5V BEC and current sensing. Replaces need for separate MAUCH sensor.",
  "compare_group": "pdb",
  "rating": 4.6
}
```

---

## SUMMARY TABLE

| Category | ID | Name | Type | Tier | Price INR | Weight g | MTOW Range |
|---|---|---|---|---|---|---|---|
| **Frame** | `eft_g620_frame` | EFT G620 20L Hex | A | T1 | ₹89,999 | 9,660 | 40–51kg |
| **Frame** | `generic_quad_650mm` | Generic 650mm Quad | A | T3 | ₹3,200 | 950 | Survey <8kg |
| **Frame** | `tarot_t960_frame` | Tarot T960 Hex | A | T2 | ₹18,500 | 2,950 | 10–20kg |
| **Frame** | `eft_e610p_frame` | EFT E610P 10L | A | T2 | ₹38,000 | 5,800 | 20–25kg |
| **Frame** | `arris_x8_octo_frame` | Arris X8 Octo | A | T1 | ₹72,000 | 6,200 | 35–45kg |
| **Frame** | `holybro_s500v2_frame` | Holybro S500 V2 | A | T2 | ₹14,500 | 510 | Survey <10kg |
| **Motor** | `hobbywing_x11_plus_cw` | X11 Plus CW | B | T1 | ₹42,000/unit | 2,490 | 40–51kg MTOW |
| **Motor** | `tmotor_u10_ii_motor` | T-Motor U10 II | B | T1 | ₹38,000/unit | 415 | 20–25kg |
| **Motor** | `readytosky_rs2312_motor` | RS2312 960KV | B | T3 | ₹1,800/unit | 56 | Survey <3kg |
| **Motor** | `sunnysky_x4112s_motor` | SunnySky X4112S | B | T2 | ₹5,500/unit | 280 | 10–15kg |
| **Motor** | `hobbywing_x15_combo_cw` | X15 CW (18S) | B | T1 | ₹1,00,000/unit | 5,908 | 50kg+ MTOW |
| **Battery** | `genx_22ah_12s_lipo` | GenX 22Ah 12S | C | T3 | ₹24,000 | 4,200 | 20–25kg build |
| **Battery** | `genx_22ah_14s_semi_solid` | GenX 22Ah 14S SS | C | T2 | ₹52,000 | 5,500 | 25–35kg build |
| **Battery** | `tattu_35ah_14s_smart` | Tattu 35Ah 14S | C | T1 | ₹1,48,000 | 6,800 | 35–50kg build |
| **Battery** | `multistar_16ah_6s_lipo` | Multistar 16Ah 6S | C | T3 | ₹9,500 | 1,850 | Survey <8kg |
| **Charger** | `ultrapower_up2800_14s` | UP2800-14S | C | T2 | ₹58,000 | 5,800 | 14S systems |
| **Charger** | `hobbymate_h6ac_charger` | Hobbymate H6AC | C | T3 | ₹5,000 | 480 | 6S only |
| **FC** | `pixhawk_6x_fc` | Pixhawk 6X | D | T1 | ₹36,000 | 59 | Any |
| **FC** | `jiyi_k++_v2_fc` | JIYI K++ V2 | D | T1 | ₹52,000 | 320 | Any agri |
| **Radio** | `radiomaster_tx16s_mkii` | TX16S MKII | D | T2 | ₹22,000 | 848 | Any |
| **Radio** | `frsky_x9d_plus_se` | X9D Plus SE | D | T2 | ₹21,000 | 820 | Any |
| **GPS** | `holybro_m9n_gps` | Holybro M9N | D | T2 | ₹8,500 | 36 | Any |
| **GPS** | `here3_plus_rtk_gps` | Here3+ RTK | D | T1 | ₹42,000 | 48 | RTK precision |
| **LiDAR** | `benewake_tfmini_s` | TFmini-S | E | T3 | ₹3,800 | 5 | 12m range |
| **LiDAR** | `benewake_tf03_100` | TF03 100m | E | T2 | ₹20,000 | 76 | 100m range |
| **Radar** | `ainstein_us_d1_radar` | US-D1 Radar | E | T1 | ₹68,000 | 60 | 45m, fog-proof |
| **Pump** | `hobbywing_8l_pump` | HW 8L Pump | F | T2 | ₹8,500 | 450 | 10–20L tanks |
| **Tank** | `eft_16l_tank` | EFT 16L Tank | F | T2 | ₹9,500 | 1,800 | E616P |
| **Tank** | `eft_20l_tank` | EFT 20L Tank | F | T1 | ₹13,500 | 2,200 | G620 |
| **Tank** | `generic_7l_hdpe_tank` | Generic 7L Tank | F | T3 | ₹3,000 | 800 | 10–20kg builds |
| **Camera** | `sony_a7r5_mapping_camera` | Sony A7R V 61MP | F | T1 | ₹4,00,000 | 723 | Survey premium |
| **Camera** | `runcam_split4_camera` | RunCam Split 4 | F | T3 | ₹8,000 | 28 | Budget survey |
| **PDB** | `matek_hv_pdb` | Matek FCHUB-12S | B | T1 | ₹5,500 | 28 | 12S builds |
| **BEC** | `holybro_10a_bec` | Holybro 10A BEC | C | T2 | ₹2,500 | 38 | 12S–14S |
| **Receiver** | `frsky_r9_slim_plus_rx` | R9 Slim+ RX | D | T3 | ₹3,200 | 5.2 | 8km 900MHz |
| **Receiver** | `betafpv_elrs_lite_rx` | ELRS Lite RX | D | T3 | ₹1,800 | 1.5 | 2km 2.4GHz |

---

## NOTES ON IMPORT TO components.json

1. All entries set `"v4_verified": false` — mark as verified only after physical testing.
2. Prices reflect June 2026 market rates — update before major purchases.
3. Motors sold as CW — add a twin CCW entry by duplicating and changing `"id"` suffix to `_ccw`.
4. Items marked `"stock_status": "import"` require customs clearance — add ₹2,000–₹5,000 shipping + 18% GST to price.
5. `compare_group` values should match existing groups in the build wizard: `"frame"`, `"motor"`, `"battery"`, `"charger"`, `"fc"`, `"gps"`, `"pump"`, `"tank"`, `"camera"`, `"sensor"`, `"pdb"`, `"bec"`, `"receiver"`, `"radio"`.

---
*Document generated: June 2026. Sources: IndiaMART, Zbotic, Robu.in, Bharat Skytech, Indian Robo Store, Moglix, UAVGarage, official manufacturer datasheets.*
