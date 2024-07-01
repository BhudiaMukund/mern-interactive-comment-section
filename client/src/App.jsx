import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CommentPage, LoginPage, LogoutPage } from "./pages";

import { loader as commentPageLoader } from "./pages/CommentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommentPage />,
    loader: commentPageLoader,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router}>App</RouterProvider>;
};

export default App;
