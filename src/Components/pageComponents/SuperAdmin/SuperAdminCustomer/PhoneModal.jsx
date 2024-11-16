import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../../Shared/CustomButton";
import toast from "react-hot-toast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import {
  useOtpVaryFyMutation,
} from "../../../../redux/features/admin/adminApi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import OtpModal from "./OtpModal";

const PhoneModal = ({
  modalOPen,
  setModalOpen,
  refetch1,
  refetch2,
  allrefecth,
  username,
  phoneNumber,
  logout=false
}) => {
  const [phone, setPhone] = useState("");
  const [sentOpt, setSentOtp] = useState(false);
  const [lastData, setLastData] = useState();
  const [oldData, setOldData] = useState();
  const [error1, setError] = useState(false);
  const { handleSubmit } = useForm();


  useEffect(()=>{
    if(phoneNumber){
      setPhone(phoneNumber)
    }
  },[phoneNumber])

  const [otpVaryFy, { isLoading, isSuccess, error, data }] =
    useOtpVaryFyMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = `Send otp your phone! OTP=${data?.user?.otp}`;
      toast.custom(<SuccessToast message={message} />);
      setSentOtp(true);
      setOldData(data);
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error, data]);

  console.log("====otpData====", data);

  const handleChange = (value) => {
    if (value) {
      setPhone(value);
      setError(false);
    }
  };

  const onSubmit = async (data) => {
    if (!phone) {
      setError(true);
    } else {
      const updateData = {
        username: username,
        phone: phone,
      };
      setLastData(updateData);
      await otpVaryFy(updateData);
      console.log(updateData);
    }
  };

  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };
  return (
    <>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={560}
        className={``}
        style={modalStyle}
      >
        <div>
          <div className="z-[50000000] rounded-[20px] bg-white">
            <div className=" flex items-center justify-between px-9 pt-6 pb-4">
              <h2 className=" text-[28px] font-bold text-dark-gray">
                Verify Number
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
              className="w-full mt-[0px] px-9 pb-9 "
            >
              <div className=" flex items-start flex-col justify-between py-3">
                <label
                  htmlFor=""
                  className="mb-1.5 font-medium text-base text-dark-gray"
                >
                  Phone Number
                </label>
                <PhoneInput
                  country="gb"
                  onlyCountries={["gb", "ie"]}
                  enableSearch={false}
                  value={phone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  onChange={handleChange}
                  containerStyle={{
                    borderRadius: "5px", // Example border radius
                    padding: "5px", // Example padding
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    fontSize: "16px",
                    paddingLeft: "50px",
                    outline: "none",
                  }}
                />
                {error1 && (
                  <label className="label">
                    <span className=" text-sm mt-1 text-red-500">
                      Please Enter Phone Number
                    </span>
                  </label>
                )}
              </div>

              <div className="mt-[20px] flex items-center gap-5">
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
        </div>
      </Modal>
      <OtpModal
        modalOPen={sentOpt}
        setModalOpen={setSentOtp}
        phoneModal={setModalOpen}
        oldData={oldData}
        lastData={lastData}
        setOldData={setOldData}
        refetch1={refetch1}
        refetch2={refetch2}
        allrefecth={allrefecth}
        logout={logout}
        setPhone={setPhone}
      />
    </>
  );
};

export default PhoneModal;
