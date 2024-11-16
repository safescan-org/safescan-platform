import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";
import { useApproveUserMutation, useWorkerPermissionMutation } from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import { Icon } from "@iconify/react";

const WorkersEdit = ({ item, setModalOpen, modalOPen, refetch }) => {
  const [active, setActive] = useState("due");
  const [getFine, setGetFine] = useState();
  const [fineError, setFineError] = useState(false);
  const [permison,setPermision]=useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [approveUser, { isLoading, isSuccess, error }] =
    useApproveUserMutation();

    const [workerPermission,{isSuccess:isSuccess2,error:error2}] = useWorkerPermissionMutation()
  // console.log("modal Data=======", item);

  useEffect(() => {
    if (isSuccess) {
      const message = "Update Worker success";
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


  useEffect(()=>{
    if(isSuccess2){
      refetch();
      const message = "Worker Assets Testing Permission update";
      toast.custom(<SuccessToast message={message} />);
    }

    if (error2) {
      toast.custom(
        <ErrorToast message={error2?.data?.error || error2?.data?.message} />
      );
      refetch();
    }

  },[isSuccess2,error2])

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
      setValue("first_name", item?.frist_name);
      setValue("last_name", item?.last_name);
      setValue("email", item?.email);
      setValue("phone", item?.phone);
      setValue("site_address", item?.site_address);
      setValue("emloyeer_name", item?.emloyeer_name);
      setValue("ice_name", item?.ice_name);
      setValue("ice_number", item?.ice_number);
      setValue("medical_condition", item?.medical_condition);
      setPermision(item?.worker_permission)
      // setValue('minor', item?.minor);
      // setValue('major', item?.major);
      // setValue('dismissal', item?.dismissal);
    }
  }, [item,isSuccess]);


  const handelChange = async(e)=>{
    const value = e.target.value;
    setPermision(value)

    // const body={
    //   username:item?.username,
    //   worker_permission:value,
    // }
    // const id = item?.userid;
    // await workerPermission({ id, body });
  }

  console.log(Boolean(permison))

  const onSubmit = async (data) => {
    const body = {
      username: item?.username,
      frist_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      // phone: data.phone,
      site_address: data.site_address,
      emloyeer_name: data.emloyeer_name,
      ice_name: data.ice_name,
      ice_number: data.ice_number,
      medical_condition: data.medical_condition,
      outstanding_fines: Number(data.outstanding_fines),
      minor: Number(data.minor),
      major: Number(data.major),
      dismissal: Number(data.dismissal),
      is_active: true,
      worker_permission:permison==="true" ? true : false
    };
    const id = item?.userid;
    await approveUser({ id, body });
  };
  return (
    <CustomModal
      modalOPen={modalOPen}
      setModalOpen={setModalOpen}
      handleSubmit={handleSubmit(onSubmit)}
      width={590}
      title="Edit Worker"
      buttonText={isLoading ? "Loading..." : "Save Changes"}
    >
      <div className="flex items-center gap-4">
        <CustomInput
          label={"First Name"}
          type={"text"}
          register={register("first_name", {
            required: {
              value: true,
              message: "Please enter first name",
            },
          })}
          error={errors.first_name}
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

      <div className="select-container">
        <label for="last" className="label-text">
          Assets Testing Permission
        </label>
        <div className="w-full relative">
          <select
            className="custom-select"
            name=""
            id=""
            value={permison}
            onChange={handelChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>

          </select>
          <span className=" text-[25px] absolute text-[#47548C] top-[10px] right-[8px]">
            <Icon icon="mingcute:down-line" />
          </span>
        </div>
        <label className="error-label">
          {errors?.category?.type === "required" && (
            <span className="error-message">{errors?.category?.message}</span>
          )}
        </label>
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
            {...register("outstanding_fines")}
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

export default WorkersEdit;
