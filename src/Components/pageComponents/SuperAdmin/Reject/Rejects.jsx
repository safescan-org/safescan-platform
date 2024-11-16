import React, { useEffect, useState } from "react";
import SectionHeading from "../../../Shared/SectionHeading";
import SearchInput from "../../../Shared/input/SearchInput";
import { useDebounce } from "use-debounce";
import Loader from "../../../Shared/Loader";
import RejectsTable from "./RejectsTable";


const Rejects = ({search,setSearch,sestSearchQuery,searchQuery,data, isLoading,refetch,refetch1,allrefecth}) => {

  const [searchValue] = useDebounce(search, 1000);
  const [sortData,setSortData] = useState([])

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
    sestSearchQuery(`account_status=rejected${query}`);
  }, [searchValue]);


  return (
    <div>
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex md:items-center flex-col md:flex-row justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Rejected</SectionHeading>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <SearchInput
                search={search}
                setSearch={setSearch}
                placeholder="Search Customer"
              />
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className=" w-full h-[450px] flex items-center justify-center">
                  <Loader />
              </div>
            ) : (
              <>
                <RejectsTable
                  tableData={sortData}
                  refetch={refetch}
                  refetch1={refetch1}
                  allrefecth={allrefecth}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rejects;
