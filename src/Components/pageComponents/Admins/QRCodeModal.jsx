import { Icon } from "@iconify/react";
import { Modal, QRCode, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import ShareModal from "../../Shared/modal/ShareModal";
// import ImageDownloader from "../../Shared/DownloadQrc";
import { toPng } from "html-to-image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { saveAs } from "file-saver";
// import axios from "axios";

const QRCodeModal = ({ row, product = false }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const componentRef = useRef();
  const [share, setShare] = useState(false);
  const [shareText, setShareText] = useState("");
  const [type, setType] = useState("Whatsapp");

  // ======Share funcation=========
  const handleShare = async () => {
    if (type === "Whatsapp") {
      if (shareText.trim() !== "") {
        const whatsappMessage = `
        Hi, I am from Safe Scan.

        https://scansafes3.s3.amazonaws.com/${row?.qrc_image}

         `;
        const whatsappLink = `https://wa.me/${shareText}/?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        window.open(whatsappLink, "_blank");
        setShare(false);
      }
    }
  };

  // const downloadImage = async () => {
  //   const imageUrl = "https://scansafes3.s3.amazonaws.com/1714274569264-qr.png";

  //   try {
  //     const response = await axios.get(imageUrl, {
  //       responseType: "blob",
  //     });

  //     const blob = new Blob([response.data], { type: response.data.type });
  //     const downloadUrl = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "qr.png";
  //     link.click();

  //     URL.revokeObjectURL(downloadUrl);
  //   } catch (error) {
  //     console.error("Error downloading the image:", error);
  //   }
  // };

  const captureAndDownloadImage = async (name) => {
    if (componentRef.current) {
      try {
        // Use toPng to capture the component as a PNG
        const dataUrl = await toPng(componentRef.current, { quality: 1.0 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${name}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error capturing the component:", error);
      }
    } else {
      console.error("Component ref is null.");
    }
  };

  // const qrCodeUrl = "https://scansafes3.s3.amazonaws.com/1714274569264-qr.png";

  // const downloadQRCode = async () => {
  //   try {
  //     const response = await fetch(qrCodeUrl, {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch QR code.");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "qrcode.png"; // Specify the downloaded file name
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading QR code:", error);
  //   }
  // };

  // const captureAndDownloadImage = async () => {
  //   if (componentRef.current) {
  //     toPng(componentRef.current, { quality: 1.0 })
  //       .then(async (dataUrl) => {
  //         downloadImage(dataUrl); // Trigger the download
  //       })
  //       .catch((err) => {
  //         console.error("Error capturing image:", err);
  //       });
  //   }
  // };

  // const downloadImage = (dataUrl) => {
  //   const link = document.createElement("a");
  //   link.download = "qr.png";
  //   link.href = dataUrl;
  //   link.click();
  // };

  // const downloadQRCodesss = () => {
  //   const qrCodeUrl = "https://scansafes3.s3.amazonaws.com/1714274569264-qr.png";

  //   const a = document.createElement('a');
  //   a.href = qrCodeUrl;
  //   a.download = 'qrcode.png'; // Specify the file name
  //   a.click();
  // };

  // function downloadFile(url) {
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch file: ${response.statusText}`);
  //       }
  //       return response.blob(); // Convert response to Blob
  //     })
  //     .then((blob) => {
  //       // Extract filename from URL or provide a fallback
  //       const fileName = url.split("/").pop() || "downloaded-file";
  //       saveAs(blob, fileName);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading the file:", error);
  //     });
  // }

  // const downloadImage = () => {
  //   const link = document.createElement("a");
  //   link.href = `https://scansafes3.s3.amazonaws.com/${row?.qrc_image}`;
  //   link.setAttribute("download", "qr.png");
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  // const captureAndDownload = async () => {
  //   const component = document.getElementById("pdf-component");

  //   if (component) {
  //     try {
  //       const canvas = await html2canvas(component, { useCORS: true });
  //       const dataURL = canvas.toDataURL("image/jpeg");

  //       // Download as JPEG
  //       const a = document.createElement("a");
  //       a.href = dataURL;
  //       a.download = "certificate.jpg";
  //       a.style.display = "none";
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);

  //       // Optionally, download as PDF
  //       const pdf = new jsPDF();
  //       const imgWidth = 210; // A4 width in mm
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  //       pdf.addImage(dataURL, "JPEG", 0, 0, imgWidth, imgHeight);
  //       pdf.save("certificate.pdf");

  //     } catch (error) {
  //       console.error("Error capturing component:", error);
  //     }
  //   } else {
  //     console.error("Component not found!");
  //   }
  // };

  const downloadQRCodeLast = async (qrLink) => {
    try {
      const response = await fetch(qrLink, {
        method: "GET",
        // mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch QR code.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  //   const handleDownload = async () => {
  //     try {
  //       const response = await fetch(imageUrl);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch image.");
  //       }
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);

  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "QR-Code.png";
  //       document.body.appendChild(a);
  //       a.click();

  //       a.remove();
  //       URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error("Error downloading the image:", error);
  //     }
  //   };

  const qrData = {
    admin_serial: row?.admin_serial,
    company_serial: row?.company_serial,
    userid: row?.userid,
    productid: row?.productid,
    usertype: row?.usertype,
    username: row?.username,
  };

  return (
    <>
      <Tooltip placement="topLeft" title="View QRC Code">
        <button
          onClick={() => setModalOpen(true)}
          className=" w-full flex items-center justify-center"
        >
          <img src="/Images/QR_Code.png" alt="QR" />
        </button>
      </Tooltip>

      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={450}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">QRC Code</h2>

            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <div
            id="pdf-component"
            ref={componentRef}
            className="w-full mx-auto bg-white flex-col justify-center py-2"
          >
            <div className=" flex max-w-[300px] mx-auto mb-2 items-center gap-2 ">
              <img
                src="/Images/logonewSort.png"
                alt="logo"
                className="w-[35px]"
              />
              <div>
                <h3 className=" text-[18px] font-bold text-[rk-grey-900#1B2559] mb-[-6px]">
                  Scan Safe
                </h3>
                <h4 className=" text-[#68769F] font-medium text-base">
                  {product
                    ? `${row.product_name}`
                    : `Admin : ${row?.frist_name} ${row?.last_name}`}
                </h4>
              </div>
            </div>

            <div className=" w-full flex items-center justify-center">
              {/* <img
                src={`https://scansafes3.s3.amazonaws.com/${row?.qrc_image}`}
                alt="qr-code"
                className="w-[300px] h-[300px]"
              /> */}

              <QRCode
                style={{ marginBottom: 10 }}
                errorLevel={"H"}
                size={300}
                value={JSON.stringify(qrData)}
              />
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ReactToPrint
                trigger={() => (
                  <button className=" bg-primary hover:bg-primary/80 flex items-center gap-2 duration-300 px-4 h-[38px] rounded-[4px] text-[14px] font-medium text-white">
                    <Icon icon="prime:print" className=" text-[25px]" />
                    Print QRC Code
                  </button>
                )}
                content={() => componentRef.current}
              />

              {/* <button className=" bg-[#FF4D4D]/20 flex items-center justify-center hover:bg-[#FF4D4D]/80 duration-300 w-[38px] h-[38px] rounded-[4px] font-medium text-[#FF4D4D] hover:text-white">
                <Icon icon="lucide:trash-2" className=" text-[20px]" />
              </button> */}
            </div>
            <div className="flex items-center gap-3">
              {/* <ImageDownloader
                imageUrl={`https://scansafes3.s3.amazonaws.com/${row?.qrc_image}`}
                fileName="qr_code.png"
              /> */}

              <button
                onClick={() =>
                  captureAndDownloadImage(
                    product
                      ? `${row.product_name}`
                      : `${row?.frist_name} ${row?.last_name}`
                  )
                }
                className=" bg-primary hover:bg-primary/80 flex items-center justify-center duration-300 w-[38px] h-[38px] rounded-[4px] text-[14px] font-medium text-white"
              >
                <Icon
                  icon="lucide:arrow-down-to-line"
                  className=" text-[25px]"
                />
              </button>

              {/* <button
                onClick={() =>
                  captureAndDownloadImage(
                    `https://scansafes3.s3.amazonaws.com/${row?.qrc_image}`
                  )
                }
              >
                ass
              </button> */}

              <button
                onClick={() => {
                  setShare(true);
                  setModalOpen(false);
                }}
                className=" bg-primary/20 flex items-center justify-center hover:bg-primary/80 duration-300 w-[38px] h-[38px] rounded-[4px] font-medium text-primary hover:text-white"
              >
                <Icon icon="lucide:share-2" className=" text-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <ShareModal
        type={type}
        setType={setType}
        item={row}
        modalOPen={share}
        setModalOpen={setShare}
        shareText={shareText}
        setShareText={setShareText}
        handleShare={handleShare}
      />
    </>
  );
};

export default QRCodeModal;
