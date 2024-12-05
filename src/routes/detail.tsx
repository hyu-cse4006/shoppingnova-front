import useAxios from "@/utils/hook/useAxios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import image from "../assets/shopping-cart.png";
import { useUserInfo } from "@/utils/global/useUserInfo";

type DetailProps = {
  productId: string;
};
type ProductDetail = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category_id: number;
  image_url1: string | null;
  image_url2: string | null;
  image_url3: string | null;
  image_url4: string | null;
  weight: number | null;
  resolution: string | null;
  resolution1: number | null;
  resolution2: number | null;
  plugin: string | null;
  processor: string | null;
  sound: string | null;
  color: string | null;
  energy: string | null;
  rate_num: number | null;
  release_date: number | null;
  size_x: number | null;
  size_y: number | null;
  size_z: number | null;
  door_count: number | null;
  volume_cold: number | null;
  volume_freeze: number | null;
};

const S = {
  Container: styled.div`
    width: 60vw;

    box-sizing: border-box;

    top: 50%;

    transform: translate(-50%, -50%);
    z-index: 10;
    position: relative;
  `,
  CartBtn: styled.div`
    position: absolute;
    right: 16px;
    top: 8px;
    & > img {
      width: 36px;
      height: 36px;
    }

    cursor: pointer;
  `,
  ContentBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    width: 40%;
  `,
  //   추후 img 로 수정
  MainImg: styled.img`
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

    & > img {
      cursor: pointer;
      width: 25%;
      height: 25%;

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
    font-size: 20px;
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
        font-size: 18px;
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
const Detail = ({ productId }: DetailProps) => {
  console.log(productId);
  const { response: productResponse, fetchData: fetchProductData } = useAxios();
  const { response: cartResponse, fetchData: fetchCartData } = useAxios();
  const [productInfo, setProductInfo] = useState<ProductDetail | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const { id, setId } = useUserInfo();
  useEffect(() => {
    const config = {
      method: "GET",
      url: `http://3.35.58.101:8080/api/product/${productId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchProductData(config);
  }, [fetchProductData]);
  useEffect(() => {
    if (productResponse && productResponse.data) {
      setProductInfo(productResponse.data);
    }
  }, [productResponse]);

  // 장바구니 담기
  const onCartClick = useCallback(() => {
    const config = {
      method: "POST",
      url: `http://3.35.58.101:8080/api/cart/${id}/add_cart`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id: id,
        product_id: productId,
      },
    };
    fetchCartData(config);
  }, [fetchCartData]);

  const handleImageClick = (imageUrl: string | null) => {
    if (imageUrl) setMainImage(imageUrl);
  };

  // 메인 이미지 설정
  useEffect(() => {
    if (productInfo?.image_url1) {
      setMainImage(productInfo.image_url1);
    }
  }, [productInfo]);

  useEffect(() => {
    if (cartResponse && cartResponse.data)
      alert("The product has been added to cart successfully!");
  }, [cartResponse]);
  return (
    <S.Container>
      <S.CartBtn onClick={onCartClick}>
        <img src={image} />
      </S.CartBtn>
      <S.ContentBox>
        <S.ImgBox>
          <S.MainImg src={mainImage || ""} />
          <S.ImgList>
            {productInfo?.image_url1 && (
              <img
                src={productInfo.image_url1}
                onClick={() => handleImageClick(productInfo.image_url1)}
              />
            )}
            {productInfo?.image_url2 && (
              <img
                src={productInfo.image_url2}
                onClick={() => handleImageClick(productInfo.image_url2)}
              />
            )}
            {productInfo?.image_url3 && (
              <img
                src={productInfo.image_url3}
                onClick={() => handleImageClick(productInfo.image_url3)}
              />
            )}
            {productInfo?.image_url4 && (
              <img
                src={productInfo.image_url4}
                onClick={() => handleImageClick(productInfo.image_url4)}
              />
            )}
          </S.ImgList>
        </S.ImgBox>
        <S.InfoBox>
          <S.MainInfo>
            <S.Name>{productInfo?.name}</S.Name>
            <S.Info>
              <div>
                <span>Price: {productInfo?.price}</span>
                <span>Release Date: {productInfo?.release_date}</span>
              </div>
              <div>
                <span>Rate: {productInfo?.rating}</span>
                <span>Rate Number: {productInfo?.rate_num}</span>
              </div>
            </S.Info>
          </S.MainInfo>
          <S.DetailBox>
            <div>
              <span>weight(kg)</span>
              <span>{productInfo?.weight}</span>
            </div>
            <div>
              <span>size(mm)</span>
              <span>
                {productInfo?.size_x +
                  "*" +
                  productInfo?.size_y +
                  "*" +
                  productInfo?.size_z}
              </span>
            </div>
            <div>
              <span>resolution</span>
              <span>{productInfo?.resolution}</span>
            </div>
            <div>
              <span>processor</span>
              <span>{productInfo?.processor}</span>
            </div>
            <div>
              <span>sound(W)</span>
              <span>{productInfo?.sound}</span>
            </div>
            <div>
              <span>plugin</span>
              <span>{productInfo?.plugin || "----"}</span>
            </div>
          </S.DetailBox>
        </S.InfoBox>
      </S.ContentBox>
    </S.Container>
  );
};

export default Detail;
