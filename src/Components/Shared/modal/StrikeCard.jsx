import { Icon } from "@iconify/react";
import { Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DeleteModal from "./DeleteModal";
import {
  useNewnoteMutation,
} from "../../../redux/features/admin/adminApi";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import toast from "react-hot-toast";
import CardEdit from "./CardEdit";
import { formattedDate } from "../../../helper/jwt";
import NoteEdit from "../../pageComponents/Admins/NoteEdit";
import SliderButton from "./SliderButton";
import { safetyIssues } from "../StrikeModal";


const CategoryFun = ({value})=>{
  const filterData = safetyIssues?.find((item)=>item?.value === value)

  return(
    <span className="">{filterData?.title}</span>
  )
}


const StrikeCard = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const [imageItem, setImageItame] = useState();
  const [itemIndex, setItemIndex] = useState(0);
  const [imgIndex, setImageIndex] = useState(0);
  const [deletModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNote, setActiveNote] = useState();

  const [
    newnote,
    { isLoading: isLoading1, isSuccess: isSuccess1, error: error1 },
  ] = useNewnoteMutation();

  // ===============delete message==========
  useEffect(() => {
    if (isSuccess1) {
      const message = "Strikes Delete success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setDeleteModal(false);
      setModalOpen(true);
    }
    if (error1) {
      const errorMsg = error1?.data.error || error1?.data.message;
      toast.custom(<ErrorToast message={errorMsg} />);
    }
  }, [isSuccess1, error1]);

  useEffect(() => {
    if (row?.notes?.length) {
      const newData = row?.notes[activeIndex]?.images;
      if (newData?.length) {
        setImageItame(row?.notes[activeIndex]?.images[imgIndex]);
      } else {
        setImageItame();
      }
    }
  }, [row, imgIndex, activeIndex]);

  const handelDelete = async () => {
    const body = {
      username: row?.username,
      is_delete: true,
      index: activeIndex,
    };
    const id = row?.userid;
    await newnote({ id, body });
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setImageIndex(0);
  };


  return (
    <>
      <Tooltip placement="topLeft" title="View Strikes">
        <button
          disabled={row?.notes?.length ? false : true}
          onClick={() => setModalOpen(true)}
          className={`text-[14px] font-normal text-info flex items-center gap-1 ${
            row?.notes?.length ? " cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          <Icon icon="lucide:image" className=" text-[20px]" />
          {row?.notes?.length ? row?.notes?.length : "0"}
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
        width={605}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">Strikes</h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                clickable: true,
                nextEl: ".arrow-swiper-left",
                prevEl: ".arrow-swiper-right",
              }}
              modules={[Navigation]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
            >
              {row?.notes ? (
                <>
                  {row?.notes?.map((card, index) => (
                    <SwiperSlide
                      className="flex items-start justify-center h-[70vh] overflow-y-auto"
                      key={index}
                    >
                      <div className=" w-full">
                        <div className=" w-full flex items-center justify-between mt-4">
                          <div className=" flex flex-col gap-0">
                            <div className=" flex items-center gap-1">
                              <div
                                className={`w-[12px] h-[12px] rounded-full ${
                                  card?.strike_name === "minor" &&
                                  "bg-[#4CC800]"
                                } ${
                                  card?.strike_name === "major" &&
                                  "bg-[#FFC000]"
                                } ${
                                  card?.strike_name === "dismissal" &&
                                  "bg-[#F40909]"
                                }`}
                              ></div>
                              <h2 className=" text-dark-gray capitalize text-[18px] font-bold">
                                {card?.strike_name}
                              </h2>
                            </div>
                            <p className=" text-base text-[#485585] font-normal">
                              {formattedDate(card?.date)}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setItemIndex(index);
                              setDeleteModal(true);
                              setActiveNote(card);
                            }}
                            className=" h-[38px] flex items-center justify-center hover:bg-[#FF2F2F] hover:text-white duration-300 gap-2 px-5 text-[14px] font-medium rounded-[4px] bg-[#FF2F2F]/10 text-[#FF2F2F]"
                          >
                            <Icon
                              icon="lucide:trash-2"
                              className="text-[16px]"
                            />
                            Delete Strike
                          </button>
                        </div>

                        <div className=" bg-[#F6F8FD] p-4 mt-4 rounded-lg">
                          <h2 className=" text-[18px] font-bold">Reason for Warning</h2>
                          <span className=" text-[16px] text-[#485585]"><CategoryFun value={card?.strike_resson ? card?.strike_resson : ""} /></span>
                          <h2 className=" text-[18px] font-bold">Company Name</h2>
                          <span className=" text-[16px] text-[#485585]">{card?.company_name}</span>
                        </div>


                        <div className="w-full mb-2  flex h-[300px] rounded-lg overflow-hidden md:h-[344px] items-center justify-center py-5">
                          {imageItem ? (
                            <img
                              src={`https://scansafes3.s3.amazonaws.com/${imageItem}`}
                              alt="card"
                              className="w-full h-full rounded-2xl object-contain"
                            />
                          ) : (
                            <div className="bg-gray-100 w-full rounded-2xl flex items-center justify-center h-full">
                              <h2 className=" text-[25px]">Image Not Found</h2>
                            </div>
                          )}
                        </div>
                        <div>
                          <>
                            <Swiper
                              slidesPerView={4}
                              spaceBetween={20}
                              navigation={{
                                clickable: true,
                              }}
                              breakpoints={{
                                320: {
                                  // width: 576,
                                  slidesPerView: 1,
                                },
                                580: {
                                  // width: 768,
                                  slidesPerView: 2,
                                },
                                800: {
                                  // width: 768,
                                  slidesPerView: 3,
                                },
                                920: {
                                  // width: 768,
                                  slidesPerView: 4,
                                },
                              }}
                              modules={[Navigation]}
                              className="mySwiper"
                            >
                              {card?.images?.map((card, index) => (
                                <SwiperSlide
                                  className="flex items-center justify-center"
                                  key={index}
                                >
                                  <button
                                    onClick={() => {
                                      setImageIndex(index);
                                      // setImageItame(card);
                                    }}
                                    className={`${
                                      imgIndex === index
                                        ? "border-[3px] border-primary rounded-[18px]"
                                        : "border-2 border-transparent rounded-[18px]"
                                    }`}
                                  >
                                    <div className="h-[70px] w-[110px]">
                                      <img
                                        src={`https://scansafes3.s3.amazonaws.com/${card}`}
                                        alt="card"
                                        className="rounded-[14px] w-[110px]"
                                      />
                                    </div>
                                  </button>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </>
                        </div>

                        <div className=" flex items-center justify-between mt-5">
                          <h2 className=" text-2xl font-bold text-dark-gray">
                            Note
                          </h2>
                          <button
                            onClick={() => {
                              setEditModal(true);
                              setActiveNote(card);
                              setItemIndex(index);
                            }}
                            className=" h-[38px] flex items-center justify-center hover:bg-primary/80 text-white duration-300 gap-2 px-5 text-[14px] font-medium rounded-[4px] bg-primary "
                          >
                            <Icon
                              icon="lucide:folder-edit"
                              className="text-[16px]"
                            />
                            Edit Note
                          </button>
                        </div>

                        <div className=" mt-3 mb-3">
                          <p className=" text-[14px] font-normal text-[#485585]">
                            {card?.note}
                          </p>
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
              <SliderButton total={row?.notes} activeIndex={activeIndex}/>
            </Swiper>
          </>
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
        onDelete={() => handelDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Strike!"}
        title2={
          "Are you sure you want to delete this Strike? This action cannot be undone."
        }
      />
    </>
  );
};

export default StrikeCard;
