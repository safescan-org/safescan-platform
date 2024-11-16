import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../Shared/modal/DeleteModal";
import ShareModal from "../../Shared/modal/ShareModal";
import CreatedWorkers from "./CreatedWorkersEdit";
import { useDeleteUserMutation } from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const CreatedWorkersTableAction = ({ row,refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const [shareText, setShareText] = useState("");
  const [type, setType] = useState("email")

  const [deleteUser, { isSuccess, isLoading, error }] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Worker Delete success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setDeleteModal(false)
    }
    if (error) {
      toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
    }
  }, [isSuccess, error]);

  const handelDelete= async()=>{
    const id = `${row?.userid}?username=${row?.username}`;
    await deleteUser(id)

  }


  const handleShare = () => {
    if (type === 'email') {
      if (shareText.trim() !== '') {
        // console.log(shareText)
        // Create a mailto link with the email address
        const mailtoLink = `mailto:${encodeURIComponent(shareText)}`;

        // Open the default email client
        window.location.href = mailtoLink;
        setShare(false)
      }
    }
    if (type === 'Whatsapp') {
      if (shareText.trim() !== '') {

        const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(shareText)}`;

        // Open WhatsApp
        window.open(whatsappLink, '_blank');
        setShare(false)
      }
    }



  };
  return (
    <>
      <div className=" flex items-center justify-center gap-1">
        {/* <Tooltip placement="topLeft" title="Share">
          <button onClick={() => setShare(true)}>
            <Icon
              icon="lucide:share-2"
              className="text-[22px] hover:text-[#0070F0] text-[#8E9BBA]"
            />
          </button>
        </Tooltip> */}
        {/* <Tooltip placement="topLeft" title="Edit">
          <button onClick={() => setEdit(true)}>
            <Icon
              icon="mingcute:pencil-line"
              className="text-[22px] hover:text-[#0070F0] text-[#8E9BBA]"
            />
          </button>
        </Tooltip> */}
        <Tooltip placement="topLeft" title="Delete">
          <button onClick={() => setDeleteModal(true)} className=" mr-5">
            <Icon
              icon="gg:trash-empty"
              className="text-[22px] hover:text-red-500 text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
      </div>
      {/* ============= Workers edit Modal============ */}
      <CreatedWorkers item={row} modalOPen={edit} setModalOpen={setEdit} />

      {/* ============= Workers edit Modal============ */}
      <ShareModal type={type} setType={setType} item={row} modalOPen={share} setModalOpen={setShare} shareText={shareText} setShareText={setShareText} handleShare={handleShare} />

      {/* ============= Workers delete Modal============ */}
      <DeleteModal
        modalOPen={deleteModal}
        onDelete={() => handelDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Worker Profile!"}
        title2={
          "Are you sure you want to delete this worker profile? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </>
  );
};

export default CreatedWorkersTableAction;
