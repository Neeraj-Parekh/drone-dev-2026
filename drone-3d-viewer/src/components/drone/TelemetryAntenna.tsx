import { TELEMETRY, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function TelemetryAntenna() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const moduleMat = { color: '#111111', roughness: 0.4, metalness: 0.3, wireframe };
  const antennaMat = { color: '#555555', roughness: 0.4, metalness: 0.5, wireframe };
  const connectorMat = { color: '#aaaaaa', roughness: 0.3, metalness: 0.6, wireframe };

  const baseY = DRONE.fcY * SCALE;
  const modL = TELEMETRY.moduleDimensions.l * SCALE;
  const modW = TELEMETRY.moduleDimensions.w * SCALE;
  const modH = TELEMETRY.moduleDimensions.h * SCALE;
  const whipL = TELEMETRY.antennaLength * SCALE;
  const whipR = (TELEMETRY.antennaDiameter / 2) * SCALE;
  const spacing = TELEMETRY.antennaSpacing * SCALE;

  return (
    <group position={[0, baseY + modH / 2 + 0.005, 0]}>
      {/* RFD868x module — black box */}
      <mesh>
        <boxGeometry args={[modL, modH, modW]} />
        <meshStandardMaterial {...moduleMat} />
      </mesh>

      {/* Dual whip antennas */}
      {[-spacing / 2, spacing / 2].map((x, i) => (
        <group key={i} position={[x, modH / 2, 0]}>
          {/* RP-SMA connector */}
          <mesh>
            <cylinderGeometry args={[0.003, 0.003, 0.005, 8]} />
            <meshStandardMaterial {...connectorMat} />
          </mesh>
          {/* Antenna whip — 120mm */}
          <mesh position={[0, whipL / 2 + 0.003, 0]}>
            <cylinderGeometry args={[whipR, whipR * 0.5, whipL, 6]} />
            <meshStandardMaterial {...antennaMat} />
          </mesh>
          {/* Antenna tip */}
          <mesh position={[0, whipL + 0.005, 0]}>
            <sphereGeometry args={[0.003, 8, 8]} />
            <meshStandardMaterial color="#222222" roughness={0.3} wireframe={wireframe} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
