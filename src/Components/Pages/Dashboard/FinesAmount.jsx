import React from "react";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeading from "../../Shared/SectionHeading";
import FinesAmountChart from "./FinesAmountChart";

const FinesAmount = ({ counters }) => {


  const counter = counters;


  const weeklyData = [
    {
      type: "Due",
      value: (counter?.due_fines - counter?.collected_fines),
      amount: (counter?.due_fines - counter?.collected_fines),
    },
    {
      type: "Collected ",
      value: counter?.collected_fines,
      amount: counter?.collected_fines,
    },
  ];


  return (
    <>
      <SectionWrapper>
        <div className="py-7 px-[25px]">
          <div className="mb-8 flex items-center gap-5 justify-between flex-wrap">
            <SectionHeading>
              <p>Fines Amount</p>
            </SectionHeading>
            {/* <TimePickerButton
                            className="font-bold w-[120px]"
                            selected={selected}
                            setSelected={setSelected}
                            data={dataDay}
                        /> */}
          </div>
          <div className="flex items-center">
            <FinesAmountChart data={weeklyData} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default FinesAmount;
