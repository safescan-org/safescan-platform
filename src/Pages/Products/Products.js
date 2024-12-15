import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SectionHeading from "../../Components/Shared/SectionHeading";
import SearchInput from "../../Components/Shared/input/SearchInput";
import ProductsTable from "../../Components/pageComponents/Products/ProductsTable";
import { useGetProductsQuery } from "../../redux/features/admin/adminApi";
import { useDebounce } from "use-debounce";
import Loader from "../../Components/Shared/Loader";
import CustomButton from "../../Components/Shared/CustomButton";
import AddProduct from "../../Components/pageComponents/Products/AddProduct";
import ProductFilter from "../../Components/pageComponents/Products/ProductFilter";
import { Icon } from "@iconify/react";

const Products = () => {
  const [search, setSearch] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchQuery, sestSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [create, setCreate] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [manualLoading, setManualLoading] = useState(false);

  // -----------get all products-----------

  const { data, isLoading, refetch } = useGetProductsQuery(searchQuery, {
    refetchOnMountOrArgChange: true,
  });

  const handleRefetch =  () => {
    setManualLoading(true); // Start manual loading
    refetch(); // Trigger the query refetch
    setTimeout(() => {
      setManualLoading(false); // Stop manual loading after 500ms
    }, 500);
  };

  useEffect(() => {
    const updateData = data?.map((item) => ({
      key: item?.productid,
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
      queryParams.push(`search=${searchValue}`);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery(searchValue);
    sestSearchQuery(`${query}`);
  }, [searchValue]);

  // ======table Select function=======
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
        title={"Assets"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Assets", url: "/admin/assets" },
        ]}
      />
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 mb-8">
            <div className=" bg-white rounded-[20px] ">
              <div className=" flex md:items-center gap-2 flex-col md:flex-row justify-between px-2 md:px-[22px] py-[20px] w-full">
                <SectionHeading>Assets List </SectionHeading>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <div className="">
                    <button
                      onClick={() => {
                        sestSearchQuery("");
                        handleRefetch();
                      }}
                      className=" text-dark-gray border-[1px] border-[#E1E9F8] rounded-[10px] w-full  py-[10px] px-5 flex items-center gap-2 text-[14px] font-medium"
                    >
                      <Icon icon="ooui:reload" className="mt-[-1px]" /> Refresh
                    </button>
                  </div>
                  <SearchInput
                    search={search}
                    setSearch={setSearch}
                    placeholder="Search By Asset Name"
                  />
                  <ProductFilter sestSearchQuery={sestSearchQuery} />
                  <CustomButton onClick={() => setCreate(true)}>
                    Add Asset
                  </CustomButton>
                </div>
              </div>
              <div>
                {manualLoading ? (
                  <>
                    <Loader />
                  </>
                ) : (
                  <>
                    <ProductsTable
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
      )}
      <AddProduct
        refetch={refetch}
        setModalOpen={setCreate}
        modalOPen={create}
      />
    </>
  );
};

export default Products;
