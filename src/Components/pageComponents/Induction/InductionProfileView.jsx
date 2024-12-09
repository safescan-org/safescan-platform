import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { formatDeadline } from "../../../helper/jwt";
import { useGetInductionsHistoryQuery } from "../../../redux/features/inductions/InductionsApi";
import Loader2 from "../../Shared/Loader2";

const InductionProfileView = ({ row, setModalOpen, modalOPen }) => {
  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };

  const { data, isLoading } = useGetInductionsHistoryQuery(
    `${row?.userid}?username=${row?.username}`,
    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  return (
    <>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={560}
        style={modalStyle}
      >
        <div className="z-[50000000] rounded-[20px] bg-white pb-3">
          <div className=" flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className=" text-[28px] font-bold text-dark-gray">
              {"Induction"}
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className=" flex items-center justify-between px-5 pb-3">
            <h2 className=" text-base font-semibold text-info">Total Inductions : {data?.inductions?.length}</h2>
            <h2 className=" text-base font-semibold text-info">Submitted Inductions : {data?.submitted_ids?.length}</h2>
          </div>

          {isLoading ? (
            <div className=" w-full h-[200px] flex items-center justify-center">
               <Loader2 />
            </div>
          ) : (
            <div className=" max-h-[65vh] overflow-y-scroll px-[20px]">
              <table className="table table-compact w-full">
                <thead>
                  <tr className="">
                    <th className="bg-[#f3f3f3] text-base px-4 font-semibold py-2 text-start">
                      Title
                    </th>
                    <th className="bg-[#f3f3f3] text-base px-4 font-semibold py-2 text-start">
                      Deadline
                    </th>
                    <th className="bg-[#f3f3f3] text-base px-4 font-semibold py-2 text-start">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.inductions?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-opacity-20 border-gray-300 bg-gray-50"
                    >
                      <td className="p-3">
                        <p className=" text-[14px] font-normal text-info">
                          {item.title.length > 25
                            ? item.title.slice(0, 26) + "..."
                            : item.title}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="text-info font-medium text-[14px]">
                          {formatDeadline(item?.deadline)}
                        </p>
                      </td>
                      <td className="p-3">
                        {}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default InductionProfileView;
