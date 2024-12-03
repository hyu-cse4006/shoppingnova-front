import categories from "@/utils/\bcategory";
import useAxios from "@/utils/hook/useAxios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const mapCateID = (name: string | undefined) => {
    return categories.find(
      (category) =>
        category.name.toLowerCase().replace(/ /g, "_").replace("&", "") === name
    );
  };
  const { categoryName } = useParams();
  const { response, error, fetchData } = useAxios();
  const [productList, setProductList] = useState<
    Record<string, string | number>[]
  >([]);
  useEffect(() => {
    const params = categoryName
      ?.toLowerCase()
      .replace(/ /g, "_")
      .replace("&", "");
    console.log(params);
    const config = {
      method: "GET",
      url: `http://3.35.58.101:8080/api/products/${mapCateID(params).id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchData(config);
  }, [categoryName]);
  useEffect(() => {
    if (response && response.data) {
      setProductList(response.data);
    }
  }, [response]);
  return (
    <div>
      {productList.length > 0 ? (
        productList.map((item, idx) => <div key={idx}>{item.name}</div>)
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default Products;
