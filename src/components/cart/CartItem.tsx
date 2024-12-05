import { useUserInfo } from "@/utils/global/useUserInfo";
import useAxios from "@/utils/hook/useAxios";
import React, { SetStateAction, useEffect } from "react";
import styled from "styled-components";
type CartItemType = {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  name: string;
  price: number;
  image_url1: string;
  rating: number;
  isDummy?: boolean;
};

type ItemProps = {
  item: CartItemType;
  setItems: React.Dispatch<SetStateAction<CartItemType[]>>;
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
    position: relative;
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
    font-size: 28px;
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
    & > img {
      width: 100px;
      height: 100px;
    }
  `,
  DetailBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & > span {
      font-family: Abel;
      font-size: 20px;
      font-weight: 400;
      line-height: 30.59px;
      letter-spacing: 0.04em;
      text-align: left;
      color: white;
    }
  `,
  BtnBox: styled.div`
    position: absolute;
    top: 53%;
    right: 8%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    z-index: 5;
  `,
  Button: styled.button`
    cursor: pointer;
    background: linear-gradient(145deg, #4a4a4a, #303030);
    color: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    &:active {
      transform: scale(0.9);
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5),
        inset -1px -1px 3px rgba(255, 255, 255, 0.1);
    }
  `,
};
const CartItem = ({ item, setItems }: ItemProps) => {
  const { response: changeResponse, fetchData: fetchChange } = useAxios();
  const { response: itemResponse, fetchData: fetchItem } = useAxios();

  const { id, setId } = useUserInfo();
  const onBtnClick = (signal: number) => {
    const config = {
      method: "",
      url: "",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        product_id: +item.product_id,
      },
    };
    if (signal === 1) {
      config.url = `http://3.35.58.101:8080/api/cart/${id}/add_cart`;
      config.method = "POST";
    } else {
      config.url = `http://3.35.58.101:8080/api/cart/${id}/del_cart`;
      config.method = "DELETE";
    }
    fetchChange(config);
  };
  useEffect(() => {
    if (changeResponse) {
      console.log(changeResponse);

      // 장바구니 데이터 갱신 요청
      const config = {
        method: "GET",
        url: `http://3.35.58.101:8080/api/cart/${id}/intro`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetchItem(config);
    }
  }, [changeResponse]);

  useEffect(() => {
    if (itemResponse && itemResponse.data) {
      console.log(itemResponse);
      const updatedItems = itemResponse.data.map((item: CartItemType) => ({
        ...item,
        isDummy: false,
      }));
      const dummyItem = {
        id: -1,
        product_id: -1,
        user_id: -1,
        quantity: 0,
        name: "",
        price: 0,
        image_url1: "",
        rating: 0,
        isDummy: true,
      };
      setItems([dummyItem, ...updatedItems, dummyItem]);
    }
  }, [itemResponse]);
  return (
    <S.Container>
      <S.BtnBox>
        <S.Button onClick={() => onBtnClick(1)}>+</S.Button>
        <S.Button onClick={() => onBtnClick(2)}>-</S.Button>
      </S.BtnBox>
      <S.ContentBox>
        <S.Title>{item.name}</S.Title>
        <S.Content>
          <S.Box>
            <img src={item.image_url1} />
          </S.Box>
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
