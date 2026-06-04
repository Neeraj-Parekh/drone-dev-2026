import { TANK, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function SprayTank() {
  const wireframe = useDroneStore((s) => s.wireframe);
  const exploded = useDroneStore((s) => s.exploded);

  const { l, w, h } = TANK.dimensions;
  const tankW = l * SCALE;
  const tankH = h * SCALE;
  const tankD = w * SCALE;

  // White/translucent HDPE — not green!
  const tankMat = {
    color: TANK.color,
    roughness: 0.6,
    metalness: 0.05,
    transparent: true,
    opacity: TANK.opacity,
    wireframe,
  };
  const strapMat = { color: '#444444', roughness: 0.6, wireframe };

  const baseY = DRONE.tankY * SCALE;
  const explodeY = exploded ? -4.5 : 0;

  return (
    <group position={[0, baseY + explodeY, 0]}>
      {/* Tank body — white translucent */}
      <mesh castShadow>
        <boxGeometry args={[tankW, tankH, tankD]} />
        <meshStandardMaterial {...tankMat} />
      </mesh>

      {/* Fill cap — black threaded cap on top */}
      <mesh position={[0, tankH * 0.5 + 0.012, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
        <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.3} wireframe={wireframe} />
      </mesh>

      {/* Tank mounting straps (2×) */}
      {[-0.08, 0.08].map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <boxGeometry args={[tankW + 0.01, tankH + 0.005, 0.008]} />
          <meshStandardMaterial {...strapMat} />
        </mesh>
      ))}

      {/* Volume markings on side */}
      {[0.25, 0.5, 0.75].map((frac, i) => (
        <mesh key={`mark-${i}`} position={[tankW * 0.5 + 0.001, tankH * (frac - 0.5), 0]}>
          <boxGeometry args={[0.002, 0.001, tankD * 0.3]} />
          <meshStandardMaterial color="#aaaaaa" wireframe={wireframe} />
        </mesh>
      ))}
    </group>
  );
}
