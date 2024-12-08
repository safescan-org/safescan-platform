import React from "react";
import { useGetInductionsHistoryQuery } from "../../../redux/features/inductions/InductionsApi";

const AdminInductionHistory = ({ row }) => {
  const { data, isLoading } = useGetInductionsHistoryQuery(
    `${row?.userid}?username=${row?.username}`,
    { refetchOnMountOrArgChange: true }
  );

  console.log("===data===", data);

  return (
    <>
      {isLoading || !data ? (
        <span>...</span>
      ) : (
        <div className=" flex items-center gap-[5px]">
          <div
            className={`w-[10px] h-[10px] rounded-full ${
              data?.inductions?.length === 0 ||
              data?.inductions?.length === data?.submitted_ids?.length
                ? " bg-[#0AC53C]"
                : " bg-[#FF0000]"
            }`}
          ></div>
          <span className=" text-[14px] font-normal text-info">
            {data?.inductions?.length}
          </span>
        </div>
      )}
    </>
  );
};

export default AdminInductionHistory;
