import { Icon } from "@iconify/react";
import { Modal } from "antd";
import CustomButton from "../CustomButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const ShareModal = ({type,setType,modalOPen,setModalOpen,shareText,setShareText,handleShare}) => {
  const handleChange = (value) => {
    if (value) {
      setShareText(value)
    }
  };
    
  return (
    <div>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={450}
      >
        <div className="z-[50000000] rounded-[20px] bg-white">
          <div className=" flex items-center justify-between px-9 pt-6 pb-4">
            <h2 className=" text-[28px] font-bold text-dark-gray">Share Access Details</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="  text-[30px] h-[14px] rounded-lg flex items-center justify-center hover:text-[#FF5959] text-[#68769F]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <form  className="w-full mt-[0px] px-9 pb-9">
          <div className=" pt-4">
              <div className="w-full flex items-center justify-between">
                {/* <button type="button" onClick={()=>setType("email")} className={`text-base font-medium ${type==="email" ? "text-dark-gray" : "text-primary"} `}>Share Via Email</button> */}
                <button type="button" onClick={()=>setType("Whatsapp")} className={`text-base font-medium ${type==="Whatsapp" ? "text-dark-gray" : "text-primary"}`}>Share Via Whatsapp</button>
              </div>
              <PhoneInput
                  country="gb"
                  onlyCountries={["gb", "ie"]}
                  enableSearch={false}
                  value={shareText}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  onChange={handleChange}
                  containerStyle={{
                    borderRadius: "5px", // Example border radius
                    padding: "5px", // Example padding
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    fontSize: "16px",
                    paddingLeft: "50px",
                    outline: "none",
                  }}
                />
            </div>
            <div className="mt-[20px] flex items-center gap-5">
              <CustomButton
                onClick={handleShare}
                className={" w-full"}
              >
                Share
              </CustomButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ShareModal;
