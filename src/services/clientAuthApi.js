
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
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useClientLoginMutation,
  useClientRegisterMutation,

} = clientAuthApi;
