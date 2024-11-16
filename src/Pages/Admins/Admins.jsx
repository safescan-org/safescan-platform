import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SearchInput from "../../Components/Shared/input/SearchInput";
import SectionHeading from "../../Components/Shared/SectionHeading";
import AdminsTable from "../../Components/pageComponents/Admins/AdminsTable";
import {
  useGetAdminQuery,
} from "../../redux/features/admin/adminApi";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import Loader from "../../Components/Shared/Loader";

const Admins = () => {
  const [search, setSearch] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const  {user} = useSelector((state)=>state.auth)
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [sortData,setSortData] = useState([])




  // ========data fecthing=========
  const { data, isLoading, refetch } = useGetAdminQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    const updateData = data?.map((item) => ({
        key: item?.userid,
        ...item,
      }));
    const update = updateData?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSortData(update);
  }, [data]);



  const generateQuery = (searchValue) => {
    const queryParams = [];
    if (searchValue) {
      queryParams.push(`&search=${searchValue}`);
    }

    return queryParams.join("&");
  };


  useEffect(() => {
    const query = generateQuery(searchValue);
    sestSearchQuery(`company_serial=${user?.company_serial}${query}`);
  }, [searchValue,user]);

  // ======table Select function=======
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // ======add a key for selected=======
  const filterData = sortData?.filter((item)=>item?.is_active === true)


  return (
    <>
      <BreadCrumb
        title={"Admins"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Admins", url: "/admin/admins" },
        ]}
      />
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex items-center justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Admin Profiles</SectionHeading>
            <SearchInput
              search={search}
              setSearch={setSearch}
              placeholder="Search Admin Profile"
            />
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className=" w-full h-[450px] flex items-center justify-center">
                {" "}
                  <Loader />
              </div>
            ) : (
              <>
                <AdminsTable
                  tableData={filterData}
                  rowSelection={rowSelection}
                  refetch={refetch}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;
