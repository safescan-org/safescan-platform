import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../Shared/input/CustomInput";
import { Icon } from "@iconify/react";
import CustomButton from "../../Shared/CustomButton";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../../redux/features/admin/adminApi";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import axios from "axios";
import { useSelector } from "react-redux";
import PasswordInput from "../../Shared/input/PasswordInput";
import Unverified from "../../Shared/modal/Unverified";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import server_url from "../../../config";

const CreatedWorkersModal = ({ modalOPen, refetch, setModalOpen }) => {
  const { token, search } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState("email");
  const [shareText, setShareText] = useState("");
  const [shareMsg, setShareMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [veryfyModal, setVeryfyModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [phone, setPhone] = useState("");
  const [error1, setError] = useState(false);
  const [createUser, { isLoading, error, isSuccess }] = useCreateUserMutation();
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      const message = "Create Worker success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setModalOpen(false);
      reset();
      setSuccess(true);
      setShareText("");
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const handleChange = (value) => {
    if (value) {
      setPhone(value);
      setError(false);
    }
  };

  const onSubmit = (data) => {
    if (search?.is_verified) {
      const bodyData = {
        username: data?.username,
        password: data?.Password,
        confirm_password: data?.Password,
        usertype: "worker",
      };
      createUser(bodyData);
      setShareMsg(bodyData);
    } else {
      setVeryfyModal(true);
      setModalOpen(false);
    }
  };

  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };

  const handleShare = async () => {
    if (
      type === "email" &&
      shareText &&
      shareMsg?.username &&
      shareMsg?.password
    ) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server_url}/users/shared?email=${shareText}&username=${shareMsg?.username}&password=${shareMsg?.password}&role=worker`,
          {
            // mode: 'no-cors',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status === 200) {
          toast.custom(<SuccessToast message={response?.data?.message} />);
          reset();
        } else {
          toast.custom(<ErrorToast message={response?.data?.error} />);
          reset();
        }
        setLoading(false);
        setSuccess(false);
      } catch (error) {
        toast.custom(<ErrorToast message={error?.response?.data?.error} />);
        setLoading(false);
      }

      // if (shareText.trim() !== '') {
      //   const mailtoLink = `mailto:${encodeURIComponent(shareText)}?body=${encodeURIComponent(
      //     `
      //     Hello, I am from Safe Scan. Here is your username and password:

      //     Username : ${shareMsg?.username}
      //     Password : ${shareMsg?.password}
      //     Confirm Password : ${shareMsg?.confirm_password}

      //     `
      //   )
      //     }

      //     `;
      //   window.location.href = mailtoLink;
      //   setSuccess(false)
      // }
    }

    if (type === "Whatsapp") {
      if (phone.trim() !== "") {
        try {
          const response = await axios.get(
            `${server_url}/users/shared?phone=${phone}&username=${shareMsg?.username}&password=${shareMsg?.password}&role=worker`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response?.status === 200) {
            toast.custom(<SuccessToast message={response?.data?.message} />);
            reset();
          } else {
            toast.custom(<ErrorToast message={response?.data?.error} />);
            reset();
          }
          setLoading(false);
          setSuccess(false);
          reset();
        } catch (error) {
          toast.custom(<ErrorToast message={error?.response?.data?.error} />);
          setLoading(false);
        }
      }
    }
  };
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e);
  }
  return (
    <div>
      {/* ---------create worker modal----------------- */}
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={450}
        className={``}
        style={modalStyle}
      >
        <div>
          <div className="z-[50000000] rounded-[20px] bg-white">
            <div className=" flex items-center justify-between px-9 pt-6 pb-4">
              <h2 className=" text-[28px] font-bold text-dark-gray">
                Create New Worker
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
              className="w-full mt-[0px] px-9 pb-9"
            >
              <div className="">
                <CustomInput
                  label={"Username"}
                  type={"text"}
                  register={register("username", {
                    required: {
                      value: true,
                      message: "Please enter Username",
                    },
                  })}
                  error={errors.username}
                  placeholder={"Create username"}
                />

                <PasswordInput
                  label={"Password"}
                  type={"password"}
                  register={register("Password", {
                    required: {
                      value: true,
                      message: "Please enter Password",
                    },
                  })}
                  error={errors.Password}
                  placeholder={"Create Password"}
                />
              </div>
              <div className="mt-[20px] flex items-center gap-5">
                <CustomButton className={" w-full"}>
                  {isLoading ? "Loading..." : "Create New"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* ---------success and share modal----------------- */}
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={success}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setSuccess(false)}
        onCancel={() => setSuccess(false)}
        width={450}
      >
        <div className=" p-6 ">
          <div className=" rounded-[30px]">
            <div className=" mb-3 flex items-center justify-between w-full">
              <img src="/Images/success.svg" alt="" />
              <button
                onClick={() => setSuccess(false)}
                className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
              >
                <Icon icon="material-symbols:close" />
              </button>
            </div>
            <div>
              <h2 className=" text-[24px] font-[700] text-[#1B2559]">
                Worker Created Successfully!
              </h2>
              <p className="text-[16px] font-[400] text-info">
                Now, You Can Share With Worker Access Details Via Email Or Phone
                Number.
              </p>
            </div>

            <div className=" pt-4">
              <div className="w-full flex items-center justify-between">
                <button
                  onClick={() => setType("email")}
                  className={`text-base font-medium ${
                    type === "email" ? "text-dark-gray" : "text-primary"
                  } `}
                >
                  Share Via Email
                </button>
                <button
                  onClick={() => setType("Whatsapp")}
                  className={`text-base font-medium ${
                    type === "Whatsapp" ? "text-dark-gray" : "text-primary"
                  }`}
                >
                  Share Via Number
                </button>
              </div>
              {type === "email" ? (
                <input
                  className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                  type={type === "email" ? "email" : "text"}
                  required
                  placeholder={
                    type === "email"
                      ? "Enter Email Address"
                      : "Enter Whatsapp Number"
                  }
                  id="otp"
                  onChange={(e) => setShareText(e.target.value)}
                />
              ) : (
                <>
                  <PhoneInput
                    country="gb"
                    onlyCountries={["gb", "ie", "bd"]}
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
                </>
              )}
            </div>
          </div>

          <div className=" flex items-center justify-center gap-5 pt-[20px]">
            {/* <button
              onClick={() => setSuccess(false)}
              className="font-bold w-full  h-[40px] px-6 hover:text-red-500 hover:border-red-500 duration-300 rounded-[10px] bg-transparent text-secondary border border-secondary"
            >
              Skip For Now
            </button> */}
            <button
              onClick={handleShare}
              className="font-bold w-full  h-[40px] px-6 rounded-[10px] bg-primary hover:bg-primary/80 duration-300 border border-primary text-white "
            >
              {loading ? "Loading..." : " Share"}
            </button>
          </div>
        </div>
      </Modal>
      <Unverified modalOPen={veryfyModal} setModalOpen={setVeryfyModal} />
    </div>
  );
};

export default CreatedWorkersModal;
