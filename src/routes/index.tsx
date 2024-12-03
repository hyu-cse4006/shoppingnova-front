import ThreeCanvas from "@/components/three/ThreeCanvas";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="app" style={{ position: "relative" }}>
      {/* <HomeAnimateContainer /> */}
      <Outlet />
      <ThreeCanvas />
    </div>
  );
};

export default Home;
