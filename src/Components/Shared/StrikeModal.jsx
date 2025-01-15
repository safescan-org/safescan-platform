import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import SuccessToast from "./Toast/SuccessToast";
import toast from "react-hot-toast";
import ErrorToast from "./Toast/ErrorToast";
import { useStrikesUserMutation } from "../../redux/features/admin/adminApi";
import Loader2 from "./Loader2";
import CustomInput from "./input/CustomInput";

export const safetyIssues = [
  {
    title: "Aggressive behaviour to Management",
    value: "aggressive_behaviour_to_management",
  },
  {
    title: "Aggressive behaviour to others",
    value: "aggressive_behaviour_to_others",
  },
  {
    title: "Breach of Standard Site rule",
    value: "breach_of_standard_site_rule",
  },
  {
    title: "Disregarding instruction from Supervisor",
    value: "disregarding_instruction_from_supervisor",
  },
  {
    title: "Driving Dumper without Seatbelt",
    value: "driving_dumper_without_seatbelt",
  },
  {
    title: "Erecting scaffold without CSCS training",
    value: "erecting_scaffold_without_cscs_training",
  },
  {
    title: "Incorrect platform set up e.g. Trescles/Ladders",
    value: "incorrect_platform_set_up_e.g._trescles_or_ladders",
  },
  {
    title: "Non-compliance with site PPE",
    value: "non_compliance_with_site_ppe",
  },
  { title: "Operating defective plant", value: "operating_defective_plant" },
  {
    title: "Operating Plant with CSCS training",
    value: "operating_plant_with_cscs_training",
  },
  { title: "Poor Housekeeping", value: "poor_housekeeping" },
  {
    title: "Slinging Loads without CSCS training",
    value: "slinging_loads_without_cscs_training",
  },
  {
    title: "Smoking in restricted areas",
    value: "smoking_in_restricted_areas",
  },
  { title: "Tampering with Guard Rails", value: "tampering_with_guard_rails" },
  { title: "Tampering with Scaffolding", value: "tampering_with_scaffolding" },
  { title: "Tampering with toe boards", value: "tampering_with_toe_boards" },
  {
    title: "Throwing waste/materials from height",
    value: "throwing_waste_or_materials_from_height",
  },
  { title: "Unsafe working at height", value: "unsafe_working_at_height" },
  {
    title: "Using defective tools or equipment",
    value: "using_defective_tools_or_equipment",
  },
  {
    title: "Working without RAMS or SPA/SSWP",
    value: "working_without_rams_or_apa_orsswp",
  },
];

