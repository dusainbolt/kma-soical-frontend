import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import WelcomePage from "./pages/Welcome";

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
    component: WelcomePage,
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
    component: RegisterPage,
  },
];
