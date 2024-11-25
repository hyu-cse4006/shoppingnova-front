import { OrbitControls as ThreeControl } from "@react-three/drei";
import type { OrbitControlsProps as ThreeControlProps } from "@react-three/drei";

type OrbitControlsProps = ThreeControlProps;
export default function OrbitConrols(props: OrbitControlsProps) {
  return (
    <>
      <ThreeControl {...props} />
    </>
  );
}
