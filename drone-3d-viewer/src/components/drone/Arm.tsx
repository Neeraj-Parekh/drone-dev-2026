import { FRAME, SCALE, DRONE, MOTOR, TUBING, NOZZLE, WIRING } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';
import { Motor } from './Motor';
import { Propeller } from './Propeller';

interface ArmProps {
  angleDeg: number;
  isCCW: boolean;
  index: number;
}

export function Arm({ angleDeg, isCCW }: ArmProps) {
  const wireframe = useDroneStore((s) => s.wireframe);
  const exploded = useDroneStore((s) => s.exploded);

  const armLen = FRAME.armLength * SCALE;     // 0.822m (center to motor)
  const tubeR = (FRAME.armTubeOD / 2) * SCALE; // 0.02m
  const bodyR = FRAME.centerBodyRadius * SCALE; // 0.15m
  const motorY = DRONE.motorY * SCALE;
  const propY = (MOTOR.bodyHeight + 8) * SCALE;

  const carbonMat = { color: '#1a1a1a', roughness: 0.3, metalness: 0.1, wireframe };
  const mountMat = { color: '#cc3333', roughness: 0.2, metalness: 0.7, wireframe };
  const hingeMat = { color: '#666666', roughness: 0.4, metalness: 0.5, wireframe };

  // Motor position: at arm tip = armLen from center
  const motorZ = armLen;
  const explodeY = exploded ? 2 : 0;

  // Arm tube: from body edge to motor mount
  const tubeStartZ = bodyR * 0.6;  // where tube exits body
  const tubeEndZ = motorZ;          // at motor
  const tubeLen = tubeEndZ - tubeStartZ;
  const tubeCenterZ = (tubeStartZ + tubeEndZ) / 2;

  // Nozzle at 65% along arm from center
  const nozzleZ = armLen * NOZZLE.positionAlongArm;
  const nozzleDrop = NOZZLE.dropTubeLength * SCALE;

  // Wiring
  const wireMat = { color: '#cc0000', roughness: 0.6, metalness: 0.3, wireframe };
  const gndMat = { color: '#000000', roughness: 0.6, metalness: 0.3, wireframe };
  const tubeMat = { color: TUBING.color, roughness: 0.5, metalness: 0.2, wireframe, transparent: true, opacity: 0.8 };

  return (
    <group rotation={[0, (angleDeg * Math.PI) / 180, 0]}>
      {/* Arm tube — 40mm OD carbon cylinder */}
      <mesh position={[0, motorY, tubeCenterZ]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[tubeR, tubeR, tubeLen, 12]} />
        <meshStandardMaterial {...carbonMat} />
      </mesh>

      {/* Folding hinge at body junction */}
      <mesh position={[0, motorY, tubeStartZ]}>
        <cylinderGeometry args={[0.012, 0.012, 0.03, 8]} />
        <meshStandardMaterial {...hingeMat} />
      </mesh>

      {/* Motor mount bracket — red anodized CNC aluminum */}
      <mesh position={[0, motorY - 0.005, motorZ]}>
        <boxGeometry args={[MOTOR.mountWidth * SCALE, MOTOR.mountHeight * SCALE, MOTOR.mountWidth * SCALE]} />
        <meshStandardMaterial {...mountMat} />
      </mesh>

      {/* Motor + Propeller at arm tip */}
      <group position={[0, motorY + 0.015 + explodeY, motorZ]}>
        <Motor isCCW={isCCW} />
        <group position={[0, propY, 0]}>
          <Propeller isCCW={isCCW} />
        </group>
      </group>

      {/* === WIRING along arm === */}
      {/* Power wire (red) — from body to motor */}
      <mesh position={[0.008, motorY + 0.005, (tubeStartZ + tubeEndZ) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[WIRING.powerWireDia / 2 * SCALE, WIRING.powerWireDia / 2 * SCALE, tubeLen * 0.9, 4]} />
        <meshStandardMaterial {...wireMat} />
      </mesh>
      {/* Ground wire (black) */}
      <mesh position={[-0.008, motorY + 0.005, (tubeStartZ + tubeEndZ) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[WIRING.powerWireDia / 2 * SCALE, WIRING.powerWireDia / 2 * SCALE, tubeLen * 0.9, 4]} />
        <meshStandardMaterial {...gndMat} />
      </mesh>

      {/* === SPRAY TUBING along arm === */}
      <mesh position={[0, motorY - 0.008, (tubeStartZ + tubeEndZ) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[TUBING.outerDia / 2 * SCALE, TUBING.outerDia / 2 * SCALE, tubeLen * 0.7, 6]} />
        <meshStandardMaterial {...tubeMat} />
      </mesh>

      {/* === NOZZLE DROP at 65% along arm === */}
      <group position={[0, motorY - nozzleDrop / 2, nozzleZ]}>
        {/* Drop tube — blue */}
        <mesh>
          <cylinderGeometry args={[TUBING.outerDia / 2 * SCALE, TUBING.outerDia / 2 * SCALE, nozzleDrop, 6]} />
          <meshStandardMaterial {...tubeMat} />
        </mesh>
        {/* Check valve */}
        <mesh position={[0, -nozzleDrop / 2 + 0.015, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.015, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} wireframe={wireframe} />
        </mesh>
        {/* Nozzle body — gray polymer */}
        <mesh position={[0, -nozzleDrop / 2 + 0.003, 0]}>
          <cylinderGeometry args={[NOZZLE.bodyDiameter / 2 * SCALE, NOZZLE.bodyDiameter / 2 * SCALE, NOZZLE.bodyHeight * SCALE, 8]} />
          <meshStandardMaterial color={NOZZLE.bodyColor} roughness={0.4} metalness={0.3} wireframe={wireframe} />
        </mesh>
        {/* Nozzle tip — green VisiFlo */}
        <mesh position={[0, -nozzleDrop / 2 - 0.005, 0]}>
          <coneGeometry args={[NOZZLE.capDiameter / 2 * SCALE * 0.6, 0.012, 8]} />
          <meshStandardMaterial color={NOZZLE.tipColor} roughness={0.3} metalness={0.2} wireframe={wireframe} />
        </mesh>
      </group>
    </group>
  );
}
