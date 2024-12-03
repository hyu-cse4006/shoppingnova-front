import useAxios from "@/utils/hook/useAxios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const categories = [
    {
      id: 1,
      name: "TV",
      parent_id: null,
    },
    {
      id: 2,
      name: "Refrigerator",
      parent_id: null,
    },
    {
      id: 3,
      name: "OLED",
      parent_id: 1,
    },
    {
      id: 4,
      name: "QNED",
      parent_id: 1,
    },
    {
      id: 5,
      name: "UltraHD",
      parent_id: 1,
    },
    {
      id: 6,
      name: "LED",
      parent_id: 1,
    },
    {
      id: 7,
      name: "LifeStyleScreen",
      parent_id: 1,
    },
    {
      id: 8,
      name: "STEM",
      parent_id: 2,
    },
    {
      id: 9,
      name: "TOP_RE_BOT_FREE",
      parent_id: 2,
    },
    {
      id: 10,
      name: "DoubleDoor",
      parent_id: 2,
    },
    {
      id: 11,
      name: "Normal",
      parent_id: 2,
    },
    {
      id: 12,
      name: "PairInstall",
      parent_id: 2,
    },
  ];
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
