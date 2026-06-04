import { useDroneStore } from '../../store/useDroneStore';

export function HUD() {
  const autoSpin = useDroneStore((s) => s.autoSpin);
  const wireframe = useDroneStore((s) => s.wireframe);
  const exploded = useDroneStore((s) => s.exploded);
  const toggleSpin = useDroneStore((s) => s.toggleSpin);
  const toggleWireframe = useDroneStore((s) => s.toggleWireframe);
  const toggleExplode = useDroneStore((s) => s.toggleExplode);

  return (
    <>
      {/* Info Panel */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 10,
        background: 'rgba(10,10,20,0.88)',
        border: '1px solid rgba(100,200,255,0.3)',
        borderRadius: 12,
        padding: '16px 20px',
        backdropFilter: 'blur(10px)',
        minWidth: 280,
        fontFamily: 'system-ui, sans-serif',
        color: '#fff',
      }}>
        <h2 style={{ fontSize: 14, color: '#6cf', margin: '0 0 8px', letterSpacing: 1 }}>
          COEP AGRICULTURAL HEXACOPTER
        </h2>
        <Row lbl="Frame" val="EFT E616P · 1644mm" />
        <Row lbl="Motors" val="6× X9 G2L · 110KV" />
        <Row lbl="Props" val="MFP 36×11 · Folding" />
        <Row lbl="Battery" val="3× Tattu 12S 30Ah" />
        <Row lbl="MTOW" val="45 kg (design)" />

        <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(100,200,255,0.2)' }}>
          <div style={{ fontSize: 11, color: '#6cf', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Dimensions
          </div>
          <Row lbl="Wheelbase" val="1644 mm" />
          <Row lbl="Arm Length" val="800 mm" />
          <Row lbl="Prop Sweep" val="Ø927 mm" />
        </div>

        <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(100,200,255,0.2)' }}>
          <div style={{ fontSize: 11, color: '#6cf', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Propulsion
          </div>
          <Row lbl="Max Thrust" val="120 kg (6×24kg)" />
          <Row lbl="TWR" val="2.67 @ 45kg" />
          <Row lbl="Hover Time" val="34.6 min (45kg)" />
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: 10,
        fontFamily: 'system-ui, sans-serif',
      }}>
        <Btn active={autoSpin} onClick={toggleSpin}>Spin</Btn>
        <Btn active={wireframe} onClick={toggleWireframe}>Wireframe</Btn>
        <Btn active={exploded} onClick={toggleExplode}>Explode</Btn>
      </div>

      {/* Help text */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 10,
        fontSize: 11,
        color: '#555',
        textAlign: 'right',
        lineHeight: 1.6,
        fontFamily: 'system-ui, sans-serif',
      }}>
        Drag: Rotate · Scroll: Zoom · Right-drag: Pan
      </div>
    </>
  );
}

function Row({ lbl, val }: { lbl: string; val: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <span style={{ color: '#888' }}>{lbl}</span>
      <span style={{ color: '#fff', fontWeight: 600 }}>{val}</span>
    </div>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(100,200,255,0.2)' : 'rgba(10,10,20,0.85)',
        border: `1px solid ${active ? '#6cf' : 'rgba(100,200,255,0.3)'}`,
        color: active ? '#fff' : '#6cf',
        padding: '8px 16px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 12,
        backdropFilter: 'blur(10px)',
      }}
    >
      {children}
    </button>
  );
}
