import { categories } from "@/constants/category";
import { useCurrentCategory } from "@/utils/global/useCurrentCategory";
import React, { useEffect, useState } from "react";
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
    top: 12px;
    border-top: 0.5px dashed #ccc;
    z-index: 0;
  `,
  RightLine: styled.div`
    width: 100%;
    position: absolute;
    left: 50%;
    top: 12px;
    border-top: 0.5px dashed #ccc;
    z-index: 0;
  `,
};
const CategoryView = () => {
  const [items, setItems] = useState<string[]>(["home"]);
  return (
    <S.Container>
      {items.map((item, idx) => (
        <S.Item key={idx}>
          <div>{idx !== 0 && <S.LeftLine />}</div>
          <S.Dot />
          <S.Text>{item}</S.Text>
          <div>{idx < items.length - 1 && <S.RightLine />}</div>
        </S.Item>
      ))}
    </S.Container>
  );
};

export default CategoryView;
