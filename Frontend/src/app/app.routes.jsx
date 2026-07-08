import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/Products/Pages/CreateProduct";
import Dashboard from "../features/Products/Pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/Products/Pages/Home";
import ProductDetails from "../features/Products/Pages/ProductDetails";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
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
            }
        ]
    }
])