import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
type PositionType = {
  top: string;
  left: string;
  transform?: string;
};
type LinkProps = {
  item: Record<string, string | number>;
  position: PositionType;
};
const S = {
  Container: styled.div<PositionType>`
    cursor: pointer;
    width: 200px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    transform: ${({ transform }) => transform || "none"};
    flex-shrink: 0;
  `,
  Title: styled.span`
    font-family: Poppins;
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0.04em;
    text-align: center;
    color: white;
  `,
  Item: styled.div`
    background: transparent;
    width: 40px;
    height: 40px;
    border: 1px solid #4676f0;
    outline: 1px solid #4676f0; /* 외부 테두리 */
    outline-offset: 5px;
    border-radius: 50%;
  `,
};
const CategoryLink = ({ item, position }: LinkProps) => {
  console.log(item);
  const navigate = useNavigate();
  return (
    <S.Container
      {...position}
      onClick={() =>
        navigate(
          `/category/${item.name
            .toString()
            .toLowerCase()
            .replace(/ /g, "_")
            .replace("&", "")}`
        )
      }
    >
      <S.Title>{item.name}</S.Title>
      <S.Item />
    </S.Container>
  );
};

export default CategoryLink;
