import categories from "@/utils/\bcategory";
import useAxios from "@/utils/hook/useAxios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const mapCateID = (name: string | undefined) => {
    categories.find(
      (item) =>
        item.name.toLowerCase().replace(/ /g, "_").replace("&", "") === name
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
    const config = {
      method: "GET",
      url: "http://3.35.58.101:8080/api/category/products",
      headers: {
        "Content-Type": "application/json",
      },
      params: mapCateID(params),
    };
    fetchData(config);
    if (response && response.data) {
      console.log(response);
      setProductList(response.data);
    }
  }, []);
  return <div></div>;
};

export default Products;
