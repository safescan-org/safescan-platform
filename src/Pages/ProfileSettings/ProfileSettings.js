import React, { useState } from "react";
import SectionWrapper from "../../Components/Shared/SectionWrapper";
import CustomButton from "../../Components/Shared/CustomButton";
import { Icon } from "@iconify/react";
import EditProfile from "../../Components/Pages/ProfileSettings/EditProfile";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";
import toast from "react-hot-toast";
import SuccessToast from "../../Components/Shared/Toast/SuccessToast";
import ErrorToast from "../../Components/Shared/Toast/ErrorToast";
import Profile from "../../Components/Pages/ProfileSettings/Profile";
import axios from "axios";
import Loader2 from "../../Components/Shared/Loader2";
import ChangePhone from "../../Components/Pages/ProfileSettings/ChangePhone";
import PhoneModal from "../../Components/pageComponents/SuperAdmin/SuperAdminCustomer/PhoneModal";

const ProfileSettings = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const queryitem = `${user?.userid}?username=${user?.username}`;
  const [verifyPhone, setVerifyPhone] = useState(false);

  const { data, isLoading, refetch } = useGetProfileQuery(queryitem);


  const uploadeCover = async (e) => {
    setLoading(true);
    const getImage = e.target.files[0];
    const image = getImage;
    try {
      const formData = new FormData();
      formData.append("files", image);
      formData.append("image_type", "cover");
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
        toast.custom(<SuccessToast message={"Cover Updated"} />);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.custom(<ErrorToast message={"please try again"} />);
    }
  };

  return (
    <>
      <BreadCrumb
        title={"Profile Settings"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Profile Settings", url: "/admin/profile-settings" },
        ]}
      />

      {isLoading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 text-info/70 mb-10">
            <SectionWrapper>
              {/* -------cover image---------- */}
              <div className=" border-b relative">
                <div>
                  {loading ? (
                    <div className="w-full flex items-center justify-center h-[196px]">
                      <Loader2 />
                    </div>
                  ) : (
                    <>
                      {data?.cover_image ? (
                        <img
                          src={`https://scansafes3.s3.amazonaws.com/${data?.cover_image}`}
                          alt="cover"
                          className=" object-cover w-[100%] h-[196px]"
                        />
                      ) : (
                        <img
                          src="/Images/Hexagon 1.png"
                          alt="cover"
                          className=" object-cover w-[100%] h-[196px]"
                        />
                      )}
                    </>
                  )}
                </div>

                <div className="bg-primary rounded-full absolute bottom-2 right-2 ">
                  <div className="bg-primary/10 hover:bg-primary text-white duration-300 rounded-full border p-1.5 flex items-center justify-center ">
                    <label for="file-cover" class="file-label">
                      <Icon
                        className="w-[12px] h-[12px] cursor-pointer"
                        icon="akar-icons:image"
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="file-cover"
                      className="hidden"
                      onChange={uploadeCover}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-between mt-[14px] mx-5 md:mx-0  md:pl-[46px] md:pr-[25px] ">
                <div className="md:flex items-center gap-5">
                  <Profile data={data} refetch={refetch} />
                  <div>
                    <h1 className="font-bold text-2xl text-dark-gray">
                      {data?.first_name} {data?.last_Name}
                    </h1>
                    <p className="text-lg font-medium -mt-1">
                      {data?.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[14px] flex-wrap">
                  <button
                    onClick={() => setPhoneOpen(true)}
                    className={` px-3.5 h-10 bg-primary/10 hover:bg-primary hover:text-white duration-500 rounded-[4px]  font-medium text-sm text-primary flex items-center justify-center `}
                  >
                    <span>Change Phone Number</span>
                  </button>
                  {/* <CustomButton  className={"bg-primary/10 hover:bg-primary/10"}>
                    <span className="flex text-primary">
                      
                    </span>
                  </CustomButton> */}
                  <CustomButton onClick={() => setOpenModal(true)}>
                    <span className="flex items-center text-white gap-2">
                      <Icon
                        className="text-lg text-white rotate-180"
                        icon="tabler:edit-circle"
                      />
                      <span>Edit Information</span>
                    </span>
                  </CustomButton>
                </div>
              </div>
              {/* ------------information---------------- */}
              <div className="mt-5 mb-14 px-[25px]">
                <div className="border-b py-5 border-gray-100 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                  <div>
                    <p className="text-xs font-medium">User Email</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.email}
                    </h1>
                  </div>

                  {/* <div>
                                        <p className='text-xs font-medium'>Password</p>
                                        <div className='flex items-center justify-between gap-2'>
                                            {
                                                show ? <h1 className='text-lg font-medium text-[#485585]'>{data?.password}</h1> : <h1 className='text-lg font-medium text-[#485585]'>********</h1>
                                            }
                                            <button type='button' className='mr-5' onClick={() => setShow(pre => !pre)}>
                                                {
                                                    show ? <Icon icon="ic:outline-visibility" className='text-base text-info ' /> : <Icon icon="mdi:visibility-off-outline" className='text-base  text-info' />
                                                }
                                            </button>
                                        </div>

                                    </div> */}

                  <div className=" lg:ml-36">
                    <p className="text-xs font-medium">Phone Number </p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.phone}
                    </h1>
                  </div>
                  <div className=" flex  items-center justify-end ">
                    {data?.is_verified ? (
                      <h1 className="text-[14px] font-medium text-[#44B200]">
                        Verified
                      </h1>
                    ) : (
                      <button onClick={()=>setVerifyPhone(true)} className="text-[14px] font-medium text-primary">
                        Verify Number
                      </button>
                    )}
                  </div>
                </div>
                <div className="border-b py-5 border-gray-100 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                  <div>
                    <p className="text-xs font-medium">Site Name</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.site_name}
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Site Address</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.site_address}
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Employers Name</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.emloyeer_name}
                    </h1>
                  </div>
                </div>
                <div className="border-b py-5 border-gray-100 grid grid-cols-1 ">
                  <div>
                    <p className="text-xs font-medium">T&Cs For Testing </p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.terms_conditions}
                    </h1>
                  </div>
                </div>
                <div className="border-b py-5 border-gray-100 grid md:grid-cols-2 grid-cols-1 gap-2.5">
                  <div>
                    <p className="text-xs font-medium">1 Major For</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.minor_to_major} Minor
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-medium">1 Dismissal For</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      {data?.major_to_dismissal} Major
                    </h1>
                  </div>
                </div>
                <div className="border-b py-5 border-gray-100 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                  <div>
                    <p className="text-xs font-medium">Fines Per Minor</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      € {data?.fines_per_mainor}
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Fines Per Major</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      € {data?.fines_per_major}
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Fines Per Dismissal</p>
                    <h1 className="text-lg font-medium text-[#485585]">
                      € {data?.fines_per_dismissal}
                    </h1>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>

          <EditProfile
            item={data}
            refetch={refetch}
            modalOPen={openModal}
            setOpenModal={setOpenModal}
          />
          <PhoneModal
            modalOPen={verifyPhone}
            setModalOpen={setVerifyPhone}
            refetch1={()=>{}}
            refetch2={refetch}
            allrefecth={()=>{}}
            username={data?.username}
            phoneNumber={data?.phone}
            logout={true}
          />

          <ChangePhone
            refetch={refetch}
            modalOPen={phoneOpen}
            setModalOpen={setPhoneOpen}
          />
        </>
      )}
    </>
  );
};

export default ProfileSettings;
