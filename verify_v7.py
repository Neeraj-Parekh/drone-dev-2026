#!/usr/bin/env python3
"""Verification script for v7 fixes"""
import docx
import sys

doc = docx.Document('COEP_Hexacopter_Technical_Report_v7.docx')
results = []
failures = []

def check(label, condition, found_text=""):
    if condition:
        results.append(f"  PASS: {label}")
    else:
        failures.append(f"  FAIL: {label} | found: '{found_text[:80]}'")

print("=== VERIFICATION: v7 Fixes ===\n")

# Table 1 checks (idx=2)
t1 = doc.tables[2]
row7 = t1.rows[7]
check("Table1 Row7 Col3 - Operating Radius operational target", "10 km" in row7.cells[3].text, row7.cells[3].text)
check("Table1 Row7 Col4 - Operating Radius operational achieved", "6.8 km" in row7.cells[4].text, row7.cells[4].text)
check("Table1 Row7 Col5 - Status aspirational note", "aspirational" in row7.cells[5].text, row7.cells[5].text)
row6 = t1.rows[6]
check("Table1 Row6 Col4 - Spray rate 3.16 L/min added", "3.16" in row6.cells[4].text, row6.cells[4].text)
row1 = t1.rows[1]
check("Table1 Row1 Col5 - MTOW 50kg non-compliance noted", "50 kg" in row1.cells[5].text, row1.cells[5].text)
row9 = t1.rows[9]
check("Table1 Row9 Col4 - Telemetry clarified as radio link", "radio link" in row9.cells[4].text, row9.cells[4].text)

# Table 2 checks (idx=3) - DD6 
t2 = doc.tables[3]
row6_dd = t2.rows[6]
check("Table2 Row6 - DD6 7L→6.8L fixed", "7L" not in row6_dd.cells[2].text or "6.8L" in row6_dd.cells[2].text, row6_dd.cells[2].text)

# Paragraph checks
conclusion_reserve_fixed = False
dual_config_fixed = False
drone_rules_fixed = False
ref6_fixed = False
g1_sweep_fixed = False
mission_21_8_fixed = False

for p in doc.paragraphs:
    t = p.text
    if "45.4% energy reserve" in t and "22.7" not in t:
        conclusion_reserve_fixed = True
    if "72.6% energy reserve versus 45.4%" in t:
        dual_config_fixed = True
    if "Drone Rules 2021" in t and "Medium category" in t:
        drone_rules_fixed = True
    if "Drone Rules 2021, G.S.R. 589(E)" in t:
        ref6_fixed = True
    if "G1 Ground Sweep" in t and "Arm resonance" in t:
        g1_sweep_fixed = True
    if "21.8 minutes of mission endurance" in t:
        mission_21_8_fixed = True

check("Para - Conclusion 45.4% energy reserve", conclusion_reserve_fixed)
check("Para - Dual config 72.6%/45.4% reserve", dual_config_fixed)
check("Para - Compliance stmt Drone Rules 2021", drone_rules_fixed)
check("Para - Reference [6] Drone Rules 2021", ref6_fixed)
check("Para - G1 Ground Sweep (not G3)", g1_sweep_fixed)
check("Para - Mission endurance 21.8 min", mission_21_8_fixed)

# Table 10 - thrust stand mandatory
t10 = doc.tables[9]
thrust_mandatory = any("MANDATORY" in cell.text for row in t10.rows for cell in row.cells)
check("Table10 - Thrust stand MANDATORY note", thrust_mandatory)

# Table 31 - busbar 50°C caution
t31 = doc.tables[31]
busbar_caution = any("EXCEEDS" in cell.text for row in t31.rows for cell in row.cells)
check("Table31 - Busbar 50°C EXCEEDS note", busbar_caution)

# Table 30 - pre-charge failure mode
t30 = doc.tables[30]
precharge_fm = any("FAILURE MODE" in cell.text for row in t30.rows for cell in row.cells)
check("Table30 - Pre-charge single-resistor FAILURE MODE", precharge_fm)

# Table 26 - telemetry link vs mission radius
t26 = doc.tables[27]
telem_radius = any("mission radius" in cell.text.lower() for row in t26.rows for cell in row.cells)
check("Table26 - Telemetry link vs mission radius note", telem_radius)

# Table 11 - spray nozzle-limited flow rate
t12 = doc.tables[11]
nozzle_limited = any("Nozzle-limited" in cell.text for row in t12.rows for cell in row.cells)
check("Table12 - Spray nozzle-limited flow rate", nozzle_limited)

print("\nPASSED:")
for r in results:
    print(r)
if failures:
    print("\nFAILED:")
    for f in failures:
        print(f)
else:
    print("\nAll checks passed!")

print(f"\nTotal: {len(results)} passed, {len(failures)} failed")
sys.exit(0 if not failures else 1)
