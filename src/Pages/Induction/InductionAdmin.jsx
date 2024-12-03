import React, { useEffect, useState } from "react";
import SearchInput from "../../Components/Shared/input/SearchInput";
import SectionHeading from "../../Components/Shared/SectionHeading";
import { useGetAdminQuery } from "../../redux/features/admin/adminApi";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import Loader from "../../Components/Shared/Loader";
import { Icon } from "@iconify/react";
import CustomButton from "../../Components/Shared/CustomButton";
import InductionTableAdmin from "../../Components/pageComponents/Induction/InductionTableAdmin";
import { useNavigate } from "react-router-dom";

const InductionAdmin = ({
  setAdminOpen,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const [search, setSearch] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [sortData, setSortData] = useState([]);
  const navigate = useNavigate();

  // ========data fecthing=========
  const { data, isLoading, refetch } = useGetAdminQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const updateData = data?.map((item) => ({
      key: item?.admin_serial,
      ...item,
    }));
    const update = updateData?.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
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
  }, [searchValue, user]);

  // ======table Select function=======
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // ======add a key for selected=======
  const filterData = sortData?.filter((item) => item?.is_active === true);

  return (
    <>
      <div className=" mb-8 ">
        <div className=" flex items-center justify-between mb-6">
          <button
            onClick={() => setAdminOpen(false)}
            className=" flex items-center px-2 border w-[86px] rounded-lg h-[40px] border-[#68769F]"
          >
            <Icon
              icon="ic:round-keyboard-arrow-left"
              className=" text-[#68769F]"
              width="24"
              height="24"
            />
            Back
          </button>

          <div className=" flex items-center gap-3">
            <h2 className=" text-[14px] font-medium">
              {selectedRowKeys.length} workers selected
            </h2>
            <CustomButton
              onClick={() => setAdminOpen(false)}
              className={" w-auto md:w-[175px] "}
            >
              Add
            </CustomButton>
          </div>
        </div>
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
              <div className=" w-full h-[200px] flex items-center justify-center">
                {" "}
                <Loader />
              </div>
            ) : (
              <>
                <InductionTableAdmin
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

export default InductionAdmin;
