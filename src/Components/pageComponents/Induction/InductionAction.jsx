import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../Shared/modal/DeleteModal";
import InductionEdit from "./InductionEdit";
import { useDeleteInductionsMutation } from "../../../redux/features/inductions/InductionsApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const InductionAction = ({ row, refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteInductions, { isSuccess, isLoading, error }] =
    useDeleteInductionsMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Induction Delete success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setDeleteModal(false);
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const handelDelete = async () => {
    const id = `${row?.inductionid}`;
    await deleteInductions(id);
  };

  return (
    <>
      <div className=" flex items-center gap-2">
        <Tooltip placement="topLeft" title="Edit">
          <button onClick={() => setEdit(true)}>
            <Icon
              icon="mingcute:pencil-line"
              className="text-[22px] hover:text-[#0070F0] text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Delete">
          <button onClick={() => setDeleteModal(true)}>
            <Icon
              icon="gg:trash-empty"
              className="text-[22px] hover:text-red-500 text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
      </div>

      {/* ============= Induction edit Modal ============ */}
      <InductionEdit
        item={row}
        modalOPen={edit}
        refetch={refetch}
        setModalOpen={setEdit}
      />

      <DeleteModal
        modalOPen={deleteModal}
        onDelete={() => handelDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Induction !"}
        title2={
          "Are you sure you want to delete this Induction ? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </>
  );
};

export default InductionAction;
