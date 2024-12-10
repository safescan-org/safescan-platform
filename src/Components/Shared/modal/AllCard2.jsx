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

const AllCard2 = ({ row, refetch }) => {
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
          disabled={row?.attach_photos?.length ? false : true}
          onClick={() => setModalOpen(true)}
          className=" text-[14px] font-normal text-info flex items-center gap-1 "
        >
          <Icon icon="lucide:image" className=" text-[20px]" />
          {row?.attach_photos?.length ? row?.attach_photos?.length : "0"}
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
              Attach Photo
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className=" mt-5 flex flex-col gap-5 max-h-[75vh] overflow-y-scroll">
            {row?.attach_photos?.map((card, index) => (
              <div
                key={index}
                className=" border border-gray-300 p-5 rounded-xl shadow-sm"
              >
                <div className="w-full h-full min-h-[450px] rounded-xl overflow-hidden">
                  <img
                    src={`https://scansafes3.s3.amazonaws.com/${card}`}
                    alt=""
                    className=" w-full h-full object-contain "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
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

export default AllCard2;
