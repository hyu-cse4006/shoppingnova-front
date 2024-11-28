import React from "react";
import styled from "styled-components";
import CartItem from "@/components/cart/CartItem";

const S = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;

    box-sizing: border-box;
    border-radius: 0 8px 8px 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `,
  CartWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  `,
  ItemWrapper: styled.div<{ isLarge: boolean }>`
    width: 80%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    transform: scale(${({ isLarge }) => (isLarge ? 1.2 : 1)});
    opacity: ${({ isLarge }) => (isLarge ? 1 : 0.85)};
    border-radius: 8px;
    box-sizing: border-box;
  `,
};

const Cart = () => {
  const items = [
    { name: "abds", price: 10000000, quantity: 1 },
    { name: "vzcx", price: 20300000, quantity: 3 },
    { name: "gzc", price: 30800000, quantity: 4 },
    { name: "nvc", price: 400000, quantity: 2 },
    { name: "qwe", price: 2030450, quantity: 1 },
    { name: "jhgfc", price: 859200, quantity: 2 },
  ];

  return (
    <S.Container>
      <S.CartWrapper>
        {items.map((item, index) => (
          <S.ItemWrapper key={index} isLarge={index === 2}>
            <CartItem item={item} />
          </S.ItemWrapper>
        ))}
      </S.CartWrapper>
    </S.Container>
  );
};

export default Cart;
