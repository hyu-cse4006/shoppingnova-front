import Header from "@/components/common/Header";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import { useUserToken } from "@/utils/global/useUserToken";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { token, setToken } = useUserToken();
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [setToken]);
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
