import styled from "styled-components";

export const S = {
  Background: styled.div`
    background-color: black;
    width: 100vw;
    height: 100vh;
  `,
  Container: styled.div`
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 576px;
    height: 640px;
    padding: 40px;
    border: 1px solid #80808020;
    box-shadow: 0px 2px 4px 0px #ffffff14;
    border-radius: 8px;
    background: #1e1f20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `,
  Title: styled.span`
    font-family: Poppins;
    font-size: 32px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0.04em;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    margin-bottom: 28px;
  `,
  ContentBox: styled.div`
    position: relative;
    gap: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 12px;
    width: 100%;
    & > div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      & > input {
        width: 50%;
      }
    }
  `,
  Input: styled.input.attrs((props) => ({
    type: props.type,
    placeholder: props.placeholder,
  }))`
    width: 100%;
    height: 44px;
    padding: 6px 18px 6px 18px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px 0px 0px 0px;
    border: 1px solid var(--GRAY2, #dee2e6);
    background: #1e1f20;

    font-family: Poppins;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    letter-spacing: 0.04em;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    text-align: left;
    color: var(--GRAY2, #dee2e6);

    &:focus {
      outline: none;
      border-color: white;
    }
  `,
  CreateBtn: styled.button`
    width: 100%;
    height: 50px;
    padding: 0px 68px 0px 68px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--LG-RED, #a50034);
    font-family: Poppins;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.1em;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #ffffff;
    margin-top: 60px;
  `,
  AccountBox: styled.div`
    & > span {
      cursor: pointer;
      padding: 0px 10px;
      font-family: Poppins;
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      text-align: center;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      color: var(--GRAY1, #f1f3f5);
    }
  `,
};
