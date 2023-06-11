import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clientHeaders,  } from "../utils/ApiHeaders";

export const ClientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllBookItem: builder.query({
      query: ({limit}) => ({
        url: `client/get-all-item?limit=${limit}`,
        method: "GET",
        headers:clientHeaders,
      }),
      providesTags: ["Client"],
    }),
    getHomePageBook: builder.query({
      query: () => ({
        url: "client/get-home-page-book",
        method: "GET",
        headers:clientHeaders,
      }),
      providesTags: ["Client"],
    }),

    getAuthorAndItem: builder.query({
      query: () => ({
        url: "client/get-author-and-item",
        method: "GET",
        headers:clientHeaders,
      }),
      providesTags: ["Client"],
    }),

    // categoryCreateOrUpdate: builder.mutation({
    //   query: (body) => {
    //     return {
    //       url: `client/profile-update`,
    //       method: "POST",
    //       body: body,
    //       headers:clientHeaders,
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
        headers:clientHeaders,
      }),
      invalidatesTags: ["Client"],
    }),


    profileUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `client/profile-update`,
          method: "POST",
          body: body,
          headers:clientHeaders,
        };
      },
      invalidatesTags: ["Client"],
    }),

    getSingleUser: builder.query({
      query: () => ({
        url: `client/single-user`,
        method: "GET",
        headers:clientHeaders,
      }),
      providesTags: ["Client"],
    }),
    boweredBookByUser: builder.query({
      query: () => ({
        url: `client/rent-item-by-user`,
        method: "GET",
        headers:clientHeaders,
      }),
      invalidatesTags: ["Client"],
    }),
    pendingBoweredList: builder.query({
      query: () => ({
        url: `client/pending-order-list`,
        method: "GET",
        headers:clientHeaders,
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { 
  useGetAllBookItemQuery,
  useGetItemByIdQuery,
  useGetAuthorAndItemQuery,
  useGetSingleUserQuery,
  useProfileUpdateMutation,
  useBoweredBookByUserQuery,
  usePendingBoweredListQuery,
  useGetHomePageBookQuery,
  
 } = ClientApi;
