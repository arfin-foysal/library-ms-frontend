import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const publisherApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "publisherApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Publisher"],
  endpoints: (builder) => ({

    getPublisharList: builder.query({
      query: () => ({
        url: "admin/all-publishar-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Publisher"],
    }),

    
    publisharCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-publishar`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Publisher"],
    }),
    deletePublishar: builder.mutation({
      query: (id) => ({
        url: `admin/delete-publishar/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Publisher']
    }),

  }),
});

export const { 
  useGetPublisharListQuery,
  usePublisharCreateOrUpdateMutation,
  useDeletePublisharMutation

} =
publisherApi;
