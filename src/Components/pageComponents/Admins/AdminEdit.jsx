import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";
import { useApproveUserMutation } from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const AdminEdit = ({ item, setModalOpen, refetch, modalOPen }) => {
  const [active, setActive] = useState(0);
  const [getFine, setGetFine] = useState();
  const [fineError, setFineError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [approveUser, { isLoading, isSuccess, error }] =
    useApproveUserMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Update Admin success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setModalOpen(false);
      reset();
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const handelFine = (e) => {
    const value = e.target.value;
    if (value) {
      setGetFine(value);
    }
  };

  useEffect(() => {
    if (item.fine_status - item?.outstanding_fines < getFine) {
      setFineError(true);
    } else {
      setFineError(false);
    }
  }, [getFine, item]);

  useEffect(() => {
    if (item) {
      setActive(item?.outstanding_fines);
      setValue("frist_name", item?.frist_name);
      setValue("last_name", item?.last_name);
      setValue("email", item?.email);
      setValue("phone", item?.phone);
      setValue("site_address", item?.site_address);
      setValue("emloyeer_name", item?.emloyeer_name);
      setValue("ice_name", item?.ice_name);
      setValue("ice_number", item?.ice_number);
      setValue("medical_condition", item?.medical_condition);
      // setValue("minor", item?.minor);
      // setValue("major", item?.major);
      // setValue("dismissal", item?.dismissal);
      setGetFine();
    }
  }, [item, isSuccess]);

  const onSubmit = async (data) => {
    const minor = Number(data.minor);
    const major = Number(data.major);
    const dismissal = Number(data.dismissal);

    // Validate L1, L2, L3 to ensure non-negative numbers
    if (minor < 0 || major < 0 || dismissal < 0) {
      toast.custom(
        <ErrorToast message={"L1, L2, and L3 values cannot be negative."} />
      );
      return;
    }
    const body = {
      username: item?.username,
      frist_name: data.frist_name,
      last_name: data.last_name,
      email: data.email,
      // phone: data.phone,
      site_address: data.site_address,
      // outstanding_fines: active,
      emloyeer_name: data.emloyeer_name,
      ice_name: data.ice_name,
      ice_number: data.ice_number,
      medical_condition: data.medical_condition,
      outstanding_fines: Number(getFine),
      minor: Number(data.minor),
      major: Number(data.major),
      dismissal: Number(data.dismissal),
      is_active: true,
    };
    const id = item?.userid;
    if (item.fine_status - item?.outstanding_fines < getFine) {
      toast.custom(
        <ErrorToast
          message={
            "Your amount is more than fine due! Please enter valid amount"
          }
        />
      );
    } else {
      await approveUser({ id, body });
    }
  };

  return (
    <CustomModal
      modalOPen={modalOPen}
      setModalOpen={setModalOpen}
      handleSubmit={handleSubmit(onSubmit)}
      width={590}
      title="Edit Admin"
      buttonText={isLoading ? "Loading..." : "Save Changes"}
    >
      <div className="flex items-center gap-4">
        <CustomInput
          label={"First Name"}
          type={"text"}
          register={register("frist_name", {
            required: {
              value: true,
              message: "Please enter first name",
            },
          })}
          error={errors.frist_name}
          placeholder={"Enter First Name"}
        />

        <CustomInput
          label={"Last Name"}
          type={"text"}
          register={register("last_name", {
            required: {
              value: true,
              message: "Please enter last name",
            },
          })}
          error={errors.last_name}
          placeholder={"Enter Last Name"}
        />
      </div>

      {/* <CustomInput
        label={"Mobile Number"}
        type={"text"}
        register={register("phone", {
          required: {
            value: true,
            message: "Please enter Mobile Number",
          },
        })}
        error={errors.phone}
        placeholder={"Mobile Number"}
      /> */}

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
        placeholder={"Email Address"}
      />

      <CustomInput
        label={"Site Address"}
        type={"text"}
        register={register("site_address", {
          required: {
            value: true,
            message: "Please enter first name",
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
            message: "Please enter first name",
          },
        })}
        error={errors.emloyeer_name}
        placeholder={"Enter Employers Name"}
      />
      <CustomInput
        label={"ICE Name"}
        type={"text"}
        register={register("ice_name", {
          required: {
            value: true,
            message: "Please enter first name",
          },
        })}
        error={errors.ice_name}
        placeholder={"Enter ICE Name"}
      />
      <CustomInput
        label={"ICE Number"}
        type={"number"}
        register={register("ice_number", {
          required: {
            value: true,
            message: "Please enter first name",
          },
        })}
        error={errors.ice_number}
        placeholder={"Enter ICE Number"}
      />
      <CustomInput
        label={"Medical Condition"}
        type={"text"}
        register={register("medical_condition", {
          required: {
            value: true,
            message: "Please enter first name",
          },
        })}
        error={errors.medical_condition}
        placeholder={"Enter Medical Condition"}
      />

      <div className=" flex items-center gap-4 justify-between">
        <CustomInput
          label={"L1"}
          type={"number"}
          register={register("minor")}
          placeholder={item?.minor}
          required={false}
        />
        <CustomInput
          label={"L2"}
          type={"number"}
          register={register("major")}
          placeholder={item?.major}
          required={false}
        />
        <CustomInput
          label={"L3"}
          type={"number"}
          register={register("dismissal")}
          placeholder={item?.dismissal}
          required={false}
        />
      </div>

      <div className=" mt-5">
        <h3 className="mb-1.5 font-medium text-base text-dark-gray">
          Paid Amount
        </h3>
        <div className="w-full relative flex item-center justify-center overflow-hidden  gap-0 border-[1px] rounded-[10px]">
          <div className=" flex items-center h-[44px] px-[14px] w-[250px] rounded-l-[10px] border-[1px] border-[#F40909]/30 ">
            <h2 className=" font-medium text-[14px] text-[#F40909]">
              Fines Due: €{item.fine_status - item?.outstanding_fines}{" "}
            </h2>
          </div>
          <input
            className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0] rounded-[10px]  w-full text-sm font-medium outline-none border-none "
            type={"number"}
            placeholder={"Enter Amount"}
            id="otp"
            register={register("outstanding_fines")}
            onChange={handelFine}
          />
          <span className=" absolute top-[10px] right-[10px] text-[#2D396B] text-[14px] font-bold">
            €
          </span>
        </div>
        {fineError && (
          <p className="text-error mt-1">Your amount is more than fine due!</p>
        )}
      </div>
    </CustomModal>
  );
};

export default AdminEdit;
