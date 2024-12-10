import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { saveAs } from "file-saver";

const InductionFilesView = ({ item, setModalOpen, modalOPen }) => {
  const modalStyle = {
    padding: 0, // Set padding to 0 for the Modal component
  };

  const extractVideoID = (url) => {
    const regExp =
      /^.*(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?#]+).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  function downloadFile(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        return response.blob(); // Convert response to Blob
      })
      .then((blob) => {
        // Extract filename from URL or provide a fallback
        const fileName = url.split("/").pop() || "downloaded-file";
        saveAs(blob, fileName);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  }

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
            <h2 className=" text-[28px] font-bold text-dark-gray">{"Files"}</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div className=" max-h-[75vh] overflow-y-scroll px-[70px]">
            <div className=" bg-[#D9D9D9] w-full flex items-center justify-center h-[200px]">
              {item?.link ? (
                <iframe
                  width="100%"
                  height="200" // Adjust height as needed
                  src={`https://www.youtube.com/embed/${extractVideoID(
                    item.link
                  )}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Fallback content when the link is unavailable
                <div className="video-placeholder">
                  <Icon icon="fa-solid:play" className="text-[25px]" />
                  <p>No video available</p>
                </div>
              )}
            </div>

            <div className=" mt-6">
              <h2 className=" text-[28px] font-bold font-sans">Documents</h2>
              <div className=" flex items-center gap-3 flex-col pb-4 w-full">
                {item?.files?.map((item, index) => (
                  <div className=" w-full" key={index}>
                    <h2 className=" text-[20px] font-bold">{item.title}</h2>
                    <div className=" w-full bg-[#CCDBFF52] flex items-center mt-1 justify-between h-[40px] rounded-[10px] px-4">
                      <h3 className=" text-[14px] font-[400] ">{item?.file}</h3>
                      <button
                        onClick={() =>
                          downloadFile(
                            `https://scansafes3.s3.amazonaws.com/${item?.file}`
                          )
                        }
                        type="button"
                        className=" "
                      >
                        <Icon
                          icon="ci:download"
                          className=" text-2xl text-[#68769F] duration-200"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InductionFilesView;
