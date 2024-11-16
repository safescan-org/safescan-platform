import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../Shared/CustomButton";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { usePhoneChangeMutation } from "../../../redux/features/admin/adminApi";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ResentOtp3 from "../../Shared/ResentOtp3";

const OtpModal = ({
  refetch,
  modalOPen,
  setModalOpen,
  oldData,
  setOldData,
  lastData,
  length = 4,
  onOtpSubmit = () => {},
}) => {
  const [phoneChange,{isLoading,isSuccess,error,data}] = usePhoneChangeMutation()
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      const message = "Phone Number Update Success";
      toast.custom(<SuccessToast message={message} />);
      setModalOpen(false);
      refetch()
      setOtp(new Array(length).fill(""))
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  // --------end otp-------------

  const onSubmit = async() => {
    const verifyNumberData = Object.values(otp).join("");
    if (verifyNumberData !== oldData?.user?.otp) {
      toast.custom(<ErrorToast message={"otp not match"} />);
    } else {
        
        const data = {
            password:lastData.password,
            phone:lastData?.phone,
            otp:verifyNumberData,
        }

        // console.log(data)

         await phoneChange(data)
    }
  };

  return (
    <Modal
      centered
      cancelText
      cancelButtonProps
      footer={null}
      open={modalOPen}
      closeIcon={null}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={650}
    >
      <div className="z-[50000000] rounded-[20px] bg-white">
        <div className=" flex items-center justify-between px-9 pt-6 pb-4">
          <h2 className=" text-[28px] font-bold text-dark-gray">
            {"Verify OTP"}
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-[0px] max-h-[75vh] overflow-y-scroll px-9 pb-9"
        >
          <div>
            <p className="text-normal text-base text-info">
              Please Enter OTP That Sent To {lastData?.phone?.slice(0,3)}******{lastData?.phone?.slice(-2,lastData?.phone?.length)}
            </p>
            <div className=" flex items-center justify-center w-full mt-5">
              <h1 className="text-lg font-medium text-dark-gray mb-4">
                Enter OTP
              </h1>
            </div>
            <div className="flex items-center py-2 gap-9  mx-auto w-[280px]">
              {otp.map((value, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="border border-dark-gray/20 text-center outline-none focus:border-primary w-10 h-11 rounded-[10px]"
                  />
                );
              })}
            </div>
            <ResentOtp3 data={lastData} setOldData={setOldData}/>
          </div>

          <div className="mt-[30px] flex items-center gap-5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="font-[500] text-[14px] h-[40px] w-full bg-[#664DFF]/10 duration-300 px-5 rounded-[4px] text-primary hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <CustomButton className={" w-full"}>
              {isLoading ? "Loading..." : "Continue"}
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OtpModal;
