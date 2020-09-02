import api  from "./api";

export const postLoginApi = params => {
  return api.post("/admin/login", params);
};

export const postAuthAdminApi = () => {
  return api.get("/admin/auth");
};

export const postLogoutAdminApi = token => {
  return api.post("/admin/logout", token);
};

export const postChangePasswordAdminApi = params=> {
  return api.post("/admin/change_password", params);
};