import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";
import { Icon } from "@iconify/react";
import { useUpdateProductMutation } from "../../../redux/features/admin/adminApi";
import DatePicker from "react-datepicker";
import { category, formattedDate, subCategory } from "../../../helper/jwt";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import { dropDown } from "./ProductsTable";
import CustomModal3 from "../../Shared/modal/CustomModal3";
import InductionWorker from "../../../Pages/Induction/InductionWorker";

const ProductsEdit = ({ refetch, item, setModalOpen, modalOPen }) => {
  const [active, setActive] = useState(item?.status);
  const getLastDate = formattedDate(item?.last_test_date);
  const getNextDate = formattedDate(Number(item?.next_test_date));
  // const [lastDate, setLastDate] = useState(getLastDate);
  const [nextDate, setNextDate] = useState(getNextDate);
  const formattedNextDate = formattedDate(nextDate);
  const [subList, setSubList] = useState("");
  const [subCategoryList, setSubCategory] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState([]);
  const [workerOpen, setWorkerOpen] = useState(false);

  const [updateProduct, { isLoading, isSuccess, error }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (subList) {
      const newSub = subCategory.filter((item) => item.category === subList);
      setSubCategory(newSub);
    }
  }, [subList]);

  useEffect(() => {
    if (isSuccess) {
      const message = "Product Successfully Updated";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setModalOpen(false);
    }
    if (error) {
      const errorMsg = error?.data.error || error?.data.message;
      toast.custom(<ErrorToast message={errorMsg} />);
    }
  }, [isSuccess, error]);

  console.log(item)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (item) {
      setValue("product_name", item?.product_name);
      setValue("product_number", item?.product_number);
      setValue("site_address", item?.site_address);
      setValue("form_name", item?.form_name);
      setValue("tester_name", item?.tester_name);
      setValue("location", item?.location);
      setValue("category", item?.category);
      setValue("sub_category", item?.sub_category);
      setValue("product_owner", item?.product_owner);
      setSubList(item?.category);
      setSelectedWorker(item?.workers)
    }
  }, [item]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("product_name", data?.product_name);
    formData.append("location", data?.location);
    formData.append("product_owner", data?.product_owner);
    formData.append("site_address", data?.site_address);
    // formData.append('note', data?.note);
    // formData.append('last_test_date', formattedLastDate);
    formData.append("next_test_date", formattedNextDate);
    formData.append("status", active);
    formData.append("product_number", data?.product_number);
    formData.append("form_name", data?.form_name);
    formData.append("category", data?.category);
    formData.append("sub_category", data?.sub_category);
    formData.append('workers', JSON.stringify(selectedWorker));

    const id = item?.productid;

    await updateProduct({ id, body: formData });
    setModalOpen(false);
  };

  return (
    <CustomModal
      modalOPen={modalOPen}
      setModalOpen={setModalOpen}
      handleSubmit={handleSubmit(onSubmit)}
      width={590}
      title="Edit Asset"
      buttonText={
        isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          "Save Changes"
        )
      }
    >
      <div className="flex flex-col items-start  mt-3">
        <label
          htmlFor="last"
          className="mb-1.5 font-medium text-base text-dark-gray"
        >
          Select GA Form
        </label>
        <div className="w-full relative">
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

      <div className="flex flex-col items-start  mt-3">
        <label
          htmlFor="last"
          className="mb-1.5 font-medium text-base text-dark-gray"
        >
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
              <option key={index} className="capitalize" value={item?.value}>
                {item?.category}
              </option>
            ))}
          </select>
          <span className=" text-[25px] absolute text-[#47548C] top-[10px] right-[8px]">
            <Icon icon="mingcute:down-line" />
          </span>
        </div>
        <label className="label">
          {errors?.category?.type === "required" && (
            <span className=" text-sm mt-1 text-red-500">
              {errors?.category?.message}
            </span>
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
        <div className="w-full relative">
          <select
            className={`custom-select ${subList ? "" : " cursor-not-allowed"}`}
            name=""
            id=""
            disabled={!subList}
            {...register("sub_category", {
              required: true,
              message: "Please Select Sub-Category",
            })}
          >
            {/* <option defaultChecked> Select Sub Category</option> */}
            {subCategoryList.map((sub, index) => (
              <option key={index} value={sub?.subCategory}>
                {sub?.subCategory}
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

      <div className="flex items-center gap-4">
        <CustomInput
          label={"Asset Name"}
          type={"text"}
          register={register("product_name", {
            required: {
              value: true,
              message: "Please enter Asset name",
            },
          })}
          error={errors.firstName}
          placeholder={"Enter Asset Name"}
        />
      </div>

      <CustomInput
        label={"Assigned worker"}
        type={"text"}
        register={register("product_number", {
          required: {
            value: true,
            message: "Please enter Assigned worker",
          },
        })}
        error={errors.product_number}
        placeholder={"Assigned worker"}
      />

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
        register={register("site_address")}
        placeholder={"Enter Site Address"}
      />
      {/* <div>
        <div className="flex flex-col items-start w-full mt-3">
          <label
            htmlFor="tester"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            {"Testers Name"}
          </label>
          <input
            className="py-[15px] h-[44px] px-[14px]  text-[#A3AED0] placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
            type={"text"}
            required
            disabled
            id="tester"
            {...register("tester_name", {
              required: {
                value: true,
                message: "",
              },
            })}
          />
        </div>
      </div> */}
      {/* <CustomInput
        label={"Testers Name"}
        type={"text"}
        register={register("tester_name")}
        placeholder={"Enter tester Name"}
      /> */}

      <div id="date" className="grid  grid-cols-1 lg:grid-cols-2 gap-5 ">
        <div className="flex flex-col items-start mt-3">
          <label
            htmlFor="otp"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Last Test Date
          </label>
          <DatePicker
            selected={getLastDate}
            disabled
            required
            placeholderText="Select Date"
            className="w-full border border-gray-300 rounded-[10px] pl-2 pr-8 py-2.5 text-[#A3AED0] "
          />
        </div>
        <div className="flex flex-col items-start  mt-3">
          <label
            htmlFor="otp"
            className="mb-1.5 font-medium text-base text-dark-gray"
          >
            Next Test Date
          </label>
          <DatePicker
            selected={nextDate}
            onChange={(date) => setNextDate(date)}
            required
            placeholderText="Select Date"
            className="w-full border border-gray-300 rounded-[10px] pl-2 pr-8 py-2.5 text-dark-gray "
          />
        </div>
      </div>

      <CustomInput
        label={"Location"}
        type={"text"}
        register={register("location")}
        placeholder={"Enter level 3"}
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
          Asset status
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

      {/* <div className="flex flex-col items-start w-full mt-3">
        <label
          htmlFor="otp"
          className="mb-1.5 font-medium text-base text-dark-gray"
        >
          Note
        </label>
        <textarea
          className="py-[15px] h-[74px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
          name=""
          {...register("note")}
        ></textarea>
      </div> */}

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
    </CustomModal>
  );
};

export default ProductsEdit;
