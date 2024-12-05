import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../Shared/input/CustomInput";
import DatePicker from "react-datepicker";
import CustomModal2 from "../../Shared/modal/CustomModal2";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formattedDate } from "../../../helper/jwt";
import CustomModal3 from "../../Shared/modal/CustomModal3";
import InductionAdmin from "../../../Pages/Induction/InductionAdmin";
import InductionWorker from "../../../Pages/Induction/InductionWorker";
import { useSelector } from "react-redux";
import axios from "axios";
import { useCreateInductionsMutation } from "../../../redux/features/inductions/InductionsApi";
import toast from "react-hot-toast";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const AddInduction = ({ refetch, setModalOpen, modalOPen }) => {
  const [nextDate, setNextDate] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [fileData, setFileData] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState([]);
  const [workerOpen, setWorkerOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const [createInductions, { isLoading, error, isSuccess }] =
    useCreateInductionsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      const message = "Create inductions success";
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
  }, [isSuccess, error, refetch, setModalOpen, reset]);


  const formattedNextDate = formattedDate(nextDate);

  const onSubmit = async (values) => {
    const data = {
      title: values?.title,
      deadline: formattedNextDate,
      total_worker: selectedWorker.length,
      total_admin: selectedAdmin.length,
      files: [""],
      admins: selectedAdmin,
      link: values.video,
      workers: selectedWorker,
    };

    await createInductions(data);
  };

  const uploadeCover = async (e) => {
    const getImage = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("files", getImage);

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

      console.log(response)

      if (response?.status === 200) {
        console.log(response?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileUpload = (file) => {
    const files = file.target.files[0];

    const data = {
      title: fileTitle,
      file: files,
    };

    setFileData((pre) => [...pre, data]);

    setFileTitle("");
  };

  const deleteFile = (title) => {
    const update = fileData.filter((item) => item.title !== title);
    setFileData(update);
  };

  return (
    <>
      <CustomModal2
        modalOPen={modalOPen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmit(onSubmit)}
        width={560}
        title="Create Induction"
        buttonText={
          isLoading ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            "Create Induction"
          )
        }
      >
        <div className="flex items-center flex-col gap-0">
          <CustomInput
            label={"Induction Title"}
            type={"text"}
            register={register("title", {
              required: {
                value: true,
                message: "Please enter title",
              },
            })}
            error={errors.title}
            placeholder={"Enter Induction Title"}
          />

          <div className="flex w-full flex-col items-start mt-3">
            <label
              htmlFor="otp"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Daedline
            </label>
            <div id="pppp" className=" w-full ">
              <DatePicker
                selected={nextDate}
                onChange={(date) => setNextDate(date)}
                placeholderText="Calender"
                className="w-full border border-gray-300 rounded-[10px] pl-2 pr-8 py-2.5 "
              />
            </div>
          </div>

          <div className=" w-full mt-4">
            <label
              htmlFor="otp"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Documents Upload
            </label>

            <div className=" flex items-center gap-5 w-full mt-2">
              <div
                type="button"
                className=" w-full flex border  items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
              >
                <input
                  type="text"
                  className=" text-dark-gray outline-none w-full px-3 outline placeholder:text-[#A3AED0]  text-sm"
                  placeholder="Documents title"
                  value={fileTitle}
                  onChange={(e) => setFileTitle(e.target.value)}
                />
                <label
                  type="button"
                  htmlFor="otp222"
                  className=" bg-[#CCDBFF] flex items-center justify-center rounded-r-lg h-[40px] px-3"
                >
                  <Icon
                    icon="icon-park-outline:file-addition-one"
                    className=" text-[#2D396B] font-bold text-[20px]"
                  />
                  <input
                    id="otp222"
                    type="file"
                    onChange={uploadeCover}
                    className=" hidden"
                  />
                </label>
              </div>
            </div>

            <div className=" flex flex-col gap-3 mt-2">
              {fileData.map((item, index) => (
                <div>
                  <h2 className=" text-base text-dark-gray">{item.title}</h2>
                  <div className=" w-full bg-[#CCDBFF52] flex items-center justify-between h-[40px] rounded-[10px] px-4">
                    <h3 className=" text-sm font-normal">{item?.file.name}</h3>
                    <button
                      onClick={() => deleteFile(item.title)}
                      type="button"
                      className=" "
                    >
                      <Icon
                        icon="mingcute:delete-2-line"
                        className=" text-2xl text-[#68769F] hover:text-red-500 duration-200"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CustomInput
            label={"Video link"}
            type={"url"}
            register={register("video", {
              required: {
                value: true,
                message: "Please enter Video link",
              },
            })}
            error={errors.video}
            placeholder={"Enter Video link"}
          />

          <div className=" w-full mt-4">
            <label
              htmlFor="otp"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Assign
            </label>

            <div className=" flex items-center gap-5 w-full mt-2">
              <button
                // to={`/admin/induction-admin/${123}`}
                type="button"
                onClick={() => setAdminOpen(true)}
                className=" w-full flex border  items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
              >
                Admin{" "}
                {selectedAdmin.length > 0 && (
                  <span className=" bg-[#2D396B] text-[12px] px-2 text-white rounded-md">
                    {selectedAdmin.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setWorkerOpen(true)}
                type="button"
                className=" w-full flex border  items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
              >
                Worker{" "}
                {selectedWorker.length > 0 && (
                  <span className=" bg-[#2D396B] text-[12px] px-2 text-white rounded-md">
                    {selectedWorker.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </CustomModal2>

      <CustomModal3
        modalOPen={adminOpen}
        setModalOpen={setAdminOpen}
        width={1460}
      >
        <InductionAdmin
          setAdminOpen={setAdminOpen}
          selectedRowKeys={selectedAdmin}
          setSelectedRowKeys={setSelectedAdmin}
        />
      </CustomModal3>

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
    </>
  );
};

export default AddInduction;
