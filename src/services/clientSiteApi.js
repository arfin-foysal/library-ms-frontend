import { apiSlice } from './../store/api/apiSlice';

export const clientSiteApi = apiSlice.injectEndpoints({
  reducerPath: "clientSiteApi",
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllBookItem: builder.query({
      query: ({ limit }) => ({
        url: `client/get-all-item?limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    getHomePageBook: builder.query({
      query: () => ({
        url: "client/get-home-page-book",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),

    getAuthorAndItem: builder.query({
      query: () => ({
        url: "client/get-author-and-item",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),

    getItemById: builder.query({
      query: (Id) => ({
        url: `client/get-item-by-id/${Id}`,
        method: "GET",
      }),
      invalidatesTags: ["Client"],
    }),
    virtualItemView: builder.query({
      query: (Id) => ({
        url: `client/virtual-item-view/${Id}`,
        method: "GET",
      }),
      invalidatesTags: ["Client"],
    }),

    profileUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `client/profile-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Client"],
    }),

    getSingleUser: builder.query({
      query: () => ({
        url: `client/single-user`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    boweredBookByUser: builder.query({
      query: () => ({
        url: `client/rent-item-by-user`,
        method: "GET",
      }),
      invalidatesTags: ["Client"],
    }),
    pendingBoweredList: builder.query({
      query: () => ({
        url: `client/pending-order-list`,
        method: "GET",
      }),
      invalidatesTags: ["Client"],
    }),
    itemReturnTimeExpired: builder.query({
      query: () => ({
        url: `client/item-return-time-expired`,
        method: "GET",
      }),
      invalidatesTags: ["Client"],
    }),
    itemRentCreateClient: builder.mutation({
      query: (body) => {
        return {
          url: `client/item-rent-create-client`,
          method: "POST",
          body: body,
        };
      },
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
  useItemRentCreateClientMutation,
  useItemReturnTimeExpiredQuery,
  useVirtualItemViewQuery,
} = clientSiteApi;
