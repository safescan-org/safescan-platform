import { apiSlice } from "../api/apiSlice";

export const inductionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInductions: builder.query({
      query: (query) => ({
        url: `inductions&${query}`,
        method: "GET",
      }),
    }),
    createInductions: builder.mutation({
      query: (data) => ({
        url: "inductions",
        method: "POST",
        body: data,
      }),
    }),
    approve: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/approve/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    plan: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
    useCreateInductionsMutation
} = inductionsApi;
