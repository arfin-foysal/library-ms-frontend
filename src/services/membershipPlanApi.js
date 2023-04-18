import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const membershipPlanApi = createApi({
  reducerPath: "membershipPlanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["MembershipPlan"],
  endpoints: (builder) => ({

    getMembershipList: builder.query({
      query: () => ({
        url: "admin/all-membership-list",
        method: "GET",
        headers,
      }),
      providesTags: ["MembershipPlan"],
    }),

    
    membershipCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-membership`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["MembershipPlan"],
    }),
    deleteMembership: builder.mutation({
      query: (id) => ({
        url: `admin/delete-membership/${id}`,
        method: 'DELETE',
        headers
      }),
      invalidatesTags: ['MembershipPlan']
    }),

  }),
});

export const { 
  useGetMembershipListQuery,
  useMembershipCreateOrUpdateMutation,
  useDeleteMembershipMutation,
 } =
membershipPlanApi;
