import React, { useEffect, useRef, useState } from "react";
import ErrorToast from "../../Components/Shared/Toast/ErrorToast";
import {
  useCreateCustomerSubscriptionMutation,
  useGetStripeProductsQuery,
  useOtpVaryFyMutation,
  useVerifyOtpLoginMutation,
  useVerifyOtpMutation,
} from "../../redux/features/admin/adminApi";
import { useForm } from "react-hook-form";
import SuccessToast from "../../Components/Shared/Toast/SuccessToast";
import toast from "react-hot-toast";
import CustomButton from "../../Components/Shared/CustomButton";
import { useNavigate } from "react-router-dom";
import ResentOtp from "../../Components/Shared/ResentOtp";

const OtpForm = ({
  oldData,
  lastData,
  setOldData,
  length = 4,
  stripeCusID = "",
  userId = "",
  onOtpSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const [verifyOtpLogin, { isLoading, isSuccess, error }] =
    useVerifyOtpLoginMutation();
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [accountSuc, setAccountSuc] = useState(false);
  const inputRefs = useRef([]);

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (isSuccess) {
      const message = "Phone Number Verify Success";
      toast.custom(<SuccessToast message={message} />);
      setOtp(new Array(length).fill(""));
      setAccountSuc(true);
      // navigate("/");
    }
    if (error) {
      toast.custom(
        <ErrorToast
          message={
            error?.data?.error ||
            error?.data?.message ||
            "Failed to verify OTP, Please Try Again!"
          }
        />
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

  const onSubmit = async (e) => {
    const verifyNumberData = Object.values(otp).join("");
    // if (verifyNumberData !== oldData?.user?.otp) {
    //   toast.custom(<ErrorToast message={"otp not match"} />);
    // } else {
    //   const data = {
    //     // username:lastData.username,
    //     phone: lastData?.phone,
    //     otp: verifyNumberData,
    //   };
    //   await otpVaryFy(data);
    // }
    const data = {
      username: lastData.username,
      phone: oldData,
      otp: verifyNumberData,
    };
    await verifyOtpLogin(data);
  };

  return (
    <div className="z-[50000000] rounded-[20px] w-full bg-white">
      {accountSuc ? (
        <AccountSuccess
          username={lastData.username}
          stripeCusID={stripeCusID}
          userId={userId}
        />
      ) : (
        <div>
          <div className=" flex items-center justify-between px-9 pt-6 pb-4">
            <h2 className=" text-[28px] font-bold text-dark-gray">
              {"Verify OTP"}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-[0px] max-h-[75vh] overflow-y-scroll px-9 pb-9"
          >
            <div>
              <p className="text-normal text-base text-info">
                Please Enter OTP That Sent To {lastData?.phone}
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
              <ResentOtp
                data={{
                  phone: oldData,
                  otp_for: "login",
                }}
                setOldData={setOldData}
              />
            </div>

            <div className="mt-[30px] flex items-center gap-5">
              <CustomButton className={" w-full"}>
                {isLoading ? "Loading..." : "Continue"}
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OtpForm;
const AccountSuccess = ({ username, stripeCusID = "", userId = "" }) => {
  const navigate = useNavigate();
  const [createSubscription, { isLoading, isSuccess, error }] =
    useCreateCustomerSubscriptionMutation();
  const { data: data1, isLoading: isLoading1 } =
    useGetStripeProductsQuery(username);
  console.log(stripeCusID);

  const handleTrailing = async () => {
    const payload = {
      userid: userId,
      username: username,
      customerId: stripeCusID,
      packageName: data1[0]?.name,
      priceId: data1[0]?.priceId,
    };

    await createSubscription(payload);
    navigate("/");
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-[20px] p-10 text-center">
      <img src="/images/acc_succes.svg" alt="" width={500} />
      <h2 className="text-[28px] font-bold  mb-4">
        Your Account Creation is Completed!
      </h2>
      <p className="text-base text-dark-gray mb-6">You're all set to begin!</p>
      <CustomButton onClick={handleTrailing}>
        Continu With Trialing
      </CustomButton>
    </div>
  );
};