const StrikeModal = ({ modalOPen, setModalOpen, item, refetch, title }) => {
  const [active, setActive] = useState("minor");
  const [imageFiles, setImageFiles] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
    setImageFiles([]);
  }, [modalOPen]);

  const [strikesUser, { isLoading, isSuccess, error }] =
    useStrikesUserMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Strike Add success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setModalOpen(false);
      reset();
      setImageFiles([]);
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const onSubmit = async (data) => {
    const body = {
      username: item?.username,
      note: data?.note,
      strike_name: active,
      company_name: data?.company_name,
      strike_resson: data?.strike_resson,
      images: imageFiles,
    };

    const id = item?.userid;
    await strikesUser({ id, body });
  };

  const handleUnexpectedStatus = () => {
    toast.custom(
      <ErrorToast message={"Unexpected response status. Please try again."} />
    );
  };

  const handleError = (error) => {
    console.error("Error:", error);
    toast.custom(
      <ErrorToast message={"An error occurred. Please try again."} />
    );
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    setLoading(true);
    const formData = new FormData();
    files.forEach((image, index) => {
      formData.append(`files`, image);
    });

    try {
      const response = await axios.post(
        `https://q3vvxu6li2.execute-api.us-east-1.amazonaws.com/api/v1/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setImageFiles(response?.data?.images);
      } else {
        // handleUnexpectedStatus();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }

    // setImageFiles([...imageFiles, ...files]);
  };

  const handleImageDelete = (index) => {
    const newImages = [...imageFiles];
    newImages.splice(index, 1);
    setImageFiles(newImages);
  };

  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };
  return (
    <Modal
      centered
      cancelText
      cancelButtonProps
      footer={null}
      open={modalOPen}
      closeIcon={null}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={650}
      style={modalStyle}
    >
      <div className="z-[50000000] rounded-[20px] bg-white">
        <div className=" flex items-center justify-between px-9 pt-6 pb-4">
          <h2 className=" text-[28px] font-bold text-dark-gray">{title}</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-[0px] max-h-[75vh] overflow-y-scroll px-9 pb-9"
        >
          <div className="">
            <div className=" mt-5 mb-4">
              <h3 className="mb-1.5 font-medium text-base text-dark-gray">
                Select Strike Option
              </h3>
              <div className="w-full flex item-center justify-center gap-5">
                <button
                  onClick={() => setActive("minor")}
                  type="button"
                  className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#4CC800] ${
                    active === "minor"
                      ? "bg-[#4CC800] text-white"
                      : " bg-transparent text-[#4CC800]"
                  }`}
                >
                  <Icon
                    icon="material-symbols:check"
                    className={`text-[18px] ${
                      active === "minor" ? " text-white" : "text-[#4CC800]/30 "
                    }`}
                  />
                  L1
                </button>

                <button
                  onClick={() => setActive("major")}
                  type="button"
                  className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#FFC000] ${
                    active === "major"
                      ? "bg-[#FFC000] text-white"
                      : " bg-transparent text-[#FFC000]"
                  }`}
                >
                  <Icon
                    icon="material-symbols:check"
                    className={`text-[18px] ${
                      active === "major" ? " text-white" : "text-[#FFC000]/30 "
                    }`}
                  />
                  L2
                </button>

                <button
                  onClick={() => setActive("dismissal")}
                  type="button"
                  className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#F40909] ${
                    active === "dismissal"
                      ? "bg-[#F40909] text-white"
                      : " bg-transparent text-[#F40909]"
                  }`}
                >
                  <Icon
                    icon="material-symbols:check"
                    className={`text-[18px] ${
                      active === "dismissal"
                        ? " text-white"
                        : "text-[#F40909]/30 "
                    }`}
                  />
                  L3
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start w-full mt-5">
              <label
                htmlFor="otp"
                className="mb-1.5 font-medium text-base text-dark-gray"
              >
                Write Note
              </label>
              <textarea
                className="py-[15px] h-[85px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                name=""
                {...register("note", {
                  required: {
                    value: true,
                    message: "Please Enter Note",
                  },
                })}
                placeholder="Some Note Here..."
              ></textarea>
              <label className="label">
                {errors.note?.type === "required" && (
                  <span className=" text-sm mt-1 text-red-500">
                    {errors.note.message}
                  </span>
                )}
              </label>
            </div>

            <div className="select-container mt-5">
              <label
                htmlFor="strike_reason"
                className="mb-1.5 font-medium text-base text-dark-gray"
              >
                Reason for Warning
              </label>
              <div className="w-full relative">
                <select
                  id="strike_reason"
                  className={`py-[15px] px-[14px] rounded-[10px] w-full text-sm font-medium outline-none border-[1px] focus:border-primary ${
                    errors.strike_resson ? "border-red-500" : "border-[#A3AED0]"
                  }`}
                  {...register("strike_resson", {
                    required: "Please select a reason for the warning.",
                  })}
                >
                  <option value="">Select Reason</option>
                  {safetyIssues.map((item, index) => (
                    <option key={index} value={item?.value}>
                      {item?.title}
                    </option>
                  ))}
                </select>
                <span className="text-[25px] absolute text-[#47548C] top-[10px] right-[8px]">
                  <Icon icon="mingcute:down-line" />
                </span>
              </div>
              {errors?.strike_resson && (
                <span className="text-sm mt-1 text-red-500">
                  {errors.strike_resson.message}
                </span>
              )}
            </div>

            <CustomInput
              label={"Company Name"}
              type={"text"}
              register={register("company_name", {
                required: {
                  value: true,
                  message: "Please Enter Company Name",
                },
              })}
              error={errors.company_name}
              placeholder={"Enter Company Name"}
            />

            <div className="flex flex-col items-start w-full mt-3">
              <label
                htmlFor="otp"
                className="mb-1.5 font-medium text-base text-dark-gray"
              >
                Attach Image
              </label>
              <div className=" w-full cursor-pointer h-[175px] relative flex items-center justify-center rounded-2xl bg-[#2D2D2D]/5 border-[2px] border-spacing-8 border-dashed border-[#2D2D2D]">
                {loading ? (
                  <>
                    <Loader2 />
                  </>
                ) : (
                  <div className=" flex items-center justify-center flex-col">
                    <Icon
                      icon="mynaui:cloud-upload"
                      className="text-[#2D2D2D] text-[50px]"
                    />
                    <h3 className=" text-[14px] font-bold text-[#2D2D2D]">
                      Upload Image
                    </h3>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className=" absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                />
              </div>
              <div>
                {imageFiles ? (
                  <>
                    <div className=" flex flex-wrap gap-2 items-center py-2">
                      {imageFiles?.map((file, index) => (
                        <div
                          key={index}
                          className=" w-[100px] relative h-[70px] group rounded-md overflow-hidden"
                        >
                          <img
                            src={`https://scansafes3.s3.amazonaws.com/${file}`}
                            alt=""
                            className=" w-full h-full object-fill"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            className=" absolute group-hover:flex hidden top-0 left-0 w-full h-full bg-black/50  items-center justify-center"
                          >
                            <Icon
                              icon="gg:trash-empty"
                              className="text-[22px] text-white"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="mt-[30px] flex items-center gap-5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="font-[500] text-[14px] h-[40px] w-full bg-[#664DFF]/10 duration-300 px-5 rounded-[4px] text-primary hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <CustomButton className={" w-full"}>
              {isLoading ? "Loading..." : "Strike"}
            </CustomButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default StrikeModal;
