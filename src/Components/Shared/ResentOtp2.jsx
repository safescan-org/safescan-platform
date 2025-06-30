import React, { useEffect } from "react";
import ErrorToast from "./Toast/ErrorToast";
import SuccessToast from "./Toast/SuccessToast";
import toast from "react-hot-toast";
import { useOtpSendMutation } from "../../redux/features/auth/authApi";

const ResentOtp2 = ({ data }) => {
  const [otpSend, { isLoading, isSuccess, error, data: otpData }] =
    useOtpSendMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = `OTP Resend Successfully!`;
      toast.custom(<SuccessToast message={message} />);
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error, otpData]);

  const onSubmit = async () => {
    await otpSend(data);
  };

  return (
    <div>
      <p className="text-center text-info text-sm font-medium mt-4">
        Didn't get the code?{" "}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSubmit()}
          className={`font-bold underline ${
            isLoading ? " text-gray-500" : "text-primary "
          }`}
        >
          Click to resend
        </button>
      </p>
    </div>
  );
};

export default ResentOtp2;
