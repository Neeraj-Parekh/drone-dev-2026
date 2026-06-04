import { LANDING_GEAR, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function LandingGear() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const lgMat = { color: '#333333', roughness: 0.5, metalness: 0.4, wireframe };
  const footMat = { color: '#222222', roughness: 0.6, wireframe };

  // Strut tops attach at body mid-plane (Y=0)
  const strutTopY = DRONE.landingGearY * SCALE; // 0
  const strutH = LANDING_GEAR.strutHeight * SCALE; // 445mm
  const footR = (LANDING_GEAR.footDia / 2) * SCALE;
  const strutR = (LANDING_GEAR.strutDia / 2) * SCALE;
  const spread = LANDING_GEAR.spread * SCALE;

  // Feet are at strutTopY - strutH = -445mm
  const footY = strutTopY - strutH;

  const legPositions = [
    [-spread / 2, -spread / 3],
    [spread / 2, -spread / 3],
    [-spread / 2, spread / 3],
    [spread / 2, spread / 3],
  ];

  return (
    <group>
      {legPositions.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Vertical strut — 16mm carbon tube, from mid-plane to foot */}
          <mesh position={[0, strutTopY - strutH / 2, 0]}>
            <cylinderGeometry args={[strutR, strutR, strutH, 8]} />
            <meshStandardMaterial {...lgMat} />
          </mesh>
          {/* Foot pad — wide for soft ground */}
          <mesh position={[0, footY + 0.005, 0]}>
            <cylinderGeometry args={[footR, footR * 1.3, 0.015, 12]} />
            <meshStandardMaterial {...footMat} />
          </mesh>
          {/* Rubber dampener */}
          <mesh position={[0, footY + 0.015, 0]}>
            <cylinderGeometry args={[strutR * 1.5, strutR * 1.5, 0.008, 8]} />
            <meshStandardMaterial color="#444444" roughness={0.8} wireframe={wireframe} />
          </mesh>
        </group>
      ))}

      {/* Front-back skid bars */}
      {[-spread / 3, spread / 3].map((z, i) => (
        <mesh key={`skid-${i}`} position={[0, footY + 0.01, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[strutR * 0.7, strutR * 0.7, spread, 8]} />
          <meshStandardMaterial {...lgMat} />
        </mesh>
      ))}

      {/* Cross-bars */}
      {[-spread / 2, spread / 2].map((x, i) => (
        <mesh key={`cross-${i}`} position={[x, strutTopY - strutH * 0.35, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[strutR * 0.6, strutR * 0.6, spread * 0.67, 8]} />
          <meshStandardMaterial {...lgMat} />
        </mesh>
      ))}

      {/* Diagonal cross-braces */}
      <mesh position={[0, strutTopY - strutH * 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[strutR * 0.4, strutR * 0.4, spread * 0.9, 6]} />
        <meshStandardMaterial {...lgMat} />
      </mesh>
      <mesh position={[0, strutTopY - strutH * 0.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[strutR * 0.4, strutR * 0.4, spread * 0.9, 6]} />
        <meshStandardMaterial {...lgMat} />
      </mesh>
    </group>
  );
}
