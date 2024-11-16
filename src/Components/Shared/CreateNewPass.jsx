import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../Components/Shared/CustomButton";
import {  useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import SuccessToast from "./Toast/SuccessToast";
import ErrorToast from "./Toast/ErrorToast";

const CreateNewPass = () => {
  const { otpData } = useSelector((state) => state.auth);
  const [showpass, setShowpass] = useState(false);
  const [showrepass, setShowrepass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [updatePassword, { isSuccess, isLoading, error }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "password update success";
      toast.custom(<SuccessToast message={message} />);
      navigate("/")
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error.data.error || error.data.message} />
      );
    }
  }, [isSuccess, error]);

  const onSubmit = async(data) => {
    const body = {
      username: otpData?.username,
      phone: otpData?.phone,
      otp: otpData?.otp,
      password: data.password,
      confirm_password: data.confirm_password,
    };
    await updatePassword(body)
  };
  return (
    <>
      {/* -----------------forgot pass----------------- */}
      <div className="flex  ">
        {/* ---------------input fields---------------- */}
        <div className=" bg-white lg:w-5/12  h-[100vh] w-full flex  items-center justify-center">
          <div className="w-full px-[50px] my-16">
            <div className="mb-[50px]">
              <h1 className="text-dark-gray text-[28px] font-bold">
                Create New Password
              </h1>
              <p className="text-normal text-base text-info">
                Please Enter Your New Password to Proceed.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="mb-2">
                  <div className="flex flex-col items-start w-full mt-5 relative">
                    <label
                      htmlFor="otp"
                      className="mb-1.5 font-medium text-base text-dark-gray"
                    >
                      {"Create Password"}
                    </label>
                    <input
                      className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                      type={showpass ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        message: "Please enter password ",
                      })}
                      placeholder={"Enter Password"}
                    />
                    <div className=" absolute top-[58%] right-[10px]">
                      <button
                        type="button"
                        onClick={() => setShowpass((pre) => !pre)}
                      >
                        {showpass ? (
                          <Icon
                            icon="ic:outline-visibility"
                            className="text-[20px] text-black"
                          />
                        ) : (
                          <Icon
                            icon="mdi:visibility-off-outline"
                            className="text-[20px] text-black"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <label className="label">
                  {error?.password?.type === "required" && (
                    <span className=" text-sm mt-1 text-red-500">
                      {error?.password?.message}
                    </span>
                  )}
                </label>
                </div>
                <div className="mb-2">
                  <div className="flex flex-col items-start w-full mt-5 relative">
                    <label
                      htmlFor="otp"
                      className="mb-1.5 font-medium text-base text-dark-gray"
                    >
                      {"Re-enter Password"}
                    </label>
                    <input
                      className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                      type={showrepass ? "text" : "password"}
                      placeholder={"Enter Password"}
                      {...register("confirm_password", {
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Your passwords do no match";
                          }
                        },
                        message: "Please enter confirm_password ",
                      })}
                    />
                    <div className=" absolute top-[58%] right-[10px]">
                      <button
                        type="button"
                        onClick={() => setShowrepass((pre) => !pre)}
                      >
                        {showrepass ? (
                          <Icon
                            icon="ic:outline-visibility"
                            className="text-[20px] text-black"
                          />
                        ) : (
                          <Icon
                            icon="mdi:visibility-off-outline"
                            className="text-[20px] text-black"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <label className="label">
                {errors?.confirm_password?.message && (
                  <p className="text-error mt-1">
                    Your passwords does not match!
                  </p>
                )}
                </label>
                </div>
                {errors?.confirm_password?.message && (
              <p className="text-error mt-1">Your passwords does not match!</p>
            )}
              </div>
              <div className="mt-6 w-full">
                <CustomButton className={"w-full"}>
                 {isLoading ? <p>Loading...</p> : <p>Create Password</p>}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>

        {/* -----------image section---------------------- */}
        <div className="lg:flex lg:flex-col hidden w-7/12 h-screen">
          <div className="w-full h-full relative">
            <img
              src="/Images/loginup.svg"
              alt=""
              className=" absolute bottom-0 right-0 "
            />
            <img
              src="/Images/logonew.png"
              alt=""
              className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
            <img
              src="/Images/loginDown.svg"
              alt=""
              className=" absolute top-0 right-0 "
            />
          </div>
        </div>
      </div>

      {/* ------------create new pass------------------ */}
    </>
  );
};

export default CreateNewPass;
