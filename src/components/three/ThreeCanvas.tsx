import CategoryLinks from "@/components/main/CategoryLinks";
import Products from "@/components/product/Products";
import CameraLight from "@/components/three/CameraLight";
import Controls from "@/components/three/Controls";
import BackgroundStars from "@/components/three/galaxy/BackgroundStars";
import GalaxyPoints from "@/components/three/galaxy/GalaxyPoints";
import { CAMERA_FAR, CAMERA_POSITION } from "@/constants/camera";
import Detail from "@/routes/detail";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ErrorBoundary } from "@toss/error-boundary";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Group, type Object3DEventMap } from "three";
import { Html } from "@react-three/drei";
import Cart from "@/routes/cart";

const ThreeCanvas = () => {
  const galaxyRef = useRef<Group<Object3DEventMap>>(null!);
  const camera = {
    position: CAMERA_POSITION,
    far: CAMERA_FAR,
  };

  const {
    cameraToCurrentView,
    setCameraToCurrentView,
    isMoving,
    isWarping,
    reset,
  } = useCameraStore();

  const { view, setView, viewType, setViewType } = useViewStore();

  const [dpr, setDpr] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/");
    if (!isWarping) {
      if (path.length <= 2) {
        console.log(path);
        if (path[1] === "cart") {
          setViewType("Cart");
          setView("Cart");
        } else {
          setViewType("Category");
          setView(path.length < 2 ? "HOME" : path[1]);
        }
      } else {
        setView(path[1]);
        if (path.length === 4) setViewType("Detail");
        if (path.length === 3) setViewType("Products");
      }
      reset();
    }
  }, [location, isWarping, setView, reset, setViewType]);

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
              <ErrorBoundary renderFallback={(_) => <></>}>
                {(viewType === "Products" || viewType === "Detail") && (
                  <Products />
                )}
                {!isMoving && viewType === "Category" && (
                  <CategoryLinks location={location.pathname.split("/")[1]} />
                )}
              </ErrorBoundary>
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
