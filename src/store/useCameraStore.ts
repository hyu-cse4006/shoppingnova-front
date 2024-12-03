import { CAMERA_MAX_DISTANCE, CAMERA_MIN_DISTANCE } from "@/constants/camera";
import * as THREE from "three";
import { create } from "zustand";

interface CameraState {
  isMoving: boolean;
  setIsMoving: (isMoving: boolean) => void;
  isWarping: boolean;
  setIsWarping: (isWarping: boolean) => void;
  currentView: THREE.Vector3;
  setCurrentView: (position: THREE.Vector3) => void;
  targetView: THREE.Object3D | null;
  setTargetView: (star: THREE.Object3D | null) => void;
  cameraToCurrentView: number;
  setCameraToCurrentView: (distance: number) => void;
  reset: () => void;
}

export const useCameraStore = create<CameraState>()((set) => ({
  isMoving: false,
  setIsMoving: (isMoving) => set({ isMoving }),
  isWarping: false,
  setIsWarping: (isWarping) => set({ isWarping }),
  currentView: new THREE.Vector3(0, 0, 0),
  setCurrentView: (position: THREE.Vector3) => set({ currentView: position }),
  targetView: null,
  setTargetView: (star: THREE.Object3D | null) => set({ targetView: star }),
  cameraToCurrentView: CAMERA_MIN_DISTANCE,
  setCameraToCurrentView: (distance: number) => {
    if (distance < CAMERA_MIN_DISTANCE)
      set({ cameraToCurrentView: CAMERA_MIN_DISTANCE });
    else if (distance > CAMERA_MAX_DISTANCE)
      set({ cameraToCurrentView: CAMERA_MAX_DISTANCE });
    else set({ cameraToCurrentView: distance });
  },
  reset: () =>
    set({
      isMoving: false,
      isWarping: false,
      targetView: null,
      currentView: new THREE.Vector3(0, 0, 0),
      cameraToCurrentView: CAMERA_MIN_DISTANCE,
    }),
}));
