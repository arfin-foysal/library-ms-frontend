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

    // getSubCategoryListByCategory: builder.query({
    //   query: (categoryId) => ({
    //     url: `admin/sub-category-by-category-id/${categoryId}`,
    //     method: "GET",
    //     headers,
    //   }),
    //   providesTags: ["Client"],
    // }),
  }),
});

export const { 
  useGetAllBookItemQuery,
 } = ClientApi;
