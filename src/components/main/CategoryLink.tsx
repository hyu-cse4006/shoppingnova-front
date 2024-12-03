import { useCameraStore } from "@/store/useCameraStore";
import { Html } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
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
  Container: styled.div`
    width: 200px;
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
    line-height: 48px;
    letter-spacing: 0.04em;
    text-align: center;
    color: white;
  `,
  Item: styled.button`
    background: transparent;
    width: 60px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #4676f0;
    outline: 1px solid #4676f0; /* 외부 테두리 */
    outline-offset: -6px;
    border-radius: 50%;
  `,
};

export default function CategoryLink({ data }: LinkProps) {
  const { targetView, setTargetView } = useCameraStore();

  const groupRef = useRef<Group>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <group
      position={new Vector3(data.position.x, data.position.y, data.position.z)}
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Html center>
        <S.Container
          onClick={() =>
            navigate(
              `/category/${data.name
                .toString()
                .toLowerCase()
                .replace(/ /g, "_")
                .replace("&", "")}`
            )
          }
        >
          <S.Title>{data.name}</S.Title>
          <S.Item />
        </S.Container>
      </Html>
    </group>
  );
}
