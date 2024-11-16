import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({title,links}) => {
  return (
    <div className=" lg:relative  lg:top-[-75px] left-0 mb-5 mt-3 lg:w-[400px] w-full lg:mt-0 lg:mb-[-50px] z-0">
      <div>
        {links?.map((link,index)=>(
          <Link className="text-[#707EAE] text-[12px] font-[500]" key={index} to={link.url}>{link.title} {links.length - 1 > index ? "/" : ""} </Link>
        ))}
      </div>
      <h2 className=" text-[#2D396B] text-[28px] font-[700]">{title}</h2>
    </div>
  );
};

export default BreadCrumb;
