import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../Components/Shared/input/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../Components/Shared/CustomButton";
import { useNavigate } from "react-router-dom";
import CreateNewPass from "../../Components/Shared/CreateNewPass";
import { useOtpSendMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Components/Shared/Toast/SuccessToast";
import ErrorToast from "../../Components/Shared/Toast/ErrorToast";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ResentOtp2 from "../../Components/Shared/ResentOtp2";

const ForgotPass = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [test, setTest] = useState(false);
  const [getUserPass, setGetUserPass] = useState(false);
  const { otpData } = useSelector((state) => state.auth);
  const [otpphone, setOtpPhone] = useState();
  const [phone, setPhone] = useState("");
  const [error2, setError] = useState(false);
  const navigate = useNavigate();
  // ------------otp------------

  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    otpSend,
    { isLoading: isLoading1, isSuccess: isSuccess1, error: error1 },
  ] = useOtpSendMutation();

  useEffect(() => {
    if (isSuccess1) {
      const message = `send otp this phone number! OTP=${otpData?.otp}`;
      toast.custom(<SuccessToast message={message} />);
      setGetUserPass(true);
    }
    if (error1) {
      toast.custom(
        <ErrorToast message={error1?.data.error || error1?.data.message} />
      );
    }
  }, [isSuccess1, error1]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);


  const handleChange2 = (value) => {
    if (value) {
      setPhone(value);
      setError(false);
    }
  };

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

  const onSubmit = () => {
    const verifyNumberData = Object.values(otp).join("");
    if (verifyNumberData !== otpData?.otp) {
      toast.custom(<ErrorToast message={"otp not match"} />);
    } else {
      setTest(true);
    }
  };

  const handleUserPass = async (data) => {
    if (!phone) {
      setError(true);
    } else {
        const body = {
          username:data?.username,
          phone:phone
        }
        setOtpPhone(body);
        await otpSend(body);
    }
  };

  return (
    <>
      <div className=" absolute top-[50px] left-[50px]">
        <button
          onClick={() => navigate("/")}
          className=" flex items-center gap-2 py-1 px-3 bg-primary rounded-md text-white"
        >
          <Icon icon="humbleicons:arrow-left" className=" text-[25px]" /> Back
        </button>
      </div>

      {!getUserPass ? (
        <>
          <div className="flex  ">
            {/* ---------------input fields---------------- */}
            <div className=" bg-white lg:w-5/12  h-[100vh] w-full flex  items-center justify-center">
              <div className="w-full px-[50px] my-16">
                <div className="mb-[50px]">
                  <h1 className="text-dark-gray text-[28px] font-bold">
                    Forgot Password?
                  </h1>
                  <p className="text-normal text-base text-info">
                    Please Enter Username And Phone Number
                  </p>
                </div>
                <form onSubmit={handleSubmit(handleUserPass)}>
                  <div className="mb-2">
                    <CustomInput
                      label={"Username"}
                      type={"text"}
                      register={register("username", {
                        required: {
                          value: true,
                          message: "Please Enter User Name",
                        },
                      })}
                      error={errors.lastName}
                      placeholder={"Enter Username"}
                    />
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
                        onChange={handleChange2}
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
                          border:"1px solid rgb(231, 228, 228)",
                          borderRadius: "10px",
                        }}
                      />
                      {error2 && (
                        <label className="label">
                          <span className=" text-sm mt-1 text-red-500">
                            Please Enter Phone Number
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 w-full">
                    <CustomButton className={"w-full"}>
                      {isLoading1 ? <p>Loading...</p> : <p>Send</p>}
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
        </>
      ) : (
        <>
          {!test ? (
            <>
              {/* -----------------forgot pass----------------- */}
              <div className="flex  ">
                {/* ---------------input fields---------------- */}
                <div className=" bg-white lg:w-5/12  h-[100vh] w-full flex  items-center justify-center">
                  <div className="w-full px-[50px] my-16">
                    <div className="mb-[50px]">
                      <h1 className="text-dark-gray text-[28px] font-bold">
                        Forgot Password?
                      </h1>
                      <p className="text-normal text-base text-info">
                        Please Enter OTP That Sent To{" "}
                        {otpphone?.phone?.slice(0, 3)}******
                        {otpphone?.phone?.slice(-2, otpphone?.phone?.length)}
                      </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h1 className="text-lg font-medium text-dark-gray mb-4">
                        Enter OTP
                      </h1>
                      <div className="flex items-center py-2 gap-9  mx-auto w-[280px]">
                        {otp.map((value, index) => {
                          return (
                            <input
                              key={index}
                              type="text"
                              ref={(input) =>
                                (inputRefs.current[index] = input)
                              }
                              value={value}
                              onChange={(e) => handleChange(index, e)}
                              onClick={() => handleClick(index)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="border border-dark-gray/20 text-center w-10 h-11 rounded-[10px]"
                            />
                          );
                        })}
                      </div>
                      <ResentOtp2 data={otpphone}/>
                      <div className="mt-6 w-full">
                        <CustomButton className={"w-full"}>
                          <p>Verify OTP</p>
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
            </>
          ) : (
            <>
              {/* ------------create new pass------------------ */}
              <CreateNewPass />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ForgotPass;
