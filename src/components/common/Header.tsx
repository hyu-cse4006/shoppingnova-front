import React from "react";
import styled from "styled-components";
import CategoryView from "./CategoryView";
import { useUserToken } from "@/utils/global/useUserToken";
import { useLocation, useNavigate } from "react-router-dom";
const S = {
  Container: styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    padding: 10px;
  `,
  Logo: styled.div`
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
  const { token, setToken } = useUserToken();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <S.Container>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <CategoryView />
      ) : (
        // 나머지 요소 정렬을 위해 dummy 요소 추가
        <div />
      )}

      <S.Logo>
        <span>SHOPPING</span>
        <span>NOVA</span>
      </S.Logo>
      {token === "" ? (
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
