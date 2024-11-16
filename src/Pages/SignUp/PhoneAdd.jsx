import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../Components/Shared/CustomButton";
import OtpForm from "./OtpForm";
import { useOtpVaryFyMutation } from "../../redux/features/admin/adminApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Components/Shared/Toast/SuccessToast";
import ErrorToast from "../../Components/Shared/Toast/ErrorToast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const PhoneAdd = ({ username }) => {
  const [phone, setPhone] = useState("");
  const [sentOpt, setSentOtp] = useState(false);
  const [lastData, setLastData] = useState();
  const [oldData, setOldData] = useState();
  const [error1, setError] = useState(false);
  const { handleSubmit } = useForm();

  const [otpVaryFy, { isLoading, isSuccess, error, data }] =
    useOtpVaryFyMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = `Send otp your phone! Otp=${data?.user?.otp}`;
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

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      {sentOpt ? (
        <>
          <div className=" absolute top-[50px] left-[50px]">
            <button
              onClick={() => setSentOtp(false)}
              className=" flex items-center gap-2 py-1 px-3 bg-primary rounded-md text-white"
            >
              <Icon icon="humbleicons:arrow-left" className=" text-[25px]" />{" "}
              Back
            </button>
          </div>
          <OtpForm
            oldData={oldData}
            lastData={lastData}
            setOldData={setOldData}
          />
        </>
      ) : (
        <>
          <div className="w-full px-[50px] my-16">
            <div className="mb-[50px]">
              <h1 className="text-dark-gray text-[28px] font-bold">
                Add Phone
              </h1>
              <p className="text-normal text-base text-info">
                Please Fill Those Information Bellow To Create an Account.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" flex items-start flex-col justify-between">
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
                    borderRadius: "5px",
                    padding: "5px",
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
              <div className="mt-6 w-full">
                <CustomButton className={"w-full"}>
                  {isLoading ? <p>Loading...</p> : <p>Submit</p>}
                </CustomButton>
              </div>
              <p className="text-center text-info text-sm font-medium mt-4">
                Already Have An Account?{" "}
                <Link to={"/"} className="font-bold underline text-primary">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneAdd;
