import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Hexacopter } from './components/drone/Hexacopter';
import { SceneSetup } from './components/scene/SceneSetup';
import { Ground } from './components/scene/Ground';
import { HUD } from './components/ui/HUD';

function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function WebGLFallback() {
  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 500, padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>3D Viewer</div>
        <h2 style={{ color: '#f66', marginBottom: 12 }}>WebGL Not Available</h2>
        <p style={{ color: '#aaa', lineHeight: 1.6, marginBottom: 20 }}>
          Your browser or environment does not support WebGL rendering.
        </p>
        <div style={{
          background: 'rgba(100,200,255,0.1)', border: '1px solid rgba(100,200,255,0.3)',
          borderRadius: 8, padding: 16, textAlign: 'left', fontSize: 13, color: '#ccc',
        }}>
          <p style={{ marginBottom: 8 }}><strong style={{ color: '#6cf' }}>To view the 3D model:</strong></p>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Open in <strong>Google Chrome</strong> or <strong>Firefox</strong> with GPU enabled</li>
            <li>Transfer <code style={{ color: '#6cf' }}>drone-3d-viewer/</code> to your local machine</li>
            <li>Run: <code style={{ color: '#6cf' }}>npm run dev</code> and open localhost</li>
            <li>Or use: <code style={{ color: '#6cf' }}>npx serve dist</code> for production build</li>
          </ul>
        </div>
        <p style={{ color: '#555', fontSize: 12, marginTop: 20 }}>
          The code builds successfully — it's your browser that can't render WebGL.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(detectWebGL());
  }, []);

  // Still checking
  if (hasWebGL === null) return null;

  // No WebGL — show fallback
  if (!hasWebGL) return <WebGLFallback />;

  // WebGL available — render 3D scene
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0f' }}>
      <Canvas
        shadows
        camera={{ position: [18, 14, 22], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: true, toneMapping: 6, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <SceneSetup />
        <Hexacopter />
        <Ground />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={8}
          maxDistance={60}
          target={[0, 0, 0]}
        />
      </Canvas>
      <HUD />
    </div>
  );
}

export default App;
