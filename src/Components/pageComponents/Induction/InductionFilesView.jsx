import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";

const InductionFilesView = ({ item, setModalOpen, modalOPen }) => {
  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };

  const data = [
    {
      title: "This is documents title",
      file: "first induction file.pdf",
    },

    {
      title: "This is documents title",
      file: "first induction file.pdf",
    },
    {
      title: "This is documents title",
      file: "first induction file.pdf",
    },
    {
      title: "This is documents title",
      file: "first induction file.pdf",
    },
  ];

  return (
    <>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={560}
        style={modalStyle}
      >
        <div className="z-[50000000] rounded-[20px] bg-white pb-3">
          <div className=" flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className=" text-[28px] font-bold text-dark-gray">{"Files"}</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className=" max-h-[75vh] overflow-y-scroll px-[70px]">
            <div className=" bg-[#D9D9D9] w-full flex items-center justify-center h-[200px]">
              <Icon icon="fa-solid:play" className=" text-[25px]" />
            </div>

            <div className=" mt-6">
              <h2 className=" text-[28px] font-bold font-sans">Documents</h2>

              <div className=" flex items-center gap-3 flex-col w-full">
                {data.map((item, index) => (
                  <div className=" w-full" key={index}>
                    <h2 className=" text-[20px] font-bold">{item.title}</h2>
                    <div className=" w-full bg-[#CCDBFF52] flex items-center mt-1 justify-between h-[40px] rounded-[10px] px-4">
                      <h3 className=" text-[14px] font-[400] ">{item?.file}</h3>
                      <button type="button" className=" ">
                        <Icon
                          icon="mingcute:delete-2-line"
                          className=" text-2xl text-[#68769F] hover:text-red-500 duration-200"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InductionFilesView;
