import Header from "@/components/common/Header";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import { useUserInfo } from "@/utils/global/useUserInfo";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { id, setId } = useUserInfo();
  useEffect(() => {
    const savedId = sessionStorage.getItem("id");
    if (savedId) {
      setId(+savedId);
    }
  }, [setId]);
  return (
    <div className="app" style={{ position: "relative" }}>
      {/* <HomeAnimateContainer /> */}
      <Header />
      <Outlet />
      <ThreeCanvas />
    </div>
  );
};

export default Home;
