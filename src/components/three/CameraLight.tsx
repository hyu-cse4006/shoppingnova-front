import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight } from "three";

export default function CameraLight() {
  const lightRef = useRef<DirectionalLight>(null!);
  useFrame((state) => {
    lightRef.current.position.copy(state.camera.position);
  });
  return <directionalLight ref={lightRef} intensity={3} />;
}
