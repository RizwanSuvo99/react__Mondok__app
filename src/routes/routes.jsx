// eslint-disable-next-line no-unused-vars
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
