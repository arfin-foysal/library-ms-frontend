import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";
// item-rent-create'
export const itemRentApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "itemRentApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Rent"],
  endpoints: (builder) => ({


    itemRentCreate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/item-rent-create`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Rent"],
    }),
    // itemAndAvailableQty
    itemAndAvailableQty: builder.query({
      query: () => ({
        url: "admin/item-and-available-qty",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),
    userListforBookIssue: builder.query({
      query: () => ({
        url: "admin/user-list-for-book-issue",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),

    itemRentsList: builder.query({
      query: () => ({
        url: "admin/item-rent-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),
    itemBuyList: builder.query({
      query: () => ({
        url: "admin/item-buy-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),



    // item-return

    itemReturn: builder.mutation({
      query: (body) => {
        return {
          url: `admin/item-return`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Rent"],
    }),
    // item-rent-delete

    deleteRents: builder.mutation({
      query: (id) => ({
        url: `admin/item-rent-delete/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ["Rent","Common"]
    }),

    bookRentActive: builder.mutation({
      query: (id) => ({
        url:`admin/book-rent-active/${id}`,
        method: 'POST',
        headers
      }),
      invalidatesTags: ["Rent",
      "Common"]
    }),
    itemDamageList: builder.query({
      query: () => ({
        url: "admin/item-damage-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),
    itemReturnList: builder.query({
      query: () => ({
        url: "admin/item-return-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Rent"],
    }),

  }),
});

export const {
  useItemRentCreateMutation,
  useItemAndAvailableQtyQuery,
  useItemRentsListQuery,
  useItemReturnMutation,
  useDeleteRentsMutation,
  useBookRentActiveMutation,
  useUserListforBookIssueQuery,
  useItemDamageListQuery,
  useItemReturnListQuery,
  useItemBuyListQuery
} = itemRentApi;
