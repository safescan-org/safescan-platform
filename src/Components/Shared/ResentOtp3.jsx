import React, { useEffect } from 'react'
import ErrorToast from './Toast/ErrorToast';
import SuccessToast from './Toast/SuccessToast';
import toast from 'react-hot-toast';
import { useOtpSendMutation } from '../../redux/features/auth/authApi';
import { usePhoneChangeMutation } from '../../redux/features/admin/adminApi';

const ResentOtp3 = ({data,setOldData}) => {
    const [phoneChange, { isLoading, isSuccess, error, data:otpData }] =usePhoneChangeMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = `Send otp your phone! OTP=${otpData?.user?.otp}`;
      toast.custom(<SuccessToast message={message} />);
      setOldData(otpData)
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error,otpData]);

  const onSubmit = async () => {
      await phoneChange(data);
      console.log(data);
  };

  console.log("====otpData====", otpData);
  return (
    <div>
      <p className="text-center text-info text-sm font-medium mt-4">
        Didn't get the code?{" "}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSubmit()}
          className={`font-bold underline ${isLoading ? " text-gray-500" : "text-primary "}`}
        >
          Click to resend
        </button>
      </p>
    </div>
  )
}

export default ResentOtp3