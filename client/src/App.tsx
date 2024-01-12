import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./routes/Profile";
import DeleteAccount from "./routes/DeleteAccount";
import Logout from "./routes/Logout";
import "./global.scss";
import Layout from "./components/layout/Layout";
import Aside from "./components/layout/Aside";
import Main from "./routes/Main";
import PostDetailRoute from "./routes/PostDetailRoute";
import PostWroteRoute from "./routes/PostWroteRoute";
import Join from "./routes/Join";
import PostWriteRoute from "./routes/PostWriteRoute";
import FindUserId from "./routes/findAccount/FindUserId";
import FindUserPw from "./routes/findAccount/FindUserPw";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Aside />
            <Main />
          </>
        ),
      },
      {
        path: "/postDetail/:id",
        element: (
          <>
            <Aside />
            <PostDetailRoute />
          </>
        ),
      },
      {
        path: "/postWrote/:id",
        element: (
          <>
            <Aside />
            <PostWroteRoute />
          </>
        ),
      },
      {
        path: "/postWrite",
        element: (
          <>
            <Aside />
            <PostWriteRoute />
          </>
        ),
      },
      {
        path: "/profile",
        element: (
          <>
            <Aside />
            <PostWroteRoute />
          </>
        ),
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/deleteAccount/:id",
        element: <DeleteAccount />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/findid",
        element: <FindUserId />,
      },
      {
        path: "/findpw",
        element: <FindUserPw />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
