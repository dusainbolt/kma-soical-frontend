import api from "./api";

export const getListNewFeedAPI = params => {
  return api.get("/user/my_feed", params);
};

export const postAddNewFeedAPI = body => {
  return api.post("/user/post", body);
};

export const putHandleLikeFeedAPI = body => {
  return api.put("/user/handle_like", body);
};

export const getListCommentAPI = params => {
  return api.get("/user/list_comment", params);
};

export const postAddCommentAPI = params => {
  return api.post("/user/add_comment", params);
};

export const getDetailDashboardAPI = params => {
  return api.get("/user/get_user_dashboard", params);
};

export const getUserDetailAPI = params => {
  return api.get("/user/get_user_detail", params);
};

export const getFriendsDetailAPI = params => {
  return api.get("/user/get_friends_detail", params);
};
