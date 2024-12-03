import Header from "@/components/common/Header";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="app transition-all ease-in"
      style={{ position: "relative" }}
    >
      {/* <HomeAnimateContainer /> */}
      <Header />
      <ThreeCanvas />
      <Outlet />
    </div>
  );
};

export default Home;
