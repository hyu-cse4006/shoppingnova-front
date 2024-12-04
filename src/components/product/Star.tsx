import { DISTANCE_LIMIT } from "@/constants/galaxy";
import { useForwardRef } from "@/hooks/useForwardRef";
import { MeshProps, useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useRef } from "react";
import { Layers, Mesh, Vector3 } from "three";

type StarProps = {
  color: string | number;
  children?: React.ReactNode;
} & MeshProps;

const Star = forwardRef<Mesh, StarProps>(
  ({ color, children, ...props }, ref) => {
    const innerRef = useForwardRef(ref);
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
    // useEffect(() => {
    //   innerRef.current.layers.enable(1);
    // })
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
);
Star.displayName = "Star";

export default Star;
