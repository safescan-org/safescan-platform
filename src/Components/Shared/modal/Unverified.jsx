import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unverified = ({
  modalOPen,
  setModalOpen,
}) => {

    const navigation = useNavigate()

    const approval = true;
  const onDelete = () => {
    setModalOpen(false)
    navigation("/admin/profile-settings")
  };

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
              {!approval ? (
                <img src="/Images/Featuredicon.svg" alt="" />
              ) : (
                <img src="/Images/delete.svg" alt="" />
              )}
            </div>
            <div>
              <h2 className=" text-[24px] font-[700] text-[#1B2559]">
                Unverified Phone Number
              </h2>
              <p className="text-[16px] font-[400] text-info">
                Please Go to your “Profile Settings” and Verify your phone
                Number.
              </p>
            </div>
          </div>

          <div className=" flex items-center justify-center gap-5 pt-[20px]">
            <button
              onClick={() => onDelete()}
              className={`font-bold w-full  h-[40px] px-6 rounded-[10px] duration-300 border text-white ${
                approval
                  ? " bg-primary hover:bg-primary/80 border-primary"
                  : "bg-[#F52618] hover:bg-red-700 border-red-500"
              }`}
            >
              {"OK"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Unverified;
