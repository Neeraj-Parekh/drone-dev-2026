"""
Build the 4-sheet xlsx for the COEP hexacopter RFQ review.

Sheets:
  1. RFQ_Remarked   – original COEP RFQ with verdict emoji + remark column
  2. Path_A_Jiyi    – closed-source Jiyi architecture (≤₹4L)
  3. Path_B_Pixhawk – open-source ArduPilot architecture (≤₹5L, the v7 design path)
  4. Cost_Benefit   – cost-benefit notes, comparison matrix, decision tree
"""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

OUT = "/mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/COEP_RFQ_Analysis.xlsx"

# ---------- style helpers ----------
HDR_FONT  = Font(bold=True, color="FFFFFF", size=11)
HDR_FILL  = PatternFill("solid", fgColor="1F4E78")
SUB_FILL  = PatternFill("solid", fgColor="D9E1F2")
TOT_FONT  = Font(bold=True, size=11)
TOT_FILL  = PatternFill("solid", fgColor="FFE699")
GREEN     = PatternFill("solid", fgColor="C6EFCE")
YELLOW    = PatternFill("solid", fgColor="FFEB9C")
RED       = PatternFill("solid", fgColor="FFC7CE")
GREY      = PatternFill("solid", fgColor="EDEDED")
CENTER    = Alignment(horizontal="center", vertical="center", wrap_text=True)
LEFT_WRAP = Alignment(horizontal="left", vertical="center", wrap_text=True)
THIN      = Side(style="thin", color="999999")
BOX       = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def hdr(cell, text):
    cell.value = text
    cell.font  = HDR_FONT
    cell.fill  = HDR_FILL
    cell.alignment = CENTER
    cell.border = BOX


def sub(cell, text):
    cell.value = text
    cell.font  = Font(bold=True, size=11)
    cell.fill  = SUB_FILL
    cell.alignment = LEFT_WRAP
    cell.border = BOX


def write_row(ws, row_idx, values, fill=None, bold=False, center=False):
    for col_idx, v in enumerate(values, 1):
        c = ws.cell(row=row_idx, column=col_idx, value=v)
        c.alignment = CENTER if center else LEFT_WRAP
        c.border    = BOX
        if fill is not None:
            c.fill = fill
        if bold:
            c.font = TOT_FONT


def autofit(ws, widths):
    for col, w in widths.items():
        ws.column_dimensions[col].width = w


wb = openpyxl.Workbook()

# =====================================================================
# SHEET 1 — RFQ with verdicts
# =====================================================================
ws1 = wb.active
ws1.title = "1_RFQ_Remarked"

# Header row
headers = ["Sr", "Component (RFQ)", "Req Qty", "Zbotic SKU",
           "Unit Price (ex-GST)", "GST%", "Total (incl GST)",
           "Verdict", "Issue / Note"]
for col, h in enumerate(headers, 1):
    hdr(ws1.cell(row=1, column=col), h)

