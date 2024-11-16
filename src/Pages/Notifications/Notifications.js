import React, { useEffect, useState } from "react";
import SectionWrapper from "../../Components/Shared/SectionWrapper";
import Notification from "../../Components/Pages/Notifications/Notification";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import { useGetNotificationsQuery } from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All Notifications");
  const [notifaction, setNotification] = useState([]);

  const { data, isLoading, refetch } = useGetNotificationsQuery("");

  useEffect(() => {
    const updateData = data?.Items?.map((item) => ({
        key: item?.userid,
        ...item,
      }));
    const update = updateData?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setNotification(update);
  }, [data]);


  const tabs = [
    {
      id: 1,
      title: "All Notifications",
    },
    {
      id: 2,
      title: "Unread",
    },
    {
      id: 3,
      title: "Read",
    },
  ];

  return (
    <>
      <BreadCrumb
        title={"Notifications"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Notifications", url: "/admin/notifications" },
        ]}
      />
      {/* <img src='https://scansafes3.s3.amazonaws.com/icone.png' alt='dkdjfds'/> */}
      <div className="mb-10">
        <SectionWrapper>
          <div className=" px-[25px] py-7">
            {/* ----------tabs section------------ */}
            <div className="mb-7 flex items-center gap-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab?.title)}
                  className={`text-sm px-1 pb-2 ${
                    activeTab === tab.title
                      ? "text-primary border-b-[3px] border-primary"
                      : "text-info/80 border-b border-transparent"
                  }`}
                >
                  {tab?.title}
                </button>
              ))}
            </div>
            <div>
              {isLoading ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  {activeTab === "All Notifications" && (
                    <Notification data={notifaction} refetch={refetch} />
                  )}
                  {activeTab === "Unread" && (
                    <Notification
                      data={notifaction?.filter((d) => d.is_read === false)}
                      refetch={refetch}
                    />
                  )}
                  {activeTab === "Read" && (
                    <Notification
                      data={notifaction?.filter((d) => d.is_read === true)}
                      refetch={refetch}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default Notifications;
