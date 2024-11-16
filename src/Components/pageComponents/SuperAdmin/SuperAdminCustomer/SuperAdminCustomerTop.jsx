import { Icon } from "@iconify/react";
import React from "react";
import SectionWrapper from "../../../Shared/SectionWrapper";
import { fetchDataAndCalculateValues, formattedDate, todayDataGet } from "../../../../helper/jwt";

const SuperAdminCustomerTop = ({data,isLoading}) => {

  const approved = data?.filter((item)=>item?.account_status==="approved")
  const notApproved = data?.filter((item)=>item?.account_status==="pending")
  const data2 = data?.filter((item)=>item?.account_status==="rejected")

// console.log(data2)

  let currentDate = new Date();
  var sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // const { data:data1, } = useCustomersQuery(`is_approved=true&`, {
  //   refetchOnMountOrArgChange: true,
  // });


const countSameDateOccurrences = (products) => {
    const dateCounts = {};
    products?.forEach(product => {
        const date = formattedDate(product.created_at);
        if (dateCounts[date]) {
            dateCounts[date]++;
        } else {
            dateCounts[date] = 1;
        }
    });

    return dateCounts;
}

const convertToObjectArray = (dateCounts) => {
  return Object.keys(dateCounts)?.map(date => ({
      day: date,
      value: dateCounts[date]
  }));
}

// =====get total user data=======
const  totalUser = countSameDateOccurrences(data);
const totalData = convertToObjectArray(totalUser);


// =====get approved  user data=======
const  approvedData = countSameDateOccurrences(approved);
const approvedUser = convertToObjectArray(approvedData);


// console.log("today data======",todayDataGet(totalData))




  return (
    <>
      <div className="lg:flex items-center gap-5 justify-between mb-5">
        <div className="w-full lg:w-1/2">
          <SectionWrapper>
            <div className="p-5 md:flex items-center justify-between w-full ">
              <div className="flex items-center gap-4 w-full md:w-[35%]">
                <div className="bg-primary/10 p-2.5 flex items-center justify-center rounded-[10px] h-[44px] w-[44px]">
                  <Icon
                    className="w-[24] text-primary"
                    icon="mingcute:user-3-line"
                  />
                </div>
                <div className="h-10 -mt-2">
                  <p className="text-xs font-medium text-info/50">Total Customers</p>
                  <h1 className="text-2xl font-bold text-dark-gray">{isLoading? "...":data?.length}</h1>
                </div>
              </div>

              <div className="flex items-center h-10 w-full  md:w-[65%]  justify-between mt-10 md:mt-0">
                <div className="w-[50%]">
                  <p className="text-xs font-medium text-info/50">Today</p>
                  <h1 className="text-2xl font-bold text-dark-gray">{isLoading ? "..." :todayDataGet(totalData)}</h1>
                </div>
                <div className="w-[50%]">
                  <p className="text-xs font-medium text-info/50">Last Week</p>
                  <h1 className="text-2xl font-bold text-dark-gray">{isLoading ? "..." : fetchDataAndCalculateValues(totalData)}</h1>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
        <div className="w-full lg:w-1/2 lg:mt-0 mt-5">
          <SectionWrapper>
            <div className="p-5 md:flex items-center justify-between w-full bg-primary rounded-[20px] text-white">
              <div className="flex items-center gap-4 w-full md:w-[35%]">
                <div className="bg-black/20 p-2.5 flex items-center justify-center rounded-[10px] h-[44px] w-[44px]">
                  <Icon className="w-40" icon="lucide:gavel" />
                </div>
                <div className="h-10 -mt-2">
                  <p className="text-xs font-medium text-white/70">
                  Total Pending
                  </p>
                  <h1 className="text-2xl font-bold ">{isLoading ? "..." : notApproved?.length}</h1>
                </div>
              </div>

              <div className="flex items-center h-10 w-full  md:w-[65%]  justify-between mt-10 md:mt-0">
                <div className="w-[50%]">
                  <p className="text-xs font-medium text-white/70">
                  Total Approved 
                  </p>
                  <h1 className="text-2xl font-bold ">{isLoading ? "..." : approved?.length}</h1>
                </div>
                <div className="w-[50%]">
                  <p className="text-xs font-medium text-white/70">
                    Total Rejected
                  </p>
                  <h1 className="text-2xl font-bold ">{isLoading ? "..." : data2?.length}</h1>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </>
  );
};

export default SuperAdminCustomerTop;
