import CategoryLinks from "@/components/main/CategoryLinks";
import CameraLight from "@/components/three/CameraLight";
import Controls from "@/components/three/Controls";
import BackgroundStars from "@/components/three/galaxy/BackgroundStars";
import GalaxyPoints from "@/components/three/galaxy/GalaxyPoints";
import { CAMERA_FAR, CAMERA_POSITION } from "@/constants/camera";
import Products from "@/routes/products";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Group, type Object3DEventMap } from "three";

const ThreeCanvas = () => {
  const galaxyRef = useRef<Group<Object3DEventMap>>(null!);
  const camera = {
    position: CAMERA_POSITION,
    far: CAMERA_FAR,
  };

  const { cameraToCurrentView, setCameraToCurrentView, isMoving, isWarping } =
    useCameraStore();

  const { view, setView } = useViewStore();

  const [dpr, setDpr] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/");
    if (!isWarping) {
      if (path.length == 1) setView("HOME");
      else {
        setView(path[1]);
      }
    }
  }, [location, setView, isWarping]);

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundColor: "#070614",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="h-screen w-screen"
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
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
              {location.pathname.split("/")[1] === "product" && <Products />}
              {!isMoving && location.pathname.split("/")[1] !== "product" && (
                <CategoryLinks location={location.pathname.split("/")[1]} />
              )}
            </GalaxyPoints>
            <Controls />
            <CameraLight />
          </Canvas>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ThreeCanvas;
