import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const ClientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllBookItem: builder.query({
      query: () => ({
        url: "client/get-all-item",
        method: "GET",
        headers,
      }),
      providesTags: ["Client"],
    }),
    getAuthorAndItem: builder.query({
      query: () => ({
        url: "client/get-author-and-item",
        method: "GET",
        headers,
      }),
      providesTags: ["Client"],
    }),

    // categoryCreateOrUpdate: builder.mutation({
    //   query: (body) => {
    //     return {
    //       url: `admin/create-or-update-category`,
    //       method: "POST",
    //       body: body,
    //       headers,
    //     };
    //   },
    //   invalidatesTags: ["Client"],
    // }),
    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `admin/delete-category/${id}`,
    //     method: 'DELETE',
    //     headers
    //   }),
    //   invalidatesTags: ['Client']
    // }),

    getItemById: builder.query({
      query: (Id) => ({
        url: `client/get-item-by-id/${Id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Client"],
    }),
  }),
});

export const { 
  useGetAllBookItemQuery,
  useGetItemByIdQuery,
  useGetAuthorAndItemQuery,
  
 } = ClientApi;
