#!/usr/bin/env python3
"""Generate educational diagrams for the drone project."""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.patheffects as pe
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np
import os

OUTPUT_DIR = "/mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12

# ──────────────────────────────────────────────────────────────────────────────
# 1. NDVI SPECTRUM DIAGRAM
# ──────────────────────────────────────────────────────────────────────────────
def create_ndvi_spectrum():
    fig, ax = plt.subplots(figsize=(14, 7))

    wavelengths = np.linspace(400, 1000, 600)

    # Vegetation reflectance curve (simplified)
    # Low in red (chlorophyll absorption), high in NIR (mesophyll scattering)
    reflectance = np.zeros_like(wavelengths)
    for i, w in enumerate(wavelengths):
        if w < 500:
            reflectance[i] = 0.05 + 0.1 * np.exp(-((w - 550) ** 2) / 2000)
        elif w < 600:
            reflectance[i] = 0.05 + 0.15 * np.exp(-((w - 550) ** 2) / 1500)
        elif w < 700:
            reflectance[i] = 0.04 + 0.02 * np.exp(-((w - 660) ** 2) / 200)
        elif w < 750:
            reflectance[i] = 0.04 + 0.5 * (w - 700) / 50
        else:
            reflectance[i] = 0.55 + 0.05 * np.sin((w - 750) / 30)

    # Background gradient showing spectrum
    spectrum_colors = []
    for w in wavelengths:
        if w < 450:
            spectrum_colors.append((0.3, 0.0, 0.6))
        elif w < 495:
            spectrum_colors.append((0.0, 0.0, 1.0))
        elif w < 570:
            spectrum_colors.append((0.0, 0.8, 0.0))
        elif w < 590:
            spectrum_colors.append((1.0, 1.0, 0.0))
        elif w < 620:
            spectrum_colors.append((1.0, 0.5, 0.0))
        elif w < 750:
            spectrum_colors.append((1.0, 0.0, 0.0))
        else:
            spectrum_colors.append((0.5, 0.0, 0.0))

    for i in range(len(wavelengths) - 1):
        ax.axvspan(wavelengths[i], wavelengths[i + 1], alpha=0.08,
                   color=spectrum_colors[i])

    # Plot reflectance curve
    ax.plot(wavelengths, reflectance * 100, color='#2d5a27', linewidth=2.5,
            label='Vegetation Reflectance', zorder=5)
    ax.fill_between(wavelengths, reflectance * 100, alpha=0.15, color='#4a8c3f')

    # Highlight Red band (660nm)
    ax.axvspan(645, 675, alpha=0.3, color='#ff4444', zorder=2)
    ax.annotate('RED Band\n(645–675 nm)', xy=(660, 85), fontsize=11,
                fontweight='bold', color='#cc0000', ha='center',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#ffe0e0', edgecolor='#cc0000', alpha=0.9))

    # Highlight NIR band (800nm)
    ax.axvspan(780, 900, alpha=0.2, color='#8B4513', zorder=2)
    ax.annotate('NIR Band\n(780–900 nm)', xy=(840, 85), fontsize=11,
                fontweight='bold', color='#5a2d0c', ha='center',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0dcc8', edgecolor='#8B4513', alpha=0.9))

    # Chlorophyll absorption annotation
    ax.annotate('Chlorophyll\nabsorbs red light\nfor photosynthesis',
                xy=(660, 8), xytext=(530, 30),
                fontsize=9, color='#880000', ha='center',
                arrowprops=dict(arrowstyle='->', color='#cc0000', lw=1.5),
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#cc0000', alpha=0.8))

    # Mesophyll reflection annotation
    ax.annotate('Mesophyll layer\nstrongly reflects\nNIR light',
                xy=(820, 60), xytext=(920, 30),
                fontsize=9, color='#5a2d0c', ha='center',
                arrowprops=dict(arrowstyle='->', color='#8B4513', lw=1.5),
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#8B4513', alpha=0.8))

    # NDVI Formula box
    formula_text = r'$NDVI = \frac{NIR - Red}{NIR + Red}$'
    props = dict(boxstyle='round,pad=0.6', facecolor='#e8f5e9', edgecolor='#2d5a27', linewidth=2, alpha=0.95)
    ax.text(0.5, 0.92, formula_text, transform=ax.transAxes, fontsize=16,
            verticalalignment='center', horizontalalignment='center', bbox=props,
            fontweight='bold', color='#1a3a15')

    # NDVI value explanation
    ax.text(0.5, 0.82, 'Healthy vegetation: NDVI ≈ 0.6–0.9  |  Stressed: NDVI < 0.4  |  Bare soil: NDVI ≈ 0.1–0.2',
            transform=ax.transAxes, fontsize=9, ha='center', color='#333333',
            bbox=dict(boxstyle='round', facecolor='#f5f5f5', edgecolor='#999999', alpha=0.8))

    # Arrow showing NDVI bands
    ax.annotate('', xy=(660, 75), xytext=(820, 75),
                arrowprops=dict(arrowstyle='<->', color='#333333', lw=2))
    ax.text(740, 78, 'NDVI uses these two bands', fontsize=8, ha='center',
            color='#333333', style='italic')

    ax.set_xlim(400, 1000)
    ax.set_ylim(0, 95)
    ax.set_xlabel('Wavelength (nm)', fontweight='bold')
    ax.set_ylabel('Reflectance (%)', fontweight='bold')
    ax.set_title('NDVI Spectrum — Electromagnetic Band Analysis for Vegetation Health',
                 fontweight='bold', fontsize=14, pad=20)
    ax.set_xticks([400, 450, 500, 550, 600, 660, 700, 750, 800, 850, 900, 950, 1000])
    ax.grid(True, alpha=0.3, linestyle='--')

    # Legend
    red_patch = mpatches.Patch(color='#ff4444', alpha=0.3, label='Red Band (660nm) — Absorbed by chlorophyll')
    nir_patch = mpatches.Patch(color='#8B4513', alpha=0.3, label='NIR Band (800nm) — Reflected by mesophyll')
    veg_line = plt.Line2D([0], [0], color='#2d5a27', linewidth=2.5, label='Vegetation Reflectance Curve')
    ax.legend(handles=[veg_line, red_patch, nir_patch], loc='lower right', fontsize=9,
              framealpha=0.9, edgecolor='#cccccc')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'ndvi_spectrum.png'), dpi=180, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created ndvi_spectrum.png")


# ──────────────────────────────────────────────────────────────────────────────
# 2. DRONE SYSTEM ARCHITECTURE
# ──────────────────────────────────────────────────────────────────────────────
def create_system_architecture():
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 10)
    ax.axis('off')

    def draw_box(x, y, w, h, label, color, fontsize=9, sublabel=None, textcolor='white'):
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.15",
                             facecolor=color, edgecolor='#333333', linewidth=1.5)
        ax.add_patch(box)
        if sublabel:
            ax.text(x + w / 2, y + h / 2 + 0.15, label, ha='center', va='center',
                    fontsize=fontsize, fontweight='bold', color=textcolor)
            ax.text(x + w / 2, y + h / 2 - 0.2, sublabel, ha='center', va='center',
                    fontsize=7, color=textcolor, alpha=0.85)
        else:
            ax.text(x + w / 2, y + h / 2, label, ha='center', va='center',
                    fontsize=fontsize, fontweight='bold', color=textcolor)

    def arrow(x1, y1, x2, y2, color='#333333', style='->', lw=1.8):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle=style, color=color, lw=lw))

    def double_arrow(x1, y1, x2, y2, color='#333333', lw=1.8):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle='<->', color=color, lw=lw))

    # Title
    ax.text(8, 9.6, 'AGRICULTURAL HEXACOPTER — SYSTEM ARCHITECTURE',
            ha='center', fontsize=16, fontweight='bold', color='#1a237e')

    # ── SENSORS (top-left) ──
    ax.add_patch(FancyBboxPatch((0.3, 7.8), 3.5, 1.5, boxstyle="round,pad=0.1",
                                facecolor='#e3f2fd', edgecolor='#1565c0', linewidth=1.5, linestyle='--'))
    ax.text(2.05, 9.0, 'SENSORS', ha='center', fontsize=10, fontweight='bold', color='#1565c0')

    draw_box(0.5, 8.1, 1.3, 0.55, 'Camera', '#42a5f5', 9, 'RGB + NIR')
    draw_box(2.2, 8.1, 1.3, 0.55, 'GPS/RTK', '#42a5f5', 9, '2cm accuracy')

    # ── EDGE COMPUTING (top-center) ──
    draw_box(4.5, 8.2, 2.0, 0.8, 'Jetson Orin Nano', '#7b1fa2', 10, 'NDVI Compute')

    # ── FLIGHT CONTROLLER (center) ──
    draw_box(6.5, 5.0, 2.8, 1.2, 'Pixhawk 6C', '#c62828', 12, 'ArduPilot\nFlight Controller', '#ffffff')

    # ── DECISION (top-right) ──
    draw_box(8.0, 8.2, 2.0, 0.8, 'Spray Decision', '#e65100', 10, 'NDVI Threshold')

    # ── ACTUATORS (right) ──
    ax.add_patch(FancyBboxPatch((11.0, 6.8), 4.5, 2.8, boxstyle="round,pad=0.1",
                                facecolor='#fce4ec', edgecolor='#c62828', linewidth=1.5, linestyle='--'))
    ax.text(13.25, 9.3, 'ACTUATION', ha='center', fontsize=10, fontweight='bold', color='#c62828')

    draw_box(11.2, 8.3, 1.8, 0.7, '6× ESCs', '#ef5350', 9, 'BLHeli_32')
    draw_box(11.2, 7.3, 1.8, 0.7, '6× Motors', '#ef5350', 9, '700kV')
    draw_box(13.3, 8.3, 1.8, 0.7, 'Pump', '#ff7043', 9, '12V Diaphragm')
    draw_box(13.3, 7.3, 1.8, 0.7, 'Nozzles ×4', '#ff7043', 9, 'TeeJet 110°')

    # ── COMMUNICATION (left) ──
    ax.add_patch(FancyBboxPatch((0.3, 3.3), 3.0, 2.2, boxstyle="round,pad=0.1",
                                facecolor='#e8f5e9', edgecolor='#2e7d32', linewidth=1.5, linestyle='--'))
    ax.text(1.8, 5.25, 'COMMUNICATION', ha='center', fontsize=10, fontweight='bold', color='#2e7d32')

    draw_box(0.5, 4.2, 1.2, 0.65, 'Telemetry', '#66bb6a', 9, '900MHz')
    draw_box(2.0, 4.2, 1.1, 0.65, 'RC Rx', '#66bb6a', 9, 'ELRS')
    draw_box(0.5, 3.4, 2.6, 0.6, 'GPS + Compass', '#66bb6a', 9, 'M10 + IST8310')

    # ── POWER SYSTEM (bottom) ──
    ax.add_patch(FancyBboxPatch((4.0, 0.3), 8.0, 2.0, boxstyle="round,pad=0.1",
                                facecolor='#fff8e1', edgecolor='#f57f17', linewidth=1.5, linestyle='--'))
    ax.text(8.0, 2.1, 'POWER SYSTEM', ha='center', fontsize=10, fontweight='bold', color='#f57f17')

    draw_box(4.3, 0.6, 2.0, 1.1, 'LiPo 6S\n22000mAh', '#ffb74d', 10, '', '#333333')
    draw_box(6.8, 0.6, 1.8, 1.1, 'PDB', '#ffb74d', 10, 'Power Dist.', '#333333')
    draw_box(9.1, 0.6, 1.8, 1.1, 'BEC 5V/12V', '#ffb74d', 10, 'Voltage Reg.', '#333333')

    # ── ARROWS ──
    # Camera → Jetson
    arrow(1.85, 8.48, 4.5, 8.6, '#1565c0')
    # GPS → FC
    arrow(1.8, 3.4, 7.0, 5.0, '#2e7d32')
    # Telemetry → FC
    arrow(1.1, 4.2, 6.5, 5.5, '#2e7d32')
    # RC → FC
    arrow(2.55, 4.53, 6.5, 5.3, '#2e7d32')
    # Jetson → Spray Decision
    arrow(6.5, 8.6, 8.0, 8.6, '#7b1fa2')
    # Jetson → FC
    arrow(5.5, 8.2, 7.0, 6.2, '#7b1fa2')
    # FC → ESCs
    arrow(9.3, 5.9, 11.2, 8.65, '#c62828')
    # FC → Pump
    arrow(9.3, 5.3, 13.3, 8.65, '#c62828')
    # ESCs → Motors
    arrow(12.1, 8.3, 12.1, 8.0, '#ef5350')
    # PDB → FC
    arrow(7.7, 1.7, 7.5, 5.0, '#f57f17', lw=1.5)
    # PDB → ESCs
    arrow(8.6, 1.7, 11.5, 7.3, '#f57f17', lw=1.5)
    # Battery → PDB
    arrow(6.3, 1.15, 6.8, 1.15, '#f57f17', lw=1.5)
    # BEC → FC
    arrow(10.0, 1.7, 8.0, 5.0, '#f57f17', lw=1.5)
    # Spray Decision → Pump
    arrow(9.0, 8.2, 13.3, 8.65, '#e65100', lw=1.5)

    ax.set_title('')
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'system_architecture.png'), dpi=180,
                bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created system_architecture.png")


