import Star from "@/components/product/Star";
import { SimpleProduct } from "@/components/product/type";
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
  product: SimpleProduct;
}

export default function Product({ meshProps, color, product }: ProductProps) {
  const { targetView, setTargetView, isMoving } = useCameraStore();
  const { setViewType } = useViewStore();

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
    setViewType("Detail");
    setTargetView(meshRef.current);
    navigate(path + page + "/product/" + product.id);
    setIsHovered(false);
  };
  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    console.log(e);
    e.stopPropagation();
    if (!isMoving && !id) setIsHovered(true);
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
        <Html
          style={{
            transform: "translate3d(calc(-50%), calc(-120%), 0)",
          }}
        >
          <ItemDetailModal product={product} />
          {/* <Label>{product.name}</Label> */}
        </Html>
      )}
    </Star>
  );
}
