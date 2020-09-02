import api  from "./api";

export const sendMessageAPI = params => {
  return api.post("/admin/chat", params);
};

export const loginChatAPI = params => {
  return api.post("/admin/login", params);
};

export const getListChatAPI = params => {
  return api.get("/admin/chat", params);
};
