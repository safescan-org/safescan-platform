import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import ApprovalModal from "../../../Shared/modal/ApprovalModal";
import toast from "react-hot-toast";
import { usePlanMutation } from "../../../../redux/features/superAdmin/superApi";
import { Icon } from "@iconify/react";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";

const Plan = ({ row,refetch,refetch1 }) => {
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  const [plan, { isLoading, error, isSuccess }] = usePlanMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Plan Update success";
      toast.custom(<SuccessToast message={message} />);
      refetch()
      refetch1()
      setModal(false)
    }
    if (error) {
      console.log( error);
      toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
    }
  }, [isSuccess, error]);

  const handleApprove = async () => {
    const data = {
      username: row?.username,
      plan: value,
    };
    // console.log(data)
    const id = row?.userid;
    await plan({ id, data });
  };

  const handleOpenChange = (newOpen) => {
    setPopupShow(newOpen);
  };

  // =====Action button Edit Reset Delete=====
  const content = (
    <div className=" w-[150px] p-2">
      <button
        onClick={() => {
          setModal(true);
          setValue("basic");
          setPopupShow(false);
        }}
        className=" text-sm w-full capitalize items-start rounded-[10px] font-medium text-light-black hover:bg-primary/10 hover:text-[#252F67] flex  py-3 px-5"
      >
        basic
      </button>
      <button
        onClick={() => {
          setModal(true);
          setValue("premium");
          setPopupShow(false);
        }}
        className=" text-sm flex capitalize  w-full items-start rounded-[10px] font-medium text-light-black hover:bg-primary/10 hover:text-[#252F67] py-3 px-5"
      >
        premium
      </button>
      <button
        onClick={() => {
          setModal(true);
          setValue("platinum");
          setPopupShow(false);
        }}
        className=" text-sm flex capitalize  w-full items-start rounded-[10px] font-medium text-light-black hover:bg-primary/10 hover:text-[#252F67] py-3 px-5"
      >
        platinum
      </button>
    </div>
  );

  return (
    <div>
      <Popover
        open={popupShow}
        onOpenChange={handleOpenChange}
        content={content}
        placement="bottom"
        trigger="click"
      >
        <button className=" w-full flex items-center justify-between capitalize">{row?.plan} <Icon className=" text-[20px] mt-1" icon="ri:arrow-down-s-line" /></button>
      </Popover>
      <ApprovalModal
        modalOPen={modal}
        onDelete={() => handleApprove()}
        setModalOpen={setModal}
        title={"Changing Plan!"}
        title2={
          "Are you sure you want to the plan for this customer? "
        }
        approval={true}
        buttonText={isLoading ? "Loading" : "Change"}
      />
    </div>
  );
};

export default Plan;