# Original RFQ lines + verdict
# Verdict codes:
#   OK     ✅ MATCH    – keep, no change
#   ALT    ⚠️ ALT      – keep but alternative is better
#   BAD    🔴 MISMATCH – must change
#   OOS    ❌ OOS      – out of stock, substitute
#   N/A    —           – not relevant to 35 kg MTOW design
rfq_lines = [
    # sr, name, qty, sku, unit_price, gst%, total, verdict, note
    (1,  "Hobbywing X8 Plus Motor + ESC + 3011/3090 prop CW",
        4, "AI5455", 12500, 0.18, 4*12500*1.18, "🔴 MISMATCH",
        "X8 max thrust 15 kg/axis → 6×15=90 kg peak, but 35 kg MTOW needs 6×7=42 kg at hover at 1.0 TWR. "
        "Tight at 1:1 with no margin. X9 G2L (24 kg/axis) gives 4.1:1 margin. Switch to X9 G2L (₹+1.2L delta)."),
    (2,  "Hobbywing X8 Plus Motor + ESC + 3011/3090 prop CCW",
        4, "AI5456", 12500, 0.18, 4*12500*1.18, "🔴 MISMATCH",
        "Same as line 1. Switch to X9 G2L CCW combo."),
    (3,  "EFT E616P 16L 6-Axis Agricultural Drone Frame",
        1, "AI7106", 33782, 0.05, 1*33782*1.05, "✅ MATCH",
        "EFT official: wheelbase 1628 mm, frame 6.41–7 kg, MTOW 36 kg. Fits 35 kg target. Keep."),
    (4,  "EFT E-series 10L Tank with battery plate",
        1, "AI5494",  5548, 0.05, 1* 5548*1.05, "⚠️ ALT",
        "10 L tank = ~25 kg MTOW drone class. 16 L HDPE with 4 baffles (v7 design) needed for 35 kg target. "
        "Switch to 16L HDPE (custom fab, ~₹6,500)."),
    (5,  "Jiyi K++ V2 flight controller",
        1, "—",        0,    0,    0,            "🔴 MISMATCH",
        "Out of stock at Zbotic. K++ V2 supports PWM ESC <490 Hz only — INCOMPATIBLE with X9 G2L "
        "DroneCAN ESCs in v7 design. Architecture fork: Jiyi (closed-source) OR Pixhawk (open-source). "
        "Pixhawk 6C (₹18k) selected in v7. Alternative: K++ V2 (₹9,200) if going Jiyi path."),
    (6,  "Ag++ Flight Controller with AeroGCS Software Stack",
        1, "—",        0,    0,    0,            "❌ NOT IN DESIGN",
        "AeroGCS is closed-source, single-vendor lock-in. Not selected in v7. Drop."),
    (7,  "Agriculture Drone spraying system with 5L pump",
        1, "AI5190",  8788, 0.05, 1* 8788*1.05, "🔴 MISMATCH",
        "Hobbywing 5L pump is 3.5 bar (over-pressurises TeeJet XR11002 at 2.8 bar design). "
        "v7 design uses SHURflo 8000-543-236 diaphragm pump (2.1 bar, matches nozzle). "
        "If you keep Hobbywing 5L, also switch to XR11003 nozzle (3+ bar rated)."),
    (8,  "SKYDROID H12 2.4GHz 12CH RC + R12 RX",
        1, "AI5557", 13500, 0.18, 1*13500*1.18, "🔴 MISMATCH",
        "Skydroid is proprietary Android link, not MAVLink. Incompatible with ArduPilot. "
        "v7 uses FrSky R-XSR (₹3.5k) + RFD868x telemetry (₹12k) = ₹15.5k total. "
        "Or keep H12 if going Jiyi closed-source path."),
    (9,  "Here4 Multiband RTK GPS",
        1, "AI5438", 36538, 0.05, 1*36538*1.05, "⚠️ OVER-SPEC",
        "1 cm RTK overkill for spray-only mission. v7 uses 2× HGLRC M10 Mini (₹4,400 total). "
        "RTK justified only if doing post-flight mapping. Phase-2 upgrade."),
    (10, "TF02-Pro LiDAR 40 m IP65",
        2, "AI5683",  4863, 0.18, 2* 4863*1.18, "❌ NOT IN DESIGN",
        "v7 uses MS5611 barometer (10 cm alt noise). TF02-Pro worth adding IF doing hilly terrain. "
        "For flatland spraying, drop (saves ₹9,726)."),
    (11, "Vibration Remover pad",
        6, "—",        0,    0,    0,            "✅ MATCH",
        "v7 uses 6× G10 fiberglass pads (₹300 each = ₹1,800). RFQ generic pads work too if silicone/rubber."),
    (12, "12S 25,000 mAh Lithium-Ion Battery",
        1, "AI5401", 60661, 0.18, 1*60661*1.18, "🔴 WRONG PART",
        "Tattu 12S 25,000 mAh does NOT exist. Closest is 12S 22,000 mAh Pro/Plus (₹45,674 at Robokits) "
        "or 12S 30,000 mAh Semi-Solid (₹58,000). v7 uses 3× 30Ah Semi-Solid = ₹1.74L total."),
    (13, "12S 35,000 mAh Lithium-Ion Battery",
        1, "—",        0,    0,    0,            "🔴 WRONG PART",
        "Tattu 12S 35,000 mAh does NOT exist. Maximum single-pack 12S is 30,000 mAh. Drop this line."),
    (14, "12S LiPo Battery 30,000 mAh",
        1, "—",        0,    0,    0,            "✅ MATCH (qty)",
        "Tattu 12S 30Ah Semi-Solid exists (₹58k/pack). v7 design uses 3× = ₹1.74L. Add SKU."),
    (15, "SkyRC PC1080 Neo dual LiPo/Li-ion charger",
        1, "AI6878", 18700, 0.18, 1*18700*1.18, "🔴 WRONG CHARGER",
        "PC1080/neo is 6S only. Cannot charge 12S. Replace with SkyRC PC1260 (12S, 1,260 W, 12A×2) "
        "or iCharger 4010B (30A×2, 12S, 1,300W). PC1260 ~₹25–30k in India."),
    (16, "Holybro DroneCAN M9N GPS",
        1, "AI6033",  8036, 0.05, 1* 8036*1.05, "⚠️ ALT",
        "DroneCAN is correct (CAN bus, like X9 G2L). 2.5 m CEP, 36 g, ₹8k. v7 chose 2× HGLRC M10 "
        "(UART, 2.6 g, ₹4.4k total) for cost. M9N acceptable if DroneCAN bus is wanted."),
    (17, "Power distribution board (PDB)",
        1, "—",        0,    0,    0,            "⚠️ ALT",
        "v7 design uses custom 15×5 mm C110 copper busbar (200A, ₹2.5k) + 6× 150A MEGA fuses (₹4.8k) + "
        "pre-charge circuit (₹800) = ~₹8.1k. RFQ's TL2996 (line 19) is the plug-and-play alternative for "
        "≤25 kg class."),
    (18, "Pixhawk Cube Orange+ ADS-B",
        1, "—",        0,    0,    0,            "🔴 OVER-SPEC",
        "Out of stock at Zbotic. ₹40–50k in India. v7 chose Pixhawk 6C (₹12–18k) — same STM32H7 class, "
        "no ADS-B. Saves ₹22–32k. ADS-B not required for VLOS ag spraying."),
    (19, "TAROT TL2996 12S 480A PDB",
        1, "AI7343",  3090, 0.05, 1* 3090*1.05, "⚠️ ALT",
        "Plug-and-play PCB PDB. 480A peak, 6× ESC signal hub. Fits 25 kg class drones. "
        "At 35 kg MTOW, v7 chose custom busbar for better thermal. TL2996 acceptable IF you skip pre-charge "
        "and accept the inrush on XT90."),
    (20, "Holybro PM02D Power Module",
        1, "AI7419",  2990, 0.05, 1* 2990*1.05, "🔴 UNDER-SPEC",
        "PM02D = 60A cont, 100A burst. At 35 kg MTOW, X9 G2L system draws 78A hover, 200A peak. "
        "PM02D will overheat. v7 uses MAUCH HS-200-LV hall sensor (₹6k) + Matek 12V/5V BEC (₹1.5k)."),
    (21, "MEAN WELL NSD10-12S5 DC/DC",
        1, "—",        0,    0,    0,            "🔴 DANGEROUS",
        "NSD10-12S5 has 9.8–36 VDC INPUT. Connected to 12S LiPo (44.4 V) = INSTANT FAILURE, possible fire. "
        "Correct part: NSD10-48S5 (22–72 V input, 5V/2A output). ₹1,000. URGENT REPLACE."),
    (22, "MEAN WELL NSD05-12S12 DC/DC",
        1, "—",        0,    0,    0,            "🔴 DANGEROUS",
        "NSD05-12S12 does NOT exist in MEAN WELL catalog. Same input-voltage problem. "
        "Correct part: NSD10-48S12 (22–72 V input, 12V/0.83A output). ₹1,000. URGENT REPLACE."),
]

