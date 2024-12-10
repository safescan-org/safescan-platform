import React, { useState } from "react";
import { useSelector } from "react-redux";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import axios from "axios";
import Loader2 from "../../Shared/Loader2";

const Profile = ({data,refetch}) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const uploadeProfile = async (e) => {
    setLoading(true);
    const getImage = e.target.files[0];
    const image = getImage;

    try {
      const formData = new FormData();
      formData.append("files", image);
      formData.append("image_type", "profile");
      formData.append("username", data?.username);

      const response = await axios.post(
        `https://q3vvxu6li2.execute-api.us-east-1.amazonaws.com/api/v1/users/image-upload/${data?.userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        refetch();
        toast.custom(<SuccessToast message={"Profile Updated"} />);
        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch (error) {
      toast.custom(<ErrorToast message={"please try again"} />);
      setLoading(false);
    }
  };
  return (
    <div className="-mt-10 relative">
      {loading ? (
        <div className="w-[100px] h-[100px] pt-6 bg-white shadow-lg rounded-full ">
            <Loader2 />
        </div>
      ) : (
        <>
          {data?.profile_image ? (
            <img
              src={`https://scansafes3.s3.amazonaws.com/${data?.profile_image}`}
              alt="profile"
              className="w-[100px] h-[100px] rounded-full bg-white shadow-md border"
            />
          ) : (
            <img
              src="/Images/Group 48.png"
              alt="profile"
              className=" w-[100px] h-[100px] rounded-full bg-white shadow-lg object-cover"
            />
          )}
        </>
      )}

      <div className="bg-white rounded-full absolute bottom-3 right-1 ">
        <div className="bg-primary/10 hover:bg-primary hover:text-white duration-300 rounded-full border p-1.5 flex items-center justify-center text-primary">
          <label for="file-input" class="file-label">
            <Icon
              className="w-[12px] h-[12px] cursor-pointer"
              icon="akar-icons:image"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={uploadeProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
