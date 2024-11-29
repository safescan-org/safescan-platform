import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React from "react";
import CustomButton from "../CustomButton";

const CustomModal2 = ({
  modalOPen,
  setModalOpen,
  width,
  className,
  title,
  children,
  handleSubmit=(e)=>{e.preventDefault()},
  buttonText,
}) => {

  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };
  return (
    <div>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={width}
        className={` ${className}`}
        style={modalStyle}
      >
        <div className="z-[50000000] rounded-[20px] bg-white pb-3">
          <div className=" flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className=" text-[28px] font-bold text-dark-gray">
              {title}
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-[0px] max-h-[75vh] overflow-y-scroll px-6 pb-4">
            <div className="">{children}</div>
            <div className="mt-[30px] flex items-center gap-5">
              <CustomButton  className={" w-full"}>{buttonText}</CustomButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal2;
