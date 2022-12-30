import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home/Home";
import Media from "../../Pages/Media/Media";
import Message from "../../Pages/Message/Message";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Main /></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/media',
                element: <Media />
            },
            {
                path: '/message',
                element: <Message />
            },
            {
                path: '/about',
                element: <About></About>
            }
        ]
    },
    {
        path: '/signUp',
        element: <SignUp />
    },
    {
        path: '/SignIn',
        element: <SignIn />
    },
])