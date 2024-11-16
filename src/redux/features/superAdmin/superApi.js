import { apiSlice } from "../api/apiSlice";


export const superApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customers:builder.query({
        query:(query)=>({
            url:`users?usertype=super_admin&${query}`,
            method:"GET",
        })
    }),
    approveCustomers:builder.query({
      query:(query)=>({
          url:`users?usertype=super_admin&${query}`,
          method:"GET",
      })
  }),
    createCustomer:builder.mutation({
      query:(data)=>({
        url: "user/signup",
        method: "POST",
        body: data,
      })
    }),
    approve:builder.mutation({
      query:({id,data})=>({
        url: `user/approve/${id}`,
        method: "PATCH",
        body: data,
      })
    }),
    plan:builder.mutation({
      query:({id,data})=>({
        url: `user/${id}`,
        method: "PATCH",
        body: data,
      })
    }),
    
  }),
});

export const {
    useCustomersQuery,
    useApproveCustomersQuery,
    useCreateCustomerMutation,
    useApproveMutation,
    usePlanMutation,
} = superApi;
