import React from "react";
import styled from "styled-components";
type ItemType = {
  name: string;
  price: number;
  quantity: number;
};

type ItemProps = {
  item: ItemType;
};

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
  `,
  ContentBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  Title: styled.span`
    font-family: Abel;
    font-size: 32px;
    font-weight: 400;
    line-height: 40.78px;
    letter-spacing: 0.04em;
    text-align: left;
    color: white;
  `,
  Content: styled.div`
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
  // 추후 img 로 변경
  Box: styled.div`
    width: 100px;
    height: 100px;
    background-color: #d9d9d9;
  `,
  DetailBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & > span {
      font-family: Abel;
      font-size: 24px;
      font-weight: 400;
      line-height: 30.59px;
      letter-spacing: 0.04em;
      text-align: left;
      color: white;
    }
  `,
};
const CartItem = ({ item }: ItemProps) => {
  return (
    <S.Container>
      <S.ContentBox>
        <S.Title>{item.name}</S.Title>
        <S.Content>
          <S.Box />
          <S.DetailBox>
            <span>Price: {item.price}KRW</span>
            <span>Quantity: {item.quantity}</span>
            <span>Total Price: {item.quantity * item.price}KRW</span>
          </S.DetailBox>
        </S.Content>
      </S.ContentBox>
    </S.Container>
  );
};

export default CartItem;
