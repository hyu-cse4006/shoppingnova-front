import { style } from "motion/react-client";
import React from "react";
import styled from "styled-components";
const S = {
  // 추후 position 추가
  Container: styled.div`
    width: 400px;
    height: 240px;
    padding: 30px;
    border-radius: 8px;
    background: #2e2e2ec9;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    opacity: 0.8;
    position: relative;
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
    & > span:nth-child(1) {
      font-family: Abel;
      font-size: 32px;
      font-weight: 400;
      line-height: 30.59px;
      letter-spacing: 0.04em;
      text-align: left;
      color: white;
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
const ItemDetailModal = () => {
  return (
    <S.Container>
      <S.Box />
      <S.DetailBox>
        <span>Name: </span>
        <span>Price: </span>
        <span>Rate: </span>
        <span>Rate Number: </span>
      </S.DetailBox>
      <S.MoreDetailBtn>
        <span>More in Detail</span>
      </S.MoreDetailBtn>
    </S.Container>
  );
};

export default ItemDetailModal;
