import Star from "@/components/product/Star";
import { ProductType } from "@/components/product/type";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { Html } from "@react-three/drei";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Mesh } from "three";
import ItemDetailModal from "../modal/ItemDetailModal";

interface ProductProps {
  meshProps: MeshProps;
  color: string | number;
  product: ProductType;
}

export default function Product({ meshProps, color, product }: ProductProps) {
  const { targetView, setTargetView } = useCameraStore();
  const { setView } = useViewStore();
  const meshRef = useRef<Mesh>(null!);

  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { productId: id } = useParams();

  useEffect(() => {
    if (id && Number(id) === product.id) setTargetView(meshRef.current);
  }, [id]);

  //   useFrame((_, delta) => {
  //     if (starState === "created") {
  //       if (size + delta * 300 < data.size) setSize(size + delta * 300);
  //       else {
  //         setSize(data.size);
  //         setStarState("normal");
  //       }
  //     } else if (starState === "deleted") {
  //       if (size - delta * 300 > 0) setSize(size - delta * 300);
  //       else setSize(0);
  //     }
  //   });
  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const splitedPath = location.pathname.split("/");
    const page = splitedPath[1];
    const path = "/";
    setTargetView(meshRef.current);
    navigate(path + page + "/product/" + product.id);
  };
  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <Star
      ref={meshRef}
      color={color}
      onClick={handleMeshClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...meshProps}
    >
      {isHovered && (
        <Html>
          <ItemDetailModal product={product} />
          {/* <Label>{product.name}</Label> */}
        </Html>
      )}
    </Star>
  );
}

const Label = styled.div`
  padding: 10px 15px;
  border-radius: 5px;
  width: fit-content;
  max-width: 200px;
  text-align: center;
  background-color: #05021fcc;
  border: #514b75;
  color: #cbc9df;
  transform: translate3d(calc(-50%), calc(-250%), 0);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;
