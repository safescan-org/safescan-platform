import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardNav from "./DashboardNav";
import { useGetProfileQuery } from "../../redux/features/admin/adminApi";
import { useLoadMeQuery } from "../../redux/features/api/apiSlice";

const Main = () => {
  // const { user } = useSelector((state) => state.auth);
  const path = useLocation();
  const tokenString = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const queryitem = `${user?.userid}?username=${user?.username}`;

  const { data,refetch } = useGetProfileQuery(queryitem);

  // ======this query need not delete=======
  const {data:data2} = useLoadMeQuery(queryitem)



  useEffect(()=>{
    if(path.pathname){
      refetch()
    }
  },[path])

  useEffect(()=>{
    if(data){
      if(data?.account_status==="rejected"){
        sessionStorage.setItem("token", JSON.stringify(""));
        sessionStorage.setItem("user", JSON.stringify(""));
      }
    }
  },[data])

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !tokenString || user?.admin_serial === 1) {
      navigate("/");
    }
  }, [user,tokenString]);

  return (
    <>
      {/* {!user ? (
        <>
            <Loader></Loader>
        </>
      ) : ( */}
        <>
          <div className=" flex bg-[#F4F7FE]">
            <div className=" bg-white">
              {/* ----------------admin Dashboard sidebar here----------------- */}
              <Sidebar />
            </div>
            <div className="bg-[#F4F7FE] xl:px-[20px] w-full px-4 min-h-[100vh]">
              {/* Admin dashboard outlet create */}
              <DashboardNav />
              <div className=" w-full">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </>
      {/* )} */}
    </>
  );
};

export default Main;
