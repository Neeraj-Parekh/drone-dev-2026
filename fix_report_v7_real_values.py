#!/usr/bin/env python3
"""Patch COEP_Hexacopter_Technical_Report_v7.docx with verified real values.

The script updates the existing DOCX in place and creates a .bak copy first.
"""

from __future__ import annotations

import shutil
from pathlib import Path

import docx
from docx.oxml.ns import qn


ROOT = Path(__file__).resolve().parent
DOCX = ROOT / "COEP_Hexacopter_Technical_Report_v7.docx"
BACKUP = ROOT / "COEP_Hexacopter_Technical_Report_v7.docx.bak_real_values"


def set_cell_text(cell, text: str) -> None:
    """Replace all text in a table cell while keeping the cell itself."""
    from lxml import etree

    tc = cell._tc
    paras = tc.findall(".//" + qn("w:p"))
    if not paras:
        p = etree.SubElement(tc, qn("w:p"))
        paras = [p]
    first_para = paras[0]
    for para in list(tc.findall(".//" + qn("w:p"))):
        for child in list(para):
            para.remove(child)
    for extra_para in paras[1:]:
        parent = extra_para.getparent()
        if parent is not None:
            parent.remove(extra_para)
    run = etree.SubElement(first_para, qn("w:r"))
    t = etree.SubElement(run, qn("w:t"))
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    t.text = text


def replace_paragraph_contains(doc, needle: str, replacement: str) -> bool:
    for p in doc.paragraphs:
        if needle in p.text:
            for r in p.runs:
                r.text = ""
            if p.runs:
                p.runs[0].text = replacement
            else:
                p.add_run(replacement)
            return True
    return False


def replace_all_in_paragraphs(doc, old: str, new: str) -> int:
    count = 0
    for p in doc.paragraphs:
        if old in p.text:
            text = p.text.replace(old, new)
            for r in p.runs:
                r.text = ""
            if p.runs:
                p.runs[0].text = text
            else:
                p.add_run(text)
            count += 1
    return count


def add_row(table, values: list[str]) -> None:
    row = table.add_row()
    for cell, value in zip(row.cells, values):
        set_cell_text(cell, value)


