import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const commonApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "commonApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_API_URL,
  // }),
  tagTypes: ["Common"],
  endpoints: (builder) => ({

    getLanguageList: builder.query({
      query: () => ({
        url: "admin/all-language-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),

    
    languageCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-language`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Common"],
    }),
    deleteLanguage: builder.mutation({
      query: (id) => ({
        url: `admin/delete-language/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Common']
    }),

    //<-------------------- all country api ------------------------>

    getCounteryList: builder.query({
      query: () => ({
        url: "admin/all-countery-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),

    
    counteryCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-countery`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Common"],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `admin/delete-countery/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Common']
    }),


    dashboardSummery: builder.query({
      query: () => ({
        url: "admin/dashboard-summery",
        method: "GET",
        headers,
      }),
      providesTags: ["Common","Rent"],
    }),

  }),
});

export const { 
  useGetLanguageListQuery,
  useLanguageCreateOrUpdateMutation,
  useDeleteLanguageMutation,
  // <------------------- country api ------------------------>
  useGetCounteryListQuery,
  useCounteryCreateOrUpdateMutation,
  useDeleteCountryMutation,
  useDashboardSummeryQuery
  


 } =
commonApi;
