import api  from "./api";

export const postRegisterAPI = body => {
  return api.post("/user/signup", body);
};

export const getEmptyUserAPI = params => {
  return api.get("/user/user_empty", params);
};

export const postConfirmCodeAPI = body => {
  return api.post("/user/confirm_code", body);
};

export const postLoginAPI = body => {
  return api.post("/user/login", body);
};