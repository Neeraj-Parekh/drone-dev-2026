#!/usr/bin/env python3
"""
fix_report_v6.py
================
Fixes all errors identified in the spec cross-check of
COEP_Hexacopter_Technical_Report_v6.docx

Errors addressed:
  1. Table 1 (Mission Objectives): Operating Radius updated from ≥500 m to 10–15 km telemetry link;
     clarify spec alignment.  Spray rate row updated with accurate flow-rate note.
  2. Table 2 (Key Design Decisions): DD6 row uses "7L" — fix to "6.8L".
  3. Key Innovations bullet (para 217): G3 → G1 Ground Sweep.
  4. Conclusion para 210: energy reserve figures corrected (75.6% → 72.6%, 52.1% → 45.4%).
  5. Compliance statement para 227: reference "Draft" CAR replaced with Drone Rules 2021.
  6. Reference [6]: Updated to Drone Rules 2021.
  7. Various energy/reserve figure corrections in conclusions.

All changes are logged to fix_log_v7.txt in the same directory.
Output saved as COEP_Hexacopter_Technical_Report_v7.docx.
"""

import docx
import copy
import sys
from datetime import datetime
from docx.oxml.ns import qn

SRC = "COEP_Hexacopter_Technical_Report_v6.docx"
DST = "COEP_Hexacopter_Technical_Report_v7.docx"
LOG = "fix_log_v7.txt"

log_entries = []

def log(msg):
    print(msg)
    log_entries.append(msg)

def set_cell_text(cell, new_text):
    """Replace ALL text in a table cell using direct XML manipulation.
    Robust against cells with complex run/formatting XML or no run elements."""
    from lxml import etree
    tc = cell._tc
    # Find all paragraph elements in this cell
    paras = tc.findall('.//' + qn('w:p'))
    if not paras:
        return
    first_para = paras[0]
    # Remove ALL runs from ALL paragraphs
    for para in list(tc.findall('.//' + qn('w:p'))):
        for r in list(para.findall(qn('w:r'))):
            para.remove(r)
        for hl in list(para.findall(qn('w:hyperlink'))):
            para.remove(hl)
    # Remove extra paragraphs (keep only first)
    for extra_para in paras[1:]:
        parent = extra_para.getparent()
        if parent is not None:
            parent.remove(extra_para)
    # Add a new run with the replacement text to the first paragraph
    r_elem = etree.SubElement(first_para, qn('w:r'))
    t_elem = etree.SubElement(r_elem, qn('w:t'))
    t_elem.text = new_text
    t_elem.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')

def replace_para_text(para, old_text, new_text, label=""):
    """Replace old_text with new_text in a paragraph, preserving run formatting."""
    full_text = para.text
    if old_text not in full_text:
        return False
    # Simple approach: clear all runs and set first run to new full text
    new_full = full_text.replace(old_text, new_text)
    for run in para.runs:
        run.text = ""
    if para.runs:
        para.runs[0].text = new_full
    else:
        para.add_run(new_full)
    log(f"  [PARA FIX{' ('+label+')' if label else ''}] '{old_text[:60]}' → '{new_text[:60]}'")
    return True


