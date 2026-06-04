import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MOTOR_LAYOUT } from '../../config/droneConfig';
import { useDroneStore } from '../../store/useDroneStore';
import { Frame } from './Frame';
import { Arm } from './Arm';
import { BatteryPack } from './Battery';
import { FlightController } from './FlightController';
import { GPSModule } from './GPSModule';
import { SprayTank } from './SprayTank';
import { Pump } from './Pump';
import { LandingGear } from './LandingGear';
import { TelemetryAntenna } from './TelemetryAntenna';

export function Hexacopter() {
  const groupRef = useRef<THREE.Group>(null);
  const autoSpin = useDroneStore((s) => s.autoSpin);
  const hoverEnabled = useDroneStore((s) => s.hoverEnabled);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (autoSpin) groupRef.current.rotation.y += 0.3 * delta;
  });

  const hoverRef = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current || !hoverEnabled) return;
    hoverRef.current += delta * 1.5;
    groupRef.current.position.y = Math.sin(hoverRef.current) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Frame />
      {MOTOR_LAYOUT.map((m) => (
        <Arm key={m.index} angleDeg={m.angle} isCCW={m.rotation === 'CCW'} index={m.index} />
      ))}
      <FlightController />
      <GPSModule />
      <TelemetryAntenna />
      <BatteryPack />
      <SprayTank />
      <Pump />
      <LandingGear />
    </group>
  );
}
