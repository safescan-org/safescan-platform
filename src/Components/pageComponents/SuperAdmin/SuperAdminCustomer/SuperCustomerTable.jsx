import React, { useEffect, useState } from "react";
import SectionHeading from "../../../Shared/SectionHeading";
import SearchInput from "../../../Shared/input/SearchInput";
import CustomButton from "../../../Shared/CustomButton";
import SuperCustomerTableData from "./SuperCustomerTableData";
import CustomerCreate from "./CustomerCreate";
import { useDebounce } from "use-debounce";
import Loader from "../../../Shared/Loader";

const SuperCustomerTable = ({
  search,
  setSearch,
  sestSearchQuery,
  searchQuery,
  data,
  isLoading,
  refetch,
  refetch1,
  refetch2,
  allrefecth,
}) => {
  const [create, setCreate] = useState(false);
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

  // console.log(searchQuery);

  const generateQuery = (searchValue) => {
    const queryParams = [];
    if (searchValue) {
      queryParams.push(`&search=${searchValue}`);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery(searchValue);
    sestSearchQuery(`account_status=approved${query}`);
  }, [searchValue]);


  // console.log(data)

  return (
    <div>
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex md:items-center flex-col md:flex-row justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Customers</SectionHeading>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <SearchInput
                search={search}
                setSearch={setSearch}
                placeholder="Search Customer"
              />
              <CustomButton onClick={() => setCreate(true)}>
                Create New Customer
              </CustomButton>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className=" w-full h-[450px] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <SuperCustomerTableData
                  tableData={sortData}
                  refetch={refetch}
                  refetch1={refetch2}
                  allrefecth={allrefecth}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <CustomerCreate
        modalOPen={create}
        setModalOpen={setCreate}
        refetch1={refetch1}
        refetch2={refetch2}
        allrefecth={allrefecth}
      />
    </div>
  );
};

export default SuperCustomerTable;
