import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "antd";
import React, { useState } from "react";
import InductionFilesView from "./InductionFilesView";

const InductionFiles = ({ row }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className=" flex items-center gap-2">
        <Tooltip placement="topLeft" title="Edit">
          <button onClick={() => setShow(true)}>
            <img src="/icon/Frame (2).png" alt="png" className="w-[20px]" />
          </button>
        </Tooltip>
      </div>

      {/* ============= Induction edit Modal ============ */}
      <InductionFilesView
        item={row}
        modalOPen={show}
        refetch={() => {}}
        setModalOpen={setShow}
      />
    </>
  );
};

export default InductionFiles;
