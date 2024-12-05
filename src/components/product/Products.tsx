import Product from "@/components/product/Product";
import { SimpleProduct } from "@/components/product/type";
import { getSpherePositions } from "@/components/three/galaxy/positions";
import { starTypes } from "@/constants/galaxy";
import { categories } from "@/constants/category";
import useAxios from "@/utils/hook/useAxios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Vector3 } from "three";

function getSpherePositionsWithSep(
  size: number,
  existingPositions: Array<Vector3> = []
) {
  let position: Vector3;
  let isOverlapping;

  do {
    position = getSpherePositions(1, 1.3);

    isOverlapping = existingPositions.some((existing) => {
      const dx = existing.x - position.x;
      const dy = existing.y - position.y;
      const dz = existing.z - position.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      return distance < size;
    });
  } while (isOverlapping);
  return position;
}

const Products = () => {
  const mapCateID = (name: string | undefined) => {
    return categories.find(
      (category) =>
        category.name.toLowerCase().replace(/ /g, "_").replace("&", "") === name
    );
  };
  const { categoryName } = useParams();

  const { response, error, fetchData } = useAxios();
  const [productList, setProductList] = useState<SimpleProduct[]>([]);
  useEffect(() => {
    const category = mapCateID(
      categoryName?.toLowerCase().replace(/ /g, "_").replace("&", "")
    );
    console.log(category);
    if (!category) return;
    const config = {
      method: "GET",
      url: `http://3.35.58.101:8080/api/products/${category.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchData(config);
  }, [categoryName, fetchData]);
  useEffect(() => {
    if (response && response.data) {
      setProductList(response.data);
    }
  }, [response]);

  const productMap = useMemo(() => {
    const positions: Vector3[] = [];

    return productList.map((product, idx) => {
      const position = getSpherePositionsWithSep(600, positions);
      positions.push(position);

      return (
        <Product
          meshProps={{ position }}
          product={product}
          color={starTypes.color[idx % starTypes.color.length]}
          key={idx}
        />
      );
    });
  }, [productList]);
  return <>{productMap}</>;
};

export default Products;