def main() -> None:
    if not BACKUP.exists():
        shutil.copy2(DOCX, BACKUP)

    doc = docx.Document(DOCX)

    # Version and high-level summary.
    replace_paragraph_contains(doc, "Version 6.0", "Version 7.1 (Real Datasheet Values + 10L Variant + Conservative Envelope)")
    replace_paragraph_contains(
        doc,
        "6× Hobbywing X9 G2L | 3× Tattu 12S 30Ah | 6× 36190 Prop",
        "6× Hobbywing X9 G2L | 3× Tattu 12S 30Ah | 6× Hobbywing MFP 36×11 Prop",
    )
    replace_paragraph_contains(
        doc,
        "The Research Phase (36 kg) achieves a thrust-to-weight ratio",
        "The Research Phase (36 kg) achieves a thrust-to-weight ratio of 3.33 using the battery-limited design thrust of 20 kg/axis, with single-motor failure TWR of 2.44. Hobbywing's X9 G2L datasheet lists 24 kg/axis maximum at 12S, but six motors at full output require about 576 A, exceeding the three-pack Tattu battery burst limit of 450 A. Therefore all TWR claims in this report use the conservative 20 kg/axis system limit until thrust-stand and battery-current testing proves a higher safe limit. Corrected hover power from Hobbywing load data gives approximately 47.2 minutes of pure hover endurance at 36 kg and 34.6 minutes at 45 kg.",
    )
    replace_paragraph_contains(
        doc,
        "The Operational Phase (45 kg) incorporates twenty-one critical corrections",
        "The Operational Phase (45 kg) incorporates real datasheet corrections and remaining issue closures. Key corrections include: Hobbywing X9 G2L real 12S datasheet values added (24 kg/axis motor capability, 20 kg/axis battery-limited design thrust); telemetry frequency retained at 865-867 MHz (RFD868x); Tattu battery limit retained at 3C continuous/5C burst; mission endurance table corrected to 21.8 minutes; 10L tank/fill variant added at 39.2 kg MTOW; nozzle flow corrected to about 2.65 L/min at 2.1 bar and about 3.03 L/min at 40 psi; and mandatory vibration, EMI, nozzle-wear, and flow-sensor calibration gates added.",
    )

    replace_all_in_paragraphs(doc, "36190 (36-inch diameter, 1.9-inch pitch)", "Hobbywing MFP 36×11 (36-inch diameter, 11-inch pitch)")
    replace_all_in_paragraphs(doc, "36190", "MFP 36×11")
    replace_all_in_paragraphs(doc, "3.16 L/min", "2.65 L/min at 2.1 bar / 3.03 L/min at 40 psi")
    replace_all_in_paragraphs(doc, "72.6%", "66.7%")
    replace_all_in_paragraphs(doc, "45.4%", "34.9%")
    replace_all_in_paragraphs(doc, "58.9 minutes", "47.2 minutes")
    replace_all_in_paragraphs(doc, "42.7 minutes", "34.6 minutes")

    replace_paragraph_contains(
        doc,
        "At 12S, each Hobbywing X9 G2L motor produces",
        "At 12S, the Hobbywing X9 G2L datasheet lists 24 kg/axis maximum thrust with MFP 36×11 propeller at sea level and 25°C. The system design limit used for TWR is 20 kg/axis because the selected 3× Tattu 12S 30Ah packs can supply 450 A burst total, while six X9 G2L axes at datasheet maximum require about 576 A. The 20 kg/axis limit is therefore a battery-current and verification limit, not a motor limit. At the 36 kg Research Phase MTOW, this provides TWR 3.33; at the 45 kg Operational Phase, TWR 2.67; and at the 39.2 kg 10L variant, TWR 3.06.",
    )
    replace_paragraph_contains(
        doc,
        "At 36 kg Research Phase, the total hover current",
        "At 36 kg Research Phase, corrected Hobbywing load-table hover current is approximately 80.6A total at the aircraft level (26.9A per pack equivalent including pump and avionics). At 45 kg Operational Phase, total hover current is approximately 110A (36.7A per pack). The 39.2 kg 10L variant draws approximately 90.6A total (30.2A per pack). These values remain inside the 90A continuous rating per Tattu pack but are higher than the earlier thrust-scaling estimate.",
    )
    replace_paragraph_contains(
        doc,
        "The spray system is designed around a SHURflo",
        "The spray system is designed around a SHURflo 8000-series diaphragm pump feeding four TeeJet XR11002 flat-fan nozzles. TeeJet XR11002 is a 0.20 US gpm nozzle at 40 psi; four nozzles therefore deliver about 3.03 L/min at 40 psi and about 2.65 L/min at the 2.1 bar working point. Mission energy uses a controlled effective flow of about 1.34 L/min through pressure/PWM duty control, within the 1-5 L/min project requirement. The 36 kg phase uses 6.8L ballast, the 10L variant uses 10L liquid, and the 45 kg phase uses 15.8L in the 16L baffled tank.",
    )
    replace_paragraph_contains(
        doc,
        "The SHURflo pump draws 7.5A",
        "The SHURflo pump is retained as a pressure-capable supply pump, but nozzle flow is governed by TeeJet nozzle pressure. At 2.1 bar, four XR11002 nozzles deliver about 2.65 L/min; at 40 psi they deliver about 3.03 L/min. The mission model uses about 1.34 L/min effective flow by PWM/pressure control so that the 15.8L tank supports the modeled 11.8 minutes of spray time. Flow must be calibrated by bucket test before Gate G2 and after nozzle replacement.",
    )
    replace_paragraph_contains(
        doc,
        "The mission energy budget uses 80% depth",
        "The mission energy budget uses the real Tattu pack energy of 1,332 Wh each: 3× packs = 3,996 Wh nominal. The primary usable energy is 80% DoD with 0.88 voltage-sag factor: 3,996 × 0.80 × 0.88 = 2,813 Wh. A conservative Indian-summer value of 2,400 Wh is also used for 70% DoD, 35°C operation, aging, and additional voltage sag.",
    )
    replace_paragraph_contains(
        doc,
        "At 36 kg with 6.8L payload",
        "At 36 kg with 6.8L payload, the spray passes are shorter and are used for spray pattern verification rather than full agricultural coverage. The 10L variant at 39.2 kg MTOW is now included because the project requirement includes a 10L tank/fill option. SPRAY RATE NOTE: TeeJet XR11002 is 0.20 US gpm at 40 psi; four nozzles give about 3.03 L/min at 40 psi or about 2.65 L/min at 2.1 bar. The mission table uses 1.34 L/min effective flow via pressure/PWM control. NOTE: Achieving the 10+ km telemetry range requires an elevated GCS mast of at least 4.5m to clear the 7.14 km radio horizon at 4m flight altitude.",
    )
    replace_paragraph_contains(
        doc,
        "Note: The 36 kg Research Phase provides",
        "Note: The 36 kg Research Phase provides 66.7% energy reserve, the 10L variant provides 56.8%, and the 45 kg configuration provides 34.9% under nominal 25°C/calm conditions. The 45 kg mission satisfies the 20-25 minute theoretical requirement, but Indian summer wind/temperature derating reduces the recommended practical planning time to about 18.5 minutes if a 20% reserve is required.",
    )
    replace_paragraph_contains(
        doc,
        "Note: The 36 kg configuration maintains safe endurance",
        "Note: Corrected Hobbywing load data reduces hover endurance versus earlier thrust-scaling estimates. The 45 kg configuration remains within the 20-25 minute theoretical mission requirement in calm conditions, but 5 m/s wind plus 35°C battery derating leaves only about 8.8% reserve for the full 21.8 minute route. Field planning should cap 45 kg sorties to about 18.5 minutes under those conditions unless battery capacity is increased.",
    )
    replace_paragraph_contains(
        doc,
        "The COEP Agricultural Hexacopter achieves all primary mission objectives",
        "The COEP Agricultural Hexacopter achieves the primary mission objectives when evaluated with battery-limited design thrust and verified component data. At the 36 kg Research Phase, the design achieves TWR 3.33, SMF TWR 2.44, and approximately 47.2 minutes of pure hover endurance. The 10L variant operates at 39.2 kg MTOW with TWR 3.06, SMF TWR 2.24, and approximately 42.0 minutes pure hover. At the 45 kg Operational Phase, TWR is 2.67 with 21.8 minutes theoretical mission endurance and 34.9% nominal energy reserve. The phased 36 kg→39.2 kg→45 kg approach ensures safety systems are validated before full-payload operations.",
    )
    replace_paragraph_contains(
        doc,
        "The dual-configuration strategy provides",
        "The updated three-operating-case strategy provides a clearer risk path: 36 kg Research Phase, 39.2 kg 10L tank/fill variant, then 45 kg full 16L tank phase. The 36 kg and 10L cases both keep SMF TWR above 2.0; the 45 kg case remains marginal at 1.96 under the conservative 20 kg/axis battery-limited design thrust and therefore still requires strict G5 verification before any full-payload flight.",
    )

    # Table 1: Mission Objectives (doc.tables[2])
    t = doc.tables[2]
    set_cell_text(t.rows[1].cells[5], "Compliant for 36/39.2/45 kg. 50 kg upper bound not adopted as baseline; requires battery-current, frame, thermal, and regulatory validation. X9 G2L motor datasheet max is 24 kg/axis, but report TWR uses 20 kg/axis battery-limited design thrust.")
    set_cell_text(t.rows[2].cells[1], "≥5 kg liquid; 10L variant required")
    set_cell_text(t.rows[2].cells[2], "6.8 kg research; 10.0 kg variant")
    set_cell_text(t.rows[2].cells[4], "15.8 kg in 16L tank; 10L variant documented")
    set_cell_text(t.rows[5].cells[2], "15.1 min spray-verification mission; 47.2 min pure hover")
    set_cell_text(t.rows[5].cells[4], "21.8 min theoretical mission; 18.5 min conservative Indian-summer planning value")
    set_cell_text(t.rows[6].cells[4], "15 L/ha target via controlled flow; TeeJet XR11002: ~2.65 L/min at 2.1 bar, ~3.03 L/min at 40 psi; mission effective flow ~1.34 L/min")
    set_cell_text(t.rows[7].cells[4], "10 km telemetry link (RFD868x); practical 45 kg mission radius depends on reserve and wind, not just radio link")

    # Table 7: mass budget (doc.tables[8])
    t = doc.tables[8]
    set_cell_text(t.rows[3].cells[0], "Props (6× Hobbywing MFP 36×11)")
    set_cell_text(t.rows[10].cells[0], "Liquid payload (36 kg / 10L variant / 45 kg)")
    set_cell_text(t.rows[10].cells[1], "6.8 / 10.0 / 15.8")
    set_cell_text(t.rows[10].cells[2], "18.9% / 25.5%")
    set_cell_text(t.rows[10].cells[3], "35.1% at 45 kg")
    set_cell_text(t.rows[11].cells[0], "MTOW (36 kg / 10L variant / 45 kg)")
    set_cell_text(t.rows[11].cells[1], "36.0 / 39.2 / 45.0")

    # Table 8: propulsion specs (doc.tables[9])
    t = doc.tables[9]
    set_cell_text(t.rows[1].cells[2], "110 KV; X9 G2L integrated propulsion system; 24 kg/axis datasheet max at 12S; 20 kg/axis battery-limited design thrust")
    set_cell_text(t.rows[2].cells[2], "30A continuous, 120A peak for 3s, 12S-14S, PWM + CAN; hover current remains below continuous rating")
    set_cell_text(t.rows[3].cells[1], "Hobbywing MFP 36×11 (or exact X9 G2L supplied propeller)")
    set_cell_text(t.rows[3].cells[2], "36 in × 11 in folding propeller; official X9 G2L load table uses MFP 36×11")
    set_cell_text(t.rows[4].cells[1], "24 kg/axis motor datasheet; 20 kg/axis design limit")
    set_cell_text(t.rows[4].cells[2], "24 kg at 48V requires ~95.9A per motor; six motors require ~576A, exceeding 3× Tattu burst limit of 450A. TWR therefore uses 20 kg/axis until thrust-stand + current test proves otherwise.")
    set_cell_text(t.rows[5].cells[1], "25.8 kg/axis datasheet at 14S")
    set_cell_text(t.rows[5].cells[2], "14S upgrade path; requires battery/ESC/current redesign validation")
    set_cell_text(t.rows[9].cells[2], "Tattu pack: 3C continuous (90A/pack), 5C burst (150A/pack, <3s). Total system burst: 450A for 3 packs.")

    # Table 9 power distribution (doc.tables[10])
    t = doc.tables[10]
    set_cell_text(t.rows[1].cells[2], "80.6A at hover")
    set_cell_text(t.rows[1].cells[3], "110A at hover")
    set_cell_text(t.rows[7].cells[1], "~26.9A at 36 kg; ~30.2A at 10L variant; ~36.7A at 45 kg")
    set_cell_text(t.rows[7].cells[2], "26.9A")
    set_cell_text(t.rows[7].cells[3], "36.7A")

    # Table 10 spray system (doc.tables[11])
    t = doc.tables[11]
    set_cell_text(t.rows[1].cells[4], "SHURflo supplies pressure; TeeJet XR11002 controls flow. Four XR11002 nozzles: ~2.65 L/min at 2.1 bar, ~3.03 L/min at 40 psi. Mission modeled at ~1.34 L/min effective flow by PWM/pressure control. Pump/nozzle system remains within 1-5 L/min requirement.")
    set_cell_text(t.rows[2].cells[4], "XR11002 is 0.20 US gpm at 40 psi; replace nozzle when calibrated flow is >10% above new-nozzle baseline at same pressure.")
    set_cell_text(t.rows[3].cells[2], "6.8L fill (ballast)")
    set_cell_text(t.rows[3].cells[3], "15.8L fill; 10.0L variant at 39.2 kg MTOW")
    set_cell_text(t.rows[3].cells[4], "16L baffled HDPE tank supports full 15.8L phase; 10L tank/fill variant is now documented for project requirement.")
    set_cell_text(t.rows[5].cells[4], "Use TeeJet strainer guidance; 50-mesh minimum for XR11002-class tips, finer mesh only if pressure drop is acceptable. Inspect/clean every tank.")
    set_cell_text(t.rows[6].cells[4], "YF-S402: 0.3-6 L/min, f=(73×Q)±2%, ~4380 pulses/L. Mandatory bucket calibration at 1, 2, 3, and 5 L/min before Gate G2.")

    # Avionics comparison small correction: FrSky R-XSR mass is 1.5g.
    t = doc.tables[15]
    set_cell_text(t.rows[1].cells[3], "1.5g")

    # Table 16 power budget (doc.tables[17])
    t = doc.tables[17]
    set_cell_text(t.rows[1].cells[1], "3,433 W")
    set_cell_text(t.rows[1].cells[2], "~77A motor current")
    set_cell_text(t.rows[1].cells[3], "4,739 W")
    set_cell_text(t.rows[1].cells[4], "~107A motor current")
    set_cell_text(t.rows[5].cells[1], "3,578 W")
    set_cell_text(t.rows[5].cells[2], "~80.6A @ 44.4V")
    set_cell_text(t.rows[5].cells[3], "4,884 W")
    set_cell_text(t.rows[5].cells[4], "~110A @ 44.4V")
    set_cell_text(t.rows[5].cells[5], "Corrected from Hobbywing X9 G2L 12S load table; includes 90W pump + 55W avionics")
    set_cell_text(t.rows[6].cells[1], "~26.9 A")
    set_cell_text(t.rows[6].cells[3], "~36.7 A")

    # Table 20 normal TWR (doc.tables[21])
    t = doc.tables[21]
    set_cell_text(t.rows[1].cells[1], "6 × 20 = 120 kg battery-limited design thrust")
    set_cell_text(t.rows[1].cells[4], "Current design basis. Motor datasheet max is 24 kg/axis, but battery burst current limits validated design thrust to ~20 kg/axis.")
    set_cell_text(t.rows[2].cells[1], "6 × 25.8 = 154.8 kg motor datasheet max")
    set_cell_text(t.rows[2].cells[2], "4.30")
    set_cell_text(t.rows[2].cells[3], "3.44")

    # Table 21 SMF (doc.tables[22])
    t = doc.tables[22]
    set_cell_text(t.rows[2].cells[1], "8 kg (40% of 20 kg design thrust)")
    set_cell_text(t.rows[3].cells[1], "4 × 20 = 80 kg (100% design thrust)")
    set_cell_text(t.rows[4].cells[1], "88 kg battery-limited design thrust")

    # Table 23 hover power (doc.tables[24])
    t = doc.tables[24]
    set_cell_text(t.rows[1].cells[1], "3,433 W")
    set_cell_text(t.rows[1].cells[2], "~77A motor current")
    set_cell_text(t.rows[1].cells[3], "4,739 W")
    set_cell_text(t.rows[1].cells[4], "~107A motor current")
    set_cell_text(t.rows[1].cells[5], "Interpolated from official Hobbywing X9 G2L 12S/MFP 36×11 load table")
    set_cell_text(t.rows[4].cells[1], "3,578 W")
    set_cell_text(t.rows[4].cells[2], "~80.6A equiv.")
    set_cell_text(t.rows[4].cells[3], "4,884 W")
    set_cell_text(t.rows[4].cells[4], "~110A equiv.")
    set_cell_text(t.rows[4].cells[5], "Includes corrected motor power + 90W pump + 55W avionics")
    set_cell_text(t.rows[5].cells[1], "~47.2 min")
    set_cell_text(t.rows[5].cells[2], "2,813 Wh / 3,578 W")
    set_cell_text(t.rows[5].cells[3], "~34.6 min (pure hover only)")
    set_cell_text(t.rows[5].cells[4], "2,813 Wh / 4,884 W")
    set_cell_text(t.rows[5].cells[5], "Usable capacity = 3,996 Wh × 0.80 DoD × 0.88 voltage sag = 2,813 Wh; conservative derated value = 2,400 Wh")

    # Table 24 mission energy (doc.tables[25])
    t = doc.tables[25]
    rows = [
        ["Segment", "Duration (36/45 kg)", "Power (36 kg)", "Energy 36 kg (2,813 Wh)", "Power (45 kg)", "Energy 45 kg (2,813 Wh)"],
        ["Takeoff/Climb (1.5× motor + avionics)", "1.0 / 1.0 min", "5,204 W", "86.7 Wh", "7,164 W", "119.4 Wh"],
        ["Transit Out (1.05× motor + avionics)", "4.0 / 4.0 min", "3,660 W", "244.0 Wh", "5,031 W", "335.4 Wh"],
        ["Spray Pass 1", "3.0 / 7.0 min", "3,578 W", "178.9 Wh", "4,884 W", "569.8 Wh"],
        ["Spray Pass 2", "2.1 / 4.8 min", "3,578 W", "124.1 Wh", "4,884 W", "390.7 Wh"],
        ["RTL (1.10× motor + avionics)", "4.0 / 4.0 min", "3,831 W", "255.4 Wh", "5,268 W", "351.2 Wh"],
        ["Landing (0.80× motor + avionics)", "1.0 / 1.0 min", "2,801 W", "46.7 Wh", "3,846 W", "64.1 Wh"],
        ["TOTAL MISSION", "15.1 / 21.8 min", "—", "935.6 Wh", "—", "1,830.6 Wh"],
        ["RESERVE (from 2,813 Wh usable with voltage sag)", "—", "—", "1,877.5 Wh (66.7%)", "—", "982.6 Wh (34.9%)"],
    ]
    for r, values in zip(t.rows, rows):
        for cell, value in zip(r.cells, values):
            set_cell_text(cell, value)

    # Table 25 wind analysis (doc.tables[26])
    t = doc.tables[26]
    wind_rows = [
        ["Wind Condition", "Power Penalty", "36 kg Total / Endurance", "45 kg Total / Endurance", "Status"],
        ["Calm (0 m/s)", "0%", "3,578 W / ~47.2 min", "4,884 W / ~34.6 min (pure hover); mission: 21.8 min + ~12.1 min reserve", "Compliant theoretical"],
        ["Light (2 m/s)", "+5% motor", "3,750 W / ~45.0 min", "5,121 W / ~33.0 min", "Compliant"],
        ["Moderate (3 m/s)", "+10% motor", "3,921 W / ~43.0 min", "5,358 W / ~31.5 min", "Compliant with reserve monitoring"],
        ["Strong (5 m/s)", "+20% motor", "4,264 W / ~39.6 min", "5,832 W / ~28.9 min; 21.8 min route leaves ~8.8% reserve with 2,400 Wh derated capacity", "Marginal at 45 kg"],
        ["Very Strong (7 m/s)", "+35% motor", "4,779 W / ~35.3 min", "6,543 W / ~25.8 min; worst-case practical sortie capped near 15 min", "Not recommended at 45 kg"],
    ]
    for r, values in zip(t.rows, wind_rows):
        for cell, value in zip(r.cells, values):
            set_cell_text(cell, value)

    # Table 30 busbar thermal (doc.tables[31])
    t = doc.tables[31]
    set_cell_text(t.rows[3].cells[1], "80.6A")
    set_cell_text(t.rows[3].cells[2], "110A")
    set_cell_text(t.rows[4].cells[1], "1.49 W/m")
    set_cell_text(t.rows[4].cells[2], "2.77 W/m")
    set_cell_text(t.rows[6].cells[1], "~22°C")
    set_cell_text(t.rows[6].cells[2], "~42°C")
    set_cell_text(t.rows[7].cells[1], "~67°C")
    set_cell_text(t.rows[7].cells[2], "~87°C at hover (45°C ambient). At 50°C ambient + peak climb current (150A): estimated 127°C — EXCEEDS insulation limit. 50 kg hover current is ~128A and must be separately thermal-tested before adoption.")

    # Table 31 vibration (doc.tables[32])
    t = doc.tables[32]
    set_cell_text(t.rows[2].cells[0], "Shaft rotational frequency at hover")
    set_cell_text(t.rows[2].cells[1], "~32 Hz (36 kg) to ~36 Hz (45 kg)")
    set_cell_text(t.rows[2].cells[2], "Official load table RPM: ~1,916 at 36 kg, ~2,146 at 45 kg; shaft frequency overlaps 32 Hz arm mode")
    set_cell_text(t.rows[3].cells[0], "Blade-pass frequency at hover")
    set_cell_text(t.rows[3].cells[1], "~64-72 Hz")
    set_cell_text(t.rows[3].cells[2], "2-blade propeller; not the primary 32 Hz overlap risk")
    set_cell_text(t.rows[4].cells[2], "Gate uses ArduPilot/Pixhawk log criteria: VIBE mostly <30 m/s², no continuously increasing clipping, FFT peak not coincident with arm mode")
    set_cell_text(t.rows[6].cells[1], "No unverified Moongel credit")
    set_cell_text(t.rows[6].cells[2], "Damping pads are not credited in analysis until G1 ground sweep proves reduction. If VIBE >30 m/s² or clipping increases, rebalance props/motors and upgrade arms/isolation before flight.")
    set_cell_text(t.rows[7].cells[2], "Pixhawk isolation accepted only after log review: VIBE <30 m/s² and Clip0/1/2 not continuously increasing")

    # Table 32 EMI/EMC (doc.tables[33]); add validation rows.
    t = doc.tables[33]
    add_row(t, ["EMI validation gate", "Bench + tethered full-throttle test", "Mandatory before G2: CAN/UART packet errors = 0 during 60s motor run, GPS HDOP change <0.2, compass innovation within ArduPilot limits, RFD868x RSSI/noise logged"])
    add_row(t, ["Acceptance status", "No flight test data yet", "Threat matrix is not proof of compliance. Report now marks EMI/EMC as pending verification, not verified performance."])

    # Table 33 motor trade-off (doc.tables[34])
    t = doc.tables[34]
    set_cell_text(t.rows[1].cells[1], "24 kg/axis datasheet; 20 kg/axis battery-limited design")
    set_cell_text(t.rows[1].cells[7], "Selected; TWR calculations use 20 kg/axis until battery-current-limited thrust stand validation")

    # Table 36 BOM (doc.tables[37])
    t = doc.tables[37]
    set_cell_text(t.rows[3].cells[1], "Hobbywing MFP 36×11 Propeller")
    set_cell_text(t.rows[12].cells[1], "16L HDPE Tank with Baffles (15.8L operational; 10L variant/fill supported)")

    # Table 41 Appendix motor datasheet (doc.tables[42])
    t = doc.tables[42]
    appendix_rows = [
        ["Prop(inch)", "Throttle", "Voltage(v)", "Amps(A)", "Thrust(gf)", "Watts(W)", "Efficiency(g/W)", "RPM"],
        ["MFP 36×11", "33%", "48.0 V", "7.8 A", "4,353 gf", "375.6 W", "11.6 g/W", "1,637 RPM"],
        ["MFP 36×11", "39%", "48.0 V", "11.6 A", "5,884 gf", "556.0 W", "10.6 g/W", "1,898 RPM"],
        ["MFP 36×11", "45%", "48.0 V", "16.6 A", "7,545 gf", "796.6 W", "9.5 g/W", "2,153 RPM"],
        ["MFP 36×11", "51%", "48.0 V", "22.5 A", "9,284 gf", "1,079.9 W", "8.6 g/W", "2,392 RPM"],
        ["MFP 36×11", "60%", "48.0 V", "32.7 A", "12,009 gf", "1,570.0 W", "7.6 g/W", "2,725 RPM"],
        ["MFP 36×11", "72%", "48.0 V", "49.5 A", "15,867 gf", "2,377.3 W", "6.7 g/W", "3,148 RPM"],
        ["MFP 36×11", "84%", "48.0 V", "70.9 A", "19,859 gf", "3,405.3 W", "5.8 g/W", "3,570 RPM"],
        ["MFP 36×11", "100%", "48.0 V", "95.9 A", "23,997 gf", "4,607.3 W", "5.2 g/W", "4,000 RPM"],
    ]
    # Add one row if the appendix table still has only 8 data rows.
    while len(t.rows) < len(appendix_rows):
        t.add_row()
    for r, values in zip(t.rows, appendix_rows):
        for cell, value in zip(r.cells, values):
            set_cell_text(cell, value)

    # Add a compact verification addendum at the end.
    doc.add_page_break()
    doc.add_heading("Appendix G: Real-Value Verification Addendum", level=1)
    doc.add_paragraph(
        "This addendum closes the remaining v7 open items using datasheet values and mandatory validation gates. Sources checked include Hobbywing X9 G2L official product/load table, Grepow/Tattu 12S 30Ah semi-solid-state battery page, TeeJet XR11002 published nozzle rating, ArduPilot vibration guidance, RFD868x datasheet/search result summary, Pixhawk 6C public documentation, and YF-S402 flow-sensor product data. Values that still require hardware testing are explicitly marked as verification gates rather than claimed measured performance."
    )
    table = doc.add_table(rows=1, cols=5)
    table.style = "Table Grid"
    for cell, value in zip(table.rows[0].cells, ["Item", "Verified Value", "Report Action", "Gate", "Source Basis"]):
        set_cell_text(cell, value)
    verification_rows = [
        ["X9 G2L propulsion", "24 kg/axis datasheet max at 12S; 20 kg/axis battery-limited design thrust", "TWR keeps conservative 20 kg/axis until current-limited thrust test", "G1 thrust stand", "Hobbywing X9 G2L official load table"],
        ["Tattu 12S 30Ah", "44.4V, 30Ah, 1,332Wh, 3C continuous/90A, 5C burst/150A, 4.9kg", "Battery burst cap explains thrust limit", "Battery current log", "Grepow/Tattu datasheet page"],
        ["10L variant", "MTOW 39.2 kg; TWR 3.06; SMF TWR 2.24; pure hover ~42.0 min", "Added as required intermediate configuration", "G4 before 45 kg", "Calculated from dry mass + 10L water"],
        ["Flight time", "45 kg theoretical mission 21.8 min; conservative planning 18.5 min at 35°C/5 m/s", "Table 24 consistency fixed", "Mission log", "Corrected Hobbywing power + Tattu usable energy"],
        ["Nozzle flow", "XR11002: 0.20 gpm at 40 psi; 4 nozzles ~3.03 L/min at 40 psi, ~2.65 L/min at 2.1 bar", "Removed incorrect 3.16 L/min at 2.0 bar claim", "Bucket test", "TeeJet XR11002 published rating"],
        ["Nozzle wear", "Replace when flow exceeds new-nozzle baseline by >10% at same pressure", "Maintenance criterion added", "Every 25 tank cycles", "TeeJet/ag sprayer standard practice"],
        ["Flow sensor", "YF-S402 0.3-6 L/min, f=(73×Q)±2%, 4380 pulses/L", "Calibration table/procedure added", "G2 and weekly", "YF-S402 product data"],
        ["Vibration", "ArduPilot acceptable VIBE mostly <30 m/s²; >60 m/s² problematic; clipping must not increase", "Moongel not credited without test", "G1 ground sweep", "ArduPilot vibration guidance"],
        ["EMI/EMC", "No measured data yet", "Threat matrix marked pending; acceptance criteria added", "G2 full-throttle tether", "ArduPilot/Pixhawk logging practice"],
    ]
    for row in verification_rows:
        add_row(table, row)

    doc.add_heading("Appendix H: Flow Calibration Procedure", level=1)
    doc.add_paragraph(
        "Before Gate G2, run clean water through the final tank, filter, pump, flow sensor, pressure gauge, and nozzle assembly. Collect discharge into a graduated container for 60 seconds at four set points: 1, 2, 3, and 5 L/min command. Record pulses, measured volume, pressure, and battery voltage. Compute K-factor as pulses per liter; initial YF-S402 estimate is 4380 pulses/L. Flight controller calibration is accepted only if corrected volume error is within ±3% at 1-3 L/min and within ±5% at 5 L/min. Recalibrate after nozzle replacement, chemical change, pump service, or every 25 tank cycles."
    )

    doc.add_heading("Appendix I: Conservative Flight Envelope", level=1)
    table = doc.add_table(rows=1, cols=5)
    table.style = "Table Grid"
    for cell, value in zip(table.rows[0].cells, ["Scenario", "Usable Energy", "Weather/Wind", "45 kg Mission Result", "Planning Decision"]):
        set_cell_text(cell, value)
    for row in [
        ["Nominal", "2,813 Wh", "25°C, calm", "21.8 min mission, 34.9% reserve", "Compliant theoretical 20-25 min"],
        ["Conservative Indian summer", "2,400 Wh", "35°C, 5 m/s wind", "21.8 min route leaves ~8.8% reserve", "Plan 18.5 min to preserve ~20% reserve"],
        ["Worst-case hot/windy", "2,000 Wh", "45°C, 7 m/s wind", "21.8 min route not energy-compliant", "Cap at ~15 min or reduce payload"],
    ]:
        add_row(table, row)

    doc.save(DOCX)
    print(f"Patched {DOCX}")
    print(f"Backup {BACKUP}")


if __name__ == "__main__":
    main()
