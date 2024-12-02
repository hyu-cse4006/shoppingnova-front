import React from "react";
import styled from "styled-components";
import CategoryView from "./CategoryView";
import { useUserToken } from "@/utils/global/useUserToken";
const S = {
  Container: styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
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
    min-height: 32px;
    padding: 4px 12px 4px 12px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    & > span {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 400;
      line-height: 22.5px;
      letter-spacing: 0.04em;
      text-align: center;

      color: white;
    }
  `,
};
const Header = () => {
  const { token, setToken } = useUserToken();
  return (
    <S.Container>
      <CategoryView />
      <S.Logo>
        <span>LG</span>
        <span>VERSE</span>
      </S.Logo>
      {token !== "" && (
        <S.SigninBtn>
          <span>Sign in</span>
        </S.SigninBtn>
      )}
    </S.Container>
  );
};

export default Header;
