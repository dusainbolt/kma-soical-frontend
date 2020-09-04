import api  from "./api";

export const postRegisterAPI = body => {
  return api.post("/user/signup", body);
};

export const getEmptyUserAPI = body => {
  return api.get("/user/user_empty", body);
};