import React, { useState } from "react";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import SectionHeading from "../../Components/Shared/SectionHeading";
import SearchInput from "../../Components/Shared/input/SearchInput";
import Loader from "../../Components/Shared/Loader";
import CustomButton from "../../Components/Shared/CustomButton";
import InductionTable from "../../Components/pageComponents/Induction/InductionTable";
import AddInduction from "../../Components/pageComponents/Induction/AddInduction";

const InductionPage = () => {
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isLoading = false;

  const data = [
    {
      title: "Induction Title",
      worker: "12",
      admin: "13",
      deadline: "May 5, 2022",
      status: "14/17",
    },
    {
      title: "Induction Title",
      worker: "12",
      admin: "13",
      deadline: "May 5, 2022",
      status: "14/17",
    },
    {
      title: "Induction Title",
      worker: "12",
      admin: "13",
      deadline: "May 5, 2022",
      status: "14/17",
    },
  ];

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
                <InductionTable tableData={data} rowSelection={rowSelection} />
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
