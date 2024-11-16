import React, { useState } from "react";
import BreadCrumb from "../../../Components/Shared/BreadCrumb";
import SuperAdminCustomerTop from "../../../Components/pageComponents/SuperAdmin/SuperAdminCustomer/SuperAdminCustomerTop";
import SuperCustomerTable from "../../../Components/pageComponents/SuperAdmin/SuperAdminCustomer/SuperCustomerTable";
import Approval from "../../../Components/pageComponents/SuperAdmin/Approval/Approval";
import { useApproveCustomersQuery, useCustomersQuery } from "../../../redux/features/superAdmin/superApi";
import Rejects from "../../../Components/pageComponents/SuperAdmin/Reject/Rejects";

const Customer = () => {
  const [search, setSearch] = React.useState("");
  const [search1, setSearch1] = React.useState("");
  const [search2, setSearch2] = React.useState("");
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchQuery1, sestSearchQuery1] = useState("");
  const [searchQuery2, sestSearchQuery2] = useState("");

  const { data:all, isLoading:allLoad,refetch:allrefecth } = useCustomersQuery("", {
    refetchOnMountOrArgChange: true,
  });

  // ========data fecthing approve=========
  const { data, isLoading, refetch } = useCustomersQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });


  // console.log(data)

   // ========data fecthing Not approve=========
  const {
    data: data1,
    isLoading: isLoading1,
    refetch: refetch1,
  } = useApproveCustomersQuery(searchQuery1, { refetchOnMountOrArgChange: true });

    // ========data fecthing Not rejects=========
     const {
      data: data2,
      isLoading: isLoading2,
      refetch: refetch2,
    } = useApproveCustomersQuery(searchQuery2, { refetchOnMountOrArgChange: true });

  return (
    <>
      <BreadCrumb
        title={"Customers"}
        links={[
          { title: "Home", url: "/super-admin/customers" },
          { title: "Customers", url: "/super-admin/customers" },
        ]}
      />
      <SuperAdminCustomerTop data={all} isLoading={allLoad}/>

      <div>
        <SuperCustomerTable
          search={search1}
          setSearch={setSearch1}
          searchQuery={searchQuery}
          sestSearchQuery={sestSearchQuery}
          data={data}
          isLoading={isLoading}
          refetch={refetch}
          refetch1={refetch1}
          refetch2={refetch2}
          allrefecth={allrefecth}
        />
      </div>
      <div className=" mt-5">
        <Approval
          search={search}
          setSearch={setSearch}
          searchQuery={searchQuery1}
          sestSearchQuery={sestSearchQuery1}
          data={data1}
          isLoading={isLoading1}
          refetch={refetch}
          refetch1={refetch1}
          refetch2={refetch2}
          allrefecth={allrefecth}
        />
      </div>
      <div className=" mt-5">
        <Rejects
          search={search2}
          setSearch={setSearch2}
          searchQuery={searchQuery2}
          sestSearchQuery={sestSearchQuery2}
          data={data2}
          isLoading={isLoading2}
          refetch={refetch}
          refetch1={refetch2}
          allrefecth={allrefecth}
        />
      </div>
    </>
  );
};

export default Customer;
