import React, { useEffect, useState } from "react";
import NoteEdit from "./NoteEdit";
import { Modal, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import CustomButton from "../../Shared/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DeleteModal from "../../Shared/modal/DeleteModal";
import { useApproveUserMutation, useNewnoteMutation } from "../../../redux/features/admin/adminApi";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import toast from "react-hot-toast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import { formattedDate } from "../../../helper/jwt";

const Note = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [deletModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [note, setNote] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNote,setActiveNote]= useState()

  const [approveUser, { isLoading, isSuccess, error }] =
    useApproveUserMutation();

    const [newnote,{isLoading:isLoading1,isSuccess:isSuccess1,error:error1}]=useNewnoteMutation()



    // console.log("====test api====",data)

    useEffect(() => {
      if (isSuccess1) {
        const message = "Note Delete success";
        toast.custom(<SuccessToast message={message} />);
        refetch();
        setDeleteModal(false)
        setModalOpen(true);
      }
      if (error1) {
        console.log(error1)
        toast.custom(<ErrorToast message={error1?.data?.error || error1?.data?.message} />);
      }
    }, [isSuccess1, error1]);
  
    useEffect(()=>{
      setNote(activeNote?.note)
    },[activeNote])
  
    // console.log(activeNote)
  
    const deleteNote = async(e) => {
        const body = {
            username: row?.username,
            is_delete:true,
            index:activeIndex,
            note:note
        }
  
        const id = row?.userid;
        await newnote({id,body})
    };

  useEffect(() => {
    if (isSuccess) {
      const message = "Add Note success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      // setModalOpen(false);
      setNote("")
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  // console.log(activeIndex);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const onSubmit = async () => {
    if (!note) {
      toast.custom(
        <ErrorToast message={"Please add note"} />
      );
    } else {
      const body = {
        username: row?.username,
        note: note,
        is_active: true,
      };
      const id = row?.userid;
      await approveUser({ id, body });
    }
  };

  return (
    <>
      <Tooltip placement="topLeft" title="View Notes">
        <button
          disabled={row?.notes?.length ? false : true}
          onClick={() => setModalOpen(true)}
          className=" text-[14px]  font-normal text-info flex items-center w-full justify-between gap-1 "
        >
          <span>{row?.notes?.length ? row?.notes?.length : "0"}</span>
          <Icon
            icon="material-symbols:edit-document-outline-rounded"
            className=" text-[20px]"
          />
        </button>
      </Tooltip>
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
        width={660}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="px-8 py-6">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">Notes</h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className=" flex items-center gap-5 w-full my-5">
            <div className="w-[70%]">
              <textarea
                name=""
                id=""
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write Something..."
                className="py-[15px] h-[95px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
              ></textarea>
            </div>
            <div className="w-[30%] flex items-center justify-center">
              <div className="flex items-center justify-center flex-col w-full gap-3">
                <CustomButton onClick={() => onSubmit()} className={" w-full"}>
                  {isLoading ? "Loading..." : "Add Note"}
                </CustomButton>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="font-[500] text-[14px] h-[40px] w-full bg-[#664DFF]/10 duration-300 px-5 rounded-[4px] text-primary hover:bg-primary hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-[20px]">
            <>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
              >
                {row?.notes ? (
                  <>
                    {row?.notes?.map((card, index) => (
                      <SwiperSlide
                        className="flex items-center justify-center h-auto"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center w-full">
                          <div className="w-[85%] h-[100%] border rounded-[14px] p-5 border-[#C9D4EA]">
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[14px] font-bold text-dark-gray">
                                  {formattedDate(card?.date)}
                              </h2>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditModal(true);
                                    setActiveNote(card);
                                    setItemIndex(index);
                                  }}
                                  className=" w-[30px] h-[30px] flex items-center justify-center rounded-lg border border-primary/40"
                                >
                                  <Icon
                                    icon="mingcute:pencil-line"
                                    className="text-[22px] hover:text-[#0070F0] text-primary"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    setItemIndex(index);
                                    setDeleteModal(true);
                                    setActiveNote(card)
                                  }}
                                  className=" w-[30px] h-[30px] flex items-center justify-center rounded-lg border border-[#F40909]/40"
                                >
                                  <Icon
                                    icon="gg:trash-empty"
                                    className="text-[22px] hover:text-red-500 text-[#F40909]"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className=" mt-3">
                              <p className=" text-[14px] font-normal text-[#485585]">
                                {card?.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                ) : (
                  <div className=" h-[100px] w-full flex items-center justify-center">
                    <h2 className=" font-bold text-dark-gray text-[20px]">
                      Please add a note
                    </h2>
                  </div>
                )}
              </Swiper>
            </>
          </div>
          <div>
            <div className="w-full flex items-center justify-center">
              {row?.notes ? (
                <>
                  {" "}
                  <h2 className=" text-[#68769F] text-[16px]">
                    {activeIndex + 1}/{row?.notes?.length}
                  </h2>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex mt-5 items-center justify-center flex-col w-full gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="font-[500] text-[14px] h-[40px] w-full bg-[#664DFF]/10 duration-300 px-5 rounded-[4px] text-primary hover:bg-primary hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <NoteEdit
        setModalOpen={setModalOpen}
        refetch={refetch}
        editModal={editModal}
        setEditModal={setEditModal}
        row={row}
        activeNote={activeNote}
        activeIndex={activeIndex}
      />

      <DeleteModal
        modalOPen={deletModal}
        isLoading={isLoading1}
        onDelete={() => deleteNote()}
        setModalOpen={setDeleteModal}
        title={"Delete Note!"}
        title2={
          "Are you sure you want to delete this note? This action cannot be undone."
        }
      />
    </>
  );
};

export default Note;
