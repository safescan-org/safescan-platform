import React, { useState } from "react";
import { Icon } from "@iconify/react";

const PasswordInput = ({ label, error, register, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-start w-full mt-5 relative">
      <label
        htmlFor="otp"
        className="mb-1.5 font-medium text-base text-dark-gray"
      >
        {label}
      </label>
      <input
        className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        id="otp"
        {...register}
      />
      <div className=" absolute top-[58%] right-[10px]">
        <button type="button" onClick={() => setShow((pre) => !pre)}>
          {show ? (
            <Icon
              icon="ic:outline-visibility"
              className="text-[20px] text-black"
            />
          ) : (
            <Icon
              icon="mdi:visibility-off-outline"
              className="text-[20px] text-black"
            />
          )}
        </button>
      </div>
      <label className="label">
        {error?.type === "required" && (
          <span className=" text-sm mt-1 text-red-500">{error.message}</span>
        )}
      </label>
    </div>
  );
};

export default PasswordInput;
