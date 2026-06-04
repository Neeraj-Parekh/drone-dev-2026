import { FC, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function FlightController() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const { l, w, h } = FC.dimensions;
  const fcW = l * SCALE;
  const fcH = h * SCALE;
  const fcD = w * SCALE;

  const fcMat = { color: FC.color, roughness: 0.4, metalness: 0.3, wireframe };
  const fcTopMat = { color: '#222222', roughness: 0.3, wireframe };

  const y = DRONE.fcY * SCALE;

  return (
    <group position={[0, y, 0]}>
      {/* FC body — Holybro orange */}
      <mesh castShadow>
        <boxGeometry args={[fcW, fcH, fcD]} />
        <meshStandardMaterial {...fcMat} />
      </mesh>

      {/* Top label plate — black */}
      <mesh position={[0, fcH * 0.5 + 0.001, 0]}>
        <boxGeometry args={[fcW * 0.85, 0.002, fcD * 0.8]} />
        <meshStandardMaterial {...fcTopMat} />
      </mesh>

      {/* Port indicators on sides */}
      {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([sx, sz], i) => (
        <mesh key={i} position={[sx * fcW * 0.5, 0, sz * fcD * 0.5]}>
          <boxGeometry args={[0.003, fcH * 0.4, 0.008]} />
          <meshStandardMaterial color="#444444" wireframe={wireframe} />
        </mesh>
      ))}
    </group>
  );
}
