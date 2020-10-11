import api from "./api";

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

export const postLogoutAPI = body => {
  return api.post("/user/logout", body);
};

export const sendMessageAPI = body => {
  return api.post("/user/chat", body);
};

export const getListFriendsAPI = params => {
  return api.get("/user/list_friends", params);
};

export const openBoxChatAPI = params => {
  return api.get("user/list_chat", params);
};

export const getListSubjectAPI = params => {
  return api.get("user/list_subject", params);
};

export const getListHistorySearchAPI = params => {
  return api.get("user/list_search", params);
};
