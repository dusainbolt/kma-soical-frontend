import api  from "./api";

export function sendEmailApi(params){
  return api.get("user/contact_mail", params);
}