import Header from "@/components/common/Header";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import { Outlet } from "react-router-dom";

const Home = () => {
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
