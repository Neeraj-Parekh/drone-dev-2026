import { Grid } from '@react-three/drei';

export function Ground() {
  return (
    <>
      <Grid
        position={[0, -4.5, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#111122"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#0a0a15"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a12" roughness={1} />
      </mesh>
    </>
  );
}