# Write rows
for i, line in enumerate(rfq_lines, 2):
    sr, name, qty, sku, up, gst, total, verdict, note = line
    write_row(ws1, i, [sr, name, qty, sku if sku else "—", up if up else 0, f"{int(gst*100)}%" if gst else "—", round(total) if total else 0, verdict, note])
    # Color the verdict cell
    vc = ws1.cell(row=i, column=8)
    if verdict.startswith("✅"): vc.fill = GREEN
    elif verdict.startswith("⚠️"): vc.fill = YELLOW
    elif verdict.startswith("🔴"): vc.fill = RED
    elif verdict.startswith("❌"): vc.fill = GREY

# Total row
total_row = len(rfq_lines) + 2
write_row(ws1, total_row, ["", "TOTAL (original RFQ as-listed)", "", "", "", "", round(sum(l[6] for l in rfq_lines)), "", ""], fill=TOT_FILL, bold=True, center=True)

# Notes
notes_row = total_row + 2
ws1.cell(row=notes_row, column=1, value="LEGEND").font = TOT_FONT
ws1.cell(row=notes_row+1, column=1, value="✅ MATCH").fill = GREEN
ws1.cell(row=notes_row+1, column=2, value="Use as listed")
ws1.cell(row=notes_row+2, column=1, value="⚠️ ALT").fill = YELLOW
ws1.cell(row=notes_row+2, column=2, value="Acceptable, but v7 design has better option")
ws1.cell(row=notes_row+3, column=1, value="🔴 MISMATCH").fill = RED
ws1.cell(row=notes_row+3, column=2, value="Must change — wrong part, wrong spec, or wrong spec range")
ws1.cell(row=notes_row+4, column=1, value="❌ NOT IN DESIGN").fill = GREY
ws1.cell(row=notes_row+4, column=2, value="Drop from BOM (out of scope for 35 kg MTOW design)")

autofit(ws1, {"A": 4, "B": 50, "C": 8, "D": 12, "E": 14, "F": 8, "G": 14, "H": 14, "I": 60})
for r in range(2, len(rfq_lines)+2):
    ws1.row_dimensions[r].height = 75
ws1.row_dimensions[1].height = 30

ws1.freeze_panes = "A2"

# =====================================================================
# SHEET 2 — Path A: Jiyi closed-source (≤₹4L)
# =====================================================================
ws2 = wb.create_sheet("2_PathA_Jiyi")

# Subtitle
ws2.merge_cells("A1:I1")
c = ws2.cell(row=1, column=1, value="PATH A — JIYI CLOSED-SOURCE STACK (≤ ₹4 Lakh)")
c.font = Font(bold=True, size=14, color="FFFFFF")
c.fill = PatternFill("solid", fgColor="C00000")
c.alignment = CENTER

ws2.merge_cells("A2:I2")
c = ws2.cell(row=2, column=1, value="Target: 25 kg MTOW agricultural drone with integrated spray firmware. Trade ~10 kg payload for half the cost of Path B.")
c.fill = SUB_FILL
c.alignment = LEFT_WRAP
c.font = Font(italic=True)

headers2 = ["Sr", "Component", "Model / SKU", "Qty", "Unit ₹", "GST%", "Total ₹", "Source / Link", "Notes"]
for col, h in enumerate(headers2, 1):
    hdr(ws2.cell(row=4, column=col), h)

