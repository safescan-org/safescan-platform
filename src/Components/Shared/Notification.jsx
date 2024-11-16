
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from 'timeago.js';

const Notification = ({ data, handleSeeAll, refetch }) => {
  const {  token } = useSelector((state) => state.auth);

  const updateNotifaction = async (id) => {
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
    } catch (error) {}
  };

  return (
    <div className="w-full max-h-[400px] overflow-y-scroll">
      <button className="w-full">
        {data?.length > 0 ? (
          <>
            {data?.map((notifi, index) => (
              <div
                key={index}
                onClick={() => updateNotifaction(notifi?.notificationid)}
                className="flex  gap-2 border-b border-gray-100 py-[18px] w-full "
              >
                <div className="w-[40px] h-[40px]">
                  <img
                    src={`https://scansafes3.s3.amazonaws.com/${notifi?.icon}`}
                    alt="icon"
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="-mt-1 w-[90%]">
                  <div className="flex justify-between w-full flex-wrap gap-2 ">
                    <p className="text-dark-gray font-medium text-base">
                      {notifi?.headline}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-info/80">
                        {format(notifi?.created_at)}
                      </p>
                      {notifi.is_read === false && (
                        <span className="w-2 mb-1 h-2 mt-1 rounded-full bg-primary"></span>
                      )}
                    </div>
                  </div>
                  <p className="text-info/80 text-start text-sm">
                    {notifi?.details}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="py-5 flex items-center justify-center text-xl text-dark-gray/40 font-bold">
              No notification yet
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default Notification;
