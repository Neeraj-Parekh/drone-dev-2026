import { PUMP, SCALE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function Pump() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const pumpL = PUMP.dimensions.l * SCALE;
  const pumpW = PUMP.dimensions.w * SCALE;
  const pumpH = PUMP.dimensions.h * SCALE;

  const pumpMat = { color: PUMP.color, roughness: 0.4, metalness: 0.3, wireframe };

  // Mount pump on the frame's underside, forward of center
  // Real ag drones mount pump at body level, not below tank
  const y = -FRAME_H / 2 - pumpH / 2 - 0.01; // just below bottom plate
  const z = -0.08; // slightly rear of center

  return (
    <group position={[0, y, z]}>
      {/* Pump body — black */}
      <mesh>
        <boxGeometry args={[pumpL, pumpH, pumpW]} />
        <meshStandardMaterial {...pumpMat} />
      </mesh>
      {/* Blue label */}
      <mesh position={[0, 0, pumpW / 2 + 0.001]}>
        <boxGeometry args={[pumpL * 0.6, pumpH * 0.3, 0.001]} />
        <meshStandardMaterial color="#2266cc" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Mounting bracket */}
      <mesh position={[0, -pumpH / 2 - 0.005, 0]}>
        <boxGeometry args={[57 * SCALE, 0.01, 79 * SCALE]} />
        <meshStandardMaterial color="#666666" roughness={0.4} metalness={0.5} wireframe={wireframe} />
      </mesh>
      {/* Inlet port */}
      <mesh position={[pumpL * 0.3, pumpH / 2 + 0.008, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.016, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.4} wireframe={wireframe} />
      </mesh>
      {/* Outlet port */}
      <mesh position={[-pumpL * 0.3, pumpH / 2 + 0.008, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.016, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.4} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Inline constant to avoid circular deps
const FRAME_H = 60; // mm centerBodyHeight