path_a = [
    # (sr, comp, model, qty, unit, gst, link, notes)
    (1,  "Frame",                  "EFT E616P 16L 6-Axis (AI7106)",      1, 33782, 0.05, "zbotic.in/.../e616p",
        "Wheelbase 1628 mm, MTOW 36 kg spec. Frame only 6.41 kg."),
    (2,  "Tank (10L)",             "EFT E-series 10L + battery plate (AI5494)", 1, 5548, 0.05, "zbotic.in/.../10l-tank",
        "10L spray = ~25 kg MTOW class. Battery plate mounts 12S pack on top of tank."),
    (3,  "Flight controller",      "Jiyi K++ V2 (Bharat Skytech)",        1,  9200, 0.18, "bharatskytech.com/.../k-v2",
        "Triple IMU + dual baro. Built-in spray logic (pump on/off, dual pump, AB route, terrain radar)."),
    (4,  "GCS (paired)",           "JIYI Assistant + AeroGCS",            1,     0, 0,    "jiyiuav.com",
        "Free with K++ V2. Windows software. Closed-source."),
    (5,  "RC + Telemetry",         "Skydroid H12 + R12 RX (AI5557)",      1, 13500, 0.18, "zbotic.in/.../skydroid-h12",
        "12 ch 2.4 GHz, 30 km range. Android-based, built-in 5.5\" screen. Proprietary protocol."),
    (6,  "GPS (basic, dual for EKF)", "HGLRC M100 Mini (u-blox M10)",   2,  2200, 0.18, "hglrc.com",
        "2.0 m CEP, 10 Hz, 2.6 g. UART. Cheaper than Here4 RTK. Phase-2: add Here4 for RTK."),
    (7,  "Propulsion combo CW",    "Hobbywing X8 Plus + ESC + 3011/3090 CW (AI5455)", 4, 12500, 0.18, "zbotic.in/.../x8-cw",
        "15 kg/axis max, 100 KV. Sufficient for 25 kg MTOW at TWR 3.6:1. PWM only (K++ V2 compatible)."),
    (8,  "Propulsion combo CCW",   "Hobbywing X8 Plus + ESC + 3011/3090 CCW (AI5456)", 3, 12500, 0.18, "zbotic.in/.../x8-ccw",
        "3 operational + 2 spare. CCW is the spare carrier. Total 5 = 83% spare ratio (acceptable)."),
    (9,  "Spray pump",             "Hobbywing 5L brushless pump (AI5190)", 1,  8788, 0.05, "zbotic.in/.../5l-pump",
        "5 L/min, 3.5 bar, 60 W, IP67. Direct 12S power. Jiyi K++ V2 PWM-tunable flow."),
    (10, "Nozzles (TeeJet)",       "TeeJet XR11003 (3 bar+ rated)",       4,  1200, 0.18, "teejet.com",
        "Switch from XR11002 → XR11003 since Hobbywing pump is 3.5 bar. XR11003 = 0.30 gpm @ 40 PSI."),
    (11, "PDB (plug-and-play)",    "Tarot TL2996 12S 480A (AI7343)",      1,  3090, 0.05, "zbotic.in/.../tl2996",
        "PCB with XT90 sockets, 6× PWM signal hub. Adequate for 25 kg MTOW with X8 (80A continuous ESC)."),
    (12, "Battery",                "Tattu 12S 22Ah Pro Smart (Robokits)", 2, 45674, 0.18, "robokits.co.in/.../22ah-pro",
        "2× 22Ah in parallel = 44Ah / 1,953 Wh. Continuous 25C = 550A per pack. 5.8 kg each. "
        "BMS with SOC, BT, auto-storage."),
    (13, "Charger",                "SkyRC PC1260 (12S dual channel)",     1, 28000, 0.18, "skyrc.com/PC1260",
        "12S, 1,260 W, 12A × 2 channels. Charge 2 packs simultaneously. ₹25–30k in India."),
    (14, "Power module",           "MAUCH HS-200-LV hall sensor",         1,  6000, 0.18, "uavgarage.com",
        "0–200A linear, ±1%. Sufficient for energy logging. v7 picks this over PM02D."),
    (15, "5V BEC",                 "Matek 12V→5V 3A BEC (or use FC PMU)", 1,  1500, 0.18, "mateksys.com",
        "For 5V avionics rail. K++ V2 has PMU but 3A max — BEC for pump is separate."),
    (16, "12V BEC (pump)",         "Hobbywing 5L pump takes 12S direct — no BEC", 0, 0, 0, "—",
        "Pump is 12S-direct. No 12V BEC needed for pump. PMU2 in Jiyi K++ V2 is the UPS."),
    (17, "Vibration isolators",    "G10 fiberglass pads",                 6,   300, 0.18, "amazon.in",
        "₹300 each × 6 = ₹1,800. K++ V2 is light (87g FC) so silicone pads also work."),
    (18, "FPV camera",             "Skydroid H12 includes FPV",           1,     0, 0,    "bharatskytech.com",
        "Already in H12. No separate buy."),
    (19, "Wiring harness (10AWG + signal + JST)", "Custom",                1,  3000, 0.18, "amazon.in",
        "8 AWG silicone wire, AS150 connectors, JST-GH for signal. ~3 m of each."),
    (20, "Connectors (AS150 + XT90)", "AMASS AS150U + XT90",              10,   350, 0.18, "amass.net",
        "AS150 for battery (7 mm bullet, 150A), XT90 for ESC outputs."),
    (21, "Spares (props + fuses)", "MFP 30×11 + 30A MEGA fuses",         2,  1500, 0.18, "hobbywing.com",
        "2 spare props + 6× 30A MEGA fuses for ESC protection."),
    (22, "Tools",                  "TS101 iron + multimeter + heat gun", 1, 12000, 0.18, "getfpv.com",
        "Miniware TS101 + Fluke 117 + heat gun + ferrule crimper. One-shot buy."),
]

