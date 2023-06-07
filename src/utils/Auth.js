import Cookies from "js-cookie";
const role = JSON.parse(localStorage.getItem("library_user_role"));
export const authUser = localStorage.getItem("library_user_role")
  ? role.toLowerCase()
  : "";

export const authUserToken = Cookies.get("library_user_token") ? "token" : "";



const clientRole = JSON.parse(localStorage.getItem("client_library_user_role"));
export const clientAuthUser = localStorage.getItem("client_library_user_role")
  ? clientRole.toLowerCase()
  : "";

export const clientAuthUserToken = Cookies.get("client_library_user_token") ? "token" : "";

