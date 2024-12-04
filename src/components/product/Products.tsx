import Product from "@/components/product/Product";
import { ProductType } from "@/components/product/type";
import { getSpherePositions } from "@/components/three/galaxy/positions";
import { starTypes } from "@/constants/galaxy";
import { categories } from "@/constants/category";
import useAxios from "@/utils/hook/useAxios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useThree } from "@react-three/fiber";

const Products = () => {
  const { raycaster, camera } = useThree();

  useEffect(() => {
    // 카메라는 레이어 1을 렌더링 대상으로 유지
    camera.layers.enable(1);

    // Raycaster만 레이어 1을 감지하지 않도록 설정
    raycaster.layers.disable(1);
  }, [raycaster, camera]);

  const mapCateID = (name: string | undefined) => {
    return categories.find(
      (category) =>
        category.name.toLowerCase().replace(/ /g, "_").replace("&", "") === name
    );
  };
  const { categoryName } = useParams();

  const { response, error, fetchData } = useAxios();
  const [productList, setProductList] = useState<ProductType[]>([]);
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

  const productMap = useMemo(
    () =>
      productList.map((product, idx) => (
        <Product
          meshProps={{
            position: getSpherePositions(1, 1.3),
          }}
          product={product}
          color={starTypes.color[idx % starTypes.color.length]}
          key={idx}
        />
      )),
    [productList]
  );
  return <>{productMap}</>;
};

export default Products;
