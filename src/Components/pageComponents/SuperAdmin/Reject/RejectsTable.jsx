import React from "react";
import CustomTable2 from "../../../Shared/table/CustomTable2";
import { formattedDate } from "../../../../helper/jwt";
import RejectsTableAction from "./RejectsTableAction";
import { Tooltip } from "antd";

const RejectsTable = ({ tableData,refetch,refetch1,allrefecth }) => {
  const columns = [
    {
      title: "Username",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-bold text-[#485585]">
          {row.username}
        </span>
      ),
      width: "200px",
    },
    {
      title: "Mobile Number",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.phone}>
          <span className=" text-[14px] font-normal text-info">
            {row.phone === "" ? "--" : row.phone}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Email Address",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.email}>
          <span className=" text-[14px] font-normal text-info">
            {row.email?.slice(0, 16)}...
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Site Address",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.site_address}>
          <span className=" text-[14px] font-normal text-info">
            {row.site_address?.slice(0, 16)}...
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Site Name",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.site_name}>
          <span className=" text-[14px] font-normal text-info">
            {row.site_name}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Employers Name",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.emloyeer_name}>
          <span className=" text-[14px] font-normal text-info">
            {row?.emloyeer_name}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Request Date",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">{formattedDate(row.created_at)}</span>
      ),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
        title: "Action",
        key: "id",
        render: (row) => (
          <RejectsTableAction row={row} refetch={refetch} refetch1={refetch1} allrefecth={allrefecth}/>
        ),
      },
  ];

  return (
    <div className=" grid grid-cols-1">
      <CustomTable2
        tableData={tableData}
        columns={columns}
        scroll={{ x: "750px" }}
      />
    </div>
  );
};

export default RejectsTable;
