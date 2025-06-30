import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (query) => ({
        url: `users?${query}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    getAdmin: builder.query({
      query: (query) => ({
        url: `users?usertype=admin&${query}`,
        method: "GET",
      }),
    }),
    getCounters: builder.query({
      query: (query) => ({
        url: `counters`,
        method: "GET",
      }),
    }),
    getNotifications: builder.query({
      query: (query) => ({
        url: `notifications?${query}`,
        method: "GET",
      }),
    }),
    updateNotifications: builder.query({
      query: (query) => ({
        url: `notifications/${query}`,
        method: "GET",
      }),
    }),
    getWorker: builder.query({
      query: (query) => ({
        url: `users?usertype=worker&${query}`,
        method: "GET",
      }),
    }),
    getProfile: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: `products?${query}`,
        method: "GET",
      }),
    }),
    getFines: builder.query({
      query: (query) => ({
        url: `fines?${query}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    deleteProductCardImage: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/delete-product-image/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),

    approveUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: {
          username: "bikashroy123",
          dismissal: 0,
          email: "bikash@gmail.com",
          emloyeer_name: "turik",
          first_name: "bikash",
          last_name: "roy",
          major: 0,
          minor: 0,
          phone: "01773372120",
          site_address: "dhaka",
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
    imageDelete: builder.mutation({
      query: (body) => ({
        url: `users/delete-cards`,
        method: "PATCH",
        body: body,
      }),
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/update-notes-2/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    newnote: builder.mutation({
      query: ({ id, body }) => ({
        url: `note/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    getHel: builder.query({
      query: (query) => ({
        url: `get-hello`,
        method: "GET",
      }),
    }),
    phoneChange: builder.mutation({
      query: (body) => ({
        url: `number`,
        method: "PATCH",
        body: body,
      }),
    }),
    otpVaryFy: builder.mutation({
      query: (body) => ({
        url: `user/send-otp`,
        method: "POST",
        body: body,
      }),
    }),
    getPaymentMethods: builder.mutation({
      query: (body) => ({
        url: `payment-method`,
        method: "POST",
        body: body,
      }),
    }),
    setPassword: builder.mutation({
      query: (body) => ({
        url: `user/set-password`,
        method: "PATCH",
        body: body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `fp-otp-verify`,
        method: "PATCH",
        body: body,
      }),
    }),
    verifyOtpLogin: builder.mutation({
      query: (body) => ({
        url: `otp-verify`,
        method: "PATCH",
        body: body,
      }),
    }),
    strikesUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `user/${id}/strikes`,
        method: "PATCH",
        body: body,
      }),
    }),
    addGa1: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}/ga1`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteGa1: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}/ga1`,
        method: "DELETE",
        body: body,
      }),
    }),
    getCountry: builder.query({
      query: (query) => ({
        url: `counters`,
        method: "GET",
      }),
    }),
    getReports: builder.query({
      query: (query) => ({
        url: `reports?${query}`,
        method: "GET",
      }),
    }),
    getStripeProducts: builder.query({
      query: (query) => ({
        url: `stripe-products?username=${query}`,
        method: "GET",
      }),
    }),
    workerPermission: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}/permission`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAdminQuery,
  useGetWorkerQuery,
  useCreateUserMutation,
  useGetStripeProductsQuery,
  useApproveUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProfileQuery,
  useGetProductsQuery,
  useDeleteProductMutation,
  useSetPasswordMutation,
  useUpdateProductMutation,
  useGetCountersQuery,
  useGetNotificationsQuery,
  useUpdateNotificationsQuery,
  useImageDeleteMutation,
  useDeleteProductCardImageMutation,
  useGetPaymentMethodsMutation,
  useAddProductMutation,
  useGetFinesQuery,
  useUpdateNoteMutation,
  useNewnoteMutation,
  usePhoneChangeMutation,
  useVerifyOtpLoginMutation,
  useOtpVaryFyMutation,
  useVerifyOtpMutation,
  useStrikesUserMutation,
  useAddGa1Mutation,
  useDeleteGa1Mutation,
  useGetCountryQuery,
  useGetReportsQuery,
  useWorkerPermissionMutation,
} = adminApi;
