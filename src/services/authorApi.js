import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const authorApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "authorApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Author"],
  endpoints: (builder) => ({

    getAuthorList: builder.query({
      query: () => ({
        url: "admin/all-author-list",
        method: "GET",
        // headers,
      }),
      providesTags: ["Author"],
    }),

    
    authorCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-author`,
          method: "POST",
          body: body,
          // headers,
        };
      },
      invalidatesTags: ["Author"],
    }),
    deleteAuthor: builder.mutation({
      query: (id) => ({
        url: `admin/delete-author/${id}`,
        method: 'DELETE',
        // headers
      }),
      invalidatesTags: ['Author']
    }),

  }),
});

export const { useGetAuthorListQuery,useAuthorCreateOrUpdateMutation,useDeleteAuthorMutation } =
authorApi;
