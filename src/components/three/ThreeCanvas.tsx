import OrbitConrols from "@/components/three/OrbitConrols";
import Galaxy from "@/components/three/Galaxy";
import { Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const ThreeCanvas = () => {
  return (
    <>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 1);
        }}
      >
        {/* <OrbitControls enablePan={false} /> */}

        <Suspense fallback={null}>
          <OrbitConrols />
          <PerspectiveCamera position={[0, 3, 2]} />
          {/* <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh> */}
          <Galaxy />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default ThreeCanvas;