# ──────────────────────────────────────────────────────────────────────────────
# 3. THRUST-TO-WEIGHT RATIO VISUAL
# ──────────────────────────────────────────────────────────────────────────────
def create_thrust_twr():
    fig, axes = plt.subplots(1, 2, figsize=(14, 7), gridspec_kw={'width_ratios': [1, 1]})

    # ── Left panel: Bar chart ──
    ax = axes[0]
    weights = [36, 39.2, 45, 50]
    labels = ['36 kg\n(Minimum)', '39.2 kg\n(Design)', '45 kg\n(Overloaded)', '50 kg\n(Critical)']
    total_thrust = 6 * 8.5  # 6 motors × 8.5 kg each = 51 kg thrust

    twr_values = [total_thrust / w for w in weights]

    colors = []
    for twr in twr_values:
        if twr >= 3.0:
            colors.append('#4caf50')  # green - good
        elif twr >= 2.0:
            colors.append('#ffc107')  # yellow - caution
        else:
            colors.append('#f44336')  # red - danger

    bars = ax.bar(labels, twr_values, color=colors, edgecolor='#333333', linewidth=1.2, width=0.6)

    # Add TWR value labels on bars
    for bar, twr, w in zip(bars, twr_values, weights):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.05,
                f'{twr:.2f}', ha='center', va='bottom', fontsize=12, fontweight='bold')

    # Threshold lines
    ax.axhline(y=3.0, color='#4caf50', linestyle='--', linewidth=2, alpha=0.7, label='TWR = 3.0 (Good)')
    ax.axhline(y=2.0, color='#f44336', linestyle='--', linewidth=2, alpha=0.7, label='TWR = 2.0 (Minimum)')
    ax.axhline(y=1.0, color='#000000', linestyle='-', linewidth=1.5, alpha=0.5, label='TWR = 1.0 (Hover)')

    # Add safety zones
    ax.axhspan(0, 2.0, alpha=0.06, color='red')
    ax.axhspan(2.0, 3.0, alpha=0.06, color='yellow')
    ax.axhspan(3.0, 4.0, alpha=0.06, color='green')

    ax.set_ylim(0, 3.8)
    ax.set_ylabel('Thrust-to-Weight Ratio (TWR)', fontweight='bold')
    ax.set_title('TWR vs. All Motors Operating', fontweight='bold', fontsize=12)
    ax.legend(loc='upper right', fontsize=8, framealpha=0.9)
    ax.grid(True, axis='y', alpha=0.3, linestyle='--')

    # ── Right panel: Single motor failure comparison ──
    ax2 = axes[1]
    thrust_5motors = 5 * 8.5  # 42.5 kg with one motor failed
    twr_failed = [thrust_5motors / w for w in weights]

    colors_fail = []
    for twr in twr_failed:
        if twr >= 3.0:
            colors_fail.append('#4caf50')
        elif twr >= 2.0:
            colors_fail.append('#ffc107')
        else:
            colors_fail.append('#f44336')

    x = np.arange(len(labels))
    width = 0.35
    bars1 = ax2.bar(x - width / 2, twr_values, width, label='All 6 Motors',
                     color=colors, edgecolor='#333333', linewidth=1.2)
    bars2 = ax2.bar(x + width / 2, twr_failed, width, label='5 Motors (1 Failed)',
                     color=colors_fail, edgecolor='#333333', linewidth=1.2, hatch='//')

    ax2.axhline(y=3.0, color='#4caf50', linestyle='--', linewidth=2, alpha=0.7)
    ax2.axhline(y=2.0, color='#f44336', linestyle='--', linewidth=2, alpha=0.7)
    ax2.axhline(y=1.0, color='#000000', linestyle='-', linewidth=1.5, alpha=0.5)

    # Add value labels
    for bar in bars1:
        ax2.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.03,
                 f'{bar.get_height():.2f}', ha='center', va='bottom', fontsize=9, fontweight='bold')
    for bar in bars2:
        ax2.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.03,
                 f'{bar.get_height():.2f}', ha='center', va='bottom', fontsize=9, fontweight='bold')

    ax2.set_xticks(x)
    ax2.set_xticklabels(labels)
    ax2.set_ylim(0, 3.8)
    ax2.set_ylabel('Thrust-to-Weight Ratio (TWR)', fontweight='bold')
    ax2.set_title('TWR: Normal vs. Single Motor Failure', fontweight='bold', fontsize=12)
    ax2.legend(loc='upper right', fontsize=9, framealpha=0.9)
    ax2.grid(True, axis='y', alpha=0.3, linestyle='--')

    # Safety zone labels
    ax2.text(3.7, 2.5, 'DANGER', fontsize=8, color='#f44336', alpha=0.5, fontweight='bold', rotation=90, va='center')
    ax2.text(3.7, 1.0, 'FAIL', fontsize=8, color='#000000', alpha=0.5, fontweight='bold', rotation=90, va='center')

    fig.suptitle('Thrust-to-Weight Ratio Analysis — Hexacopter (6 Motors × 8.5 kg = 51 kg max thrust)',
                 fontweight='bold', fontsize=14, y=1.02)
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'thrust_twr.png'), dpi=180, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created thrust_twr.png")


