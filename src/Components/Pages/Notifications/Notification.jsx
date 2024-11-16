
import React from "react";
import { useSelector } from "react-redux";
import { format } from 'timeago.js';

import axios from "axios";

const Notification = ({ data,refetch }) => {
  const {  token } = useSelector((state) => state.auth);

  const updateNotifaction = async(id)=>{
    try {
      const response = await axios.get(
        `https://q3vvxu6li2.execute-api.us-east-1.amazonaws.com/api/v1/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        refetch();
      } else {

      }
    } catch (error) {
      
    }
  }

  return (
    <div className="h-[80vh]  overflow-y-auto">
      {data?.length > 0 ? (
        <>
          {data.map((notifi, index) => (
            <div
              key={index}
              onClick={()=>updateNotifaction(notifi?.notificationid)}
              className="flex  gap-2 items-center cursor-pointer border-b border-gray-100 py-[18px] w-full "
            >
              {/* <div
                className={` flex items-center justify-center rounded-[10px] p-2 ${
                  notifi?.is_read === true
                    ? "text-Warning bg-Warning/10"
                    : " text-error bg-error/10"
                }`}
              >
                {notifi?.is_read === true ? (
                  <Icon className="text-lg" icon="ph:warning-bold" />
                ) : (
                  <Icon className="text-lg" icon="mingcute:warning-line" />
                )}
              </div> */}
              <div className="w-[40px] h-[40px]">
                <img
                  src={`https://scansafes3.s3.amazonaws.com/${notifi?.icon}`}
                  alt="icon"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="flex justify-between w-full flex-wrap gap-3">
                <div>
                  <p className="text-dark-gray font-medium text-base">
                    {notifi?.headline}
                  </p>
                  <p className="text-info/80 -mt-1 text-sm">
                    {notifi?.details}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium text-info/80">
                    {format(notifi?.created_at)}
                  </p>
                  {notifi.is_read===false&& <span className='w-2 mb-1 h-2 mt-1 rounded-full bg-primary'></span>}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="h-[50vh] flex items-center justify-center text-2xl text-dark-gray/40  font-bold">
            No notification yet
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
