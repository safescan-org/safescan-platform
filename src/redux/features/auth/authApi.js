// import { decodeJWT } from "../../../helper/jwt";
import { apiSlice } from "../api/apiSlice";
import { addOtp, userLoggedIn, userRegistration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "user/regester",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.token,
              code: "",
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "user/signin",
        method: "POST",
        body: {
          username,
          password,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          sessionStorage.setItem("token", JSON.stringify(result?.data?.token));
          sessionStorage.setItem("user", JSON.stringify(result?.data?.user));
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.token,
              user: result?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    otpSend: builder.mutation({
      query: (data) => ({
        url: "user/send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            addOtp({
              otpData: result?.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "user/update-password",
        method: "PATCH",
        body: body,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: "user/set-password",
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useOtpSendMutation,
  useSetNewPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
