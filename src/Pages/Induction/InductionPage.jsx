import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SectionHeading from "../../Components/Shared/SectionHeading";
import SearchInput from "../../Components/Shared/input/SearchInput";
import Loader from "../../Components/Shared/Loader";
import CustomButton from "../../Components/Shared/CustomButton";
import InductionTable from "../../Components/pageComponents/Induction/InductionTable";
import AddInduction from "../../Components/pageComponents/Induction/AddInduction";
import { useGetInductionsQuery } from "../../redux/features/inductions/InductionsApi";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";

const InductionPage = () => {
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const { user } = useSelector((state) => state.auth);

  const { data, refetch, isLoading } = useGetInductionsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data?.Items);

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

  console.log(user?.company_serial);

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
        title={"Induction"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Induction", url: "/admin/induction" },
        ]}
      />
      <div className=" mb-8">
        <div className=" bg-white rounded-[20px] ">
          <div className=" flex items-center justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Active Induction</SectionHeading>
            <div className=" flex items-center gap-4">
              <SearchInput
                search={search}
                setSearch={setSearch}
                placeholder="Search Assignment"
              />
              <CustomButton onClick={() => setCreate(true)}>
                Create Induction
              </CustomButton>
            </div>
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className=" w-full h-[450px] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="w-full">
                <InductionTable
                  tableData={data?.Items}
                  rowSelection={rowSelection}
                  refetch={refetch}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <AddInduction
        refetch={() => {}}
        setModalOpen={setCreate}
        modalOPen={create}
      />
    </>
  );
};

export default InductionPage;
