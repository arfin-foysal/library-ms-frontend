
import { apiSlice } from "../store/api/apiSlice";
import { headers } from "../utils/ApiHeaders";
export const clientAuthApi = apiSlice.injectEndpoints({
  reducerPath: "clientAuth",
  tagTypes: ["clientAuth"],
  endpoints: (builder) => ({
    clientLogin: builder.mutation({
      query: (body) => ({
        url: "auth/client-login",
        method: "POST",
        body,
        headers,
      }),
      providesTags: ["clientAuth"],
    }),
    clientRegister: builder.mutation({
      query: (body) => ({
        url: "/auth/client-register",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["clientAuth"],
    }),
    passwordChange: builder.mutation({
      query: (body) => ({
        url: "/client/password-change",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["clientAuth"],
    }),


    
  }),
});


export const { useClientLoginMutation,
  useClientRegisterMutation,
  usePasswordChangeMutation,

} = clientAuthApi;
