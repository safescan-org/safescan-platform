import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../Shared/input/CustomInput";
import CustomButton from "../../../Shared/CustomButton";
import { useCreateCustomerMutation } from "../../../../redux/features/superAdmin/superApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import PhoneModal from "./PhoneModal";

const CustomerCreate = ({
  modalOPen,
  setModalOpen,
  refetch1,
  refetch2,
  allrefecth,
}) => {
  const [showrepass, setShowrepass] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [phoneOpen,setPhoneOpen] = useState(false)
  const [password,setPassword] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [createCustomer, { isSuccess, isLoading, error }] =
    useCreateCustomerMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Create Customer success";
      toast.custom(<SuccessToast message={message} />);
      setModalOpen(false);
      refetch1();
      refetch2();
      allrefecth();
      reset();
      setPhoneOpen(true)
    }
    if (error) {
      console.log(error);
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const onSubmit = (data) => {
    const updateData = {
      ...data,
      usertype: "super_admin",
    };
    setPassword(data.username)
    createCustomer(updateData);
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
                Create A Customer
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
              className="w-full mt-[0px] px-9 pb-9 h-[75vh] overflow-y-scroll"
            >
              <div className=" flex items-center gap-5 justify-between">
                <CustomInput
                  label={"First Name"}
                  type={"text"}
                  register={register("first_name", {
                    required: {
                      value: true,
                      message: "Enter First Name",
                    },
                  })}
                  error={errors.first_name}
                  placeholder={"Enter First Name"}
                />
                <CustomInput
                  label={"Last Name"}
                  type={"text"}
                  register={register("last_Name", {
                    required: {
                      value: true,
                      message: "Please enter Password",
                    },
                  })}
                  error={errors.last_Name}
                  placeholder={"Enter Last Name"}
                />
              </div>
              <CustomInput
                label={"UserName"}
                type={"text"}
                register={register("username", {
                  required: {
                    value: true,
                    message: "Please enter Mobile Number",
                  },
                })}
                error={errors.username}
                placeholder={"Enter Username"}
              />
              {/* <CustomInput
                label={"Mobile Number"}
                type={"number"}
                register={register("phone", {
                  required: {
                    value: true,
                    message: "Please enter Mobile Number",
                  },
                })}
                error={errors.phone}
                placeholder={"Enter Phone Number"}
              /> */}
              <CustomInput
                label={"Email Address"}
                type={"email"}
                register={register("email", {
                  required: {
                    value: true,
                    message: "Please enter Email",
                  },
                })}
                error={errors.email}
                placeholder={"Enter Email Address"}
              />
              <div className="mb-2 w-full">
                <CustomInput
                  label={"Site Name"}
                  type={"text"}
                  register={register("site_name", {
                    required: {
                      value: true,
                      message: "Please enter site name ",
                    },
                  })}
                  error={errors.site_name}
                  placeholder={"Enter Site Name"}
                />
              </div>
              <CustomInput
                label={"Site Address"}
                type={"text"}
                register={register("site_address", {
                  required: {
                    value: true,
                    message: "Please enter Site Address",
                  },
                })}
                error={errors.site_address}
                placeholder={"Enter Site Address"}
              />
              <CustomInput
                label={"Employers Name"}
                type={"text"}
                register={register("emloyeer_name", {
                  required: {
                    value: true,
                    message: "Please enter Employers Name",
                  },
                })}
                error={errors.emloyeer_name}
                placeholder={"Enter  Employers Name"}
              />

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
                    })}
                    placeholder={"Enter password"}
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
                      required: true,
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Your passwords do no match";
                        }
                      },
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
              </div>
              {errors?.confirm_password?.message && (
                <p className="text-error mt-1">
                  Your passwords does not match!
                </p>
              )}
              <div className="mt-[20px] flex items-center gap-5">
                <CustomButton className={" w-full"}>
                  {isLoading ? "Loading..." : "Create New"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <PhoneModal
        modalOPen={phoneOpen}
        setModalOpen={setPhoneOpen}
        refetch1={refetch1}
        refetch2={refetch2}
        allrefecth={allrefecth}
        username={password}
      />
    </>
  );
};

export default CustomerCreate;
