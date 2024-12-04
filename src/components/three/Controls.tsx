import { CAMERA_POST_VIEW } from "@/constants/camera";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { OrbitControls } from "@react-three/drei";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
    isWarping,
    setIsWarping,
    setIsMoving,
    reset,
  } = useCameraStore();
  const { view, setView, displayItem } = useViewStore();
  const state = useThree();

  useEffect(() => {
    setCameraToCurrentView(currentView.distanceTo(state.camera.position));
  }, []);
  useFrame((state, delta) => {
    const targetPosition = position.set(0, 0, 0);
    const LENGTH_LIMIT = ((cameraToCurrentView + 5000) * delta) / 2;

    if (targetView) {
      targetView.getWorldPosition(targetPosition);
      const distance = targetPosition.clone().sub(state.camera.position);
      distance.y = 0;
      if (distance.length() > LENGTH_LIMIT) distance.setLength(LENGTH_LIMIT);
      state.camera.position.add(distance);
    }

    if (targetView && targetPosition !== currentView) {
      const direction = targetPosition.sub(currentView);

      if (direction.length() > LENGTH_LIMIT) {
        direction.setLength(LENGTH_LIMIT);
        setIsMoving(true);

        setCurrentView(currentView.add(direction));
        if (targetView)
          setPostViewCamera(state.camera, currentView, LENGTH_LIMIT);
        else setCameraPosition(state.camera, currentView, cameraToCurrentView);
        controlsRef.current.target = currentView;
      } else if (isWarping) {
        reset();
        setView(isWarping);
        setIsWarping(null);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={displayItem}
      enableRotate={displayItem}
      enableZoom={displayItem}
    />
  );
}
