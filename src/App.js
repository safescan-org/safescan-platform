import "./App.css";
import { Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Main from "./Layout/Main/Main";
import CustomRoutes from "./routes/CustomRoutes";
import Admins from "./Pages/Admins/Admins";
import Workers from "./Pages/Workers/Workers";
import Subscriptions from "./Pages/Subscriptions/Subscriptions";
import ProfileSettings from "./Pages/ProfileSettings/ProfileSettings";
import Products from "./Pages/Products/Products";
import CreateWorker from "./Pages/CreateWorker/CreateWorker";
import Notifications from "./Pages/Notifications/Notifications";
import CreateAdmin from "./Pages/CreateAdmin/CreateAdmin";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import ForgotPass from "./Pages/ForgotPass/ForgotPass";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SuperAdmin from "./Layout/SuperAdmin/SuperAdmin";
import Customer from "./Pages/SuperAdmin/Customer/Customer";
import "react-datepicker/dist/react-datepicker.css";
import Issues from "./Pages/Issues/Issues";
import InductionPage from "./Pages/Induction/InductionPage";


function App() {
  return (
    <>
      <div>
        <CustomRoutes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          {/* ------------------------admin dashboard route--------------------- */}
          <Route path="/admin" element={<Main></Main>}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/subscription" element={<Subscriptions />} />
            <Route path="/admin/admins" element={<Admins />} />
            <Route path="/admin/workers" element={<Workers />} />
            <Route path="/admin/assets" element={<Products />} />
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
            <Route path="/admin/create-worker" element={<CreateWorker />} />
            <Route path="/admin/reported-issues" element={<Issues />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route
              path="/admin/profile-settings"
              element={<ProfileSettings />}
            />
            <Route path="/admin/induction" element={<InductionPage />} />
          </Route>

          <Route path="/super-admin" element={<SuperAdmin />}>
            <Route path="/super-admin/customers" element={<Customer />} />
            <Route
              path="/super-admin/notifications"
              element={<Notifications />}
            />
          </Route>
        </CustomRoutes>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
