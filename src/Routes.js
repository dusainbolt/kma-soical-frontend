import { FILTER_NEW_FEED } from "./common";
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
  {
    name: "GroupSubject",
    path: "/groups-subject/:subjectId",
    component: Homepage,
    exact: true,
  },
  {
    name: "HomeImage",
    path: FILTER_NEW_FEED.IMG_NEW_FEED,
    component: Homepage,
    exact: true,
  },
  {
    name: "HomeVideo",
    path: FILTER_NEW_FEED.IMG_VIDEO_FEED,
    component: Homepage,
    exact: true,
  },
  {
    name: "HomeHostNew",
    path: FILTER_NEW_FEED.IMG_HOT_FEED,
    component: Homepage,
    exact: true,
  },
  {
    name: "HomeOnlyText",
    path: FILTER_NEW_FEED.IMG_ONLY_NEW_FEED,
    component: Homepage,
    exact: true,
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
