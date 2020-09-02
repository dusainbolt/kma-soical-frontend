import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";

export const Routes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Homepage,
  },
  {
    name: "Home1",
    path: "/home",
    exact: true,
    component: Homepage,
  },
];

export const RoutesAuth = [
  {
    name: "Welcome",
    path: "/welcome",
    exact: true,
    component: LoginPage,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: LoginPage,
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    exact: true,
    component: LoginPage,
  },
];
