import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";
import DatePicker from "react-datepicker";
import CustomModal2 from "../../Shared/modal/CustomModal2";
import { Icon } from "@iconify/react/dist/iconify.js";

const AddInduction = ({ refetch, setModalOpen, modalOPen }) => {
  const [nextDate, setNextDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [fileData, setFileData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {};

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
          loading ? (
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
                    onChange={fileUpload}
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
                type="button"
                className=" w-full flex border  items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
              >
                Admin{" "}
                <span className=" bg-[#2D396B] px-2 text-white rounded-md">
                  12
                </span>
              </button>
              <button
                type="button"
                className=" w-full flex border  items-center gap-1 justify-center h-[40px] rounded-[10px] font-medium text-[16px]"
              >
                Worker{" "}
                <span className=" bg-[#2D396B] px-2 text-white rounded-md">
                  12
                </span>
              </button>
            </div>
          </div>
        </div>
      </CustomModal2>
    </>
  );
};

export default AddInduction;
