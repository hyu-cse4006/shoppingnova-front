import { useCurrentCategory } from "@/utils/global/useCurrentCategory";
import React from "react";

const CategoryView = () => {
  const { category, setCategory } = useCurrentCategory();
  return <div></div>;
};

export default CategoryView;
