import { useViewStore } from "@/store/useViewStore";
import { categories } from "@/constants/category";
import { useCurrentCategory } from "@/utils/global/useCurrentCategory";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
  `,
  Item: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    width: 40px;
  `,
  Dot: styled.div`
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1;
  `,
  Text: styled.span`
    font-family: Poppins;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    line-height: 22.5px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  `,
  LeftLine: styled.div`
    width: 100%;
    position: absolute;
    right: 50%;
    top: 14px;
    border-top: 0.5px dashed #ccc;
    z-index: 0;
  `,
  RightLine: styled.div`
    width: 100%;
    position: absolute;
    left: 50%;
    top: 14px;
    border-top: 0.5px dashed #ccc;
    z-index: 0;
  `,
};
const CategoryView = () => {
  const [items, setItems] = useState<string[]>(["HOME"]);
  const { view, setView } = useViewStore();
  const location = useLocation();
  useEffect(() => {
    // 빈 문자열 제거
    const path = location.pathname.split("/").filter(Boolean);
    if (path.length === 0) {
      setItems(["HOME"]);
      return;
    }
    const currentCategoryName =
      path[path.length - 1].toLowerCase() === "product" && path.length > 1
        ? path[path.length - 2]
        : path[path.length - 1];
    const currentItem = categories.find((item) => {
      return item.name.toLowerCase() === currentCategoryName.toLowerCase();
    });

    console.log(path);
    if (currentItem) {
      setItems((prevItems) => {
        const newItem = currentItem.name.replace(/ /g, "_").replace("&", "");
        return prevItems.includes(newItem)
          ? prevItems
          : [...prevItems, newItem];
      });
    }
  }, [location]);
  return (
    <S.Container>
      {items.map((item, idx) => (
        <>
          <S.Item key={idx}>
            <div>{idx !== 0 && <S.LeftLine />}</div>
            <S.Dot />
            <S.Text>{item}</S.Text>
            <div>{idx < items.length - 1 && <S.RightLine />}</div>
          </S.Item>
        </>
      ))}
    </S.Container>
  );
};

export default CategoryView;
