import UserHomePage from "../pages/User/Home";
import Register from "../pages/User/Register";
import Login from "../pages/User/Login";
import NotFound from "../pages/NotFound";
import UserDetailsPage from "../pages/User/UserDetailsPage";
import EmailConfirmationPage from "../pages/User/EmailConfirmationPage";
import UserSettings from "../pages/User/UserSettings";
import ForgetPassword from "../pages/User/ForgetPassword";
import RessetPassword from '../pages/User/ResetPassword'
import Messages from "../pages/User/Messages";
import Archieve from "../pages/User/Archive";

export const privateRoutes = [
  { 
    path: "/", 
    element: <UserHomePage /> 
  },
  {
    path: '/users/:username',
    element: <UserDetailsPage/>
  },
  {
    path: '/settings',
    element: <UserSettings/>
  },
  {
    path: '/messages',
    element: <Messages/>
  },
  {
    path: '/archive',
    element: <Archieve/>
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
  },
  {
    path: '/forget-password',
    element: <ForgetPassword/>
  },
  {
    path: '/reset',
    element: <RessetPassword/>
  },
];
