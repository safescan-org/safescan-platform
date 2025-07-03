import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authMiddleware } from "./authMiddleware";
import { addSearch } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://xjdfp31iah.execute-api.us-east-1.amazonaws.com/api/v1",
    prepareHeaders: (headers) => {
      // Get the token from sessionStorage
      const tokenString = sessionStorage.getItem("token");

      if (tokenString !== null) {
        // Set the Bearer token in the headers
        const token = JSON.parse(tokenString);
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh-token",
        method: "GET",
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: `users`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          if (error?.error?.status) {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
          }
        }
      },
    }),
    loadMe: builder.query({
      query: (query) => ({
        url: `user/${query}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          sessionStorage.setItem("user_details", JSON.stringify(result?.data));
          dispatch(addSearch(result?.data));
        } catch (error) {}
      },
    }),
    loadSubscription: builder.query({
      query: (query) => ({
        url: `subscription-details?subscription_id=${query}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);

          // sessionStorage.setItem("user_details", JSON.stringify(result?.data));
        } catch (error) {}
      },
    }),
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export const {
  useRefreshTokenQuery,
  useLoadUserQuery,
  useLoadMeQuery,
  useLoadSubscriptionQuery,
} = apiSlice;