# ──────────────────────────────────────────────────────────────────────────────
# 4. SPRAY SYSTEM FLOW
# ──────────────────────────────────────────────────────────────────────────────
def create_spray_flow():
    fig, ax = plt.subplots(figsize=(14, 8))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8)
    ax.axis('off')

    def draw_component(x, y, w, h, label, color, sublabel=None, fontsize=10):
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.12",
                             facecolor=color, edgecolor='#333333', linewidth=1.8)
        ax.add_patch(box)
        if sublabel:
            ax.text(x + w / 2, y + h / 2 + 0.12, label, ha='center', va='center',
                    fontsize=fontsize, fontweight='bold', color='white')
            ax.text(x + w / 2, y + h / 2 - 0.18, sublabel, ha='center', va='center',
                    fontsize=7.5, color='white', alpha=0.85)
        else:
            ax.text(x + w / 2, y + h / 2, label, ha='center', va='center',
                    fontsize=fontsize, fontweight='bold', color='white')

    def arrow(x1, y1, x2, y2, color='#333333', lw=2.0, label=None, fontsize=8):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle='->', color=color, lw=lw))
        if label:
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            ax.text(mx, my + 0.15, label, ha='center', va='bottom', fontsize=fontsize,
                    color=color, fontweight='bold',
                    bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor=color, alpha=0.9))

    def dashed_arrow(x1, y1, x2, y2, color='#999999', lw=1.5, label=None):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle='->', color=color, lw=lw, linestyle='dashed'))
        if label:
            mx, my = (x1 + x2) / 2, (y1 + y2) / 2
            ax.text(mx, my + 0.12, label, ha='center', va='bottom', fontsize=7,
                    color=color, fontstyle='italic')

    # Title
    ax.text(7, 7.6, 'SPRAY SYSTEM HYDRAULIC FLOW DIAGRAM', ha='center',
            fontsize=16, fontweight='bold', color='#1a237e')

    # Main flow components (left to right)
    draw_component(0.3, 4.8, 1.6, 1.2, 'TANK', '#1565c0', '6L Capacity\n20L/min max')
    draw_component(2.5, 4.8, 1.6, 1.2, 'FILTER', '#0277bd', '100 mesh\nInline strainer')
    draw_component(4.7, 4.8, 1.6, 1.2, 'PUMP', '#e65100', '12V Diaphragm\n5.5 L/min')
    draw_component(6.9, 4.8, 1.6, 1.2, 'FLOW\nSENSOR', '#2e7d32', 'YF-S401\n0.3–6 L/min')
    draw_component(9.1, 4.8, 1.6, 1.2, 'MANIFOLD', '#6a1b9a', '4-way split\nEqual distrib.')

    # Nozzles
    for i, nx in enumerate([11.3, 11.9, 12.5, 13.1]):
        draw_component(nx, 5.1, 0.45, 0.6, f'N{i + 1}', '#c62828', fontsize=7)

    # Main flow arrows
    arrow(1.9, 5.4, 2.5, 5.4, '#1565c0', label='4 L/min')
    arrow(4.1, 5.4, 4.7, 5.4, '#0277bd', label='4 L/min')
    arrow(6.3, 5.4, 6.9, 5.4, '#e65100', label='4 L/min')
    arrow(8.5, 5.4, 9.1, 5.4, '#2e7d32', label='4 L/min')
    arrow(10.7, 5.4, 11.3, 5.4, '#6a1b9a', label='1 L/min each')

    # Flow rate annotations
    ax.text(7, 4.2, 'Operating Pressure: 2–4 bar  |  Flow Rate: 4 L/min  |  Spray Width: 3–6 m',
            ha='center', fontsize=9, color='#333333',
            bbox=dict(boxstyle='round', facecolor='#e8f5e9', edgecolor='#2e7d32', alpha=0.9))

    # Bypass return path
    draw_component(4.7, 1.5, 1.6, 0.8, 'BYPASS\nVALVE', '#ff8f00', 'Pressure relief', fontsize=9)
    draw_component(0.3, 1.5, 1.6, 0.8, 'RETURN\nLINE', '#90a4ae', 'Back to tank', fontsize=9)

    # Bypass arrows
    dashed_arrow(5.5, 4.8, 5.5, 2.3, '#ff8f00', label='Overpressure')
    arrow(4.7, 1.9, 1.9, 1.9, '#90a4ae', lw=1.5, label='Return flow')
    dashed_arrow(1.1, 1.5, 1.1, 4.8, '#90a4ae', label='Tank refill')

    # Controller section
    draw_component(6.9, 2.0, 2.5, 0.9, 'FC + PUMP DRIVER', '#37474f', 'PWM 50–2000 µs', fontsize=9)

    # Control arrows
    dashed_arrow(8.15, 2.9, 8.15, 4.8, '#37474f', lw=1.5, label='PWM signal')
    dashed_arrow(5.5, 3.5, 6.9, 2.45, '#37474f', lw=1.5, label='Flow data')

    # Pressure zones
    ax.add_patch(FancyBboxPatch((2.3, 6.3), 4.0, 0.5, boxstyle="round,pad=0.1",
                                facecolor='#e3f2fd', edgecolor='#1565c0', linewidth=1, linestyle=':'))
    ax.text(4.3, 6.55, 'LOW PRESSURE (0.5–1 bar)', ha='center', fontsize=8,
            color='#1565c0', fontweight='bold')

    ax.add_patch(FancyBboxPatch((6.7, 6.3), 6.5, 0.5, boxstyle="round,pad=0.1",
                                facecolor='#fce4ec', edgecolor='#c62828', linewidth=1, linestyle=':'))
    ax.text(9.95, 6.55, 'HIGH PRESSURE (2–4 bar)', ha='center', fontsize=8,
            color='#c62828', fontweight='bold')

    # Legend
    ax.text(0.3, 0.5, '─ Solid: Main flow path    ╌ Dashed: Control/sensor signals    ▸ Bypass: Pressure relief',
            fontsize=8, color='#666666', style='italic')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'spray_flow.png'), dpi=180, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created spray_flow.png")


