import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../Shared/CustomButton";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader2 from "../../../Shared/Loader2";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import toast from "react-hot-toast";
import { useAddGa1Mutation } from "../../../../redux/features/admin/adminApi";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import { formattedDate } from "../../../../helper/jwt";

const AddGaForm = ({row, addModal, setAddModal,refetch }) => {
  const [date, setDate] = useState();
  const [imageFiles, setImageFiles] = useState();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [addGa1,{isLoading,error,isSuccess}] = useAddGa1Mutation()

  useEffect(() => {
    if (isSuccess) {
      const message = "Ga1 form add success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setAddModal(false);
      setImageFiles()
      setDate()
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);


  const handleFileSelect = async (event) => {
    const files = event.target.files[0];
    setLoading(true);
    const formData = new FormData();
    formData.append(`files`, files);
    try {
      const response = await axios.post(
        `https://q3vvxu6li2.execute-api.us-east-1.amazonaws.com/api/v1/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setImageFiles(response?.data?.images);
      } else {
        // handleUnexpectedStatus();
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };


  const handelSubmit = async()=>{
      if(!imageFiles || !date){
        toast.custom(
          <ErrorToast message={"Please add date and image"} />
        );
      }else{
        const body = {
          image:imageFiles[0],
          expiry_date:formattedDate(date),
        }
        const id = row?.productid;
        await addGa1({id,body})
      }
  }



  return (
    <div>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={addModal}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setAddModal(false)}
        onCancel={() => setAddModal(false)}
        width={905}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">
              Add New GA1 Form
            </h2>
            <button
              onClick={() => setAddModal(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className="w-full flex relative h-[450px] mt-4 bg-[#2D2D2D]/5 overflow-hidden border-2 rounded-2xl border-dashed border-[#2D2D2D] items-center justify-center ">
            {loading ? (
              <>
                <Loader2 />
              </>
            ) : (
              <>
                {imageFiles && (
                  <img
                    src={`https://scansafes3.s3.amazonaws.com/${imageFiles[0]}`}
                    alt="card"
                    className="w-full h-full object-container"
                  />
                )}
                <label
                  htmlFor="id"
                  className=" absolute top-0 cursor-pointer rounded-2xl left-0 w-full h-full flex flex-col items-center justify-center text-dark-gray"
                >
                  <Icon icon="lucide:image-plus" className=" text-[50px]" />
                  <h2 className="text-[18px] font-medium">
                    Tap To Change Image
                  </h2>
                  <input
                    id="id"
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleFileSelect(e)}
                    className=" hidden"
                  />
                </label>
              </>
            )}
          </div>
          <div className=" flex items-center justify-between flex-wrap gap-3 mb-2 mt-5 ">
            <div className=" border rounded-[8px] border-[#E1E9F8] md:w-[50%] w-full flex items-center justify-between">
              <p className="text-[14px] w-[270px] md:w-[270px] font-[500] bg-[#E1E9F8] py-3 px-5 text-dark-gray">
                Card Expiry Date
              </p>

              <input
                type={"date"}
                defaultValue={date}
                className="w-full border-none outline-none py-2 px-4"
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <CustomButton onClick={() => handelSubmit()}>
                <span className="flex items-center text-white gap-2">
                  {isLoading ? "Loading..." :"Add Card"}
                </span>
              </CustomButton>
              <button
                onClick={() => setAddModal(false)}
                className=" border border-dark-gray/40  flex items-center justify-center text-dark-gray hover:bg-primary  duration-300 px-5  h-[40px] rounded-[8px] font-medium hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddGaForm;
