import React from "react";
import CustomTable from "../../Shared/table/CustomTable";
import InductionAction from "./InductionAction";
import InductionFiles from "./InductionFiles";
import { formattedDate } from "../../../helper/jwt";

const InductionTable = ({ tableData, rowSelection,refetch }) => {
  const columns = [
    {
      title: "Title",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-bold text-[#485585]">
          {row.title}
        </span>
      ),
    },
    {
      title: "Worker",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">
          {row?.workers.length}
        </span>
      ),
    },
    {
      title: "Admin",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">
          {row?.admins?.length}
        </span>
      ),
    },
    {
      title: "Deadline",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">
          {" "}
          {formattedDate(row?.deadline)}
        </span>
      ),
    },
    {
      title: "Files",
      key: "id",
      render: (row) => <InductionFiles row={row} />,
    },
    {
      title: "Status",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">{row.status}</span>
      ),
    },
    {
      title: "Actions",
      key: "id",
      width: "100px",
      render: (row) => (
        <div>
          <InductionAction row={row} refetch={refetch} />
        </div>
      ),
    },
  ];

  return (
    <div className=" grid grid-cols-1">
      <CustomTable
        tableData={tableData}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: "750px" }}
      />
    </div>
  );
};

export default InductionTable;
