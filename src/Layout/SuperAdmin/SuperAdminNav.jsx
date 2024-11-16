import { Icon } from "@iconify/react";
import { NotificationsData } from "../../assets/mockData";
import { Popover } from "antd";
import Notification from "../../Components/Shared/Notification";
import { useNavigate } from "react-router-dom";
import { useGetNotificationsQuery } from "../../redux/features/admin/adminApi";
import { useEffect, useState } from "react";

const SuperAdminNav = () => {
  const navigate = useNavigate()
  const [notifaction, setNotification] = useState([]);

  const { data, isLoading, refetch } = useGetNotificationsQuery('', {
    refetchOnMountOrArgChange: true,
});

useEffect(() => {
  const updateData = data?.Items?.map((item) => ({
      key: item?.userid,
      ...item,
    }));
  const update = updateData?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  setNotification(update);
}, [data]);

  const findData = data?.Items?.filter((item)=>item?.is_read===false)

  console.log("fsfsfsfs5fs5f5sf5s5fs5fs5f",findData)

  const handleSeeAll = () => {
    navigate('/super-admin/notifications')
  }
  const content = (
    <div className=" ">
      <div className=" md:w-[408px] w-[100%] px-5 py-[25px]">
        <div className="w-full  flex items-center justify-between gap-2">
          <h2 className="text-[20px] font-bold text-dark-gray">
            Notifications
          </h2>
          <button onClick={handleSeeAll} className="text-sm text-primary font-medium">See All</button>
        </div>
        {/* -------------------------here notification ------- */}
        <div className="mt-9 ">
          <Notification handleSeeAll={handleSeeAll} data={notifaction} refetch={refetch}/>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <div className="w-full Notification h-[100px] mr-20 gap-5  flex items-center justify-end z-50">
        <div>
          <Popover content={content} placement="bottomRight" trigger="click">
            <div className="bg-white w-[48px] relative rounded-md flex items-center justify-center  h-[48px]">
              <button className=" text-primary text-[27px]"><Icon icon="mi:notification" /></button>
              {findData?.length > 0 && <div className="w-[7px] absolute top-[14px] right-[15px] h-[7px] bg-red-500 rounded-full"></div>}
            </div>
          </Popover>
        </div>
        {/* <Icon icon="mi:notification" /> */}
      </div>
    </>
  );
};

export default SuperAdminNav;
