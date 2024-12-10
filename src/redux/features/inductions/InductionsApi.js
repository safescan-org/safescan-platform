import { apiSlice } from "../api/apiSlice";

export const inductionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInductions: builder.query({
      query: (query) => ({
        url: `inductions?${query}`,
        method: "GET",
      }),
    }),
    getInductionsHistory: builder.query({
      query: (query) => ({
        url: `induction-submitted-history/${query}`,
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
    updateInductions: builder.mutation({
      query: ({ id, data }) => ({
        url: `inductions/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteInductions: builder.mutation({
      query: (id) => ({
        url: `induction/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateInductionsMutation,
  useGetInductionsQuery,
  useUpdateInductionsMutation,
  useDeleteInductionsMutation,
  useGetInductionsHistoryQuery,
} = inductionsApi;
