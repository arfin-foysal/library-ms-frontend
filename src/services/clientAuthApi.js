
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
  }),
});

export const { useClientLoginMutation } = clientAuthApi;