def main():
    doc = docx.Document(SRC)
    log(f"[START] Loaded {SRC} — {len(doc.paragraphs)} paragraphs, {len(doc.tables)} tables")
    log(f"[TIME ] {datetime.now().isoformat()}")
    log("")

    # =========================================================================
    # FIX 1: Table 1 (Mission Objectives) — idx=2
    # - Row 7 (Operating Radius): "≥500 m" → clarify as "≥500 m (internal test target);
    #   10 km telemetry link range (RFD868x); practical mission radius ~6.8 km"
    # - Row 6 (Spray Rate): add flow-rate clarification in notes
    # - Row 9 (Telemetry Range): update Achieved to "10 km (RFD868x link range)"
    # =========================================================================
    log("=== FIX 1: Table 1 (Mission Objectives) — Operating Radius & Spray Rate ===")
    t1 = doc.tables[2]  # Table 1: Mission Objectives

    # Row 7 = Operating Radius — fix "≥500 m" Operational Achieved to include clarification
    row7 = t1.rows[7]
    cells7 = row7.cells
    # Col 0 = "Operating Radius", Col 1 = "≥500 m", Col 2 = "500 m", Col 3 = "≥500 m", Col 4 = "500 m", Col 5 = "Compliant Both"
    old_val = cells7[3].text.strip()
    if "500 m" in old_val and "10" not in old_val:
        set_cell_text(cells7[3], "≥10 km telemetry link (RFD868x); ≥500 m operational test target")
        log(f"  [TABLE 1, Row 7, Col 3] Operating Radius Operational Target: '{old_val}' → '≥10 km telemetry link (RFD868x); ≥500 m operational test target'")
    old_val4 = cells7[4].text.strip()
    if "500 m" in old_val4 and "10" not in old_val4:
        set_cell_text(cells7[4], "10 km telemetry link (RFD868x); ~6.8 km practical mission radius at 45 kg")
        log(f"  [TABLE 1, Row 7, Col 4] Operating Radius Operational Achieved: '{old_val4}' → '10 km telemetry link; ~6.8 km practical mission radius'")
    old_st = cells7[5].text.strip()
    if "Compliant" in old_st and "Note" not in old_st:
        set_cell_text(cells7[5], "Compliant (telemetry link); 10–15 km range aspirational — see Section 7.4 note")
        log(f"  [TABLE 1, Row 7, Col 5] Status updated to note 10-15 km is aspirational")

    # Row 6 = Spray Rate — add flow rate in the Achieved cell
    row6 = t1.rows[6]
    cells6 = row6.cells
    old_spray = cells6[4].text.strip()
    if old_spray == "15 L/ha" or old_spray == "15 L/ha ":
        set_cell_text(cells6[4], "15 L/ha @ 3.16 L/min (4× TeeJet 11002 at 2.0 bar); pump max 5.3 L/min at free-flow")
        log(f"  [TABLE 1, Row 6, Col 4] Spray Rate Achieved: '{old_spray}' → '15 L/ha @ 3.16 L/min ...'")

    # Row 9 = Telemetry Range — clarify it's link range not mission radius
    row9 = t1.rows[9]
    cells9 = row9.cells
    old_telem = cells9[0].text.strip()
    if "Telemetry Range" in old_telem:
        # update operational achieved
        old_t4 = cells9[4].text.strip()
        if "10 km" in old_t4 and "link" not in old_t4:
            set_cell_text(cells9[4], "10 km radio link range (RFD868x, 19.8 dB margin at 10 km)")
            log(f"  [TABLE 1, Row 9, Col 4] Telemetry Achieved: clarified as 'radio link range'")

    log("")

    # =========================================================================
    # FIX 2: Table 2 (Key Design Decisions) — idx=3
    # DD6 row: "7L payload" → "6.8L payload"
    # =========================================================================
    log("=== FIX 2: Table 2 (Key Design Decisions) — DD6 '7L' → '6.8L' ===")
    t2 = doc.tables[3]  # Table 2: Key Design Decisions
    for r_idx, row in enumerate(t2.rows):
        for c_idx, cell in enumerate(row.cells):
            if "7L payload" in cell.text or "7L" in cell.text:
                old_t = cell.text
                new_t = old_t.replace("7L payload", "6.8L payload").replace("(7L payload)", "(6.8L payload)").replace(" 7L ", " 6.8L ")
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 2, Row {r_idx}, Col {c_idx}] '7L' → '6.8L': '{old_t[:80]}'")

    log("")

    # =========================================================================
    # FIX 3: Paragraph fixes
    # =========================================================================
    log("=== FIX 3: Paragraph Text Corrections ===")

    for i, para in enumerate(doc.paragraphs):
        text = para.text

        # 3a. Key Innovations: "G3" → "G1 Ground Sweep" (para 217)
        if "decision gate at G3" in text and "Arm resonance" in text:
            replace_para_text(para, "decision gate at G3", "decision gate at G1 Ground Sweep", "Key Innovations G3→G1")

        # 3b. Conclusion para 209: "52.1% energy reserve" → "45.4% energy reserve"
        if "52.1% energy reserve" in text:
            replace_para_text(para, "52.1% energy reserve", "45.4% energy reserve", "Conclusion energy reserve")

        # 3c. Conclusion para 210: "75.6% energy reserve versus 52.1%" → "72.6% energy reserve versus 45.4%"
        if "75.6% energy reserve versus 52.1%" in text:
            replace_para_text(para, "75.6% energy reserve versus 52.1%", "72.6% energy reserve versus 45.4%", "Conclusion dual-config reserve")

        # 3d. Compliance statement: replace "Draft" DGCA reference with Drone Rules 2021
        if "DGCA Civil Aviation Requirements for UAS (Draft)" in text and "Medium category" in text:
            replace_para_text(
                para,
                "DGCA Civil Aviation Requirements for UAS (Draft): Medium category, MTOW 45 kg (operational) / 36 kg (research)",
                "Drone Rules 2021 (amended 2024), MoCA/DGCA: Medium category UAS, MTOW 45 kg (operational) / 36 kg (research) [Note: design was also cross-referenced against draft CAR for future compliance]",
                "Compliance stmt Drone Rules 2021"
            )

        # 3e. Reference [6]: Update from "Draft" to Drone Rules 2021
        if "[6] DGCA Civil Aviation Requirements for Unmanned Aircraft Systems (Draft)" in text:
            replace_para_text(
                para,
                "[6] DGCA Civil Aviation Requirements for Unmanned Aircraft Systems (Draft), 2024.",
                "[6] Ministry of Civil Aviation, Drone Rules 2021, G.S.R. 589(E), as amended by G.S.R. 563(E) (2024). https://digitalsky.dgca.gov.in",
                "Reference [6] Drone Rules 2021"
            )

        # 3f. Section 7.4 telemetry note — if the note says "10+ km range" clarify it's radio link range
        if "10+ km" in text and "MAVLink" in text:
            # This is in Table 11 (Avionics) - handled separately below
            pass

    log("")

    # =========================================================================
    # FIX 4: Table 11 (Avionics Component Selection) — idx=12
    # RFD868x "10+ km range" note → clarify as "10 km radio link range"
    # =========================================================================
    log("=== FIX 4: Table 11 (Avionics) — Telemetry range clarification ===")
    t11 = doc.tables[12]  # Table 11: Avionics Component Selection
    for r_idx, row in enumerate(t11.rows):
        for c_idx, cell in enumerate(row.cells):
            if "10+ km range" in cell.text and "RFD868x" in cell.text:
                old_t = cell.text
                new_t = old_t.replace("10+ km range, MAVLink", "10 km radio link range (19.8 dB margin; see Table 26); MAVLink")
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 11, Row {r_idx}, Col {c_idx}] Clarified '10+ km range' to '10 km radio link range'")

    log("")

    # =========================================================================
    # FIX 5: Table 12 (Spray System Specifications) — idx=11
    # Add strainer maintenance interval and nozzle flow rate clarification
    # Tank: add note "max 15.0L operational fill recommended (1L headspace)"
    # =========================================================================
    log("=== FIX 5: Table 12 (Spray System) — Filter maintenance & tank fill note ===")
    t12 = doc.tables[11]  # Table 12: Spray System Specifications
    for r_idx, row in enumerate(t12.rows):
        for c_idx, cell in enumerate(row.cells):
            # Row for Filter/strainer — add maintenance interval
            if "80-mesh inline strainer" in cell.text and "Prevents" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "Prevents nozzle clogging",
                    "Prevents nozzle clogging; clean every 2–3 flights (organophosphate/neem slurry). Replace at 50-flight intervals."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 12, Row {r_idx}, Col {c_idx}] Added strainer maintenance interval")

            # Tank cell — add headspace note
            if "15.8L fill (operational)" in cell.text and "HDPE" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "15.8L fill (operational)",
                    "15.8L fill (operational; max recommended 15.0L to maintain ≥1L headspace for slosh)"
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 12, Row {r_idx}, Col {c_idx}] Added tank headspace recommendation")

            # Nozzle cell — add total flow rate
            if "TeeJet 11002" in cell.text and "0.79 L/min" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "Flat-fan, 0.79 L/min at 2.0 bar",
                    "Flat-fan, 0.79 L/min per nozzle at 2.0 bar → 3.16 L/min total (4 nozzles). Within 1–5 L/min spec."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 12, Row {r_idx}, Col {c_idx}] Added total flow rate 3.16 L/min")

    log("")

    # =========================================================================
    # FIX 6: Table 30 (Pre-Charge Circuit) — idx=30
    # Add note about single-resistor failure mode
    # =========================================================================
    log("=== FIX 6: Table 30 (Pre-Charge) — Single-resistor failure note ===")
    t30 = doc.tables[30]  # Table 29 Pre-Charge
    for r_idx, row in enumerate(t30.rows):
        for c_idx, cell in enumerate(row.cells):
            if "101.5W per resistor" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "101.5W per resistor",
                    "101.5W per resistor (2.03× pulse at 0.45s — within wirewound pulse derating). FAILURE MODE: if one resistor opens, second sees 203W — thermal fuse (100°C) must be in series for protection."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 30, Row {r_idx}, Col {c_idx}] Added single-resistor failure mode note")

    log("")

    # =========================================================================
    # FIX 7: Table 31 (Busbar Thermal) — idx=31
    # Add note about 50°C ambient + peak climb current scenario
    # =========================================================================
    log("=== FIX 7: Table 31 (Busbar Thermal) — Peak current / 50°C ambient note ===")
    t31 = doc.tables[31]  # Table 30 Busbar Thermal
    # Find the max temperature row
    for r_idx, row in enumerate(t31.rows):
        for c_idx, cell in enumerate(row.cells):
            if "Below 105°C insulation limit" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "Below 105°C insulation limit",
                    "Below 105°C limit at hover (45°C ambient). ⚠ At 50°C ambient + peak climb current (150A): estimated 127°C — EXCEEDS insulation limit. Active cooling or derating required for sustained max-power maneuvers at extreme ambient."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 31, Row {r_idx}, Col {c_idx}] Added 50°C ambient / peak current caution")

    log("")

    # =========================================================================
    # FIX 8: Mission Objectives Table row note — add 50 kg analysis note
    # Add a new row to Table 1 for MTOW noting 50 kg is not yet analysed
    # Actually safer to just update the MTOW row status column
    # =========================================================================
    log("=== FIX 8: Table 1 (Mission Objectives) — MTOW row, note 50 kg absent ===")
    t1b = doc.tables[2]
    row1_mtow = t1b.rows[1]
    cells_mtow = row1_mtow.cells
    # Status col (index 5)
    old_status = cells_mtow[5].text.strip()
    if old_status == "Compliant Both":
        set_cell_text(cells_mtow[5], "Compliant (36/45 kg). Note: 50 kg upper bound not analysed; X9 G2L SMF TWR = 1.76 at 50 kg — non-compliant without X9 Plus G2L upgrade.")
        log(f"  [TABLE 1, Row 1 (MTOW), Col 5] Status updated: added 50 kg non-compliance note")

    log("")

    # =========================================================================
    # FIX 9: Table 10 (Propulsion Specs) — idx=9
    # Add thrust stand verification note
    # =========================================================================
    log("=== FIX 9: Table 10 (Propulsion Specs) — Thrust verification note ===")
    t10 = doc.tables[9]  # Table 8: Propulsion Specifications
    for r_idx, row in enumerate(t10.rows):
        for c_idx, cell in enumerate(row.cells):
            if "At 50.4V (full charge); verified on thrust stand" in cell.text:
                old_t = cell.text
                # Update if it says "verified" without caveats
                new_t = old_t.replace(
                    "At 50.4V (full charge); verified on thrust stand",
                    "At 50.4V (full charge); manufacturer datasheet claim — thrust stand validation MANDATORY before G1 flight gate (see Appendix D BOM). If actual thrust 10% low: TWR drops to 2.4 (45 kg), SMF TWR to 1.76 — NON-COMPLIANT."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 10, Row {r_idx}, Col {c_idx}] Expanded thrust stand caveat")

    log("")

    # =========================================================================
    # FIX 10: Add Section 7.4 operational range note to Table 26 (Telemetry)
    # =========================================================================
    log("=== FIX 10: Table 26 (Telemetry Link Budget) — Distinguish link range vs mission radius ===")
    t26 = doc.tables[27]  # Table 26: Telemetry Link Budget at 866 MHz
    # Find the "Realistic Link Margin" row and update it
    for r_idx, row in enumerate(t26.rows):
        for c_idx, cell in enumerate(row.cells):
            if "Adequate (>15 dB margin)" in cell.text and "4.5m GCS mast" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "Adequate (>15 dB margin); requires 4.5m GCS mast",
                    "Adequate (>15 dB margin); requires 4.5m GCS mast. NOTE: This is the TELEMETRY RADIO LINK RANGE — not the operational mission radius. Practical mission radius at 45 kg with 80% DoD: ~6.8 km round-trip. 10–15 km mission range requires ≥35 Ah battery or relay station (BVLOS certification needed)."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 26, Row {r_idx}, Col {c_idx}] Added telemetry vs mission radius distinction")

    log("")

    # =========================================================================
    # FIX 11: Spray Rate section — add unified flow rate note
    # Table 12 Pump row: clarify pump 5.3 L/min vs nozzle-limited 3.16 L/min
    # =========================================================================
    log("=== FIX 11: Table 12 (Spray) — Pump row: clarify pump vs nozzle flow rates ===")
    t12b = doc.tables[11]
    for r_idx, row in enumerate(t12b.rows):
        for c_idx, cell in enumerate(row.cells):
            if "5.3 L/min, 2.1 bar, 12V DC, 7.5A" in cell.text:
                old_t = cell.text
                new_t = old_t.replace(
                    "5.3 L/min, 2.1 bar, 12V DC, 7.5A",
                    "5.3 L/min at free-flow, 2.1 bar operating point, 12V DC, 7.5A. Nozzle-limited to 3.16 L/min (4× TeeJet 11002 at 2.0 bar). Nozzle-limited rate is within the 1–5 L/min spec. Pump free-flow (5.3 L/min) exceeds spec upper bound — always operate with nozzles installed."
                )
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 12, Row {r_idx}, Col {c_idx}] Clarified pump vs nozzle-limited flow rates")

    log("")

    # =========================================================================
    # FIX 12: Vibration note — clarify G3 reference in vibration section
    # Para [217] Key Innovations: "G3" → "G1 Ground Sweep" (already done in FIX 3a above)
    # Also fix it in the Table 31 (Vibration) notes if present
    # =========================================================================
    log("=== FIX 12: Table 32 (Vibration) — Gate reference check ===")
    t_vib = doc.tables[32]  # Table 31: Vibration Analysis Summary
    for r_idx, row in enumerate(t_vib.rows):
        for c_idx, cell in enumerate(row.cells):
            if "G3" in cell.text and "30mm" in cell.text:
                old_t = cell.text
                new_t = old_t.replace("G3", "G1 Ground Sweep")
                if new_t != old_t:
                    set_cell_text(cell, new_t.strip())
                    log(f"  [TABLE 32 (Vibration), Row {r_idx}, Col {c_idx}] G3 → G1 Ground Sweep")

    log("")

    # =========================================================================
    # FIX 13: Abstract — update to reflect corrected reserve figures and
    # clarify that "22.7 min" is the mission profile (now updated to 21.8 min)
    # =========================================================================
    log("=== FIX 13: Abstract paragraph corrections ===")
    for i, para in enumerate(doc.paragraphs):
        text = para.text

        # Abstract para 12: update hover endurance reference if it has old number
        if "67.6 minutes" in text and "pure hover endurance" in text:
            replace_para_text(para, "67.6 minutes", "58.9 minutes", "Abstract hover endurance")

        # Abstract para 12: update mission energy reserve
        if "52.1%" in text and "energy reserve" in text:
            replace_para_text(para, "52.1%", "45.4%", "Abstract energy reserve")

        # Fix any remaining "22.7 minutes of mission endurance" → "21.8 minutes"
        if "22.7 minutes of mission endurance" in text:
            replace_para_text(para, "22.7 minutes of mission endurance", "21.8 minutes of mission endurance", "Mission endurance 22.7→21.8")

    log("")

    # =========================================================================
    # Save output
    # =========================================================================
    doc.save(DST)
    log(f"[SAVED] Output written to {DST}")
    log(f"[DONE ] {datetime.now().isoformat()}")

    # Write log file
    with open(LOG, "w") as f:
        f.write("\n".join(log_entries))
    print(f"\nLog written to {LOG}")
    print(f"Fixed report saved as {DST}")


if __name__ == "__main__":
    main()
