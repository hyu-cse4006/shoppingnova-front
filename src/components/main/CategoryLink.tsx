import { useCameraStore } from "@/store/useCameraStore";
import { useCurrentCategory } from "@/utils/global/useCurrentCategory";
import { Html } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
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
}
const S = {
  Container: styled(motion.div)`
    width: fit-content;
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
  `,
  Title: styled.span`
    font-family: Poppins;
    font-size: 32px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.04em;
    text-align: center;
    color: white;
    user-select: none;
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
  const { targetView, setTargetView } = useCameraStore();

  const groupRef = useRef<Group>(null!);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(e);
    // e.stopPropagation();

    const splitedPath = location.pathname.split("/");
    const category = splitedPath[1];
    let path = "/";
    path += category + "/";

    if (groupRef.current !== targetView) {
      setTargetView(groupRef.current);
      // return navigate(path + data.name);
    }
  };
  return (
    <group
      position={new Vector3(data.position.x, data.position.y, data.position.z)}
      ref={groupRef}
    >
      <Html center>
        <S.Container onClick={handleClick}>
          <S.Title>{data.name}</S.Title>
          <S.Item />
        </S.Container>
      </Html>
    </group>
  );
}
