import React, { useEffect, useState } from "react";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeading from "../../Shared/SectionHeading";
import TimePickerButton from "../../Shared/TimePickerButton";
import FinesOverViewChart from "./FinesOverViewChart";
import { formattedDate } from "../../../helper/jwt";

const FinesOverview = ({finesData}) => {
  const [selected, setSelected] = useState("Weekly");

  const [getSlice, setGetSlice] = useState(7);
  const dataDay = ["Weekly", "Monthly"];
  useEffect(() => {
    if (selected === "Weekly") {
      setGetSlice(7);
    }
    if (selected === "Monthly") {
      setGetSlice(31);
    }
  }, [selected]);


  const countSameDateOccurrences = (products) => {
    const dateCounts = {};
    products?.forEach((product) => {
      const date = formattedDate(product.created_at);
      if (dateCounts[date]) {
        dateCounts[date] += product.outstanding_fines;
      } else {
        dateCounts[date] = product.outstanding_fines;
      }
    });

    return dateCounts;
  };

  const convertToObjectArray = (dateCounts) => {
    return Object.keys(dateCounts)?.map((date) => ({
      day: date,
      value: dateCounts[date],
    }));
  };

  const dateOccurrences = countSameDateOccurrences(finesData?.Items);
  const arrayOfObjects = convertToObjectArray(dateOccurrences);

  // console.log("finesData====", dateOccurrences);


  const newData = [];

  // Generate new data array with default values
  for (let i = 0; i < 30; i++) {
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      newData.unshift({ day: formattedDate, value: 0 });
  }
  
  // Update values in the new data array based on existing data
  newData.forEach(newEntry => {
      const existingEntry = arrayOfObjects.find(entry => entry.day === newEntry.day);
      if (existingEntry) {
          newEntry.value += existingEntry.value;
      }
  });
  
  // console.log(newData);
  const data = newData?.slice(-getSlice);

  return (
    <div className="">
      <SectionWrapper>
        <div className="py-7 px-[25px]">
          <div className="mb-8 flex items-center gap-5 justify-between flex-wrap">
            <SectionHeading>
              <p>Fines Overview</p>
            </SectionHeading>
            <TimePickerButton
              className="font-bold"
              selected={selected}
              setSelected={setSelected}
              data={dataDay}
            />
          </div>
          <div>
            <FinesOverViewChart chartData={data} />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FinesOverview;
