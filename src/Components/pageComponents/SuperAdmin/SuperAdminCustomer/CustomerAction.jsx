import React, { useEffect, useState } from "react";
import ApprovalModal from "../../../Shared/modal/ApprovalModal";
import { Icon } from "@iconify/react";
import { useApproveMutation } from "../../../../redux/features/superAdmin/superApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import CustomPlanCreate from "./CustomPlanCreate";

const CustomerAction = ({ row, refetch, refetch1, allrefecth }) => {
  const [reject, setReject] = useState(false);
  const [customPlan, setCustomPlan] = useState(false);
  const [approve, { isLoading, error, isSuccess }] = useApproveMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Customer Rejects success";
      toast.custom(<SuccessToast message={message} />);
      setReject(false);
      refetch();
      refetch1();
      allrefecth();
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const handleApprove = async () => {
    const data = {
      username: row?.username,
      account_status: "rejected",
    };

    const id = row?.userid;
    await approve({ id, data });
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setCustomPlan(true)}
          className=" text-primary flex items-center gap-1 justify-center py-1 bg-primary/10 hover:bg-primary hover:text-white duration-300 px-3 rounded-md text-[16px] font-medium"
        >
          <Icon icon="lucide:package" className=" mt-[2px]" /> Manage Plan
        </button>
        <button
          onClick={() => setReject(true)}
          className=" text-[#FF6969] flex items-center gap-1 justify-center py-1 bg-[#FF6969]/10 hover:bg-[#FF6969] hover:text-white duration-300 px-3 rounded-md text-[16px] font-medium"
        >
          <Icon icon="tabler:ban" className=" mt-[2px]" />
        </button>
      </div>
      {/* Reject modal */}
      <ApprovalModal
        modalOPen={reject}
        onDelete={() => handleApprove()}
        setModalOpen={setReject}
        title={"Reject Customer!"}
        title2={
          "Are you sure you want to Reject this customer? This action cannot be undone."
        }
        approval={false}
        buttonText={isLoading ? "Loading" : "Reject"}
      />
      <CustomPlanCreate
        modalOPen={customPlan}
        setModalOpen={setCustomPlan}
        userName={row?.username}
      />
    </>
  );
};

export default CustomerAction;
