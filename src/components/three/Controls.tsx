import { CAMERA_POST_VIEW } from "@/constants/camera";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { OrbitControls } from "@react-three/drei";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const setCameraPosition = (
  camera: Camera,
  currentView: THREE.Vector3,
  distance: number
) => {
  const direction = currentView
    .clone()
    .sub(camera.position)
    .setLength(camera.position.distanceTo(currentView) - distance);
  camera.position.add(direction);
};

const setPostViewCamera = (
  camera: Camera,
  currentView: THREE.Vector3,
  LENGTH_LIMIT: number
) => {
  const distance = camera.position.distanceTo(currentView);
  const direction = currentView.clone().sub(camera.position);

  if (distance - CAMERA_POST_VIEW > LENGTH_LIMIT)
    direction.setLength(LENGTH_LIMIT);
  else if (CAMERA_POST_VIEW - distance > LENGTH_LIMIT)
    direction.setLength(-LENGTH_LIMIT);
  else
    direction.setLength(
      camera.position.distanceTo(currentView) - CAMERA_POST_VIEW
    );
  camera.position.add(direction);
};

const position = new THREE.Vector3(0, 0, 0);
export default function Controls() {
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const {
    cameraToCurrentView,
    setCameraToCurrentView,
    currentView,
    setCurrentView,
    targetView,
    setTargetView,
    isWarping,
    setIsWarping,
    setIsMoving,
    reset,
  } = useCameraStore();
  const { view, setView, viewType } = useViewStore();
  const state = useThree();
  const controlOptions = useMemo(
    () => ({
      enablePan: viewType !== "Category",
      enableZoom: viewType !== "Category",
      enableRotate: viewType !== "Category",
    }),
    [viewType]
  );
  useEffect(() => {
    setCameraToCurrentView(currentView.distanceTo(state.camera.position));
  }, [currentView, setCameraToCurrentView, state.camera.position, view]);
  useFrame((state, delta) => {
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const LENGTH_LIMIT = ((cameraToCurrentView + 5000) * delta) / 2;
    const LENGTH_MIN = 100 * delta;

    if (targetView) {
      targetView.getWorldPosition(targetPosition);
      if (viewType === "Detail") {
        targetPosition
          .sub(state.camera.position)
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 6)
          .add(state.camera.position);
        const distance = targetPosition.clone().sub(state.camera.position);
        distance.x = 0;
        distance.z = 0;
        if (distance.length() > LENGTH_LIMIT) distance.setLength(LENGTH_LIMIT);
        state.camera.position.add(distance);
      }
      if (targetPosition !== currentView) {
        const direction = targetPosition.sub(currentView);

        if (direction.length() > LENGTH_LIMIT) {
          direction.setLength(LENGTH_LIMIT);
          setIsMoving(true);
        } else {
          setIsMoving(false);
        }

        setCurrentView(currentView.add(direction));
        if (viewType !== "Detail") {
          if (direction.length() > LENGTH_MIN) {
            setIsMoving(true);
            setPostViewCamera(state.camera, currentView, LENGTH_LIMIT);
          } else if (isWarping) {
            reset();
            setView(isWarping);
            setTargetView(null);
            setIsWarping(null);
          }
        } else {
          setPostViewCamera(state.camera, currentView, LENGTH_LIMIT);
        }
        controlsRef.current.target = currentView;
      }
    }
  });

  return <OrbitControls ref={controlsRef} {...controlOptions} />;
}
