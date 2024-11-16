import React, { useEffect, useState } from "react";
import SectionWrapper from "../../Shared/SectionWrapper";
import TimePickerButton from "../../Shared/TimePickerButton";
import TotalUserChart from "./TotalUserChart";
import { formattedDate } from "../../../helper/jwt";

const TotalUsers = ({ workers, admins }) => {
  const filterAdmin = admins?.filter((item) => item?.is_active === true);
  const filterWorker = workers?.filter((item) => item?.is_active === true);
  const [selected, setSelected] = useState("Weekly");
  const [getSlice, setGetSlice] = useState(14);
  const dataDay = ["Weekly", "Monthly"];
  useEffect(() => {
    if (selected === "Weekly") {
      setGetSlice(14);
    }
    if (selected === "Monthly") {
      setGetSlice(40);
    }
  }, [selected]);

  const countSameDateOccurrences = (products) => {
    const dateCounts = {};
    products?.forEach((product) => {
      const date = formattedDate(product.created_at);
      if (dateCounts[date]) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    });

    return dateCounts;
  };

  const convertToObjectArray = (dateCounts, usertype) => {
    return Object.keys(dateCounts)?.map((date) => ({
      day: date,
      name: usertype,
      value: dateCounts[date],
    }));
  };

  const dateOccurrencesWorkers = countSameDateOccurrences(filterWorker);
  const dateOccurrencesAdmins = countSameDateOccurrences(filterAdmin);

  const arrayOfObjectsWorkers = convertToObjectArray(
    dateOccurrencesWorkers,
    "Workers"
  );
  const arrayOfObjectsAdmins = convertToObjectArray(
    dateOccurrencesAdmins,
    "Admins"
  );
  const allUserData = arrayOfObjectsAdmins.concat(arrayOfObjectsWorkers);




  const newData = [];
  for (let i = 0; i < 30; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    newData.unshift({ day: formattedDate, name: "", value: 0 });
  }
  
  // Update values in the new data array based on existing data
  newData.forEach(newEntry => {
    const existingEntries = allUserData.filter(entry => entry.day === newEntry.day);

    if (existingEntries.length === 2) {
      newData.push(existingEntries[0]);
      newData.push(existingEntries[1]);
    } else if (existingEntries.length === 1) {
      newData.push(existingEntries[0]);
      newData.push({ day:existingEntries[0].day,value:0, name: existingEntries[0].name === "admin" ? "worker" : "admin" });
    } else {
      // If no existing data for a date, assign "admin" and "worker"
      newData.push({ ...newEntry, name: "admin" });
      newData.push({ ...newEntry, name: "worker" });
    }
  });


// const data = newData?.slice(0, getSlice);
const data = newData?.slice(-getSlice);



  return (
    <div className="w-full">
      <SectionWrapper>
        <div className="py-7 px-[25px]">
          <div className="mb-10 flex items-center gap-5 justify-between flex-wrap">
            <div>
              <p className={`text-sm text-info`}>Total Users</p>
              <h1 className={`text-[28px] font-bold text-dark-gray`}>
                {filterWorker?.length + filterAdmin?.length}
              </h1>
            </div>
            <TimePickerButton
              className="font-bold"
              selected={selected}
              setSelected={setSelected}
              data={dataDay}
            />
          </div>
          <div>
            <TotalUserChart data={data} />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TotalUsers;