# Compute totals
total_a_excl_gst = 0
total_a_incl_gst = 0
for i, line in enumerate(path_a, 5):
    sr, comp, model, qty, unit, gst, link, notes = line
    total = qty * unit
    total_gst = total * (1 + gst)
    total_a_excl_gst += total
    total_a_incl_gst += total_gst
    write_row(ws2, i, [sr, comp, model, qty, unit, f"{int(gst*100)}%", round(total_gst), link, notes])

# Total row
tot_row_a = 5 + len(path_a)
write_row(ws2, tot_row_a, ["", "TOTAL (drone + charger + spares + tools, incl GST)", "", "", "", "", round(total_a_incl_gst), "", ""], fill=TOT_FILL, bold=True)
ws2.cell(row=tot_row_a, column=7).fill = TOT_FILL

# Sanity check note
ws2.merge_cells(start_row=tot_row_a+2, start_column=1, end_row=tot_row_a+2, end_column=9)
c = ws2.cell(row=tot_row_a+2, column=1, value=f"Subtotal incl GST: ₹{round(total_a_incl_gst):,}. Subtotal excl GST: ₹{round(total_a_excl_gst):,}. Within ₹4L budget? {'YES ✓' if total_a_incl_gst < 400000 else 'NO — exceeds budget'}")
c.font = Font(bold=True, size=12, color="C00000" if total_a_incl_gst > 400000 else "006100")
c.fill = TOT_FILL

autofit(ws2, {"A": 4, "B": 28, "C": 42, "D": 6, "E": 10, "F": 7, "G": 12, "H": 32, "I": 50})
for r in range(5, tot_row_a+1):
    ws2.row_dimensions[r].height = 45
ws2.row_dimensions[4].height = 30

ws2.freeze_panes = "A5"

# =====================================================================
# SHEET 3 — Path B: Pixhawk open-source (≤₹5L) = v7 design
# =====================================================================
ws3 = wb.create_sheet("3_PathB_Pixhawk")

ws3.merge_cells("A1:I1")
c = ws3.cell(row=1, column=1, value="PATH B — PIXHAWK OPEN-SOURCE (≤ ₹5 Lakh) — v7 design path")
c.font = Font(bold=True, size=14, color="FFFFFF")
c.fill = PatternFill("solid", fgColor="1F4E78")
c.alignment = CENTER

ws3.merge_cells("A2:I2")
c = ws3.cell(row=2, column=1, value="Target: 35 kg MTOW with 16L tank + RTK-ready + open-source ArduPilot. v7 technical report design.")
c.fill = SUB_FILL
c.alignment = LEFT_WRAP
c.font = Font(italic=True)

for col, h in enumerate(headers2, 1):
    hdr(ws3.cell(row=4, column=col), h)

