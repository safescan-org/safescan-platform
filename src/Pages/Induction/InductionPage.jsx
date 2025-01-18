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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000); // Debounced search value
  const { user } = useSelector((state) => state.auth);
  const [sortData, setSortData] = useState([]);

  const { data, refetch, isLoading } = useGetInductionsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const updateData = data?.Items?.map((item) => ({
      key: item?.created_at,
      is_active: item?.isSubmit,
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
    setSearchQuery(`${query}`);
    refetch();
  }, [searchValue, refetch, user]);

  // Filter logic for search functionality
  const filterData = sortData?.filter((item) => {
    if (search) {
      const searchTerm = search.toLowerCase();
      return (
        item?.name?.toLowerCase()?.includes(searchTerm) ||
        item?.userid?.toString()?.toLowerCase()?.includes(searchTerm) ||
        item?.title?.toLowerCase()?.includes(searchTerm) ||
        item?.description?.toLowerCase()?.includes(searchTerm)
      );
    }
    return true;
  });

  const onSelectChange = (newSelectedRowKeys) => {
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
      <div className="mb-8">
        <div className="bg-white rounded-[20px]">
          <div className="flex items-center justify-between px-[22px] py-[20px] w-full">
            <SectionHeading>Active Induction</SectionHeading>
            <div className="flex items-center gap-4">
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
              <div className="w-full h-[450px] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="w-full">
                <InductionTable
                  tableData={filterData || []}
                  rowSelection={rowSelection}
                  refetch={refetch}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <AddInduction
        refetch={refetch}
        setModalOpen={setCreate}
        modalOPen={create}
      />
    </>
  );
};

export default InductionPage;
