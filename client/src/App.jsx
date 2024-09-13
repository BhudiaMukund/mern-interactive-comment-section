import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CommentPage, LoginPage, AppLayout } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { loader as appLayoutLoader } from "./pages/AppLayout";
import { loader as loginPageLoader } from "./pages/LoginPage";
import { loader as commentPageLoader } from "./pages/CommentPage";

import { action as commentPageAction } from "./pages/CommentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: appLayoutLoader,
    children: [
      {
        index: true,
        element: <CommentPage />,
        loader: commentPageLoader,
        action: commentPageAction,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: loginPageLoader,
  },
]);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
