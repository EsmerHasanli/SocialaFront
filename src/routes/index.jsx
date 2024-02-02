import UserHomePage from "../pages/User/Home";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";

export const privateRoutes = [
  {path:'/', element:<UserHomePage/>},
]
export const publicRoutes = [
  {path: '/login' , element: <Login/>},
  {path: '/register', element: <Register/>},
]