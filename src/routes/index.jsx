import AdminRout from "../pages/Admin/AdminRout";
import Dashboard from "../pages/Admin/Dashboard";

import UserRout from "../pages/User/UserRout";
import UserHomePage from "../pages/User/Home";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";

export const ROUTES = [
  {
    path: "/",
    element: <UserRout />,
    children: [
      {
        index: true,
        element: <UserHomePage />,
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminRout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];
