import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Popover } from "antd";

const TimePickerButton = ({selected,setSelected,data,width,className}) => {

  const [popupShow, setPopupShow] = useState(false);

  const handleOpenChange = (newOpen) => {
    setPopupShow(newOpen);
  };

  const content = (
    <div style={{width:width}} className=" w-[135px] font-bold p-2 max-h-[150px] overflow-y-scroll">
      {data.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setPopupShow(false);
            setSelected(item)
          }}
          className=" text-xs w-full items-start rounded-[10px] font-bold  text-info hover:bg-primary/10  flex  py-3 px-5"
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative h-[37px] text-info/70 ">
      <Popover
        open={popupShow}
        onOpenChange={handleOpenChange}
        content={content}
        placement="bottomRight"
        trigger="click"
      >
      <button
        style={{width:width}}
        className={` w-[105px] text-sm font-bold cursor-pointer px-2 py-2 flex items-center rounded-[10px] justify-between ${className}`}
      >
        <div className="flex items-center gap-[2px]">
            {selected
                ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                : data[0]}
        </div>
        <Icon icon="iwwa:arrow-down" className={`${popupShow && "rotate-180"} text-sm`}/>
      </button>
      </Popover>
    </div>
  );
};

export default TimePickerButton;