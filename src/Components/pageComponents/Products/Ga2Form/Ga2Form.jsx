import { Icon } from "@iconify/react";
import { Modal, Tooltip } from "antd";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { dropDown } from "../ProductsTable";
import SliderButton from "../../../Shared/modal/SliderButton";
import { formattedDate } from "../../../../helper/jwt";

const GA2 = (value) => {
  const filterData = dropDown?.find((item) => item?.value === value?.value);
  return <span className="">{filterData?.title}</span>;
};

const Ga2Form = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      <Tooltip placement="topLeft" title="View GA Forms">
        <button
          disabled={row?.test_details?.length < 1}
          onClick={() => setModalOpen(true)}
          className={`text-[14px] font-normal text-info flex items-center gap-1 ${
            row?.test_details?.length < 1
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <Icon icon="lets-icons:notebook" className=" text-[23px]" />
          {row?.test_details?.length}
        </button>
      </Tooltip>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={560}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">
              <GA2 value={row?.form_name} />
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                clickable: true,
                nextEl: ".arrow-left",
                prevEl: ".arrow-right",
              }}
              modules={[Navigation]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
            >
              <>
                {row?.test_details?.map((card, index) => (
                  <SwiperSlide
                    className="flex items-center justify-center h-auto"
                    key={index}
                  >
                    <div className=" w-full h-[70vh] overflow-y-auto">
                      <div className=" flex w-full items-center pb-3 mp border-b border-[#C9D4EA] justify-between mt-4">
                        <div className=" flex flex-col gap-0">
                          <div className=" flex items-center gap-1">
                            <div
                              className={`w-[12px] h-[12px] rounded-full ${
                                card?.status === "passed" && "bg-[#4CC800]"
                              } ${
                                card?.status === "attention" && "bg-[#FFC000]"
                              } ${card?.status === "failed" && "bg-[#F40909]"}`}
                            ></div>
                            <h2 className=" text-dark-gray text-[18px] capitalize font-bold">
                              {card?.status === "attention"
                                ? "Needs Attention"
                                : card?.status}
                            </h2>
                          </div>
                          <p className=" text-base text-[#485585] font-normal">
                            {formattedDate(Number(card?.date))}
                          </p>
                        </div>
                      </div>

                      {/* ====== modal 1=====  */}
                      {row?.form_name === "crane" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Alarms SWL / Limit switch
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Visual Aids - Windows/CCTV etc
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.visual_aids ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.visual_aids_comment
                                ? card?.visual_aids_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic/Electrical Systems
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydraulic ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydraulic_comment
                                ? card?.hydraulic_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hooks and lifting attachments
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hooks_and_lifting ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hooks_and_lifting_comment
                                ? card?.hooks_and_lifting_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Wire Rope and Chain systems
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.wire_rope ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.wire_rope_comment
                                ? card?.wire_rope_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Anemometer
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.anemometer ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.anemometer_comment
                                ? card?.anemometer_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Operator Cab & Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.operator_cab ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.operator_cab_comment
                                ? card?.operator_cab_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Lycon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.lycon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.lycon_comment
                                ? card?.lycon_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== modal 2=====  Telehandler Modal */}
                      {row?.form_name === "telehandler" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Alarms SWL/ Movement
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Visual Aids Mirrors & Reverse Camera
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.visual_aids ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.visual_aids_comment
                                ? card?.visual_aids_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage & Cab
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic & Electrical System
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydraulic ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydraulic_comment
                                ? card?.hydraulic_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Fuel Lines / Brakes / Clutches.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fuel_line_brake ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fuel_line_brake_comment
                                ? card?.fuel_line_brake_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Forks & lifting Arm
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fork_lifting ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fork_lifting_comment
                                ? card?.fork_lifting_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Flashing Beacon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.flashing_beacon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.flashing_beacon_comment
                                ? card?.flashing_beacon_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Operator Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.operator ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.operator_comment
                                ? card?.operator_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== modal 2=====  excavator Modal */}
                      {row?.form_name === "excavator" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Alarms SWL/ Movement
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Visual Aids Mirrors & CCTV
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.visual_aids ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.visual_aids_comment
                                ? card?.visual_aids_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage & Cab
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic & Electrical System
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydraulic ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydraulic_comment
                                ? card?.hydraulic_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Fuel Lines / Brakes / Clutches.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fuel_line_brake ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fuel_line_brake_comment
                                ? card?.fuel_line_brake_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Check Valves
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.check_vaves ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.check_vaves_comment
                                ? card?.check_vaves_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Flashing Beacon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.flashing_beacon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.flashing_beacon_comment
                                ? card?.flashing_beacon_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Operator Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.operator ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.operator_comment
                                ? card?.operator_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== Lifting Equpment Modal 3 =====  */}
                      {row?.form_name === "lifting_equipment" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                6 month certification GA1
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.certification ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.certification_comment
                                ? card?.certification_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Serial number/Identifier clearly legible
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.serial ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.serial_comment
                                ? card?.serial_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structural damage
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.damage_comment
                                ? card?.damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Full visual inspection
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.visual ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.visual_comment
                                ? card?.visual_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Moving parts (Block grab)
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.moving_parts ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.moving_parts_comment
                                ? card?.moving_parts_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Anchor points (if applicable)
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.anchor_points ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.anchor_points_comment
                                ? card?.anchor_points_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                All in good working order
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.working_order ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.working_order_comment
                                ? card?.working_order_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== Mewp Modal =====  4*/}
                      {row?.form_name === "mewp" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Guardrails/gates & platforms.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.guardrails_platform ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.guardrails_platform_comment
                                ? card?.guardrails_platform_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Batteries & Fuel Supplies
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.battery ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.battery_comment
                                ? card?.battery_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Condition of wheels
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.wheels ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.wheels_comment
                                ? card?.wheels_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic lines & hoses
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydraulic ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydraulic_comment
                                ? card?.hydraulic_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Stabilising jacks
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.jack ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.jack_comment
                                ? card?.jack_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Audible alarms
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Platform condition
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.platform ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.platform_comment
                                ? card?.platform_comment
                                : "No Comment"}
                            </p>
                          </div>
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Electrical cables
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.electrical ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.electrical_comment
                                ? card?.electrical_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== Roller Modal ===== 5 */}
                      {row?.form_name === "roller" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Beacon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.beacon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.beacon_comment
                                ? card?.beacon_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Movement Alarm
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage & Cab
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Roll over bar
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.roll_over_bar ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.roll_over_bar_comment
                                ? card?.roll_over_bar_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Fuel Lines / Brakes / Clutches.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fuel_line_brake ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fuel_line_brake_comment
                                ? card?.fuel_line_brake_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic &Electrical systems
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydrauic_electrical ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydrauic_electrical_comment
                                ? card?.hydrauic_electrical_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Seat belt & Operator Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.set_belt ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.set_belt_comment
                                ? card?.set_belt_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ====== Site Dumper Articulated Modal =====  6*/}
                      {row?.form_name === "site_dumper_articulated" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Beacon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.beacon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.beacon_comment
                                ? card?.beacon_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Movement Alarm
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Mirrors
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.mirrors ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.mirrors_comment
                                ? card?.mirrors_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage & Cab
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Roll over bar
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.roll_over_bar ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.roll_over_bar_comment
                                ? card?.roll_over_bar_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Fuel Lines / Brakes / Clutches.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fuel_line_brake ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fuel_line_brake_comment
                                ? card?.fuel_line_brake_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic &Electrical systems
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydrauic_electrical ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydrauic_electrical_comment
                                ? card?.hydrauic_electrical_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Seat belt & Operator Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.set_belt ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.set_belt_comment
                                ? card?.set_belt_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ======Site Dumper Forward Modal =====  7*/}
                      {row?.form_name === "site_dumper_forward_tipping" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Beacon
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.beacon ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.beacon_comment
                                ? card?.beacon_comment
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Movement Alarm
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.alarm ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.alarm_comment
                                ? card?.alarm_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Structure damage & Cab
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.strutcher_damage ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.strutcher_damage_comment
                                ? card?.strutcher_damage_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Roll over bar
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.roll_over_bar ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.roll_over_bar_comment
                                ? card?.roll_over_bar_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Fuel Lines / Brakes / Clutches.
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.fuel_line_brake ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.fuel_line_brake_comment
                                ? card?.fuel_line_brake_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Hydraulic &Electrical systems
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.hydrauic_electrical ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.hydrauic_electrical_comment
                                ? card?.hydrauic_electrical_comment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Seat belt & Operator Controls
                              </h2>
                              <h2 className=" text-[17px] font-medium text-dark-gray">
                                {card?.set_belt ? "Yes" : "No"}
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.set_belt_comment
                                ? card?.set_belt_comment
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ======Netting Modal =====  8*/}
                      {row?.form_name === "netting" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Are the nets certificate of test and examination
                                currently in date?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.certification
                                ? card?.certification
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Are all primary supports suitable and in good
                                order?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.primary_support
                                ? card?.primary_support
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Is there less than 10% sag across the span?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.less_than ? card?.less_than : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Spacing less than 2.5 meters?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.spacing ? card?.spacing : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Is the net as close as possible to the external
                                walls?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.external_walls
                                ? card?.external_walls
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Is the rescue Plan in place?
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.rescue_plan
                                ? card?.rescue_plan
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Description of Equipment & any Identification
                                Numbers / Marks
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.description_equpment
                                ? card?.description_equpment
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Date and Time of Inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.date_and_time
                                ? card?.date_and_time
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                House Address
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.house_address
                                ? card?.house_address
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Result of the installation inspection. Pass /
                                Fail
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.installation
                                ? card?.installation
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Details of any further action necessary
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.further_action
                                ? card?.further_action
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Name and position of person making inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.name_and_position
                                ? card?.name_and_position
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Signature of person who made inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              No Comment
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ======Scaffold Modal ===== 9 */}
                      {row?.form_name === "scaffold" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Date & time:
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.date
                                ? formattedDate(card?.date)
                                : "No Date"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Location
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.location ? card?.location : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Description of scaffold
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.description
                                ? card?.description
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Site address:
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.site_address
                                ? card?.site_address
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Foundations
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.foundations
                                ? card?.foundations
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Sole
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.sole ? card?.sole : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Base Plates & Base Jacks
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.plates_and_jacks
                                ? card?.plates_and_jacks
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Standards
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.standards ? card?.standards : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Ledgers
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.ledgers ? card?.ledgers : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                transoms
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.transoms ? card?.transoms : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                tie Spacing & Capacity
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.tie_spacing
                                ? card?.tie_spacing
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Anchorage test results
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.anchorage_test
                                ? card?.anchorage_test
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Façade Bracing
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.facade_bracing
                                ? card?.facade_bracing
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                plan Bracing
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.plan_bracing
                                ? card?.plan_bracing
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Cross Bracing
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.cross_bracing
                                ? card?.cross_bracing
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Guard rails
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.guard_rails
                                ? card?.guard_rails
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Toe Boards
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.toe_boards
                                ? card?.toe_boards
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Decking/scaffolding boards
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.decking_boards
                                ? card?.decking_boards
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Scaffolding signs and tags
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.scaffolding_signs
                                ? card?.scaffolding_signs
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                loading in line with design/manufacturer’s
                                instructions
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.loading_in
                                ? card?.loading_in
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Access/Egress
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.access ? card?.access : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                user behaviour/housekeeping
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.user_behaviour
                                ? card?.user_behaviour
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Unauthorised alterations
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.unauthorised_alterations
                                ? card?.unauthorised_alterations
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                anticipated hazards (next 7 days)
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.anticipated
                                ? card?.anticipated
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Other (traffic, public, electricity)
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.other ? card?.other : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Other outcomes of inspection /observations
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.other_outcomes
                                ? card?.other_outcomes
                                : "No Comment"}
                            </p>
                          </div>
                          {/* ===========name and signature========= */}
                          <div className=" flex mt-5 h-[80px] mb-3 items-end justify-between gap-5">
                            <div className=" flex w-full flex-col items-center">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                {card?.scaffold_owner}
                              </h2>
                              <h4 className=" text-[16px] text-[#707EAE] font-medium">
                                Scaffold Owner Name
                              </h4>
                            </div>
                            <div className=" flex w-full flex-col items-center">
                              <div className="w-[70px] h-[40px]">
                                {card?.owner_signature && (
                                  <>
                                    <img
                                      src={card?.owner_signature}
                                      alt=""
                                      className=" w-full h-full object-contain"
                                    />
                                  </>
                                )}
                              </div>
                              <h4 className=" text-[16px] text-[#707EAE] font-medium">
                                Scaffold Owner Signature
                              </h4>
                            </div>
                          </div>

                          <div className=" flex mt-5 h-[80px] mb-3 items-end justify-between gap-5">
                            <div className=" flex w-full flex-col items-center">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                {card?.scaffold_inspector}
                              </h2>
                              <h4 className=" text-[16px] text-[#707EAE] font-medium">
                                Scaffold Inspector Name
                              </h4>
                            </div>
                            <div className=" flex w-full flex-col items-center">
                              <div className="w-[70px] h-[40px]">
                                {card?.inspector_signature && (
                                  <>
                                    <img
                                      src={card?.inspector_signature}
                                      alt=""
                                      className=" w-full h-full object-contain"
                                    />
                                  </>
                                )}
                              </div>
                              <h4 className=" text-[16px] text-[#707EAE] font-medium">
                                Scaffold Inspector Signature
                              </h4>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ======Working At Height Modal =====  10*/}
                      {row?.form_name === "working_at_heights" && (
                        <div className=" mt-5 flex flex-col gap-3">
                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Description of Equipment & any Identification
                                Numbers / Marks
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.equpment_details
                                ? card?.equpment_details
                                : " No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Date and Time of Inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.date_time ? card?.date_time : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Results of Inspection* including defects &
                                locations
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.result ? card?.result : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Details of any corrective actions taken
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.corrective_actions
                                ? card?.corrective_actions
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Details of any further action necessary
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.further_action
                                ? card?.further_action
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Name and position of person making inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.name_and_position
                                ? card?.name_and_position
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Signature of person who made inspection
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.signature ? card?.signature : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Name of person (or company) for whom the
                                inspection was carried out:
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.name_of_person
                                ? card?.name_of_person
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Address where inspection was carried out (site
                                or another workplace):
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.address ? card?.address : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Maximum Loading Capacity of Working Platforms,
                                Bays & Ties
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.loading_capacity
                                ? card?.loading_capacity
                                : "No Comment"}
                            </p>
                          </div>

                          <div>
                            <div className=" flex items-center justify-between">
                              <h2 className=" text-[18px] font-medium text-dark-gray">
                                Necessary Design Information to enable
                                inspections to be performed:
                              </h2>
                            </div>
                            <p className=" text-base font-medium text-[#707EAE]">
                              {card?.design_info
                                ? card?.design_info
                                : "No Comment"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ===========name and signature========= */}
                      {row?.form_name === "scaffold" ? (
                        <></>
                      ) : (
                        <div className=" flex mt-5 h-[80px] mb-3 items-end justify-between gap-5">
                          <div className=" flex w-full flex-col items-center">
                            <h2 className=" text-[18px] font-medium text-dark-gray">
                              {card?.name}
                            </h2>
                            <h4 className=" text-[16px] text-[#707EAE] font-medium">
                              Name
                            </h4>
                          </div>
                          <div className=" flex w-full flex-col items-center">
                            <div className="w-[70px] h-[40px]">
                              {card?.signature && (
                                <>
                                  <img
                                    src={card?.signature}
                                    alt=""
                                    className=" w-full h-full object-contain"
                                  />
                                </>
                              )}
                            </div>
                            <h4 className=" text-[16px] text-[#707EAE] font-medium">
                              Signature
                            </h4>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </>
              <SliderButton
                total={row?.test_details}
                activeIndex={activeIndex}
              />
            </Swiper>
          </>
        </div>
      </Modal>
    </>
  );
};

export default Ga2Form;
