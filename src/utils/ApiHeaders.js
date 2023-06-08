import Cookies from "js-cookie";
export const headers = {
  Authorization: `Bearer ${Cookies.get("library_user_token")}`,
  "Access-Control-Allow-Origin": "*",
};
export const clientHeaders = {
  Authorization: `Bearer ${Cookies.get("client_library_user_token")}`,
  "Access-Control-Allow-Origin": "*",
};
