import Product from "@/components/product/Product";
import categories from "@/utils/\bcategory";
import useAxios from "@/utils/hook/useAxios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductType = Record<string, string | number>;

const Products = () => {
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
  return (
    <div>
      {productList.map((_, idx) => (
        <Product key={idx} />
      ))}
    </div>
  );
};

export default Products;
