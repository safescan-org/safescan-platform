import React from "react";
import { Tooltip } from "antd";
import StrikeCard from "../../Shared/modal/StrikeCard";
import AllCard from "../../Shared/modal/AllCard";
import QRCodeModal from "../Admins/QRCodeModal";
import AdminTableAction from "../Admins/AdminTableAction";
import CustomTable3 from "../../Shared/table/CustomeTable3";
import AdminInductionHistory from "../Admins/AdminInductionHistory";

const InductionTableAdmin = ({ tableData, rowSelection, refetch }) => {
  const columns = [
    {
      title: "First & Last Name",
      key: "id",
      render: (row) => (
        <span className=" text-[14px] font-bold text-[#485585]">
          {row?.frist_name} {row?.last_name}
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
            {row?.phone}
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
            {row?.email?.slice(0, 8)}...
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
            {row?.site_address?.slice(0, 12)}...
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
            {row?.emloyeer_name?.slice(0, 12)}...
          </span>
        </Tooltip>
      ),
    },
    {
      title: "ICE Name",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.ice_name}>
          <span className=" text-[14px] font-normal text-info">
            {row?.ice_name}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "ICE Number",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.ice_number}>
          <span className=" text-[14px] font-normal text-info">
            {row?.ice_number}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Medical Condition",
      key: "id",
      render: (row) => (
        <Tooltip placement="topLeft" title={row?.ice_number}>
          <span className=" text-[14px] font-normal text-info">
            {row?.medical_condition}
          </span>
        </Tooltip>
      ),
    },

    {
      title: "Induction",
      key: "id",
      render: (row) => (
        <div>
          <AdminInductionHistory row={row} />
        </div>
      ),
    },

    // {
    //   title: "Notes",
    //   key: "id",
    //   render: (row) => <Note row={row} refetch={refetch} />,
    //   width: "80px",
    // },
    {
      title: "Strike Image",
      key: "id",
      render: (row) => <StrikeCard row={row} refetch={refetch} />,
    },
    {
      title: "Card Image",
      key: "id",
      render: (row) => <AllCard row={row} refetch={refetch} />,
    },
    {
      title: "Minor",
      key: "minor",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">{row?.minor}</span>
      ),
      sorter: (a, b) => a?.minor - b?.minor,
    },
    {
      title: "Major",
      key: "major",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">{row?.major}</span>
      ),
      sorter: (a, b) => a.major - b.major,
    },
    {
      title: "Dismissal",
      key: "dismissal",
      render: (row) => (
        <span className=" text-[14px] font-normal text-info">
          {row.dismissal}
        </span>
      ),
      sorter: (a, b) => a?.dismissal - b?.dismissal,
    },
    {
      title: "Fine Status",
      key: "fine",
      render: (row) => (
        <span
          className={`text-[14px] font-medium py-1 px-3 rounded-full ${
            row?.outstanding_fines !== row.fine_status
              ? "bg-[#F40909]/10 text-[#F40909]"
              : "bg-[#4CC800]/10 text-[#4CC800]"
          }`}
        >
          €{row.fine_status - row?.outstanding_fines}
        </span>
      ),
      sorter: (a, b) =>
        a?.fine_status -
        a.outstanding_fines -
        (b?.fine_status - b.outstanding_fines),
    },
    {
      title: "QRC Code",
      key: "id",
      render: (row) => <QRCodeModal row={row} />,
    },
    {
      title: "Actions",
      key: "id",
      render: (row) => <AdminTableAction row={row} refetch={refetch} />,
      fixed: "right",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1">
      <CustomTable3
        tableData={tableData}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{
          x: "2350px",
          y: "45vh",
        }}
      />
    </div>
  );
};

export default InductionTableAdmin;
