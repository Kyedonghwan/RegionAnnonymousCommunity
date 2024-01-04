import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./routes/Profile";
import DeleteAccount from "./routes/DeleteAccount";
import Logout from "./routes/Logout";
import "./global.scss";
import Layout from "./components/layout/Layout";
import Aside from "./components/layout/Aside";
import ProtectedRoute from "./components/ProtectedRoute";
import TestUserHome from "./redux/TestUserHome";
import Main from "./routes/Main";
import PostDetailRoute from "./routes/PostDetailRoute";
import PostWroteRoute from "./routes/PostWroteRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <>
          <Aside />
          <Main />
        </>
      },
      {
        path: "/postDetail/:id",
        element: <>
          <Aside />
          <PostDetailRoute />
        </>
      },
      {
        path: "/postWrote/:id",
        element: <>
          <Aside />
          <PostWroteRoute />
        </>
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deleteAccount",
        element: (
          <ProtectedRoute>
            <DeleteAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",

        element: <Logout />,
      },
      {
        path: "/test",
        element: <TestUserHome />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
