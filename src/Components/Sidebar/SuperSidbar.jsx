import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import LogOutModal from "../Shared/modal/LogOutModal";

const Sidebar_animation = {
  open: {
    width: "16rem",
    transition: {
      damping: 40,
    },
  },
  closed: {
    width: "5rem",
    transition: {
      damping: 40,
    },
  },
};

const SuperSidbar = () => {
  const path = useLocation();
  // logout modal show--------------
  const [show, setShow] = useState(false);
  const [loading,setLoading]=useState(false)

  // sidebar open--------------
  const [open, setOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  // const handelLogout = () => {
  //   navigate("/");
  // };

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  const NavData = [
    {
      title: "Customers",
      icon: <Icon icon="material-symbols:dashboard-outline" />,
      url: "/super-admin/customers",
    },
    {
      title: "Notifications",
      icon: <Icon icon="lucide:bell" />,
      url: "/super-admin/notifications",
    },

  ];


  const logout=()=>{
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    window.location.reload();
    setLoading(true)
  }

  const activeStyle = {
    color: "#1B2559",
    // borderRight: "4px solid #664DFF",
  };
  return (
    <>
      <motion.div
        variants={Sidebar_animation}
        animate={open ? "open" : "closed"}
        className="flex flex-col justify-between  bg-white  h-[100vh] sticky top-0"
      >
        <div className=" flex items-center px-5 py-2 justify-between">
          <Link to={'/admin/dashboard'}  className="h-[80px] flex  items-center">
            {" "}
            <img
              style={{
                transitionDelay: `600ms`,
              }}
              src="/Images/logonew2.png"
              alt="logo"
              className={`max-w-[173px] mx-auto duration-500 ${
                open ? "" : "hidden "
              }`}
            />
            <img
              src="/Images/logonewSort.png"
              alt="logo"
              className={`max-w-[143px] mx-auto ${
                open ? " hidden duration-500" : ""
              }`}
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className={`text-[#8E9BBA] text-[25px] ${open ? "" : "hidden"}`}
          >
            <Icon icon="lucide:arrow-left-from-line" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className={`text-[#8E9BBA] text-[25px] bg-white shadow-sm z-50 relative top-0 right-[-15px] rounded-full ${
              open ? "hidden" : ""
            }`}
          >
            <Icon icon="ic:round-chevron-right" />
          </button>
        </div>

        <div className=" border border-[#F4F7FE] w-full f-full"></div>

        <section className="w-full h-full overflow-y-scroll">
          {/* sidebar menu bar */}
          <div className="py-4 grid gap-0">
            {NavData?.map((nav, index) => (
              <NavLink
                key={index}
                to={nav?.url}
                className="pl-6 py-3 flex items-center overflow-hidden group justify-between text-[#B0BBD5]"
                style={path.pathname === nav?.url ? activeStyle : undefined}
              >
                <div className="flex item-center gap-3 font-bold duration-500 ">
                  <div
                    className={`text-[23px] group-hover:text-[#664DFF] ${
                      path.pathname === nav?.url ? " text-[#664DFF]" : ""
                    }`}
                  >
                    {nav?.icon}
                  </div>
                  {/* {open && (
                    <p className="text-[18px] font-[700] duration-500 group-hover:text-[#1B2559]">
                      {nav?.title}
                    </p>
                  )} */}
                  <h2
                    style={
                      {
                        // transitionDelay: `100ms`,
                      }
                    }
                    className={`whitespace-pre text-[18px] font-[700] duration-500 group-hover:text-[#1B2559] ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {nav?.title}
                  </h2>
                  {/* <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {nav?.title}
              </h2> */}
                </div>
                {open && (
                  <div
                    className={`${
                      path.pathname === nav?.url
                        ? " bg-[#664DFF] rounded-full w-[4px] h-[36px]"
                        : "rounded-full duration-500 w-[4px] h-[36px] group-hover:bg-[#664DFF]"
                    }`}
                  ></div>
                )}
              </NavLink>
            ))}
          </div>
        </section>

        <div className="">
          <div className="flex justify-between items-center group p-4">
            <button
              onClick={() => setShow(true)}
              className="flex w-full text-dark-gray py-2 rounded-[10px] cursor-pointer justify-between px-3 items-center hover:text-white hover:bg-error duration-300"
            >
              <h2
                className={`whitespace-pre text-base font-medium ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
               {loading ? "Loading..." : "Log out"} 
              </h2>
              <span className=" w-[40px] flex items-center justify-center h-[24px]">
                <Icon icon="humbleicons:logout" className=" text-[24px]" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
      <LogOutModal
        modalOPen={show}
        setModalOpen={setShow}
        // className,
        onDelete={logout}
      />
    </>
  );
};

export default SuperSidbar;
