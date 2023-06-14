import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const itemOrder = apiSliceAdmin.injectEndpoints({
  reducerPath: "itemOrder",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["ItemOrder"],
  endpoints: (builder) => ({
   allItemOrder: builder.query({
      query: () => ({
        url: "admin/all-item-order",
        method: "GET",
        headers,
      }),
      providesTags: ["ItemOrder"],
    }),


    itemOrder: builder.mutation({
      query: (body) => {
        return {
          url: `admin/item-order`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["ItemOrder"],
    }),


    deleteItemOrder: builder.mutation({
      query: (id) => ({
        url: `admin/delete-item-order/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["ItemOrder"],
    }),

    unrecevedItemByOrderId: builder.query({
      query: (id) => ({
        url: `admin/unreceved-item-by-order-id/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["ItemOrder"],
    }),

    itemOrderReceved: builder.mutation({
      query: (body) => {
        return {
          url: `admin/item-order-receved`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["ItemOrder"],
    }),
   allItemRecevedList: builder.query({
      query: () => ({
        url: "admin/all-item-receved-list",
        method: "GET",
        headers,
      }),
      invalidatesTags: ["ItemOrder"],
    }),
  }),
});

export const {
  useItemOrderMutation,
  useAllItemOrderQuery,
  useDeleteItemOrderMutation,
  useUnrecevedItemByOrderIdQuery,
  useItemOrderRecevedMutation,
  useAllItemRecevedListQuery,
} = itemOrder;
