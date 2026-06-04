import { GPS, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function GPSModule() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const gpsMat = { color: '#333333', roughness: 0.3, metalness: 0.2, wireframe };
  const antennaMat = { color: '#f0f0f0', roughness: 0.2, metalness: 0.1, wireframe };
  const mastMat = { color: '#888889', roughness: 0.4, metalness: 0.6, wireframe };

  const mastH = GPS.mastHeight * SCALE;
  const mastBaseY = DRONE.gpsMastBaseY * SCALE;
  const mastTopY = mastBaseY + mastH;
  const antennaR = (GPS.antennaDiameter / 2) * SCALE;
  const antennaH = GPS.antennaHeight * SCALE;

  return (
    <group>
      {/* GPS Mast — 350mm carbon tube */}
      <mesh position={[0, mastBaseY + mastH / 2, 0]}>
        <cylinderGeometry args={[0.005, 0.005, mastH, 8]} />
        <meshStandardMaterial {...mastMat} />
      </mesh>

      {/* GPS 1 (Primary) — white mushroom dome antenna */}
      <group position={[0, mastTopY, 0]}>
        {/* Base plate */}
        <mesh position={[0, 0.003, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.006, 16]} />
          <meshStandardMaterial {...gpsMat} />
        </mesh>
        {/* Mushroom dome — hemisphere */}
        <mesh position={[0, 0.006 + antennaH * 0.3, 0]}>
          <sphereGeometry args={[antennaR, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial {...antennaMat} />
        </mesh>
        {/* Dome base ring */}
        <mesh position={[0, 0.006, 0]}>
          <cylinderGeometry args={[antennaR, antennaR, 0.005, 16]} />
          <meshStandardMaterial {...antennaMat} />
        </mesh>
      </group>

      {/* GPS 2 (Backup) — small module on frame */}
      <mesh position={[0.04, DRONE.fcY * SCALE + 0.003, 0.04]}>
        <boxGeometry args={[0.015, 0.0052, 0.015]} />
        <meshStandardMaterial {...gpsMat} />
      </mesh>
    </group>
  );
}
