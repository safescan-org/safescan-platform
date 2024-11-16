import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SectionHeading from "../../Components/Shared/SectionHeading";
import SearchInput from "../../Components/Shared/input/SearchInput";
import WorkersTable from "../../Components/pageComponents/Workers/WorkersTable";
import { useDebounce } from "use-debounce";
import { useGetWorkerQuery } from "../../redux/features/admin/adminApi";
import { useSelector } from "react-redux";
import Loader from "../../Components/Shared/Loader";

const Workers = () => {
  const [search, setSearch] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const  {user} = useSelector((state)=>state.auth)
  const [sortData,setSortData] = useState([])

  // console.log(searchQuery);

  // ========data fecthing=========
  const { data, isLoading, refetch } = useGetWorkerQuery(searchQuery);


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
    sestSearchQuery(`${query}`);
    refetch();
  }, [searchValue, refetch,user]);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // ======add a key for selected=======

  const filterData = sortData?.filter((item)=>item?.is_active === true)

  console.log(filterData)

  return (
    <>
      <BreadCrumb
        title={"Workers"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Workers", url: "/admin/workers" },
        ]}
      />
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex items-center justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Workers Profiles</SectionHeading>
            <SearchInput
              search={search}
              setSearch={setSearch}
              placeholder="Search Worker Profile"
            />
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className=" w-full h-[450px] flex items-center justify-center">
                  <Loader />
              </div>
            ) : (
              <div className="w-full">
                <WorkersTable
                  tableData={filterData}
                  rowSelection={rowSelection}
                  refetch={refetch}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workers;
