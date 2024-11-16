
import { Modal } from "antd";
import React from "react";

const LogOutModal = ({
  modalOPen,
  setModalOpen,
  className,
  onDelete,
}) => {
  return (
    <div className="">
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
        <div className=" p-6 ">
          <div className=" rounded-[30px]">
            <div className=" mb-3">
              <img src="/Images/logOut.svg" alt="logout" />
            </div>
            <div >
              <h2 className=" text-[24px] font-[700] text-dark-gray">
                {"Log Out!"}
              </h2>
              <p className="text-base  text-info">
               {"Are you really wish to leave and log out?"}
              </p>
            </div>
          </div>

          <div className=" flex items-center justify-center gap-5 pt-[20px]">
            <button
              onClick={() => setModalOpen(false)}
              className="font-bold w-full  h-[40px] px-6 hover:text-red-500 hover:border-red-500 duration-300 rounded-[10px] bg-transparent text-secondary border border-secondary"
            >
              Cancel
            </button>
            <button
              onClick={()=>{onDelete();setModalOpen(false)}}
              className="font-bold w-full  h-[40px] px-6 rounded-[10px] bg-red-500 hover:bg-red-700 duration-300 border border-red-500 text-white "
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogOutModal;

