import { Product } from "@/components/product/type";
import { useUserInfo } from "@/utils/global/useUserInfo";
import useAxios from "@/utils/hook/useAxios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import image from "@/assets/shopping-cart.png";
import { AnimatePresence, motion } from "motion/react";
import { wrap } from "motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useCameraStore } from "@/store/useCameraStore";
import { useViewStore } from "@/store/useViewStore";
import { Vector3 } from "three";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.2,
  }),
};
const swipeConfidenceThreshold = 3000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const S = {
  XBox: styled.div`
    cursor: pointer;
    position: absolute;
    left: -100px;
    width: 64px;
    height: 64px;
    top: 50%;
    transform: translateY(-50%);
    border: 3px solid #fff;
    border-radius: 50%;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(128, 128, 128, 0.1);
  `,
  Container: styled.div`
    position: relative;
    right: 0;
    width: 60vw;
    max-width: 640px;
    top: 0;
    z-index: 10;
    height: calc(100vh - 80px);
    background-color: #414141;
  `,
  CartBtn: styled.div`
    margin-left: auto;
    & > img {
      width: 36px;
      height: 36px;
    }

    cursor: pointer;
  `,
  ContentBox: styled.div`
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
  `,
  ImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    position: relative;
    padding-bottom: 100%;
  `,
  //   추후 img 로 수정
  MainImg: styled(motion.img)`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    will-change: transform, opacity;
    background: #d9d9d9;
  `,
  InfoBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px;
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
      align-items: center;
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

type ProductDetailProps = {
  productId: number;
  product: Product;
};

export default function ProductDetail({
  productId,
  product,
}: ProductDetailProps) {
  const { response: cartResponse, fetchData: fetchCartData } = useAxios();
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, product.images.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const { id, setId } = useUserInfo();
  // 장바구니 담기
  const onCartClick = useCallback(() => {
    const config = {
      method: "POST",
      url: `http://3.35.58.101:8080/api/cart/${id}/add_cart`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        product_id: +productId,
      },
    };
    fetchCartData(config);
  }, [fetchCartData]);

  const { targetView, setTargetView, setCurrentView } = useCameraStore();
  const { setViewType } = useViewStore();

  const location = useLocation();
  const navigate = useNavigate();
  const navigateToProducts = useCallback(() => {
    const path = location.pathname.split("/");
    if (path.length < 4) return;

    setViewType("Detail");
    setTargetView(null);
    setCurrentView(new Vector3(0, 0, 0));
    navigate("/" + path[1] + "/" + path[2]);
  }, [location.pathname, navigate, setCurrentView, setTargetView, setViewType]);
  useEffect(() => {
    if (cartResponse && cartResponse.data)
      alert("The product has been added to cart successfully!");
  }, [cartResponse]);
  return (
    <S.Container>
      <S.XBox onClick={navigateToProducts}>
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#fff"
          />
        </svg>
      </S.XBox>
      <S.ContentBox>
        <S.ImgBox>
          <AnimatePresence initial={false} custom={direction}>
            <S.MainImg
              key={page}
              src={product.images[imageIndex]}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
        </S.ImgBox>
        <S.InfoBox>
          <S.MainInfo>
            <S.Info>
              <div>
                <S.Name>{product.name}</S.Name>

                <S.CartBtn onClick={onCartClick}>
                  <img src={image} />
                </S.CartBtn>
              </div>
              <div>
                <span>Price: {product.price}</span>
                <span>Release Date: {product.release_date}</span>
              </div>
              <div>
                <span>Rate: {product.rating}</span>
                <span>Rate Number: {product.rate_num}</span>
              </div>
            </S.Info>
          </S.MainInfo>
          <S.DetailBox>
            <div>
              <span>weight(kg)</span>
              <span>{product.weight}</span>
            </div>
            <div>
              <span>size(mm)</span>
              <span>
                {product.size_x + "*" + product.size_y + "*" + product.size_z}
              </span>
            </div>
            <div>
              <span>resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div>
              <span>processor</span>
              <span>{product.processor}</span>
            </div>
            <div>
              <span>sound(W)</span>
              <span>{product.sound}</span>
            </div>
            <div>
              <span>plugin</span>
              <span>{product.plugin || "----"}</span>
            </div>
          </S.DetailBox>
        </S.InfoBox>
      </S.ContentBox>
    </S.Container>
  );
}
