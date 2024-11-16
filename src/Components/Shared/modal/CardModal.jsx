import { Icon } from "@iconify/react";
import { Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import SliderButton from "./SliderButton";
import { formattedDate } from "../../../helper/jwt";

const CardModal = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [imgIndex, setImageIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [isSuccess, setIsSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageItem, setImageItame] = useState();
  const [error, setError] = useState("");

  // const [deleteAssetCardImage, { isSuccess: deletImageSuccess, error: deleteImageError, isLoading: deleteLoading }] = useDeleteAssetCardImageMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.custom(<SuccessToast message={isSuccess} />);
    }
    if (error) {
      const errorMsg = error?.data.error || error?.data.message;
      toast.custom(<ErrorToast message={errorMsg} />);
    }
  }, [isSuccess, error]);


  useEffect(() => {
    setUpdatedImages(row?.attach_images);
  }, [row]);

  useEffect(() => {
    if (row?.test_details && row?.test_details?.length) {
      const newData = row?.test_details[activeIndex]?.attach_images;
      if (newData?.length) {
        setImageItame(row?.test_details[activeIndex]?.attach_images[imgIndex]);
      } else {
        setImageItame();
      }
    }
  }, [row, imgIndex, activeIndex]);


  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setImageIndex(0);
  };

  // const handelDelete = async () => {
  //   const id = `${row?.Assetid}`;
  //   const body = {
  //     index: imgIndex
  //   }
  //   await deleteAssetCardImage({ id, body });
  // }

  // useEffect(() => {
  //   if (updatedImages?.length < 1) {
  //     setModalOpen(false)
  //   }
  // }, [updatedImages?.length])

  return (
    <>
      <Tooltip placement="topLeft" title="View Images">
        <button
          disabled={row?.test_details?.length < 1}
          onClick={() => setModalOpen(true)}
          className={`text-[14px] font-normal text-info flex items-center gap-1 ${
            row?.test_details?.length < 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Icon icon="lucide:image" className=" text-[20px]" />
          {row?.test_details?.length}
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
            <h2 className=" text-[28px] font-[700] text-dark-gray">
              Test Image
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className=" mt-0 flex flex-col">
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
                <>
                  {row?.test_details?.map((card, index) => (
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
                                  card?.status === "passed" &&
                                  "bg-[#4CC800]"
                                } ${
                                  card?.status === "attention" &&
                                  "bg-[#FFC000]"
                                } ${
                                  card?.status === "failed" &&
                                  "bg-[#F40909]"
                                }`}
                              ></div>
                              <h2 className=" text-dark-gray capitalize text-[18px] font-bold">
                                {card?.status==="attention" ? "Needs Attention" : card?.status}
                              </h2>
                            </div>
                            <p className=" text-base text-[#485585] font-normal">
                              {formattedDate(Number(card?.date))}
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-dark-gray capitalize text-[18px] font-bold">
                              {card?.tester_name}
                            </h2>
                            <p className=" text-base text-[#485585] font-normal">
                              Tester
                            </p>
                          </div>
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
                              {card?.attach_images?.map((card, index) => (
                                <SwiperSlide
                                  className="flex items-center justify-center"
                                  key={index}
                                >
                                  <button
                                    onClick={() => {
                                      setImageIndex(index);
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
                <SliderButton total={row?.test_details} activeIndex={activeIndex} />
              </Swiper>
            </>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardModal;
