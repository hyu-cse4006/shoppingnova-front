import Home from "@/routes";
import { Login } from "@/routes/login";
import { Register } from "@/routes/register";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./mainpage";
import Cart from "./cart";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
