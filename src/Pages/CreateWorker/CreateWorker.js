import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SectionHeading from "../../Components/Shared/SectionHeading";
import SearchInput from "../../Components/Shared/input/SearchInput";
import CustomButton from "../../Components/Shared/CustomButton";
import CreatedWorkersTable from "../../Components/pageComponents/CreatedWorkers/CreatedWorkersTable";
import CreatedWorkersModal from "../../Components/pageComponents/CreatedWorkers/CreatedWorkersModal";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { useGetWorkerQuery } from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";

const CreateWorker = () => {
  const [search, setSearch] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [create, setCreate] = useState(false);
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const { user } = useSelector((state) => state.auth);
  const [sortData,setSortData] = useState([])


  // ========data fecthing=========
  const { data, isLoading, refetch } = useGetWorkerQuery(searchQuery, {
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
    refetch();
  }, [searchValue, refetch, user]);

  // ======table Select function=======
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <BreadCrumb
        title={"Create Worker"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Create Worker", url: "/admin/create-worker" },
        ]}
      />
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex md:items-center flex-col md:flex-row justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Created Workers</SectionHeading>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <SearchInput
                search={search}
                setSearch={setSearch}
                placeholder="Search Worker"
              />
              <CustomButton onClick={() => setCreate(true)}>
                Create New Worker
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
                <CreatedWorkersTable
                  tableData={sortData}
                  rowSelection={rowSelection}
                  refetch={refetch}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* =======admin create modal======= */}
      <CreatedWorkersModal modalOPen={create} refetch={refetch} setModalOpen={setCreate} />
    </>
  );
};

export default CreateWorker;
