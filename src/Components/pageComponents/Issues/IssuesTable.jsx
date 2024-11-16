import React from "react";
import CustomTable from "../../Shared/table/CustomTable";
import { Tooltip } from "antd";
import { formattedDate } from "../../../helper/jwt";
import AllCard2 from "../../Shared/modal/AllCard2";
import ProductNote from "../Products/ProductNote";

const IssuesTable = ({ tableData, rowSelection, refetch }) => {
  const columns = [
    {
      title: "Reporter Username",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-bold text-[#485585]">
          {row?.username}
        </span>
      ),
    },
    {
        title: "Issue Date",
        key: "id",
        render: (row) => (
          <span className=" text-[14px] font-normal text-info">
            {formattedDate(row.created_at)}
          </span>
        ),
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      },
    {
      title: "Issue Category",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.issues_category}>
          <span className=" text-[14px] font-normal text-info">
            {row?.issues_category}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Description of Issue",
      key: "id",
      render: (row) => (
          // <span className=" text-[14px] font-normal text-info">
          //   {row?.description?.slice(0, 20)}...
          // </span>
          <ProductNote row={row}/>
      ),
    },
    {
      title: "Location",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.location}>
          <span className=" text-[14px] font-normal text-info">
            {row?.location}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Attach Photo",
      key: "id",
      render: (row) => <AllCard2 row={row} refetch={refetch} />,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1">
      <CustomTable
        tableData={tableData}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: "1350px" }}
      />
    </div>
  );
};

export default IssuesTable;