# ──────────────────────────────────────────────────────────────────────────────
# 5. INDIA DRONE MARKET
# ──────────────────────────────────────────────────────────────────────────────
def create_india_market():
    fig = plt.figure(figsize=(14, 8))
    gs = fig.add_gridspec(2, 3, hspace=0.4, wspace=0.35)

    # ── Panel 1: Key Statistics (top-left) ──
    ax1 = fig.add_subplot(gs[0, 0])
    categories = ['Registered\nDrones', 'Certified\nPilots', 'Training\nOrgs']
    values = [38575, 39890, 244]
    colors = ['#1565c0', '#2e7d32', '#e65100']

    bars = ax1.bar(categories, values, color=colors, edgecolor='#333333', linewidth=1.2, width=0.55)
    for bar, val in zip(bars, values):
        ax1.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 500,
                 f'{val:,}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    ax1.set_title('DGCA India — Current Statistics', fontweight='bold', fontsize=11)
    ax1.set_ylabel('Count', fontweight='bold')
    ax1.set_ylim(0, 48000)
    ax1.grid(True, axis='y', alpha=0.3, linestyle='--')
    ax1.tick_params(axis='x', labelsize=9)

    # ── Panel 2: Market Size Growth (top-center + top-right) ──
    ax2 = fig.add_subplot(gs[0, 1:])
    years = [2024, 2025, 2026, 2027, 2028, 2029, 2030]
    market_size_usd = [0.82, 1.2, 1.8, 2.7, 3.8, 5.1, 6.3]  # billion USD
    market_size_inr = [s * 84 for s in market_size_usd]  # billion INR

    ax2_twin = ax2.twinx()

    # Bar chart for USD
    bars = ax2.bar(years, market_size_usd, color='#1565c0', edgecolor='#333333',
                   linewidth=1, width=0.6, alpha=0.7, label='Market Size (USD Billion)')
    # Line chart for INR
    ax2_twin.plot(years, market_size_inr, color='#c62828', marker='o', linewidth=2.5,
                  markersize=8, label='Market Size (INR Billion)', zorder=5)

    for bar, val in zip(bars, market_size_usd):
        ax2.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.1,
                 f'${val}B', ha='center', va='bottom', fontsize=9, fontweight='bold', color='#1565c0')

    for y, val in zip(years, market_size_inr):
        ax2_twin.text(y, val + 80, f'₹{val:.0f}B', ha='center', va='bottom',
                      fontsize=8, fontweight='bold', color='#c62828')

    # CAGR annotation
    cagr = ((6.3 / 0.82) ** (1 / 6) - 1) * 100
    ax2.annotate(f'CAGR ≈ {cagr:.0f}%\n(2024–2030)',
                 xy=(2027, 2.7), xytext=(2028.5, 4.5),
                 fontsize=11, fontweight='bold', color='#1a237e',
                 arrowprops=dict(arrowstyle='->', color='#1a237e', lw=2),
                 bbox=dict(boxstyle='round,pad=0.4', facecolor='#e8eaf6', edgecolor='#1a237e', alpha=0.9))

    ax2.set_xlabel('Year', fontweight='bold')
    ax2.set_ylabel('Market Size (USD Billion)', fontweight='bold', color='#1565c0')
    ax2_twin.set_ylabel('Market Size (INR Billion)', fontweight='bold', color='#c62828')
    ax2.set_title('India Drone Market Growth Projection (2024–2030)', fontweight='bold', fontsize=11)
    ax2.set_xticks(years)
    ax2.grid(True, axis='y', alpha=0.3, linestyle='--')

    lines1, labels1 = ax2.get_legend_handles_labels()
    lines2, labels2 = ax2_twin.get_legend_handles_labels()
    ax2.legend(lines1 + lines2, labels1 + labels2, loc='upper left', fontsize=9, framealpha=0.9)

    # ── Panel 3: Market Segments (bottom-left) ──
    ax3 = fig.add_subplot(gs[1, 0])
    segments = ['Agriculture', 'Defense', 'Surveillance', 'Delivery', 'Mapping', 'Other']
    shares = [42, 22, 15, 10, 7, 4]
    seg_colors = ['#4caf50', '#1565c0', '#7b1fa2', '#e65100', '#00838f', '#9e9e9e']
    explode = (0.05, 0, 0, 0, 0, 0)

    wedges, texts, autotexts = ax3.pie(shares, labels=segments, colors=seg_colors,
                                        autopct='%1.0f%%', startangle=140, explode=explode,
                                        textprops={'fontsize': 9})
    for autotext in autotexts:
        autotext.set_fontweight('bold')
        autotext.set_fontsize(9)
    ax3.set_title('Market Segments by Application', fontweight='bold', fontsize=11)

    # ── Panel 4: Regulatory Milestones (bottom-center + bottom-right) ──
    ax4 = fig.add_subplot(gs[1, 1:])
    milestones = [
        ('2018', 'Drone Policy 1.0\nUnmanned Aircraft Rules'),
        ('2021', 'PLI Scheme\n₹120 Cr incentive'),
        ('2022', 'Drone Rules 2021\nSimplified registration'),
        ('2023', 'BVLOS permitted\nDrone Shakti portal'),
        ('2024', '38,575 drones\n39,890 pilots'),
        ('2025', 'Tax benefits\n100% FDI allowed'),
        ('2030', 'Target: $6.3B\nGlobal leader'),
    ]

    y_positions = [0, 0, 0, 0, 0, 0, 0]
    x_positions = np.arange(len(milestones))

    milestone_colors = ['#90a4ae', '#78909c', '#607d8b', '#546e7a', '#1565c0', '#e65100', '#c62828']

    for i, (year, desc) in enumerate(milestones):
        ax4.scatter(i, 0, s=200, color=milestone_colors[i], zorder=5, edgecolors='#333333', linewidth=1.2)
        ax4.text(i, 0.15, year, ha='center', va='bottom', fontsize=10, fontweight='bold',
                 color=milestone_colors[i])
        ax4.text(i, -0.15, desc, ha='center', va='top', fontsize=8, color='#333333',
                 bbox=dict(boxstyle='round,pad=0.3', facecolor='#f5f5f5', edgecolor='#cccccc', alpha=0.9))

    ax4.plot(x_positions, np.zeros(len(milestones)), color='#333333', linewidth=2, zorder=1)
    ax4.set_xlim(-0.5, len(milestones) - 0.5)
    ax4.set_ylim(-0.7, 0.8)
    ax4.axis('off')
    ax4.set_title('India Drone Regulatory Timeline', fontweight='bold', fontsize=11)

    fig.suptitle('INDIA DRONE MARKET OVERVIEW 2024–2030',
                 fontweight='bold', fontsize=16, color='#1a237e', y=1.01)

    plt.savefig(os.path.join(OUTPUT_DIR, 'india_market.png'), dpi=180, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("✓ Created india_market.png")


# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print("=" * 60)
    print("GENERATING DRONE PROJECT EDUCATIONAL DIAGRAMS")
    print("=" * 60)
    create_ndvi_spectrum()
    create_system_architecture()
    create_thrust_twr()
    create_spray_flow()
    create_india_market()
    print("=" * 60)
    print(f"All diagrams saved to: {OUTPUT_DIR}")
    print("=" * 60)
