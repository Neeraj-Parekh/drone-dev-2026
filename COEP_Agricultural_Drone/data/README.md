# Offline Data Package

This folder contains verified datasheets, standards summaries, and reference data for the COEP Agricultural Hexacopter project.

## Structure

```
data/
├── README.md                    ← This file
├── datasheets/                  ← Component specifications (verified from internet)
│   ├── hobbywing_x9_g2l_specs.md    ← Motor + ESC verified specs
│   ├── tattu_12s_30ah_specs.md      ← Battery verified specs
│   ├── teejet_xr11002_specs.md      ← Nozzle verified specs
│   ├── yf_s402_specs.md             ← Flow sensor verified specs
│   └── rfd868x_specs.md             ← Telemetry radio verified specs
├── standards/                   ← Regulatory standards summaries
│   └── dgca_drone_rules_2021_summary.md  ← India DGCA rules key provisions
└── references/                  ← Project references and context
    ├── similar_projects.md      ← Similar agri-drone projects worldwide
    ├── tihan_about.md           ← TiHAN IIT Hyderabad overview
    └── india_market_stats.md    ← India drone market statistics
```

## Verification Status

| Document | Source | Verified |
|----------|--------|----------|
| Hobbywing X9 G2L | hobbywing.com | ✅ |
| Tattu 12S 30Ah | grepow.com | ✅ |
| TeeJet XR11002 | Retailer specs | ✅ |
| YF-S402 | Amazon/manufacturers | ✅ |
| RFD868x | readymaderc.com | ✅ |
| DGCA Rules | PIB, zbotic.in | ✅ |
| Market Stats | PIB Feb 2026, MarketsandMarkets | ✅ |

## How to Use

1. **For report writing**: Reference these files for exact specifications
2. **For design decisions**: Cross-check against datasheets
3. **For regulatory compliance**: Use DGCA summary as starting point
4. **For market context**: Reference market stats and similar projects
