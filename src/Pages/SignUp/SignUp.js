import React, { useEffect, useState } from "react";
import CustomInput from "../../Components/Shared/input/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../Components/Shared/CustomButton";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import {
  useCreateCustomerMutation,
  useCreateStripeCustomerMutation,
  useGetProductsQuery,
} from "../../redux/features/superAdmin/superApi";
import SuccessToast from "../../Components/Shared/Toast/SuccessToast";
import PhoneAdd from "./PhoneAdd";
import PhoneInput from "react-phone-input-2";
import OtpForm from "./OtpForm";

const SignUp = () => {
  const [showpass, setShowpass] = useState(false);
  const [showrepass, setShowrepass] = useState(false);
  const [phoneActive, setPhoneActive] = useState(false);
  const [formData, setFormData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stripeCusID, setStripeCusID] = useState(null);
  const [userId, setUserId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [createCustomer, { isSuccess, isLoading, error }] =
    useCreateCustomerMutation();
  // const {
  //   data,
  //   isLoading: isLoading1,
  //   refetch,
  // } = useGetProductsQuery("", {
  //   refetchOnMountOrArgChange: true,
  // });

  const [
    createStripeCustomer,
    { isSuccess: isSuccess2, isLoading: isLoading2, error: error2 },
  ] = useCreateStripeCustomerMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Customer Created Successfully!";
      handleCreateStripeCustomer();

      toast.custom(<SuccessToast message={message} />);
      setPhoneActive(true);
    }
    if (error) {
      toast.error(error?.data.error);
    }
  }, [isSuccess, error]);

  const onSubmit = async (data) => {
    const updateData = {
      ...data,
      phone: phoneNumber,
      usertype: "super_admin",
    };
    setFormData(data);
    const res = await createCustomer(updateData);
    setUserId(res?.data?.userid);
    console.log(res?.data?.userid);
  };
  const handleCreateStripeCustomer = async () => {
    const stripeCusPayload = {
      // username: "widafivu",
      username: formData?.username,
    };
    const res = await createStripeCustomer(stripeCusPayload);
    setStripeCusID(res?.data?.id);
  };
  function handleChange(e) {
    setPhoneNumber(e);
  }
  useEffect(() => {}, []);
  return (
    <div className="flex  ">
      {/* ---------------input fields---------------- */}
      <div className=" bg-white lg:w-5/12 w-full flex  items-center justify-center ">
        {phoneActive ? (
          <PhoneAdd
            number={phoneNumber}
            userName={formData?.username}
            stripeCusID={stripeCusID}
            userId={userId}
          />
        ) : (
          <>
            <div className="w-full px-[50px] my-16 overflow-y-scroll ">
              <div className="mb-[50px]">
                <h1 className="text-dark-gray text-[28px] font-bold">
                  Sign Up
                </h1>
                <p className="text-normal text-base text-info">
                  Please Fill Those Information Bellow To Create an Account.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder={"Create username"}
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
                <div className="mb-2">
                  <CustomInput
                    label={"Username"}
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
                </div>
                <div className="mb-2">
                  <CustomInput
                    label={"Email Address"}
                    type={"email"}
                    register={register("email", {
                      required: {
                        value: true,
                        message: "Please enter Email Address",
                      },
                    })}
                    error={errors.email}
                    placeholder={"Enter Email Address"}
                  />
                </div>
                {/* <div className="mb-2">
                  <CustomInput
                    label={"Phone Number"}
                    type={"number"}
                    register={register("phone", {
                      required: {
                        value: true,
                        message: "Please enter Mobile Number",
                      },
                    })}
                    error={errors.phone}
                    placeholder={"Enter Phone Number"}
                  />
                </div> */}
                <div className="flex items-start flex-col justify-between">
                  <label
                    htmlFor=""
                    className="mb-2 font-medium text-base text-dark-gray"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    country="gb"
                    onlyCountries={["gb", "ie"]}
                    enableSearch={false}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                    }}
                    onChange={handleChange}
                    containerStyle={{
                      borderRadius: "5px",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "45px",
                      fontSize: "16px",
                      paddingLeft: "50px",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="mb-2">
                  <CustomInput
                    label={"Site Address"}
                    type={"text"}
                    register={register("site_address", {
                      required: {
                        value: true,
                        message: "Please enter site address ",
                      },
                    })}
                    error={errors.site_address}
                    placeholder={"Enter Site Address"}
                  />
                </div>
                <div className="lg:flex items-center gap-4">
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
                  <div className="mb-2 w-full">
                    <CustomInput
                      label={"Employers Name"}
                      type={"text"}
                      register={register("emloyeer_name", {
                        required: {
                          value: true,
                          message: "Please enter emloyeer_name ",
                        },
                      })}
                      error={errors.emloyeer_name}
                      placeholder={"Enter Employers Name"}
                    />
                  </div>
                </div>
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
                    <label className="label">
                      {error?.password?.type === "required" && (
                        <span className=" text-sm mt-1 text-red-500">
                          {error?.password?.message}
                        </span>
                      )}
                    </label>
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
                <div className="mt-6 w-full">
                  <CustomButton className={"w-full"}>
                    {isLoading ? <p>Loading...</p> : <p>Next</p>}
                  </CustomButton>
                </div>
              </form>
              <p className="text-center text-info text-sm font-medium mt-4">
                Already Have An Account?{" "}
                <Link to={"/"} className="font-bold underline text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      {/* -----------image section---------------------- */}
      <div className="lg:flex lg:flex-col hidden fixed top-0 right-0 w-7/12 h-screen">
        <div className="w-full h-full relative">
          <img
            src="/Images/loginup.svg"
            alt=""
            className=" absolute bottom-0 right-0 "
          />
          <img
            src="/Images/logonew.png"
            alt=""
            className=" absolute top-[50%] w-[450px] h-[300px]  left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
          <img
            src="/Images/loginDown.svg"
            alt=""
            className=" absolute top-0 right-0 "
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
