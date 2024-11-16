import React from "react";
// import SectionWrapper from "../../Components/Shared/SectionWrapper";
import { Icon } from "@iconify/react";
import CustomButton from "../../Components/Shared/CustomButton";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";

const Subscriptions = () => {
  const { user } = useSelector((state) => state.auth);

  const queryitem = `${user?.userid}?username=${user?.username}`;

  const { data, isLoading } = useGetProfileQuery(queryitem);

  // console.log("data is=======", data);
  return (
    <>
      <BreadCrumb
        title={"Subscription"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Subscription", url: "/admin/subscription" },
        ]}
      />
      {isLoading ? (
        <>
            <Loader />
        </>
      ) : (
        <>
          <div className="w-full grid lg2:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "basic" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px] ">
                <div>
                  {data?.plan === "basic" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                        <Icon className="text-2xl" icon="humbleicons:box" />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                        <Icon className="text-2xl" icon="humbleicons:box" />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                            Basic
                        </p>
                      </div>
                    </>
                  )}

                  {data.plan === "basic" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                            Basic Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €100
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €100
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "basic" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>100 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>500 Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>100 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>500 Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "basic" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date: {data?.expiry_date ?data?.expiry_date : "no date" }
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* --------premium plan */}
            <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "premium" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px] ">
                <div>
                  {data?.plan === "premium" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon
                            className="text-2xl"
                            icon="lucide:codesandbox"
                          />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon
                            className="text-2xl"
                            icon="lucide:codesandbox"
                          />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                          Premium
                        </p>
                      </div>
                    </>
                  )}

                  {data.plan === "premium" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                          Premium Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €159
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €159
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "premium" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>250 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>1000 Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>250 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>1000 Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "premium" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date: {data?.expiry_date ?data?.expiry_date : "no date" }
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* --------platinum plan */}

            <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "platinum" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px] ">
                <div>
                  {data?.plan === "platinum" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="lucide:gem" />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="lucide:gem" />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                          Platinum
                        </p>
                      </div>
                    </>
                  )}

                  {data.plan === "platinum" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                          Platinum Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €259
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €259
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "platinum" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>Unlimited Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>Unlimited Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>Unlimited Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>Unlimited Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "platinum" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date: {data?.expiry_date ?data?.expiry_date : "no date" }
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Subscriptions;
