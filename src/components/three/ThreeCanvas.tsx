import CategoryLinks from "@/components/main/CategoryLinks";
import CameraLight from "@/components/three/CameraLight";
import BackgroundStars from "@/components/three/galaxy/BackgroundStars";
import Galaxy from "@/components/three/galaxy/Galaxy";
import GalaxyPoints from "@/components/three/galaxy/GalaxyPoints";
import { CAMERA_FAR, CAMERA_POSITION } from "@/constants/camera";
import { useCameraStore } from "@/store/useCameraStore";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import { type Group, type Object3DEventMap } from "three";

const ThreeCanvas = () => {
  const galaxyRef = useRef<Group<Object3DEventMap>>(null!);
  const camera = {
    position: CAMERA_POSITION,
    far: CAMERA_FAR,
  };

  const { cameraToCurrentView, setCameraToCurrentView } = useCameraStore();

  const [dpr, setDpr] = useState(1);

  return (
    <div className="h-screen w-screen">
      <Canvas
        dpr={dpr}
        camera={camera}
        onWheel={(e) =>
          setCameraToCurrentView(cameraToCurrentView + e.deltaY * 3)
        }
      >
        <PerformanceMonitor
          onChange={({ factor }) => {
            setDpr(0.5 + factor / 2);
          }}
        />
        <EffectComposer>
          <Bloom
            intensity={0.4}
            mipmapBlur
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
        </EffectComposer>

        <color attach="background" args={["#070614"]} />
        <ambientLight color="#fff" intensity={1} />

        <BackgroundStars />
        <GalaxyPoints>
          <CategoryLinks />
        </GalaxyPoints>
        <CameraLight />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
