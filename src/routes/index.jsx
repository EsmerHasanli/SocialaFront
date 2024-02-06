import UserHomePage from "../pages/User/Home";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import NotFound from "../pages/NotFound";
import UserDetailsPage from "../pages/User/UserDetailsPage";
import EmailConfirmationPage from "../pages/User/EmailConfirmationPage";

export const privateRoutes = [
  { 
    path: "/", 
    element: <UserHomePage /> 
  },
  {
    path: '/users/:username',
    element: <UserDetailsPage/>
  },
];

export const publicRoutes = [
  { 
    path: "/login", 
    element: <Login /> 
  },
  { 
    path: "/register", 
    element: <Register /> 
  },
  {
    path: '/confirm',
    element: <EmailConfirmationPage/>
  }
];
