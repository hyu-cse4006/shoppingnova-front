import GalaxyInstance from "@/components/three/galaxy/GalaxyInstance";
import { STARS_NUM, starTypes } from "@/constants/galaxy";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

interface PropsType {
  number?: number;
  isCustom?: boolean;
  children?: React.ReactNode;
}

export default function GalaxyPoints({
  number = STARS_NUM,
  isCustom = false,
  children,
}: PropsType) {
  const galaxyRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => (galaxyRef.current.rotation.y += delta / 100));

  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < starTypes.size.length; i++) {
      const count = number * starTypes.percentage[i];
      const size = starTypes.size[i];
      const color = starTypes.color[i];
      starList.push(
        <GalaxyInstance
          count={count}
          size={size}
          color={color}
          key={i}
          isCustom={isCustom}
        />
      );
    }
    return starList;
  }, []);

  return (
    <group ref={galaxyRef}>
      {stars}
      {children}
    </group>
  );
}
