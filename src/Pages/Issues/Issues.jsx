import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SearchInput from "../../Components/Shared/input/SearchInput";
import SectionHeading from "../../Components/Shared/SectionHeading";
import AdminsTable from "../../Components/pageComponents/Admins/AdminsTable";
import {
  useGetAdminQuery,
  useGetReportsQuery,
} from "../../redux/features/admin/adminApi";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import Loader from "../../Components/Shared/Loader";
import IssuesTable from "../../Components/pageComponents/Issues/IssuesTable";

const Issues = () => {
  const [search, setSearch] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const  {user} = useSelector((state)=>state.auth)
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [sortData,setSortData] = useState([])




  // ========data fecthing=========
  const { data, isLoading, refetch } = useGetReportsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });


  console.log(sortData)


  useEffect(() => {
    const updateData = data?.Items?.map((item) => ({
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


  return (
    <>
      <BreadCrumb
        title={"Reported Issues"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Reported Issues", url: "/admin/reported-issues" },
        ]}
      />
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex items-center justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Issues</SectionHeading>
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
                <IssuesTable
                  tableData={sortData}
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

export default Issues;
