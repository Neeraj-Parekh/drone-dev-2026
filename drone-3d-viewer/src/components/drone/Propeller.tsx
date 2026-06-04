import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROP, SCALE } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';

interface PropellerProps {
  isCCW: boolean;
}

export function Propeller({ isCCW }: PropellerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const propSpeed = useDroneStore((s) => s.propSpeed);
  const wireframe = useDroneStore((s) => s.wireframe);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (isCCW ? 1 : -1) * propSpeed * 15 * delta;
    }
  });

  const bladeLen = PROP.bladeLength * SCALE; // ~0.45m
  const rootW = PROP.bladeRootWidth * SCALE;  // 0.05m
  const tipW = PROP.bladeTipWidth * SCALE;    // 0.025m
  const rootT = PROP.bladeRootThickness * SCALE; // 0.003m
  const tipT = PROP.bladeTipThickness * SCALE;   // 0.001m

  const bladeMat = {
    color: '#1a1a1a',
    roughness: 0.4,
    metalness: 0.3,
    transparent: true,
    opacity: 0.9,
    wireframe,
  };

  const hubMat = { color: '#555555', roughness: 0.3, metalness: 0.5, wireframe };
  const ringColor = isCCW ? 0x00ff88 : 0xff4444;

  // Create blade shape as tapered box (simplified airfoil)
  const blades = useMemo(() => {
    const result: { rootW: number; tipW: number; rootT: number; tipT: number; len: number }[] = [];
    for (let i = 0; i < 2; i++) {
      result.push({ rootW, tipW, rootT, tipT, len: bladeLen });
    }
    return result;
  }, [rootW, tipW, rootT, tipT, bladeLen]);

  return (
    <group ref={groupRef}>
      {blades.map((b, i) => (
        <group key={i} rotation={[0, i * Math.PI, 0]}>
          {/* Blade root section */}
          <mesh position={[0, 0, b.len * 0.15]}>
            <boxGeometry args={[b.rootW, b.rootT, b.len * 0.3]} />
            <meshStandardMaterial {...bladeMat} />
          </mesh>
          {/* Blade mid section (tapering) */}
          {(() => {
            const midW = (b.rootW + b.tipW) / 2;
            const midT = (b.rootT + b.tipT) / 2;
            return (
              <mesh position={[0, 0, b.len * 0.5]}>
                <boxGeometry args={[midW, midT, b.len * 0.4]} />
                <meshStandardMaterial {...bladeMat} />
              </mesh>
            );
          })()}
          {/* Blade tip section */}
          <mesh position={[0, 0, b.len * 0.85]}>
            <boxGeometry args={[b.tipW, b.tipT, b.len * 0.3]} />
            <meshStandardMaterial {...bladeMat} />
          </mesh>
        </group>
      ))}

      {/* Hub — 26.5mm wide × 34.7mm tall (per MFP datasheet) */}
      <mesh>
        <cylinderGeometry args={[PROP.hubWidth / 2 * SCALE, PROP.hubWidth / 2 * SCALE, PROP.hubHeight * SCALE, 12]} />
        <meshStandardMaterial {...hubMat} />
      </mesh>

      {/* Sweep ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <ringGeometry args={[PROP.diameter / 2 * SCALE - 0.01, PROP.diameter / 2 * SCALE, 48]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