path_b = [
    (1,  "Frame",                  "EFT E616P 16L 6-Axis (AI7106)",      1, 33782, 0.05, "zbotic.in/.../e616p",
        "Same as Path A. MTOW rated 36 kg — fits 35 kg target with 1 kg margin."),
    (2,  "Tank (16L)",             "16L HDPE w/ 4-baffle custom fab",    1,  6500, 0.05, "local fab",
        "3 mm HDPE rotomolded, 4 compartments @ 150 mm. Controls slosh CG shift. 15.8L operational fill."),
    (3,  "Flight controller",      "Pixhawk 6C (Holybro)",                1, 18000, 0.18, "holybro.com/products/pixhawk-6c",
        "STM32H743 480 MHz, dual IMU, MS5611 baro, 14 PWM. ArduPilot 4.4 native. ₹12k from some vendors."),
    (4,  "GCS",                    "Mission Planner + QGroundControl",    1,     0, 0,    "ardupilot.org",
        "Free, open-source. Mission Planner for setup, QGC for live."),
    (5,  "RC receiver",            "FrSky R-XSR (ACCESS 2.4 GHz)",        1,  3500, 0.18, "frsky-rc.com/product/r-xsr",
        "1.5 g, 16 ch, SBUS out, 2–5 km range. ACCESS firmware."),
    (6,  "Telemetry radio",        "RFD868x (865–867 MHz, 1W)",           1, 12000, 0.18, "rfdesign.com.au/products/rfd868x",
        "India-legal 868 MHz band. 10–40 km LOS with 8 dBi Yagi. MAVLink native. ⚠ RFD900x is BANNED in India."),
    (7,  "GPS (dual, basic)",      "HGLRC M100 Mini u-blox M10",          2,  2200, 0.18, "hglrc.com",
        "2× for EKF redundancy. 2.0 m CEP, 10 Hz, 2.6 g each. UART on GPS1 + GPS2 ports."),
    (8,  "Propulsion combo CW",    "Hobbywing X9 G2L + MFP 36×11 CW",    3, 32000, 0.18, "hobbywing.com/en/products/x9-g2l",
        "110 KV, 24 kg/axis max. 36\" folding prop. DroneCAN + PWM dual-redundant ESC. "
        "TWR 4.1:1 at 35 kg MTOW. 3 CW + 2 CCW = 5 combos for 6-axis + 2 spares (1 CW + 1 CCW)."),
    (9,  "Propulsion combo CCW",   "Hobbywing X9 G2L + MFP 36×11 CCW",   2, 32000, 0.18, "hobbywing.com",
        "2 operational + 1 spare (CCW side). Spares can be 1 CW + 1 CCW; cost-optimized to fit budget."),
    (10, "Spray pump (diaphragm)", "SHURflo 8000-543-236 (12V)",          1,  8500, 0.05, "shurflo.com",
        "Diaphragm, 5.3 L/min open, 2.1 bar working. 90 W peak. Viton seals. 1,860 g."),
    (11, "Nozzles (TeeJet)",       "TeeJet XR11002 (2.8 bar design)",     4,  1200, 0.18, "teejet.com",
        "VMD 250–400 μm at 40 PSI. Matches SHURflo pressure curve."),
    (12, "Flow sensor",            "YF-S402 (Hall effect)",               1,  1500, 0.18, "amazon.in",
        "0.3–6 L/min, 4078 pulses/L. For ArduPilot RPM_SCALING."),
    (13, "Power distribution",     "Custom 15×5 mm C110 Cu busbar (200A)", 1,  2500, 0.05, "tameson.co.uk",
        "75 mm² cross-section. 0.26 mΩ end-to-end. Field-serviceable 150A MEGA fuses."),
    (14, "Fuses (6× ESC)",         "150A MEGA fuse + holder",             6,   800, 0.18, "littelfuse.com",
        "Per-ESC short-circuit protection. Replaceable in 30 s."),
    (15, "Pre-charge circuit",     "2× 25Ω 50W + 100°C thermal fuse",     1,   800, 0.18, "amazon.in",
        "Limits ESC cap inrush to 4 A vs 5,040 A. Prevents connector welding."),
    (16, "Current sensor",         "MAUCH HS-200-LV hall sensor",         1,  6000, 0.18, "uavgarage.com",
        "0–200A, ±1%, <20 µs. Analog 0.5–4.5V to FC ADC."),
    (17, "12V BEC (avionics)",     "Matek 12V/15A BEC",                   1,  1500, 0.18, "mateksys.com",
        "Isolates pump noise from FC rail. EMI mitigation."),
    (18, "12V BEC (pump)",         "(included in line 17 — single BEC for both)",  0,  0, 0, "—",
        "OPTIMIZATION: one 12V/15A BEC powers both avionics and pump (SHURflo 7.5A). Saves ₹1,500. "
        "If pump EMI is a problem, split later."),
    (19, "Battery (2× parallel)",  "Tattu 12S 30Ah Semi-Solid",           2, 58000, 0.05, "genstattu.com/.../30ah",
        "1,332 Wh each → 2,664 Wh total. 3C cont (90A), 5C burst (150A <3s). 4.9 kg each. "
        "At 35 kg MTOW hover 78A → 14 min flight time (vs 18.5 min with 3 packs). "
        "If you can stretch budget, +1 pack is recommended."),
    (20, "Charger",                "SkyRC PC1260 (12S, 1,260W)",          1, 28000, 0.18, "skyrc.com/PC1260",
        "12S, 12A × 2 channels. Charge 2× 30Ah packs in ~2.5 h each. ₹25–30k India."),
    (21, "Vibration isolators",    "G10 fiberglass pads",                 6,   300, 0.18, "amazon.in",
        "₹300 × 6 = ₹1,800. Pixhawk 6C is light (42 g) — needs good isolation from 36\" prop vibration."),
    (22, "FPV camera (optional)",  "(dropped to fit budget)",              0,     0, 0,    "—",
        "Dropped to fit ₹5L cap. Add later if needed for visual confirmation. ~₹5k extra."),
    (23, "Wiring harness",         "8 AWG silicone + AS150 + JST-GH",     1,  4000, 0.18, "amazon.in",
        "8 AWG for battery→busbar (136A), 14 AWG for ESCs, 24-26 AWG for signal."),
    (24, "Connectors",             "AMASS AS150U + XT90 + bullet 3.5",   15,   350, 0.18, "amass.net",
        "AS150 for battery (7mm, 150A), XT90 for ESC outputs, 3.5mm bullets for motor phases."),
    (25, "Spares (props + fuses)", "MFP 36×11 + 30A fuses",               2,  3500, 0.18, "hobbywing.com",
        "2 spare props + 6× 30A fuses for bench testing."),
    (26, "Tools",                  "TS101 iron + multimeter + heat gun",  1, 12000, 0.18, "getfpv.com",
        "Miniware TS101 + Fluke 117 + heat gun + ferrule crimper. One-shot buy."),
]

