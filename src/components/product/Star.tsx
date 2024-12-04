import { DISTANCE_LIMIT } from "@/constants/galaxy";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

type StarProps = {
  color: string | number;
  children?: React.ReactNode;
} & MeshProps;

export default function Star({ color, children, ...props }: StarProps) {
  const innerRef = useRef<Mesh>(null!);
  useFrame((state, delta) => {
    const cameraDistance = innerRef.current
      .getWorldPosition(new Vector3())
      .distanceTo(state.camera.position);
    const scale = Math.log((cameraDistance / DISTANCE_LIMIT) * Math.E);

    if (cameraDistance > DISTANCE_LIMIT) {
      innerRef.current!.scale.x = scale;
      innerRef.current!.scale.y = scale;
      innerRef.current!.scale.z = scale;
    }

    innerRef.current.rotation.x += delta / 5;
    innerRef.current.rotation.y += delta / 5;
  });
  return (
    <mesh ref={innerRef} {...props}>
      <sphereGeometry args={[160, 320, 160]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
      />
      {children}
    </mesh>
  );
}
