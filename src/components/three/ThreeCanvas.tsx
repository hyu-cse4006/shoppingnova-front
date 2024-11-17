import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
const ThreeCanvas = () => {
  return (
    <>
      <Canvas shadows>
        {/* <OrbitControls enablePan={false} /> */}

        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={0.75} />
          <OrbitControls />
          <mesh scale={[1, 1, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
          <mesh scale={[1, 1, 1]} position={[0, 0, -10]}>
            <boxGeometry args={[1000, 1000, 1]} />
            <meshStandardMaterial />
          </mesh>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default ThreeCanvas;
