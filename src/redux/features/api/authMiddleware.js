import { userLoggedIn } from "../auth/authSlice";

export const authMiddleware = (api) => (next) => async (action) => {
  if (action.error && action.payload.status === 401) {
    // Unauthorized error
    // Clear token from local storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Dispatch action to clear user data or handle logout
    api.dispatch(
      userLoggedIn({
        accessToken: "",
        user: null,
      })
    ); // Assuming you have an action creator named clearUserData
  }
  return next(action);
};
