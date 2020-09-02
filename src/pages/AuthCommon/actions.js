export const ActionTypes = {
  SHOW_LOADING_AUTH: "SHOW_LOADING_AUTH",
  HIDE_LOADING_AUTH: "HIDE_LOADING_AUTH",
  SHOW_LOADING_EVENT: "SHOW_LOADING_EVENT",
  HIDE_LOADING_EVENT: "HIDE_LOADING_EVENT",
};

export const actions = {
  showLoadingAuth: function () {
    return {
      type: ActionTypes.SHOW_LOADING_AUTH    
    };
  },
  hideLoadingAuth: function () {
    return {
      type: ActionTypes.HIDE_LOADING_AUTH,
    };
  },
  showLoadingEvent: function () {
    return {
      type: ActionTypes.SHOW_LOADING_EVENT    
    };
  },
  hideLoadingEvent: function () {
    return {
      type: ActionTypes.HIDE_LOADING_EVENT,
    };
  },
};

