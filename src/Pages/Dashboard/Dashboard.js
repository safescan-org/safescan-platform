import React, { useEffect } from "react";
import TopSection from "../../Components/Pages/Dashboard/TopSection";
import FinesOverview from "../../Components/Pages/Dashboard/FinesOverview";
import TotalProducts from "../../Components/Pages/Dashboard/TotalProducts";
import TotalUsers from "../../Components/Pages/Dashboard/TotalUsers";
import FinesAmount from "../../Components/Pages/Dashboard/FinesAmount";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import {
  useGetAdminQuery,
  useGetCountryQuery,
  useGetFinesQuery,
  useGetProductsQuery,
  useGetProfileQuery,
  useGetReportsQuery,
  useGetWorkerQuery,
} from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user} = useSelector((state) => state.auth);
  const path = useLocation();
  const queryitem = `${user?.userid}?username=${user?.username}`;
  const { data, refetch } = useGetProfileQuery(queryitem);

  const {
    data: admins,
    isLoading: adminsLoading,
    refetch:adminRefacth
  } = useGetAdminQuery("",{refetchOnMountOrArgChange: true});

  const { data: finesData, refetch:fineRefacth } = useGetFinesQuery("");
  const { data:issue } = useGetReportsQuery("");

  const { data: finesData2, } = useGetCountryQuery("");

  const {
    data: workers,
    // isLoading: workersLoading,
    refetch: workersRefetch,
  } = useGetWorkerQuery("",{refetchOnMountOrArgChange: true});


  const {
    data: products,
    // isLoading 
    refetch:productrefeacth
  } = useGetProductsQuery("",{refetchOnMountOrArgChange: true});

  useEffect(()=>{
    if(path.pathname){
      refetch()
      workersRefetch()
      productrefeacth()
      adminRefacth()
      fineRefacth()
    }
  },[path])
  
  return (
    <>
      <BreadCrumb
        title={"Dashboard"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Dashboard", url: "/admin/dashboard" },
        ]}
      />
      {adminsLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 mb-10">
            <TopSection issue={issue} admins={admins} workers={workers} counters={data} warning_issues={finesData2?.Items[0]?.warning_issues}/>
            <div className="lg:flex gap-5 mb-5">
              <div className="w-full lg:w-2/3">
                <FinesOverview finesData={finesData}/>
              </div>
              <div className="w-full lg:w-1/3 mt-5 lg:mt-0">
                <TotalProducts products={products} />
              </div>
            </div>
            <div className="lg:flex gap-5">
              <div className="w-full lg:w-2/3">
                <TotalUsers admins={admins} workers={workers} />
              </div>
              <div className="w-full lg:w-1/3 mt-5 lg:mt-0">
                <FinesAmount counters={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
