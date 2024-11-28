import CategoryLink from "@/components/main/CategoryLink";
import React from "react";

const MainPage = () => {
  const items = [
    { name: "PC & MONITOR", id: 1 },
    { name: "TV & AUDIO", id: 2 },
    { name: "KITCHEN APPLIANCE", id: 3 },
    { name: "LAUNDRY APPLIANCE", id: 4 },
  ];
  const positions = [
    { top: "20%", left: "50%", transform: "translate(-50%, -50%)" },
    { top: "50%", left: "28%", transform: "translate(-50%, -50%)" },
    { top: "40%", left: "73%", transform: "translate(-50%, -50%)" },
    { top: "80%", left: "52%", transform: "translate(-50%, -50%)" },
  ];
  return (
    <>
      {items.map((item, index) => {
        return (
          <CategoryLink key={index} item={item} position={positions[index]} />
        );
      })}
    </>
  );
};

export default MainPage;
