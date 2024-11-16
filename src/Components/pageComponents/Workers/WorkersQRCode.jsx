import { Icon } from "@iconify/react";
import { Modal, Tooltip } from "antd";
import React, { useState } from "react";
import QRCode from "qrcode.react";

const WorkersQRCode = ({ row }) => {
  const [modalOPen, setModalOpen] = useState(false);

  return (
    <>
      <Tooltip placement="topLeft" title="View QRC Code">
        <button
          onClick={() => setModalOpen(true)}
          className=" w-full flex items-center justify-center"
        >
          <img src="/Images/QR_Code.png" alt="QR" />
        </button>
      </Tooltip>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={450}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">QRC Code</h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className="w-full flex items-center justify-center py-7">
            <QRCode size={250} className=" " value={row.email} />
          </div>
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className=" bg-primary hover:bg-primary/80 duration-300 px-4 h-[38px] rounded-[4px] text-[14px] font-medium text-white">
                Add New
              </button>
              <button className=" bg-[#FF4D4D]/20 flex items-center justify-center hover:bg-[#FF4D4D]/80 duration-300 w-[38px] h-[38px] rounded-[4px] font-medium text-[#FF4D4D] hover:text-white">
                <Icon icon="lucide:trash-2" className=" text-[20px]" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className=" bg-primary hover:bg-primary/80 flex items-center justify-center duration-300 w-[38px] h-[38px] rounded-[4px] text-[14px] font-medium text-white">
                <Icon
                  icon="lucide:arrow-down-to-line"
                  className=" text-[25px]"
                />
              </button>
              <button className=" bg-primary/20 flex items-center justify-center hover:bg-primary/80 duration-300 w-[38px] h-[38px] rounded-[4px] font-medium text-primary hover:text-white">
                <Icon icon="lucide:share-2" className=" text-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WorkersQRCode;
