import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({

    getCategoryList: builder.query({
      query: () => ({
        url: "admin/all-category-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Category"],
    }),

    
    categoryCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-category`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `admin/delete-category/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Category']
    }),

    //<-----------------All Sub Category API Request Start------------------>

    getSubCategoryList: builder.query({
      query: () => ({
        url: "admin/all-sub-category-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Category"],
    }),

    getSubCategoryListByCategory: builder.query({
      query: (categoryId) => ({
        url: `admin/sub-category-by-category-id/${categoryId}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Category"],
    }),

    
    subCategoryCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-sub-category`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `admin/delete-sub-category/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Category']
    }),
    //<-----------------All Third Sub Category API Request Strat------------------>
    
    getThirdSubCategoryList: builder.query({
      query: () => ({
        url: "admin/all-third-sub-category-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Category"],
    }),
    getThirdSubCategoryListbySubcategotyId: builder.query({
      query: (subcategoryId) => ({
        url: `admin/third-sub-category-by-sub-category-id/${subcategoryId}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Category"],
    }),

    
    thirdsubCategoryCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-third-sub-category`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Category"],
    }),
    
    deleteThirdSubCategory: builder.mutation({
      query: (id) => ({
        url: `admin/delete-third-sub-category/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['Category']
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useCategoryCreateOrUpdateMutation,
  useDeleteCategoryMutation,
  //<-----------------All Sub Category API Request Start------------------>
  useGetSubCategoryListQuery,
  useGetSubCategoryListByCategoryQuery,
  useSubCategoryCreateOrUpdateMutation,
  useDeleteSubCategoryMutation,
  //<-----------------All Third Sub Category API Request Strat------------------>

  useGetThirdSubCategoryListQuery,
  useThirdsubCategoryCreateOrUpdateMutation,
  useDeleteThirdSubCategoryMutation,
  useGetThirdSubCategoryListbySubcategotyIdQuery,

  

} =
categoryApi;