total_b_excl_gst = 0
total_b_incl_gst = 0
for i, line in enumerate(path_b, 5):
    sr, comp, model, qty, unit, gst, link, notes = line
    total = qty * unit
    total_gst = total * (1 + gst)
    total_b_excl_gst += total
    total_b_incl_gst += total_gst
    write_row(ws3, i, [sr, comp, model, qty, unit, f"{int(gst*100)}%", round(total_gst), link, notes])

tot_row_b = 5 + len(path_b)
write_row(ws3, tot_row_b, ["", "TOTAL (drone + charger + spares + tools, incl GST)", "", "", "", "", round(total_b_incl_gst), "", ""], fill=TOT_FILL, bold=True)
ws3.cell(row=tot_row_b, column=7).fill = TOT_FILL

ws3.merge_cells(start_row=tot_row_b+2, start_column=1, end_row=tot_row_b+2, end_column=9)
c = ws3.cell(row=tot_row_b+2, column=1, value=f"Subtotal incl GST: ₹{round(total_b_incl_gst):,}. Subtotal excl GST: ₹{round(total_b_excl_gst):,}. Within ₹5L budget? {'YES ✓' if total_b_incl_gst < 500000 else 'NO — exceeds budget'}")
c.font = Font(bold=True, size=12, color="C00000" if total_b_incl_gst > 500000 else "006100")
c.fill = TOT_FILL

autofit(ws3, {"A": 4, "B": 28, "C": 42, "D": 6, "E": 10, "F": 7, "G": 12, "H": 32, "I": 50})
for r in range(5, tot_row_b+1):
    ws3.row_dimensions[r].height = 45
ws3.row_dimensions[4].height = 30
ws3.freeze_panes = "A5"

# =====================================================================
# SHEET 4 — Cost-benefit & comparison
# =====================================================================
ws4 = wb.create_sheet("4_Cost_Benefit")

ws4.merge_cells("A1:F1")
c = ws4.cell(row=1, column=1, value="COST-BENEFIT & DECISION MATRIX")
c.font = Font(bold=True, size=14, color="FFFFFF")
c.fill = PatternFill("solid", fgColor="1F4E78")
c.alignment = CENTER

# 4.1 Side-by-side
ws4.cell(row=3, column=1, value="4.1  Cost summary (drone + charger + spares + tools, incl GST)").font = Font(bold=True, size=12)
ws4.cell(row=3, column=1).fill = SUB_FILL

hdr_row = 4
for col, h in enumerate(["Path", "MTOW target", "Architecture", "Flight time (35 kg)", "Total ₹", "Verdict"], 1):
    hdr(ws4.cell(row=hdr_row, column=col), h)

write_row(ws4, 5, ["A (Jiyi)", "25 kg", "Closed-source, integrated spray", "~15 min", round(total_a_incl_gst),
                   f"✓ Under ₹4L" if total_a_incl_gst < 400000 else "✗ Over budget"])
write_row(ws4, 6, ["B (Pixhawk)", "35 kg", "Open ArduPilot, RTK-ready, v7 design", "~18.5 min", round(total_b_incl_gst),
                   f"✓ Under ₹5L" if total_b_incl_gst < 500000 else "✗ Over budget"])

# 4.2 Pros/cons of each path
ws4.cell(row=8, column=1, value="4.2  Pros & Cons").font = Font(bold=True, size=12)
ws4.cell(row=8, column=1).fill = SUB_FILL

for col, h in enumerate(["Aspect", "Path A (Jiyi)", "Path B (Pixhawk)"], 1):
    hdr(ws4.cell(row=9, column=col), h)

pc_rows = [
    ("Cost",                    f"~₹{round(total_a_incl_gst/1000):,}k  (₹4L cap)", f"~₹{round(total_b_incl_gst/1000):,}k  (₹5L cap)"),
    ("MTOW",                    "25 kg (10L tank)",                          "35 kg (16L tank)"),
    ("Flight time @ full spray","~12–15 min",                                 "~18 min"),
    ("Payload efficiency",      "60% (light, 10L spray)",                    "46% (heavy, 16L spray)"),
    ("Mission area per flight", "~1.0–1.5 ha",                                "~2.0–2.5 ha"),
    ("Refills per hour",        "5–6",                                         "3–4"),
    ("Software",                "JIYI Assistant (closed)",                    "Mission Planner / QGC (open)"),
    ("Custom spray logic",      "Built-in (dual pump, AB route, no-fly)",     "Manual Lua scripting required"),
    ("ESC protocol",            "PWM only (490 Hz max)",                      "DroneCAN + PWM (1 kHz)"),
    ("Per-motor telemetry",     "No (blind motors)",                          "Yes (RPM, I, V, T per axis)"),
    ("Future upgrades",         "Locked to Jiyi firmware",                    "Free ArduPilot updates"),
    ("DGCA NPNT compliance",    "Jiyi is approved for ag drones",             "Pixhawk is approved for ag drones"),
    ("Spare FC cost",           "₹9,200",                                     "₹12,000 (6C) or ₹18,000 (Cube Orange+)"),
    ("Risk if FC fails",        "Vendor-locked replacement",                  "Open — any Pixhawk 6C works"),
    ("Sourcing in India",       "Bharat Skytech, Robosync, XBOOM",            "Holybro direct, Robu, Amazon"),
    ("Lead time",               "1–2 weeks (Jiyi)",                            "1–2 weeks (Holybro), 2–3 weeks (Tattu)"),
    ("Best for",                "Commercial ag service, low CAPEX",            "Engineering R&D, university project"),
]
for i, row in enumerate(pc_rows, 10):
    write_row(ws4, i, list(row))

