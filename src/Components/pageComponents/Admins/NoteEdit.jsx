import React, { useEffect, useState } from "react";
import CustomModal from "../../Shared/modal/CustomModal";
import { useNewnoteMutation, useUpdateNoteMutation } from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import { useForm } from "react-hook-form";

const NoteEdit = ({ editModal,refetch, setEditModal, setModalOpen,row,activeNote,activeIndex }) => {
  const [note,setNote] = useState()

  const [newnote,{isLoading,isSuccess,error}]=useNewnoteMutation()
  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      const message = "Note Update success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setEditModal(false)
      setModalOpen(true);
    }
    if (error) {
      console.log(error)
      toast.custom(<ErrorToast message={error?.data?.error || error?.data?.message} />);
    }
  }, [isSuccess, error]);

  useEffect(()=>{
    setNote(activeNote?.note)
  },[activeNote])

  // console.log(activeNote)

  const onSubmit = async(e) => {
      const body = {
          username: row.username,
          is_delete:false,
          index:activeIndex,
          note:note
      }

      const id = row.userid;
      await newnote({id,body})
  };

  return (
    <CustomModal
      modalOPen={editModal}
      setModalOpen={setEditModal}
      handleSubmit={handleSubmit(onSubmit)}
      width={590}
      title="Edit Note"
      buttonText={isLoading ? "Loading..." : "Save Changes"}
    >
      <div className="w-full">
        <textarea
          name=""
          id=""
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          placeholder="Write Something..."
          className="py-[15px] h-[95px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
        ></textarea>
      </div>
    </CustomModal>
  );
};

export default NoteEdit;
