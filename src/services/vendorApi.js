import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const vendorApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "vendorApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Vendor"],
  endpoints: (builder) => ({
    getVendorList: builder.query({
      query: () => ({
        url: "admin/all-vendor-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Vendor"],
    }),

    vendorCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-vendor`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Vendor"],
    }),
   

    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `admin/delete-vendor/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendorPaymentList: builder.query({
      query: () => ({
        url: "admin/vendore-payment-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Vendor"],
    }),

     vendorPaymentUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/vendor-payment-update`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useGetVendorListQuery,
  useVendorCreateOrUpdateMutation,
  useDeleteVendorMutation,
  useGetVendorPaymentListQuery,
  useVendorPaymentUpdateMutation
} = vendorApi;
