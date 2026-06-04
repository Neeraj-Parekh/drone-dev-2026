import { BATTERY, CONNECTOR, SCALE, DRONE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

export function BatteryPack() {
  const wireframe = useDroneStore((s) => s.wireframe);

  const { l, w, h } = BATTERY.dimensions;
  const packW = l * SCALE;
  const packH = h * SCALE;
  const packD = w * SCALE;

  const batteryMat = { color: '#1a1a1a', roughness: 0.5, metalness: 0.2, wireframe };
  const stripeMat = { color: '#ff8800', emissive: '#cc6600', emissiveIntensity: 0.3, wireframe };
  const connMat = { color: '#888899', roughness: 0.4, metalness: 0.6, wireframe };
  const strapMat = { color: '#333333', roughness: 0.7, wireframe };

  const connR = (CONNECTOR.AS150.bulletDia / 2) * SCALE;
  const baseY = DRONE.batteryY * SCALE;

  return (
    <group position={[0, baseY, 0]}>
      {/* Single battery pack */}
      <mesh castShadow>
        <boxGeometry args={[packW, packH, packD]} />
        <meshStandardMaterial {...batteryMat} />
      </mesh>

      {/* Tattu label stripe — orange/gold */}
      <mesh position={[0, packH * 0.5 + 0.002, 0]}>
        <boxGeometry args={[packW * 0.9, 0.005, packD * 0.9]} />
        <meshStandardMaterial {...stripeMat} />
      </mesh>

      {/* Battery straps (2× velcro) */}
      {[-0.06, 0.06].map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <boxGeometry args={[packW + 0.01, packH + 0.005, 0.008]} />
          <meshStandardMaterial {...strapMat} />
        </mesh>
      ))}

      {/* AS150 connector — 7mm bullet, 20mm */}
      <mesh position={[0, 0, packD / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[connR, connR, 0.02, 8]} />
        <meshStandardMaterial {...connMat} />
      </mesh>
    </group>
  );
}
