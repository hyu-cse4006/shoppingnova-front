import Home from "@/routes";
import { Login } from "@/routes/login";
import { Register } from "@/routes/register";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./mainpage";
import Cart from "./cart";
import Detail from "./detail";
import { element } from "three/webgpu";
const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            path: ":categoryName",
            element: <></>,
            children: [{ path: "product", element: <></> }],
          },
        ],
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
      {
        path: "detail",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
