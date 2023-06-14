import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const bookItemApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "bookItemApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["BookItem"],
  endpoints: (builder) => ({
    getBookItemList: builder.query({
      query: () => ({
        url: "admin/all-item-list/",
        method: "GET",
        // headers,
      }),
      providesTags: ["BookItem"],
    }),

    bookItemCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-item`,
          method: "POST",
          body: body,
          // headers,
        };
      },
      invalidatesTags: ["BookItem"],
    }),
    deleteBookItem: builder.mutation({
      query: (id) => ({
        url: `admin/delete-item/${id}`,
        method: "DELETE",
        // headers,
      }),
      invalidatesTags: ["BookItem"],
    }),


    getDateExpiredList: builder.query({
      query: () => ({
        url: "admin/date-expired-item",
        method: "GET",
        // headers,
      }),
      invalidatesTags: ["BookItem"],
    }),
  }),
});

export const {
  useGetBookItemListQuery,
  useBookItemCreateOrUpdateMutation,
  useDeleteBookItemMutation,
  useGetDateExpiredListQuery,
} = bookItemApi;
