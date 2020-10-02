

import api  from "./api";

export const getListNewFeedAPI = params => {
  return api.get("/user/my_feed", params);
};

export const postAddNewFeedAPI = body => {
  return api.post("/user/post", body);
};