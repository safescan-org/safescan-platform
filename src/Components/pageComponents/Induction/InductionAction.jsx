import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import React, { useState } from "react";
import DeleteModal from "../../Shared/modal/DeleteModal";
import InductionEdit from "./InductionEdit";

const InductionAction = ({ row, refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const isLoading = false;
  //   const [deleteUser, { isSuccess, isLoading, error }] = useDeleteUserMutation();

  //   useEffect(() => {
  //     if (isSuccess) {
  //       const message = "Admin Delete success";
  //       toast.custom(<SuccessToast message={message} />);
  //       refetch();
  //       setDeleteModal(false)
  //     }
  //     if (error) {
  //       toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
  //     }
  //   }, [isSuccess, error]);

  const handelDelete = async () => {
    const id = `${row?.userid}?username=${row?.username}`;
    // await deleteUser(id)

    console.log(id);
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
        refetch={()=>{}}
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
