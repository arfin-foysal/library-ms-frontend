import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const authApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "authApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
        headers,
      }),
      providesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        headers,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "auth/change-password",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["Auth"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "auth/update-password",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["Auth"],
    }),




  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useClientLoginMutation


} = authApi;