import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import ApprovalModal from "../../../Shared/modal/ApprovalModal";
import { useApproveMutation } from "../../../../redux/features/superAdmin/superApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";

const ApprovalAction = ({ row,refetch,refetch1,refetch2,allrefecth }) => {
  const [approval, setApproval] = useState(false);
  const [reject, setReject] = useState(false);
  const [type,settype] = useState("Customer Approve success")

  const [approve, { isLoading, error, isSuccess }] = useApproveMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.custom(<SuccessToast message={type} />);
      setReject(false);
      setApproval(false)
      refetch()
      refetch1()
      refetch2()
      allrefecth()
    }
    if (error) {
      console.log(error);
      toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
    }
  }, [isSuccess, error]);

  const handleREject = async()=>{
    settype("Customer Rejects success")
      const data={
        username:row?.username,
        account_status: "rejected",
      }
      const id=row?.userid;
     await approve({id,data})
  }

  const handleApprove = async()=>{
    settype("Customer Approve success")
    const data={
      username:row?.username,
      account_status: "approved",
    }
    const id=row?.userid;
    await approve({id,data})
}

  return (
    <>
      <div className=" flex items-center gap-1">
        <Tooltip placement="topLeft" title="Reject">
          <button onClick={() => setReject(true)}>
            <Icon
              icon="ic:round-close"
              className="text-[22px] hover:text-red-500 text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Approve">
          <button onClick={() => setApproval(true)}>
            <Icon
              icon="material-symbols:done" 
              className="text-[22px] hover:text-green-500 text-[#46B900]"
            />
          </button>
        </Tooltip>
      </div>

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
        onDelete={() => handleREject()}
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

export default ApprovalAction;
