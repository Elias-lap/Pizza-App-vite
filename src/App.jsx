import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu ,{loader as MenuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder ,{action as creatorderAction} from "./features/order/CreateOrder";
import Order,{loader as idOrder} from "./features/order/Order";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement:<Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader:MenuLoader,
        errorElement:<Error/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      { path: "/order/new", element: <CreateOrder /> ,action:creatorderAction},
      { path: "/order/:orderId", element: <Order /> ,loader :idOrder ,errorElement:<Error/>},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