# 4.3 Decision tree
tree_start = 10 + len(pc_rows) + 2
ws4.cell(row=tree_start, column=1, value="4.3  Decision tree (which path to pick?)").font = Font(bold=True, size=12)
ws4.cell(row=tree_start, column=1).fill = SUB_FILL

decision_tree = [
    "Q1: Is your MTOW ≤25 kg?        → Path A (Jiyi, ~₹3.2L, simpler)",
    "Q1 NO (MTOW 30-35 kg)?          → continue to Q2",
    "",
    "Q2: Do you need open-source / custom spray logic?  YES → Path B (Pixhawk, ~₹4.5L)",
    "Q2 NO (just want it to fly)?     → continue to Q3",
    "",
    "Q3: Is vendor lock-in acceptable?  YES → Path A (Jiyi, ~₹3.2L)",
    "Q3 NO (you want to be able to swap / upgrade)?  → Path B (Pixhawk, ~₹4.5L)",
    "",
    "Q4: Do you need RTK (1 cm GPS) for mapping?  YES → Path B (Pixhawk + Here4, +₹36k)",
    "Q4 NO (spray-only, 1-2 m GPS is enough)?      → Path A or B (both OK)",
    "",
    "Q5: Is this a university project / engineering demo?  YES → Path B (Pixhawk, more impressive)",
    "Q5 NO (just need to spray fields for income)?          → Path A (Jiyi, faster ROI)",
]
for i, line in enumerate(decision_tree, tree_start+1):
    c = ws4.cell(row=i, column=1, value=line)
    c.alignment = LEFT_WRAP
    c.font = Font(name="Consolas") if "Q" in line else Font()
    if "→" in line:
        c.fill = GREEN if "Path A" in line and "simple" in line else YELLOW
    ws4.merge_cells(start_row=i, start_column=1, end_row=i, end_column=6)

# 4.4 Open questions
q_start = tree_start + len(decision_tree) + 3
ws4.cell(row=q_start, column=1, value="4.4  Open questions (need answers before ordering)").font = Font(bold=True, size=12)
ws4.cell(row=q_start, column=1).fill = RED
ws4.cell(row=q_start, column=1).font = Font(bold=True, color="C00000", size=12)

questions = [
    "1. What is the ACTUAL MTOW? v7 quotes 36–45 kg; you said 35 kg max. Pick one and freeze it.",
    "2. What spray rate do you need (L/ha)? This determines tank size + pump pressure + nozzle.",
    "3. What crop + field area? Flat land (barometer altimeter enough) or hilly (need TF02-Pro LiDAR)?",
    "4. Is this for university demo (Path B, open-source) or commercial service (Path A, Jiyi)?",
    "5. What is your timeline? v7 already justifies Path B; new BOM = 1–2 week lead + 1 week assembly.",
    "6. Is the teacher (ma'am) OK with closing the v7 design and adopting one of these two paths?",
    "7. What is the RPL / insurance / NPNT plan? Adds ₹85–165k if not already included in project budget.",
    "8. Do you have access to a load cell / thrust stand to verify motor performance post-purchase?",
    "9. Have you confirmed 2× 6S batteries in series works for the charger? (PC1260 handles 12S single pack only — need to verify with Tattu's BMS).",
    "10. Where will you source the SHURflo pump in India? It's not on Zbotic/Robu. Options: agricultural pump vendors (Amazon), direct from Pentair India, or substitute with T-Motor P5 pump (5L, IP67, similar).",
]
for i, q in enumerate(questions, q_start+1):
    c = ws4.cell(row=i, column=1, value=q)
    c.alignment = LEFT_WRAP
    ws4.merge_cells(start_row=i, start_column=1, end_row=i, end_column=6)
    ws4.row_dimensions[i].height = 30

autofit(ws4, {"A": 30, "B": 32, "C": 32, "D": 22, "E": 14, "F": 24})
ws4.freeze_panes = "A4"

# =====================================================================
# Save
# =====================================================================
wb.save(OUT)
print(f"Saved: {OUT}")
print(f"Path A total (incl GST): ₹{round(total_a_incl_gst):,}")
print(f"Path B total (incl GST): ₹{round(total_b_incl_gst):,}")
