import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Author"],
  endpoints: (builder) => ({

    getAuthorList: builder.query({
      query: () => ({
        url: "admin/all-author-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Author"],
    }),

    
    branchSaveOrUpdate: builder.mutation({
      query: (branch) => {
        return {
          url: `admin/branch-save-or-update`,
          method: "POST",
          body: branch,
          headers,
        };
      },
      invalidatesTags: ["Author"],
    }),
    getBranchListByCompanyId: builder.query({
      query: (comId) => ({
        url: `admin/branch-list-by-company-id/${comId}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Author']
    }),
  }),
});

export const { useGetAuthorListQuery } =
authorApi;
