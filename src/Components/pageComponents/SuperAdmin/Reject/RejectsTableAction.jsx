
import React, { useEffect, useState } from "react";
import ApprovalModal from "../../../Shared/modal/ApprovalModal";
import { useApproveMutation } from "../../../../redux/features/superAdmin/superApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";

const RejectsTableAction = ({ row,refetch,refetch1,allrefecth }) => {
  const [approval, setApproval] = useState(false);
  const [reject, setReject] = useState(false);

  const [approve, { isLoading, error, isSuccess }] = useApproveMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Customer Approve success";
      toast.custom(<SuccessToast message={message} />);
      setReject(false);
      setApproval(false)
      refetch()
      refetch1()
      allrefecth()
    }
    if (error) {
      console.log( error);
      toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
    }
  }, [isSuccess, error]);

  // const handleREject = async()=>{
  //     const data={
  //       username:row?.username,
  //       is_approved: false,
  //     }
  //     const id=row?.userid;
  //    await approve({id,data})
  // }

  const handleApprove = async()=>{
    const data={
      username:row?.username,
      account_status: "approved",
    }
    const id=row?.userid;
    await approve({id,data})
}

  return (
    <>
      <button
        onClick={() => setApproval(true)}
        className=" text-primary flex items-center gap-1 justify-center py-1 bg-primary/10 hover:bg-primary hover:text-white duration-300 px-3 rounded-md text-[16px] font-medium"
      >
        Re-Admit
      </button>

      {/* approval modal */}
      <ApprovalModal
        modalOPen={approval}
        onDelete={() => handleApprove()}
        setModalOpen={setApproval}
        title={"Approve Customer!"}
        title2={
          "Are you sure you want to approve this customer? This action cannot be undone."
        }
        approval={true}
        buttonText={isLoading ? "Loading...": "Yes, Approve"}
      />
      {/* Reject modal */}
      <ApprovalModal
        modalOPen={reject}
        onDelete={() => setReject(false)}
        setModalOpen={setReject}
        title={"Reject Approval!"}
        title2={
          "Are you sure you want to reject this approval? This action cannot be undone."
        }
        approval={false}
        buttonText={isLoading ? "Loading...": "Reject"}
      />
    </>
  );
};

export default RejectsTableAction;
