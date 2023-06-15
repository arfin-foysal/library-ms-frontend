import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  clientUser: localStorage.getItem("client_library_user")
    ? JSON.parse(localStorage.getItem("client_library_user"))
    : null,
  clientPermissions: localStorage.getItem("client_library_permissions")
    ? JSON.parse(localStorage.getItem("client_library_permissions"))
    : null,
  clientToken: Cookies.get("client_library_user_token")
    ? Cookies.get("client_library_user_token")
    : null,
  clientRole: localStorage.getItem("client_library_user_role")
    ? JSON.parse(localStorage.getItem("client_library_user_role"))
    : null,
};

export const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState,
  reducers: {
    clientAuthToken: (state, action) => {
      Cookies.set("client_library_user_token", action.payload, { expires: 2 });
    },

    clientAuthUser: (state, action) => {
      localStorage.setItem(
        "client_library_user",
        JSON.stringify(action.payload)
      );
    },

    clientUserRole: (state, action) => {
      localStorage.setItem(
        "client_library_user_role",
        JSON.stringify(action.payload)
      );
    },

    clientUserPermission: (state, action) => {
      localStorage.setItem(
        "client_library_permissions",
        JSON.stringify(action.payload)
      );
    },

    clientLogout: (state, action) => {
      localStorage.removeItem("client_library_user");
      localStorage.removeItem("client_library_permissions");
      localStorage.removeItem("client_library_user_role");
      Cookies.remove("client_library_user_token");
      state.clientUser = null;
      state.clientPermissions = null;
      state.clientRole = null;
      state.clientToken = null;
    },
  },
});

//auto logout after 1 hour
export const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(clientLogout());
  }, time);
};

export const {
  clientAuthUser,
  clientUserPermission,
  clientUserRole,
  clientAuthToken,
  clientLogout,
} = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
