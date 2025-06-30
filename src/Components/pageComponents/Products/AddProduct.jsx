import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { category, formattedDate, subCategory } from "../../../helper/jwt";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import axios from "axios";
import { useSelector } from "react-redux";
import Unverified from "../../Shared/modal/Unverified";
import CustomModal3 from "../../Shared/modal/CustomModal3";
import InductionWorker from "../../../Pages/Induction/InductionWorker";
import server_url from "../../../config";

const AddProduct = ({ refetch, setModalOpen, modalOPen }) => {
  const [active, setActive] = useState("passed");
  const [lastDate, setLastDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const formattedNextDate = formattedDate(nextDate);
  const [imageFiles, setImageFiles] = useState();
  const { token, search } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [veryfyModal, setVeryfyModal] = useState(false);
  const [subList, setSubList] = useState("");
  const [subCategoryList, setSubCategory] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState([]);
  const [workerOpen, setWorkerOpen] = useState(false);

  const dropDown = [
    {
      title: "GA2 Crane",
      value: "crane",
    },
    {
      title: "GA2 Telehandler",
      value: "telehandler",
    },
    {
      title: "GA2 Excavator",
      value: "excavator",
    },
    {
      title: "GA2 Site Dumper Forward Tipping",
      value: "site_dumper_forward_tipping",
    },
    {
      title: "GA2 Site Dumper (Articulated)",
      value: "site_dumper_articulated",
    },
    {
      title: "GA2 Roller",
      value: "roller",
    },
    {
      title: "GA2 MEWP",
      value: "mewp",
    },
    {
      title: "GA2 Lifting Equipment",
      value: "lifting_equipment",
    },
    {
      title: "GA2 Scaffold",
      value: "scaffold",
    },
    {
      title: "GA2 Working at Heights",
      value: "working_at_heights",
    },
    {
      title: "GA2 Netting",
      value: "netting",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
    setImageFiles("");
  }, [modalOPen]);

  const onSubmit = async (data) => {
    if (search?.is_verified) {
      setLoading(true);
      const formData = new FormData();
      formData.append("product_name", data?.product_name);
      formData.append("product_owner", data?.product_owner);
      formData.append("location", data?.location);
      formData.append("site_address", data?.site_address);
      formData.append("note", data?.note);
      formData.append("next_test_date", formattedNextDate);
      formData.append("status", active);
      formData.append("product_number", data?.product_number);
      formData.append("category", data?.category);
      formData.append("sub_category", data?.sub_category);
      formData.append("form_name", data?.form_name);
      formData.append("workers", JSON.stringify(selectedWorker));
      if (active === "passed") {
        formData.append("passed", "true");
      }
      if (active === "attention") {
        formData.append("attention", "true");
      }
      if (active === "failed") {
        formData.append("failed", "true");
      }
      formData.append(`files`, imageFiles);
      try {
        const response = await axios.post(`${server_url}/products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          // Handle success
          handleSuccess();
        } else {
          // Handle unexpected response status
          // if (response.status === 401) {
          //   setVeryfyModal(true);
          //   setModalOpen(false);
          // } else {
          handleUnexpectedStatus();
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    } else {
      setVeryfyModal(true);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (subList) {
      const newSub = subCategory.filter((item) => item.category === subList);
      setSubCategory(newSub);
    }
  }, [subList]);

  const handleSuccess = () => {
    setModalOpen(false);
    setImageFiles();
    refetch();
    reset();
    const message = "Product added successfully.";
    toast.custom(<SuccessToast message={message} />);
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

  const handleFileSelect = (event) => {
    const files = event.target.files[0];
    setImageFiles(files);
  };

  const handleImageDelete = () => {
    // const newImages = [...imageFiles];
    // newImages.splice(index, 1);
    // setImageFiles(newImages);
    setImageFiles(null);
  };

  return (
    <>
      <CustomModal
        modalOPen={modalOPen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmit(onSubmit)}
        width={590}
        title="Add Asset"
        buttonText={
          loading ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            "Add Asset"
          )
        }
      >
        <div className="flex flex-col items-start w-full mt-3">
          <label
            htmlFor="otp"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Asset Image
          </label>
          <div className=" w-full cursor-pointer h-[175px] relative flex items-center justify-center rounded-2xl bg-[#2D2D2D]/5 border-2 border-dashed border-[#2D2D2D]">
            <div className=" flex items-center justify-center flex-col">
              <Icon
                icon="mynaui:cloud-upload"
                className="text-[#2D2D2D] text-[50px]"
              />
              <h3 className=" text-[14px] font-bold text-[#2D2D2D]">
                Upload Image
              </h3>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className=" absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            />
          </div>
          <div>
            {imageFiles ? (
              <>
                <div className=" flex flex-wrap gap-2 items-center py-2">
                  <div className=" w-[100px] relative h-[70px] group rounded-md overflow-hidden">
                    <img
                      src={imageFiles && URL.createObjectURL(imageFiles)}
                      alt=""
                      className=" w-full h-full object-fill"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete()}
                      className=" absolute group-hover:flex hidden top-0 left-0 w-full h-full bg-black/50  items-center justify-center"
                    >
                      <Icon
                        icon="gg:trash-empty"
                        className="text-[22px] text-white"
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="select-container">
          <label
            htmlFor="last"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Select GA Form
          </label>
          <div className=" w-full relative">
            <select
              className="custom-select"
              name=""
              id=""
              {...register("form_name", {
                required: true,
                message: "Please Select GA Form",
              })}
            >
              <option defaultChecked>Select Product GA Form</option>
              {dropDown.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
            <span className=" text-[25px] absolute text-[#47548C] top-[10px] right-[8px]">
              <Icon icon="mingcute:down-line" />
            </span>
          </div>
          <label className="label">
            {errors?.form_name?.type === "required" && (
              <span className=" text-sm mt-1 text-red-500">
                {errors?.form_name?.message}
              </span>
            )}
          </label>
        </div>

        <div className="select-container">
          <label for="last" className="label-text">
            Select Main-Category
          </label>
          <div className="w-full relative">
            <select
              className="custom-select"
              name=""
              id=""
              {...register("category", {
                required: true,
                message: "Please Select Main-Category",
              })}
              onChange={(e) => setSubList(e.target.value)}
            >
              <option defaultChecked>Select Category</option>
              {category.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.category}
                </option>
              ))}
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

        <div className="flex flex-col items-start  mt-3">
          <label
            htmlFor="last"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Select Sub-Category
          </label>
          <div className=" relative w-full">
            <select
              className={`custom-select ${
                subList ? "" : " cursor-not-allowed"
              }`}
              name=""
              id=""
              disabled={!subList}
              {...register("sub_category", {
                required: true,
                message: "Please Select Sub-Category",
              })}
            >
              <option defaultChecked> Select Sub Category</option>
              {subCategoryList.map((item, index) => (
                <option
                  key={index}
                  className="capitalize"
                  value={item?.subCategory}
                >
                  {item?.subCategory}
                </option>
              ))}
            </select>
            <span className=" text-[25px] absolute text-[#47548C] top-[10px] right-[8px]">
              <Icon icon="mingcute:down-line" />
            </span>
          </div>
          <label className="label">
            {errors?.sub_category?.type === "required" && (
              <span className=" text-sm mt-1 text-red-500">
                {errors?.sub_category?.message}
              </span>
            )}
          </label>
        </div>

        <div className="flex items-center flex-col gap-0">
          <CustomInput
            label={"Asset Name"}
            type={"text"}
            register={register("product_name", {
              required: {
                value: true,
                message: "Please enter Asset name",
              },
            })}
            error={errors.product_name}
            placeholder={"Enter Asset Name"}
          />

          <CustomInput
            label={"Asset Number"}
            type={"text"}
            register={register("product_number", {
              required: {
                value: true,
                message: "Please enter Asset  Number",
              },
            })}
            error={errors.product_number}
            placeholder={"Enter Asset Number"}
          />
        </div>

        <CustomInput
          label={"Asset Owner"}
          type={"text"}
          register={register("product_owner", {
            required: {
              value: true,
              message: "Please enter Asset Owner",
            },
          })}
          error={errors.product_owner}
          placeholder={"Enter Asset Owner"}
        />

        <CustomInput
          label={"Site Address"}
          type={"text"}
          register={register("site_address", {
            required: {
              value: true,
              message: "Please enter site address",
            },
          })}
          error={errors.site_address}
          placeholder={"Enter Site Address"}
        />
        {/* <CustomInput
        label={"Testers Name"}
        type={"text"}
        register={register("tester_name")}
        placeholder={"Enter tester Name"}
      /> */}

        <div id="date" className="grid  grid-cols-1 lg:grid-cols-2 gap-5 ">
          <div className="flex flex-col items-start  mt-3">
            <label
              htmlFor="last"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Last Test Date
            </label>
            <DatePicker
              selected={lastDate}
              onChange={(date) => setLastDate(date)}
              disabled
              placeholderText="Select Date"
              className=" border w-full  border-gray-300 rounded-[10px] focus:border-primary outline-none text-[#A3AED0] pl-2 pr-8 py-2.5 "
            />
          </div>
          <div className="flex flex-col items-start mt-3">
            <label
              htmlFor="otp"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Next Test Date
            </label>
            <DatePicker
              selected={nextDate}
              onChange={(date) => setNextDate(date)}
              placeholderText="Select Date"
              className="w-full border border-gray-300 rounded-[10px] pl-2 pr-8 py-2.5 "
            />
          </div>
        </div>

        <CustomInput
          label={"Location"}
          type={"text"}
          register={register("location", {
            required: {
              value: true,
              message: "Please enter location",
            },
          })}
          error={errors.location}
          placeholder={"Enter Location"}
        />

        <button
          onClick={() => setWorkerOpen(true)}
          type="button"
          className=" w-full mt-5 flex border text-base text-[#000] items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
        >
          Assigned Worker{" "}
          {selectedWorker.length > 0 && (
            <span className=" bg-[#2D396B] text-[12px] px-2 text-white rounded-md">
              {selectedWorker.length}
            </span>
          )}
        </button>

        <div className=" mt-5">
          <h3 className="mb-1.5 font-medium text-base text-dark-gray">
            Asset Status
          </h3>
          <div className="w-full flex item-center justify-center gap-5">
            <button
              onClick={() => setActive("passed")}
              type="button"
              className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#4CC800] ${
                active === "passed"
                  ? "bg-[#4CC800] text-white"
                  : " bg-transparent text-[#4CC800]"
              }`}
            >
              <Icon
                icon="material-symbols:check"
                className={`text-[18px] ${
                  active === "passed" ? " text-white" : "text-[#4CC800]/30 "
                }`}
              />
              Passed
            </button>

            <button
              onClick={() => setActive("attention")}
              type="button"
              className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#FFC000] ${
                active === "attention"
                  ? "bg-[#FFC000] text-white"
                  : " bg-transparent text-[#FFC000]"
              }`}
            >
              <Icon
                icon="material-symbols:check"
                className={`text-[18px] ${
                  active === "attention" ? " text-white" : "text-[#FFC000]/30 "
                }`}
              />
              Needs Attention
            </button>

            <button
              onClick={() => setActive("failed")}
              type="button"
              className={`py-1 px-3 h-[30px] rounded-full text-[12px] font-medium flex items-center gap-2  border border-[#F40909] ${
                active === "failed"
                  ? "bg-[#F40909] text-white"
                  : " bg-transparent text-[#F40909]"
              }`}
            >
              <Icon
                icon="material-symbols:check"
                className={`text-[18px] ${
                  active === "failed" ? " text-white" : "text-[#F40909]/30 "
                }`}
              />
              Failed
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start w-full mt-3">
          <label
            htmlFor="otp"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Notes
          </label>
          <textarea
            className="py-[15px] h-[74px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
            name=""
            {...register("note")}
          ></textarea>
        </div>
      </CustomModal>

      <CustomModal3
        modalOPen={workerOpen}
        setModalOpen={setWorkerOpen}
        width={1460}
      >
        <InductionWorker
          setAdminOpen={setWorkerOpen}
          selectedRowKeys={selectedWorker}
          setSelectedRowKeys={setSelectedWorker}
        />
      </CustomModal3>

      <Unverified modalOPen={veryfyModal} setModalOpen={setVeryfyModal} />
    </>
  );
};

export default AddProduct;
