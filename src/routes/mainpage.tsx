import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";

const MainPage = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default MainPage;
