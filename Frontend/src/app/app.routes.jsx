import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/Products/Pages/CreateProduct";
import Dashboard from "../features/Products/Pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/Products/Pages/Home";
import ProductDetails from "../features/Products/Pages/ProductDetails";
import SellerProductDetails from "../features/Products/Pages/SellerProductDetails";
import Cart from "../features/cart/Pages/Cart.jsx";
import Layout from "./Layout.jsx";
import Wishlist from "../features/wishlist/Pages/Wishlist.jsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/product/:productId",
                element: <ProductDetails />
            },
            {
                path: "/seller",
                children: [
                    {
                        path: "/seller/create-product",
                        element: <Protected role="seller"><CreateProduct /></Protected>
                    },
                    {
                        path: "/seller/dashboard",
                        element: <Protected role="seller"><Dashboard /></Protected>
                    },
                    {
                        path: "/seller/product/:productId",
                        element: <Protected role="seller"><SellerProductDetails /></Protected>
                    }
                ]
            },
            {
                path: "/cart",
                element: <Protected role={["buyer", "seller"]}><Cart /> </Protected>
            },
            {
                path: "/wishlist",
                element: <Protected role={["buyer", "seller"]}><Wishlist /> </Protected>
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])