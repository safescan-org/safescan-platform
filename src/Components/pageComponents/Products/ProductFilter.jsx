import { Icon } from "@iconify/react";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { category, subCategory } from "../../../helper/jwt";
import toast from "react-hot-toast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const ProductFilter = ({ sestSearchQuery }) => {
  const [subList, setSubList] = useState("");
  const [subCategoryList, setSubCategory] = useState([]);
  const [subCategoryitem, setSubCategoryitem] = useState("");
  const [popupShow, setPopupShow] = useState(false);

  const handleOpenChange = (newOpen) => {
    setPopupShow(newOpen);
  };

  const handelClick = () => {
    if (subList && subCategoryitem) {
      const query = `category=${subList}&sub_category=${subCategoryitem}`;
      sestSearchQuery(query);
      setPopupShow(false);
    } else {
      toast.custom(
        <ErrorToast message={"Please select category and sub category"} />
      );
    }
  };

  const Clear = () => {
    const query = ``;
    setSubList("");
    setSubCategoryitem("");
    sestSearchQuery(query);
  };

  useEffect(() => {
    if (subList) {
      const newSub = subCategory.filter((item) => item.category === subList);
      setSubCategory(newSub);
    }
  }, [subList]);

  const content = (
    <div className=" ">
      <div className=" md:w-[320px] w-[100%] px-5 py-[25px]">
        <div className="w-full  flex items-center justify-between mb-4 gap-2">
          <h2 className="text-[20px] font-bold text-dark-gray">
            Filter Products
          </h2>
          {/* <button
            onClick={() => Clear()}
            className=" w-[40px] h-[40px] text-[22px] flex items-center justify-center hover:bg-gray-200 rounded-full"
          >
            <Icon icon="ooui:reload" />
          </button> */}
        </div>

        <div>
          <div className="flex flex-col items-start  mt-3">
            <label
              htmlFor="last"
              className="mb-1.5 font-medium text-base text-dark-gray"
            >
              Select Main-Category
            </label>
            <div className=" w-full relative">
              <select
                className="py-[5px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                name=""
                id=""
                value={subList}
                onChange={(e) => setSubList(e.target.value)}
              >
                <option defaultChecked>Select Category</option>
                {category.map((item, index) => (
                  <option
                    key={index}
                    className="capitalize"
                    value={item?.value}
                  >
                    {item?.category}
                  </option>
                ))}
              </select>
              <span className=" text-[20px] absolute text-[#47548C] top-[13px] right-[8px]">
                <Icon icon="mingcute:down-line" />
              </span>
            </div>
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
                className={`py-[5px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary ${
                  subList ? "" : " cursor-not-allowed"
                }`}
                name=""
                id=""
                disabled={!subList}
                value={subCategoryitem}
                onChange={(e) => setSubCategoryitem(e.target.value)}
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
              <span className=" text-[20px] absolute text-[#47548C] top-[13px] right-[8px]">
                <Icon icon="mingcute:down-line" />
              </span>
            </div>
          </div>
          <div className=" mt-4">
            <button
              onClick={() => handelClick()}
              //   disabled={!subCategoryitem || !subList}
              className={` px-3.5 h-10 w-full bg-primary hover:bg-primary/70 duration-300 rounded-[4px]  font-medium text-sm text-white flex items-center justify-center`}
            >
              Filter
            </button>
          </div>
        </div>
        {/* -------------------------here notification ------- */}
      </div>
    </div>
  );

  return (
    <div>
      <Popover
        open={popupShow}
        onOpenChange={handleOpenChange}
        content={content}
        placement="bottomRight"
        trigger="click"
      >
        <div className="">
          <button className=" text-dark-gray border-[1px] border-[#E1E9F8] rounded-[10px] w-full  py-[10px] px-5 flex items-center gap-1 text-[14px] font-medium">
            <Icon icon="lucide:filter" /> Filter Asset
          </button>
        </div>
      </Popover>
    </div>
  );
};

export default ProductFilter;
