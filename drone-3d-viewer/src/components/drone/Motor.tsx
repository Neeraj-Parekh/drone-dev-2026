import { MOTOR, SCALE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

interface MotorProps {
  isCCW: boolean;
}

export function Motor({ isCCW }: MotorProps) {
  const wireframe = useDroneStore((s) => s.wireframe);

  const bodyR = (MOTOR.bodyDiameter / 2) * SCALE;
  const bodyH = MOTOR.bodyHeight * SCALE;
  const shaftR = (MOTOR.shaftOD / 2) * SCALE;
  const fanR = (MOTOR.fanDiameter / 2) * SCALE;

  // Red for CW, Green for CCW (anodized aluminum)
  const bellColor = isCCW ? MOTOR.bellColorCCW : MOTOR.bellColorCW;

  const statorMat = { color: '#1a1a1a', roughness: 0.3, metalness: 0.7, wireframe };
  const bellMat = { color: bellColor, roughness: 0.2, metalness: 0.8, wireframe };
  const shaftMat = { color: '#888899', roughness: 0.4, metalness: 0.6, wireframe };
  const escMat = { color: '#333333', roughness: 0.4, metalness: 0.3, wireframe };

  const ledColor = isCCW ? 0x00ff88 : 0xff4444;

  // ESC bracket: 129.9 × 149.6 × 92.4mm envelope from CAD
  const escL = 129.9 * SCALE; // 0.1299m
  const escW = 149.6 * SCALE; // 0.1496m
  const escH = 92.4 * SCALE;  // 0.0924m

  return (
    <group>
      {/* ESC bracket housing — full envelope around motor base */}
      <mesh position={[0, -escH / 2 + 0.005, 0]}>
        <boxGeometry args={[escL, escH, escW]} />
        <meshStandardMaterial {...escMat} />
      </mesh>

      {/* Motor stator (black housing) — slightly wider at bottom */}
      <mesh castShadow>
        <cylinderGeometry args={[bodyR * 1.02, bodyR, bodyH, 16]} />
        <meshStandardMaterial {...statorMat} />
      </mesh>

      {/* Motor bell (anodized color) — top section */}
      <mesh position={[0, bodyH * 0.85, 0]} castShadow>
        <cylinderGeometry args={[bodyR * 0.95, bodyR, bodyH * 0.65, 16]} />
        <meshStandardMaterial {...bellMat} />
      </mesh>

      {/* Fan shroud ring (130mm dia) */}
      <mesh position={[0, bodyH * 0.7, 0]}>
        <torusGeometry args={[fanR, 0.003, 8, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.5} wireframe={wireframe} />
      </mesh>

      {/* Shaft — 14mm OD, 15mm visible */}
      <mesh position={[0, bodyH + MOTOR.shaftLength * SCALE / 2, 0]}>
        <cylinderGeometry args={[shaftR, shaftR, MOTOR.shaftLength * SCALE, 8]} />
        <meshStandardMaterial {...shaftMat} />
      </mesh>

      {/* Direction LED — small indicator */}
      <mesh position={[bodyR * 0.8, bodyH * 1.1, 0]}>
        <sphereGeometry args={[0.001, 8, 8]} />
        <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}
