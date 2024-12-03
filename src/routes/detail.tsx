import React from "react";
import styled from "styled-components";

const S = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    box-sizing: border-box;
    /* 추후 헤더 높이 빼기 */

    opacity: 0.9;
  `,
  ContentBox: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 40px;
    background-color: #414141;
    padding: 20px;
    box-sizing: border-box;
  `,
  ImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `,
  //   추후 img 로 수정
  MainImg: styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    /* object-fit: contain; */
    background: #d9d9d9;
  `,
  ImgList: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;

    & > div {
      width: 22%;
      height: 100px;
      background-color: white;
    }
  `,
  InfoBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,
  MainInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    color: white;
    width: 100%;
  `,
  Name: styled.span`
    font-family: Agdasima;
    font-size: 36px;
    font-weight: 400;
    line-height: 88.81px;
    letter-spacing: 0.04em;
    text-align: left;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;
      width: 100%;
      & > span {
        font-family: Agdasima;
        font-size: 28px;
        font-weight: 400;
        line-height: 65.12px;
        letter-spacing: 0.04em;
        text-align: left;
      }
    }
  `,
  DetailBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #8383834d;
    opacity: 0.8;
    padding: 20px;
    gap: 8px;
    width: 100%;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      & > span {
        font-family: Agdasima;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0.04em;
        text-align: left;
        color: white;
      }
      & > span:nth-child(1) {
        flex: 0 0 150px;
      }
      & > span:nth-child(2) {
        flex: 1;
      }
    }
  `,
};
const Detail = () => {
  return (
    <S.Container>
      <S.ContentBox>
        <S.ImgBox>
          <S.MainImg />
          <S.ImgList>
            <div />
            <div />
            <div />
            <div />
          </S.ImgList>
        </S.ImgBox>
        <S.InfoBox>
          <S.MainInfo>
            <S.Name>Name</S.Name>
            <S.Info>
              <div>
                <span>Price: </span>
                <span>Release Date: </span>
              </div>
              <div>
                <span>Rate: </span>
                <span>Rate Number: </span>
              </div>
            </S.Info>
          </S.MainInfo>
          <S.DetailBox>
            <div>
              <span>weight(kg)</span>
              <span>213</span>
            </div>
            <div>
              <span>size(mm)</span>
              <span>1280*823*12</span>
            </div>
            <div>
              <span>resolution</span>
              <span>HD</span>
            </div>
            <div>
              <span>processor</span>
              <span>Alpha</span>
            </div>
            <div>
              <span>sound(W)</span>
              <span>60</span>
            </div>
            <div>
              <span>plugin</span>
              <span>----</span>
            </div>
          </S.DetailBox>
        </S.InfoBox>
      </S.ContentBox>
    </S.Container>
  );
};

export default Detail;
