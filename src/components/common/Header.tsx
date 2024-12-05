import React from "react";
import styled from "styled-components";
import CategoryView from "./CategoryView";
import { useUserInfo } from "@/utils/global/useUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
const S = {
  Container: styled.div`
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    background: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
    position: absolute;
    top: 0;
    z-index: 10;
    background: none;
    padding: 10px;
  `,
  Logo: styled.div`
    justify-self: center;
    cursor: pointer;
    & > span:nth-child(1) {
      font-family: Abel;
      font-size: 32px;
      font-weight: 400;
      line-height: 40.78px;
      letter-spacing: 0.04em;
      text-align: center;
      color: white;
    }
    & > span:nth-child(2) {
      font-family: Abel;
      font-size: 32px;
      font-weight: 400;
      line-height: 40.78px;
      letter-spacing: 0.04em;
      text-align: center;
      color: var(--LG-RED, #a50034);
    }
  `,
  SigninBtn: styled.div`
    justify-self: end;
    padding: 8px 12px 8px 12px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > span {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-align: center;
      color: white;
    }
  `,
};
const Header = () => {
  const { id } = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(id);
  return (
    <S.Container>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <CategoryView />
      ) : (
        // 나머지 요소 정렬을 위해 dummy 요소 추가
        <div />
      )}

      <S.Logo onClick={() => navigate("/")}>
        <span>SHOPPING</span>
        <span>NOVA</span>
      </S.Logo>
      {id === null || id === undefined || id === 0 ? (
        <S.SigninBtn onClick={() => navigate("/login")}>
          <span>Sign in</span>
        </S.SigninBtn>
      ) : (
        <div />
      )}
    </S.Container>
  );
};

export default Header;
