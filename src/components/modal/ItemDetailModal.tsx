import { style } from "motion/react-client";
import React from "react";
import styled from "styled-components";
import { SimpleProduct } from "../product/type";
import image from "../../assets/shopping-cart.png";
type ModalProps = {
  product: SimpleProduct;
};

const S = {
  Container: styled.div`
    min-width: 400px;
    padding: 20px;
    border-radius: 8px;
    background: #2e2e2ec9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.8;
    position: relative;
  `,
  CartBtn: styled.img`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    color: white;
  `,
  // 추후 img 로 변경
  Box: styled.img`
    width: 40%;
    object-fit: contain;
  `,
  DetailBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 50%;
    & > span {
      font-family: Abel;
      font-size: 14px;
      font-weight: 600;
      line-height: 30.59px;
      letter-spacing: 0.04em;
      text-align: left;
      color: white;
    }
    & > span:nth-child(1) {
      font-family: Abel;
      font-size: 16px;
      font-weight: 600;
      line-height: 30.59px;
      letter-spacing: 0.04em;
      text-align: left;
      color: white;
      margin-bottom: 10px;
    }
  `,
  MoreDetailBtn: styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 0 10px 0 10px;
    border-radius: 8px;
    cursor: pointer;
    background: var(--LG-RED, #a50034);
    & > span {
      font-family: Abel;
      font-size: 12px;
      font-weight: 400;
      line-height: 45.88px;
      letter-spacing: 0.04em;
    }
  `,
};
// 추후 데이터 받아와서 표출하기
const ItemDetailModal = ({ product }: ModalProps) => {
  return (
    <S.Container>
      {/* <S.CartBtn src={image} onClick={onCartClick} /> */}
      <S.Box src={product.image_url1 || product.image_url} />
      <S.DetailBox>
        <span>Name: {product.name}</span>
        <span>Price: {product.price}</span>
        <span>Rate: {product.rating}</span>
        <span>Rate Number: {product.rate_num}</span>
      </S.DetailBox>
      {/* <S.MoreDetailBtn onClick={onDetailClick}>
        <span>More in Detail</span>
      </S.MoreDetailBtn> */}
    </S.Container>
  );
};

export default ItemDetailModal;
