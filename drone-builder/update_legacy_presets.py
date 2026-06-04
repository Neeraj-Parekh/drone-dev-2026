import json

pros_cons = {
    "path_g_a": {
        "pros": [
            "Fits the ₹4.0L target budget",
            "Hexacopter architecture",
            "Open-source ArduPilot FC (best for research)",
            "36 kg MTOW (2.5:1 thrust margin with X8)",
            "16 min flight time (covers 1 mission + reserve)",
            "1× 30Ah Semi-Solid battery (1,332 Wh, 4.9 kg)",
            "GPS has compass (HGLRC M100-5883)",
            "8 build-quality items included",
            "Fits your RC plane experience"
        ],
        "cons": [
            "Tattu 30Ah 12S needs import"
        ]
    },
    "path_g_b": {
        "pros": [
            "Uses 2× Tattu 22Ah Pro which are in stock locally",
            "Hexacopter architecture",
            "Open-source ArduPilot FC"
        ],
        "cons": [
            "2× 22Ah adds 6.7 kg, pushing MTOW to ~43 kg",
            "Exceeds E616P 36 kg frame limit"
        ]
    },
    "path_a": {
        "pros": [
            "All teacher RFQ line items (where available) used",
            "Cheapest commercial-spray path",
            "Best fit for closed-source Jiyi ecosystem (spray logic built-in)"
        ],
        "cons": [
            "Below recommended 5-7 kg/axis thrust for X8",
            "10L tank vs v7's 16L spec — payload reduced",
            "Closed-source FC limits research documentation"
        ]
    },
    "path_b": {
        "pros": [
            "Open-source FC (ArduPilot) — best for research",
            "X9 G2L gives 4× thrust margin at 30 kg MTOW",
            "1× 30Ah battery (not 2× 22Ah) — saves ₹25k vs v7 spec",
            "DroneCAN ESC telemetry per-motor"
        ],
        "cons": [
            "Tattu 30Ah 12S is hard to source in India at retail",
            "SHURflo pump is imported ($110 USD) — lead time 2-3 weeks"
        ]
    },
    "path_c": {
        "pros": [
            "All Hobbywing X8 (PWM ESC) — fits your RC plane background",
            "Open-source ArduPilot FC",
            "Most spares (4 spare props)",
            "Within X8 recommended 5-7 kg/axis range"
        ],
        "cons": [
            "Most expensive of the 6 paths",
            "No per-motor telemetry (X8 reports only RPM, not current)"
        ]
    },
    "path_d": {
        "pros": [
            "Cheapest path (₹3.01L)",
            "25 kg MTOW (best thrust margin in X9 G2L range)",
            "26.5 min flight time",
            "Less complex assembly (4 motors)"
        ],
        "cons": [
            "Loses 1-motor-out redundancy (hexa has it; quad does not)",
            "Ma'am specified hexacopter"
        ]
    },
    "path_f": {
        "pros": [
            "Fits the ₹3.5L aspirational budget",
            "Hexacopter architecture (preserves ma'am spec)",
            "Open-source FC"
        ],
        "cons": [
            "23 min flight time — barely enough for 1 mission",
            "1× GPS (no redundancy) — single point of failure",
            "No spare props",
            "No RTK (not a research-feature now)",
            "22 kg MTOW (10L tank at full)"
        ]
    }
}

with open('/mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/drone-builder/presets.json', 'r') as f:
    data = json.load(f)

for preset in data['presets']:
    if preset['id'] in pros_cons:
        preset['pros'] = pros_cons[preset['id']]['pros']
        preset['cons'] = pros_cons[preset['id']]['cons']

with open('/mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/drone-builder/presets.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated legacy presets with pros and cons.")
