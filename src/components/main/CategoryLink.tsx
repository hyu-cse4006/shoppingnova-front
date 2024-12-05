import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { Html } from "@react-three/drei";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Group, Mesh, Vector3 } from "three";

type LinkProps = {
  data: CategoryType;
};
export interface CategoryType {
  position: { x: number; y: number; z: number };
  name: string;
  id: number;
}
const S = {
  Container: styled(motion.div)`
    width: fit-content;
    gap: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
  `,
  Title: styled.span`
    font-family: Poppins;
    font-size: 32px;
    font-weight: 300;
    line-height: 28px;
    text-align: center;
    color: white;
    user-select: none;
    white-space: nowrap;
  `,
  Item: styled.button`
    background: transparent;
    width: 36px;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.9;
    border: 1px solid #4676f0;
    outline: 1px solid #4676f0;
    outline-offset: -6px;
    border-radius: 50%;
    user-select: none;
  `,
};

export default function CategoryLink({ data }: LinkProps) {
  const { targetView, setTargetView, setIsWarping } = useCameraStore();

  const groupRef = useRef<Group>(null!);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (_) => {
    const current = location.pathname.split("/");
    const path = "/";
    if (groupRef.current !== targetView) {
      setTargetView(groupRef.current);
      setIsWarping(data.name);
      if (data.name === "tv" || data.name === "refrigerator") {
        return navigate(path + data.name);
      } else {
        return navigate(path + data.name + "/product");
      }
    }
  };
  return (
    <group
      position={new Vector3(data.position.x, data.position.y, data.position.z)}
      ref={groupRef}
    >
      <Html center>
        <S.Container onClick={handleClick}>
          <S.Title>{data.name.toUpperCase()}</S.Title>
          <S.Item />
        </S.Container>
      </Html>
    </group>
  );
}
