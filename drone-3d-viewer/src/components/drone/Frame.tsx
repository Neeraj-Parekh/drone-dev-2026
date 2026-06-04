import { FRAME, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function Frame() {
  const wireframe = useDroneStore((s) => s.wireframe);
  const r = FRAME.centerBodyRadius * SCALE;
  const pt = FRAME.plateThickness * SCALE;
  const sh = FRAME.standoffHeight * SCALE;

  const carbonMat = { color: '#1a1a1a', roughness: 0.3, metalness: 0.1, wireframe };
  const aluminumMat = { color: '#888899', roughness: 0.4, metalness: 0.6, wireframe };
  const copperMat = { color: '#cc8833', roughness: 0.3, metalness: 0.7, wireframe };

  return (
    <group>
      {/* Top plate - hexagonal, 3mm */}
      <mesh position={[0, DRONE.topPlateY * SCALE, 0]} castShadow>
        <cylinderGeometry args={[r, r, pt, 6]} />
        <meshStandardMaterial {...carbonMat} />
      </mesh>

      {/* Bottom plate - hexagonal, 3mm */}
      <mesh position={[0, DRONE.bottomPlateY * SCALE, 0]} castShadow>
        <cylinderGeometry args={[r, r, pt, 6]} />
        <meshStandardMaterial {...carbonMat} />
      </mesh>

      {/* Mid plate (PDB layer) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[r * 0.85, r * 0.85, pt, 6]} />
        <meshStandardMaterial {...carbonMat} />
      </mesh>

      {/* Aluminum standoffs (6× between plates) */}
      {DRONE.standoffPositions.map((pos, i) => (
        <group key={i}>
          {/* Top standoff */}
          <mesh position={[pos.x, DRONE.topPlateY * SCALE - sh / 2, pos.z]}>
            <cylinderGeometry args={[0.003, 0.003, sh, 6]} />
            <meshStandardMaterial {...aluminumMat} />
          </mesh>
          {/* Bottom standoff */}
          <mesh position={[pos.x, DRONE.bottomPlateY * SCALE + sh / 2, pos.z]}>
            <cylinderGeometry args={[0.003, 0.003, sh, 6]} />
            <meshStandardMaterial {...aluminumMat} />
          </mesh>
        </group>
      ))}

      {/* Copper busbar visible between plates */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[r * 1.4, 0.005, 0.015]} />
        <meshStandardMaterial {...copperMat} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[0, Math.PI / 3, 0]}>
        <boxGeometry args={[r * 1.4, 0.005, 0.015]} />
        <meshStandardMaterial {...copperMat} />
      </mesh>
    </group>
  );
}
