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
  useImageDeleteMutation,
  useUpdateAssetMutation,
} from "../../../redux/features/admin/adminApi";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import toast from "react-hot-toast";
import CardEdit from "./CardEdit";

const AllCard = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const [imageItem, setImageItame] = useState();
  const [imgIndex, setImageIndex] = useState(0);
  const [deletModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedImages, setUpdatedImages] = useState([]);

  const [
    imageDelete,
    { isLoading: isLoading1, isSuccess: isSuccess1, error: error1 },
  ] = useImageDeleteMutation();

  // ===============delete message==========
  useEffect(() => {
    if (isSuccess1) {
      const message = "Asset Successfully Updated";
      toast.custom(<SuccessToast message={message} />);
      // refetch();
      setModalOpen(false);
    }
    if (error1) {
      const errorMsg = error1?.data.error || error1?.data.message;
      toast.custom(<ErrorToast message={errorMsg} />);
    }
  }, [isSuccess1, error1]);

  useEffect(() => {
    setUpdatedImages(row?.cards);
  }, [row]);

  useEffect(() => {
    if (row?.cards) {
      setImageItame(row?.cards[imgIndex]);
    }
  }, [row, imgIndex]);

  const handelDelete = async () => {
    const data = {
      index: imgIndex,
      username: row?.username,
    };



    await imageDelete(data);
  };

  return (
    <>
      <Tooltip placement="topLeft" title="View Images">
        <button
          disabled={row?.cards?.length ? false : true}
          onClick={() => setModalOpen(true)}
          className=" text-[14px] font-normal text-info flex items-center gap-1 "
        >
          <Icon icon="lucide:image" className=" text-[20px]" />
          {row?.cards?.length ? updatedImages?.length : "0"}
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
        width={805}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">
              Card Images
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          {/* <div className="w-full flex h-[350px] rounded-lg overflow-hidden md:h-[544px] items-center justify-center py-5">
            <img
              src={`https://scansafes3.s3.amazonaws.com/${imageItem?.image}`}
              alt="card"
              className="w-full h-full rounded-2xl object-contain"
            />
          </div>
          <div className=" flex items-center justify-between flex-wrap gap-3 mb-5">
            <div className="">
              <p className="text-[20px] font-bold text-dark-gray">
                {"Expire Date"}:
                <span className="text-lg font-medium">
                  {" "}
                  {imageItem?.expiry_date}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CustomButton
                onClick={() => {
                  setEditModal(true);
                  setModalOpen(false);
                }}
              >
                <span className="flex items-center text-white gap-2">
                  <Icon
                    className="text-lg text-white rotate-180"
                    icon="tabler:edit-circle"
                  />
                  <span>Edit</span>
                </span>
              </CustomButton>
              <button
                onClick={() => setDeleteModal(true)}
                className=" bg-error/10 flex items-center justify-center hover:bg-[#FF4D4D]/80 duration-300 w-[38px] h-[38px] rounded-[4px] font-medium text-[#FF4D4D] hover:text-white"
              >
                <Icon icon="lucide:trash-2" className=" text-[20px]" />
              </button>
            </div>
          </div> */}
          {/* <div>
            <>
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  580: {
                    slidesPerView: 2,
                  },
                  800: {
                    slidesPerView: 3,
                  },
                  920: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {updatedImages?.map((card, index) => (
                  <SwiperSlide
                    className="flex items-center justify-center"
                    key={index}
                  >
                    <button
                      onClick={() => {
                        setImageIndex(index);
                        setImageItame(card);
                      }}
                      className={`${
                        imgIndex === index
                          ? "border-[3px] border-primary rounded-[18px]"
                          : "border-2 border-transparent rounded-[18px]"
                      }`}
                    >
                      <div className="h-[106px] w-[185px]">
                        <img
                          src={`https://scansafes3.s3.amazonaws.com/${card?.image}`}
                          alt="card"
                          className="rounded-[14px] w-[185px]"
                        />
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          </div> */}

          <div className=" mt-5 flex flex-col gap-5 max-h-[75vh] overflow-y-scroll">
            {row?.cards?.map((card, index) => (
              <div
                key={index}
                className=" border border-gray-300 p-5 rounded-xl shadow-sm"
              >
                <div className="w-full h-full min-h-[450px] rounded-xl overflow-hidden">
                  <img
                    src={`https://scansafes3.s3.amazonaws.com/${card?.image}`}
                    alt=""
                    className=" w-full h-full object-contain "
                  />
                </div>
                <div className=" mt-3">
                  <p className="text-[20px] font-bold text-dark-gray">
                    {"Expire Date"}:
                    <span className="text-lg font-medium">
                      {" "}
                      {card?.expiry_date}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      {/* <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={editModal}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setEditModal(false)}
        onCancel={() => setEditModal(false)}
        width={1005}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">
              Edit Card Image
            </h2>
            <button
              onClick={() => setEditModal(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className="w-full flex relative h-[520px] items-center justify-center ">
            <img
              src={file ? URL.createObjectURL(file) : img}
              alt="card"
              className="w-full h-full object-container"
            />

            <label
              htmlFor="id"
              className=" absolute top-0 cursor-pointer rounded-2xl left-0 w-full h-full flex bg-black/20 flex-col items-center justify-center text-[#E2DDFF] "
            >
              <Icon icon="lucide:image-plus" className=" text-[30px]" />
              <h2 className="text-[18px] font-medium">Tap To Change Image</h2>
              <input
                id="id"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className=" hidden"
              />
            </label>

          </div>
          <div className=" flex items-center justify-between flex-wrap gap-3 mb-2 mt-5 ">
            <div className=" border rounded-[8px] border-[#E1E9F8] md:w-[50%] w-full flex items-center justify-between">
              <p className="text-[14px] w-[250px] md:w-[200px] font-[500] bg-[#E1E9F8] py-3 px-5 text-dark-gray">
                {dateTitle}
              </p>

              <input
                type={"date"}
                defaultValue={date}
                className="w-full border-none outline-none py-2 px-4"
              />
            </div>
            <div className="flex items-center gap-3">
              <CustomButton onClick={() => setEditModal(false)}>
                <span className="flex items-center text-white gap-2">
                  <span>Save Changes</span>
                </span>
              </CustomButton>
              <button
                onClick={() => setEditModal(false)}
                className=" border border-dark-gray/40  flex items-center justify-center text-dark-gray hover:bg-primary  duration-300 px-5  h-[40px] rounded-[8px] font-medium hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal> */}

      <CardEdit
        setModalOpen={setModalOpen}
        refetch={refetch}
        editModal={editModal}
        setEditModal={setEditModal}
        imageItem={imageItem}
        row={row}
        imgIndex={imgIndex}
      />

      <DeleteModal
        modalOPen={deletModal}
        onDelete={() => handelDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Image"}
        title2={"Are You Sure?"}
      />
    </>
  );
};

export default AllCard;
