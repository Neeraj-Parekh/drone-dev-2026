import json

# Load presets.json
path = "/mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/drone-builder/presets.json"
with open(path, "r") as f:
    data = json.load(f)

# Define the three reconciled presets
p1 = {
    "id": "reconciled_p1",
    "name": "Preset 1: Reconciled Heavy Lift (G620)",
    "description": "6\u00d7 Hobbywing X9 + Pixhawk 6C + 1\u00d7 25Ah Li-ion + EFT G620 + 20L tank (18L restricted fill). Optimized for maximum payload under 51.2 kg MTOW.",
    "status": "SELECTED",
    "config": {
        "frame": "eft_g620_frame",
        "motor": "hobbywing_x9_g2l_cw",
        "motorCount": 6,
        "battery": "mpower_12s_25ah",
        "batteryCount": 1,
        "fc": "pixhawk_6c_combo",
        "gps": "holybro_m9n_gps",
        "pdb": "tarot_tl2996_pdb",
        "pump": "hobbywing_8l_pump",
        "tankCapacity_L": 18,
        "tankWeight_g": 2200,
        "rc_rx": "skydroid_t12",
        "extras": [
            "pm02_v3",
            "npnt_module"
        ]
    },
    "bom": {
        "frame": 89999,
        "motors": 103722,
        "battery": 62000,
        "fc_combo": 26749,
        "power_module": 3200,
        "gps": 8500,
        "tank": 13500,
        "pump": 8500,
        "receiver": 18000,
        "pdb": 3768,
        "npnt_module": 23000,
        "wire_harness": 8000
    },
    "total_cost": 368938,
    "v4_verified": True,
    "notes": "11.5 min hover. 2.99x thrust margin at MTOW. Large 20L Hexacopter Frame. Baffled HDPE tank short-filled to 18L max to maintain structural safety margin.",
    "pros": [
        "Maximum liquid payload delivery under the strict 51.2 kg frame ceiling",
        "Large 20L tank frame supports high volume spraying",
        "BIS-certified 1000-cycle high-density mPower cells save weight",
        "Hobbywing X9 G2L 14S-native FOC motors yield 144 kg total peak thrust",
        "Thrust-to-weight ratio of 2.99x ensures high safety margin and wind resistance",
        "Low battery stress at 4.97C hover load"
    ],
    "cons": [
        "Requires restricted liquid fill of 18.0L max to maintain structural safety margin",
        "Skydroid H12/T12 proprietary system is locked to Skydroid ecosystem",
        "Higher takeoff weight of 48.1 kg AUW"
    ],
    "Combinations_notes": [
        "Uses EFT G620 20L hexacopter frame with Hobbywing X9 G2L motors for maximum payload lift capability.",
        "Cylindrical mPower 12S 25Ah Li-ion pack saves significant dry weight over heavy LiPo packs, enabling the large tank setup.",
        "Volumetric fill is limited to 18.0L to guarantee a 3.07 kg margin under the structural MTOW limit.",
        "Uses Skydroid T12 integrated remote ground station for high-voltage telemetry control."
    ]
}

p2 = {
    "id": "reconciled_p2",
    "name": "Preset 2: Reconciled Value Agri (E616P)",
    "description": "6\u00d7 Hobbywing X8 + Pixhawk 6C + 1\u00d7 22Ah LiPo + EFT E616P + 16L tank (11L restricted fill). Optimized agricultural baseline build under \u20b92.7 Lakh.",
    "status": "RECOMMENDED",
    "config": {
        "frame": "eft_e616p_frame",
        "motor": "hobbywing_x8_combo_cw",
        "motorCount": 6,
        "battery": "genx_12s_22ah",
        "batteryCount": 1,
        "fc": "pixhawk_6c_combo",
        "gps": "holybro_m9n_gps",
        "pdb": "tarot_tl2996_pdb",
        "pump": "hobbywing_5l_pump",
        "tankCapacity_L": 11,
        "tankWeight_g": 1800,
        "rc_rx": "radiomaster_tx16s_mkii",
        "extras": [
            "pm02_v3",
            "npnt_module",
            "benewake_tfmini_s"
        ]
    },
    "bom": {
        "frame": 44999,
        "motors": 84000,
        "battery": 23838,
        "fc_combo": 26749,
        "power_module": 3200,
        "gps": 8500,
        "tank": 9500,
        "pump": 6533,
        "pdb": 3768,
        "receiver": 23800,
        "npnt_module": 23000,
        "sensor": 3800,
        "wire_harness": 8000
    },
    "total_cost": 269687,
    "v4_verified": True,
    "notes": "11.9 min hover. 2.56x thrust margin. Baffled 16L tank short-filled to 11L max to stay strictly under the frame's 36.0 kg MTOW limit.",
    "pros": [
        "Low-cost commercial field spraying configuration (\u20b92.69L net cost)",
        "15 kg max thrust per axis with integrated Hobbywing X8 motors",
        "Benewake TFmini-S LiDAR altimeter provides 12m terrain-following",
        "Uses highly available, robust folding EFT E616P frame",
        "Safe 2.56x thrust-to-weight ratio at takeoff"
    ],
    "cons": [
        "Baffled 16L tank must be short-filled to 11.0L max to comply with 36.0 kg MTOW limit",
        "GenX LiPo has higher battery stress and lower cycle life than Li-ion cells",
        "Requires non-RTK GNSS (Holybro M9N) to stay within budget"
    ],
    "Combinations_notes": [
        "EFT E616P frame is paired with Hobbywing X8 combo motors to minimize cost while ensuring hexacopter safety redundancy.",
        "GenX 12S 22Ah high-discharge LiPo battery keeps the initial purchase price under \u20b92.7 Lakh.",
        "Liquid payload is restricted to 11L max inside the 16L baffled tank to prevent structural overloading of the 36 kg frame limit.",
        "Features Radiomaster TX16S transmitter running EdgeTX with a 900MHz module for robust link quality."
    ]
}

