import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import { dateChange, formattedDate } from "../../../helper/jwt";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import server_url from "../../../config";

const CardEdit = ({
  setModalOpen,
  refetch,
  editModal,
  setEditModal,
  imageItem,
  row,
  imgIndex,
}) => {
  const { token } = useSelector((state) => state.auth);
  // const getNextDate = formattedDate(imageItem?.expiry_date);
  const [file, setFile] = useState();
  const [nextDate, setNextDate] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNextDate(imageItem?.expiry_date);
  }, [imageItem]);

  // function convertToDateObject(dateString) {
  //   return new Date(dateString);
  // }

  // const dateString = "2024-02-29";
  // const dateObject = convertToDateObject(dateString);

  const uploadImage = async () => {
    setLoading(true);
    const data = {
      image: file,
      type: "cards",
      index: imgIndex,
      expiry_date: nextDate ? nextDate : imageItem?.expiry_date,
      username: row?.username,
    };
    try {
      const formData = new FormData();
      // formData.append("files", data.image);
      if (file) {
        formData.append("files", data.image);
      }
      formData.append("index", data.index);
      formData.append("expiry_date", data.expiry_date);
      formData.append("username", data.username);

      const response = await axios.patch(
        `${server_url}/api/v1/users/edit-cards/${row?.userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200) {
        refetch();
        setModalOpen(true);
        setEditModal(false);
        toast.custom(<SuccessToast message={"card update"} />);
        setLoading(false);
      }
    } catch (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Modal */}
      <Modal
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
              src={
                file
                  ? URL.createObjectURL(file)
                  : `https://scansafes3.s3.amazonaws.com/${imageItem?.image}`
              }
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
                Expire Date
              </p>

              <input
                type={"date"}
                defaultValue={imageItem?.expiry_date}
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
                className="w-full border-none outline-none py-2 px-4"
              />
              {/* <DatePicker
                selected={nextDate}
                onChange={(date) => setNextDate(date)}
                required
                placeholderText="Select Date"
                className="w-full border border-gray-300 rounded-md pl-2 pr-8 py-2.5 "
              /> */}
            </div>
            <div className="flex items-center gap-3">
              <CustomButton onClick={() => uploadImage()}>
                <span className="flex items-center text-white gap-2">
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <span>Save Changes</span>
                  )}
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
      </Modal>
    </>
  );
};

export default CardEdit;
