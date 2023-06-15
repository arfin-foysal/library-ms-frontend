import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: localStorage.getItem("library_user")
    ? JSON.parse(localStorage.getItem("library_user"))
    : null,
  permissions: localStorage.getItem("library_permissions")
    ? JSON.parse(localStorage.getItem("library_permissions"))
    : null,
  token: Cookies.get("library_user_token")
    ? Cookies.get("library_user_token")
    : null,
  role: localStorage.getItem("library_user_role")
    ? JSON.parse(localStorage.getItem("library_user_role"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      Cookies.set("library_user_token", action.payload, { expires: 2 });
    },

    authUser: (state, action) => {
      localStorage.setItem("library_user", JSON.stringify(action.payload));
    },

    userRole: (state, action) => {
      localStorage.setItem("library_user_role", JSON.stringify(action.payload));
    },

    userPermission: (state, action) => {
      localStorage.setItem(
        "library_permissions",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      Cookies.remove("library_user_token");
      localStorage.removeItem("library_user");
      localStorage.removeItem("library_permissions");
      localStorage.removeItem("library_user_role");

      state.user = null;
      state.permissions = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { authUser, userPermission, userRole, authToken, logout } =
  authSlice.actions;
export default authSlice.reducer;