p3 = {
    "id": "reconciled_p3",
    "name": "Preset 3: Reconciled Precision Map (E610P)",
    "description": "6\u00d7 SunnySky X4112S + Pixhawk 6C + 1\u00d7 25Ah Li-ion + EFT E610P + Here4 RTK + TF03 LiDAR + NDVI camera. High-end precision surveying and mapping specialist build.",
    "status": "RESEARCH",
    "config": {
        "frame": "eft_e610p_frame",
        "motor": "sunnysky_x4112s_motor",
        "motorCount": 6,
        "battery": "mpower_12s_25ah",
        "batteryCount": 1,
        "fc": "pixhawk_6c_combo",
        "gps": "here4_rtk",
        "pdb": "tarot_tl2996_pdb",
        "rc_rx": "radiomaster_tx16s_mkii",
        "tankCapacity_L": 0,
        "tankWeight_g": 0,
        "extras": [
            "pm02_v3",
            "benewake_tf03_100",
            "mapir_survey3w_rgn",
            "npnt_module"
        ]
    },
    "bom": {
        "frame": 38000,
        "motors": 51000,
        "battery": 62000,
        "fc_combo": 26749,
        "power_module": 3200,
        "gps_rtk": 36538,
        "sensor": 20000,
        "camera": 34000,
        "pdb": 3768,
        "receiver": 23800,
        "npnt_module": 23000,
        "wire_harness": 8000
    },
    "total_cost": 330055,
    "v4_verified": True,
    "notes": "36.5 min hover. 2.19x thrust margin at Takeoff. Pure mapping build (no liquid spray tank or pump hardware) maximizing flight endurance.",
    "pros": [
        "Pure precision mapping configuration with zero liquid spray overhead",
        "Excellent hover endurance of 36.5 minutes utilizing mPower Li-ion battery",
        "Centimeter-level RTK positioning accuracy via Here4 DroneCAN GPS",
        "Industrial-grade Benewake TF03 100m LiDAR altimeter sensor",
        "MAPIR Survey3W 12MP global shutter NDVI multispectral camera for crop health research",
        "Extremely low AUW of 14.24 kg with 2.19x thrust-to-weight ratio"
    ],
    "cons": [
        "No liquid spraying capability (pure mapping build)",
        "Centimeter accuracy requires a ground base station"
    ],
    "Combinations_notes": [
        "Removes all spraying hardware (no pump, nozzles, or liquid payload) to maximize flight time to 36.5 minutes.",
        "EFT E610P frame with direct-mount SunnySky X4112S motors and 40A ESCs optimizes the dry weight profile.",
        "Integrates DroneCAN Here4 RTK GPS and Benewake TF03 industrial LiDAR for high-fidelity geospatial and altitude logging.",
        "Features MAPIR Survey3W NDVI multispectral camera for research-grade agricultural mapping."
    ]
}

# Append presets
data["presets"].append(p1)
data["presets"].append(p2)
data["presets"].append(p3)

# Write back
with open(path, "w") as f:
    json.dump(data, f, indent=2)

print("Successfully added 3 reconciled presets to presets.json.")
