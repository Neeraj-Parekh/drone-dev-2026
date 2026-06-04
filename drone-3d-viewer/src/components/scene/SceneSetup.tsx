export function SceneSetup() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.6} color="#334455" />

      {/* Main directional light with shadows */}
      <directionalLight
        position={[15, 25, 20]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />

      {/* Fill light */}
      <directionalLight position={[-10, 8, -10]} intensity={0.4} color="#4488cc" />

      {/* Rim light */}
      <directionalLight position={[0, -5, 15]} intensity={0.3} color="#6688ff" />

      {/* Fog */}
      <fog attach="fog" args={[0x0a0a12, 0, 80]} />
    </>
  );
}
