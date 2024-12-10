import React, { useState } from "react";
import InductionProfileView from "../Induction/InductionProfileView";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdminInductionHistory = ({ row }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* {isLoading || !data ? (
        <span>...</span>
      ) : (
        <div onClick={()=>setShow(true)} className=" flex cursor-pointer items-center gap-[5px]">
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
      )} */}

      <button
        onClick={() => setShow(true)}
        className="py-1 px-3"
      >
        <Icon icon="lucide:view" className=" text-info" width="20" height="20" />
      </button>

      {show && (
        <InductionProfileView
          row={row}
          modalOPen={show}
          refetch={() => {}}
          setModalOpen={setShow}
        />
      )}
    </>
  );
};

export default AdminInductionHistory;
