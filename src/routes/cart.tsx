import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CartItem from "@/components/cart/CartItem";

const S = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    box-sizing: border-box;
    border-radius: 0 8px 8px 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `,
  CartWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
  `,
  ItemWrapper: styled.div<{ isLarge: boolean }>`
    width: 90%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: scale(${({ isLarge }) => (isLarge ? 1.1 : 1)});
    opacity: ${({ isLarge }) => (isLarge ? 1 : 0.8)};
    border-radius: 8px;
    box-sizing: border-box;
  `,
};

const Cart = () => {
  const [activeItemIdx, setActiveItemIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = [
    { name: "", price: 0, quantity: 0, isDummy: true },
    { name: "abds", price: 10000000, quantity: 1 },
    { name: "vzcx", price: 20300000, quantity: 3 },
    { name: "gzc", price: 30800000, quantity: 4 },
    { name: "nvc", price: 400000, quantity: 2 },
    { name: "qwe", price: 2030450, quantity: 1 },
    { name: "jhgfc", price: 859200, quantity: 2 },
    { name: "", price: 0, quantity: 0, isDummy: true },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkVisibleItem = () => {
      // 컨테이너 위치 & 크기 정보
      const containerRect = container.getBoundingClientRect();
      // 컨테이너의 중간
      const containerMiddle = containerRect.top + containerRect.height / 2;

      let closestItemIndex = 0;
      // 최소 거리 무한대로 초기화
      let minDistance = Infinity;

      itemRefs.current.forEach((itemRef, index) => {
        if (!itemRef) return;

        const itemRect = itemRef.getBoundingClientRect();
        const itemMiddle = itemRect.top + itemRect.height / 2;

        // 컨테이너 중앙과 아이템 중앙 사이의 거리 계산
        const distance = Math.abs(containerMiddle - itemMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closestItemIndex = index;
        }
      });

      setActiveItemIdx(closestItemIndex);
    };

    // 스크롤 이벤트 리스너 추가
    container.addEventListener("scroll", checkVisibleItem);

    // 초기 로드 시 한 번 실행
    checkVisibleItem();

    // 클린업 함수
    return () => {
      container.removeEventListener("scroll", checkVisibleItem);
    };
  }, []);

  return (
    <S.Container ref={containerRef}>
      <S.CartWrapper>
        {items.map((item, index) => (
          <S.ItemWrapper
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            isLarge={activeItemIdx === index}
            style={item.isDummy ? { visibility: "hidden", height: "80px" } : {}}
          >
            {!item.isDummy && <CartItem item={item} />}
          </S.ItemWrapper>
        ))}
      </S.CartWrapper>
    </S.Container>
  );
};

export default Cart;
