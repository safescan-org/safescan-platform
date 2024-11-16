import React, { useEffect, useState } from 'react';
import CustomInput from '../../Shared/input/CustomInput';
import { Icon } from '@iconify/react';
import CustomModal from '../../Shared/modal/CustomModal';
import ForgotPassModal from './ForgotPassModal';
import { useApproveUserMutation } from '../../../redux/features/admin/adminApi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import SuccessToast from '../../Shared/Toast/SuccessToast';
import ErrorToast from '../../Shared/Toast/ErrorToast';

const EditProfile = ({ item, refetch, setOpenModal, modalOPen }) => {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [approveUser, { isLoading, isSuccess, error }] = useApproveUserMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = "Successfully Profile Updated";
            toast.custom(<SuccessToast message={message} />);
            refetch();
            reset()
            setOpenModal(false);
        }
        if (error) {

            toast.custom(<ErrorToast message={error?.data.error || error?.data.message} />);
        }
    }, [isSuccess, error]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            frist_name: item.first_name,
            last_name: item.last_Name,
            username: item.username,
            terms_conditions: item.terms_conditions,
            // password: item.password,
            email: item.email,
            phone: item.phone,
            site_address: item.site_address,
            site_name: item.site_name,
            emloyeer_name: item.emloyeer_name,
            minor_to_major: item.minor_to_major,
            major_to_dismissal: item.major_to_dismissal,
            fines_per_dismissal: item.fines_per_dismissal,
            fines_per_mainor: item.fines_per_mainor,
            fines_per_major: item.fines_per_major,
        },
    });

    const onSubmit = async (data) => {
        const body = {
            username: item?.username,
            first_name: data.frist_name,
            email: data.email,
            terms_conditions: data.terms_conditions,
            // phone: data.phone,
            site_address: data.site_address,
            site_name: data.site_name,
            emloyeer_name: data.emloyeer_name,
            major_to_dismissal: Number(data.major_to_dismissal),
            minor_to_major: Number(data.minor_to_major),
            last_Name: data.last_name,
            // password: item.password,
            fines_per_dismissal: Number(data.fines_per_dismissal),
            fines_per_mainor: Number(data.fines_per_mainor),
            fines_per_major: Number(data.fines_per_major),
        }
        const id = item?.userid;
        // console.log(body)
        await approveUser({ id, body });
    };

    return (
        <CustomModal
            modalOPen={modalOPen}
            setModalOpen={setOpenModal}
            handleSubmit={handleSubmit(onSubmit)}
            width={600}
            title={'Edit Information'}
            buttonText={isLoading ? 'Loading...' : 'Save Changes'}
        >

            <div>
                <div className='md:flex items-center gap-5'>
                    <div className='w-full'>
                        <CustomInput
                            label={"First Name"}
                            type={"text"}
                            register={register("frist_name", {
                                required: {
                                    value: true,
                                    message: "Please enter first name",
                                },
                            })}
                            error={errors.frist_name}
                            placeholder={"Enter First Name"}
                        />
                    </div>
                    <div className='w-full'>
                        <CustomInput
                            label={'Last Name'}
                            type={'text'}
                            register={register("last_name", {
                                required: {
                                    value: true,
                                    message: "Please enter last name",
                                },
                            })}
                            error={errors.last_name}
                        />
                    </div>
                </div>
                {/* <div>
                    <div className="flex flex-col items-start w-full mt-3">
                        <label
                            htmlFor="otp"
                            className="mb-1.5 font-medium text-base text-dark-gray"
                        >
                            {'Username'}
                        </label>
                        <input
                            className="py-[15px] h-[44px] px-[14px]  text-[#A3AED0] placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                            type={'text'}
                            required
                            disabled
                            id="otp"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "",
                                },
                            })}
                            error={errors.username}
                        />

                    </div>
                </div> */}
                {/* <div className='relative'>
                    <button onClick={() => { setOpen(true); setOpenModal(false) }} className='absolute right-0 text-primary font-medium text-lg'>Forgot Password?</button>
                    <CustomInput
                        label={'Password'}
                        type={show ? "text" : "password"}
                        register={register("password", {
                            required: {
                                value: true,
                                message: "Please enter password",
                            },
                        })}
                    />
                    <button className='absolute right-3 bottom-3' type='button' onClick={() => setShow(pre => !pre)}>
                        {
                            show ? <Icon icon="ic:outline-visibility" className='text-[20px] text-info' /> : <Icon icon="mdi:visibility-off-outline" className='text-[20px] text-info' />
                        }
                    </button>
                </div> */}
                {/* <div>
                    <div className="flex flex-col items-start w-full mt-3">
                        <label
                            htmlFor="otp"
                            className="mb-1.5 font-medium text-base text-dark-gray"
                        >
                            {'Mobile Number'}
                        </label>
                        <input
                            className="py-[15px] h-[44px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                            type={'text'}
                            required
                            disabled
                            id="otp"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "",
                                },
                            })}
                        />

                    </div>

                </div> */}
                <div>
                    <CustomInput
                        label={'Email Address'}
                        type={'email'}
                        register={register("email", {
                            required: {
                                value: true,
                                message: "Please enter email",
                            },
                        })}
                        error={errors.email}
                    />
                </div>
                <div>
                    <CustomInput
                        label={'Site Name'}
                        type={'text'}
                        register={register("site_name", {
                            required: {
                                value: false,
                                message: "Please enter site name",
                            },
                        })}
                        error={errors.site_name}
                    />
                </div>
                <div>
                    <CustomInput
                        label={'Site Address'}
                        type={'text'}
                        register={register("site_address", {
                            required: {
                                value: true,
                                message: "Please enter site address",
                            },
                        })}
                    />
                </div>
                <div>
                    <CustomInput
                        label={'Employers Name'}
                        type={'text'}
                        register={register("emloyeer_name", {
                            required: {
                                value: true,
                                message: "Please enter Employers Name",
                            },
                        })}
                        error={errors.emloyeer_name}
                    />
                </div>
                <div className="flex flex-col items-start w-full mt-4">
                    <label
                        htmlFor="tc"
                        className='mb-1.5 font-medium text-lg text-dark-gray'
                    >
                        {'T&Cs For Testing '}
                    </label>
                    <textarea
                        {...register("terms_conditions", {
                            required: {
                                value: true,
                                message: "Please enter terms conditions",
                            },
                        })}

                        className="py-[15px] h-[64px] px-[14px]  text-dark-gray placeholder:text-[#A3AED0]  rounded-[10px] w-full text-sm font-medium outline-none  border-[1px] focus:border-primary"
                        type={'text'}
                        id="tc"
                    // {...'t&cs'}
                    />

                </div>

                <div className='md:flex items-center gap-5'>
                    <div className='w-full relative'>
                        <CustomInput
                            label={'1 Major For'}
                            type={'number'}
                            register={register("minor_to_major", {
                                required: {
                                    value: true,
                                    message: "Please enter major",
                                },
                            })}
                            error={errors.minor_to_major}
                        />
                        <p className='absolute right-3 bottom-[14px] text-sm font-medium text-info'>Minor</p>
                    </div>
                    <div className='w-full relative'>
                        <CustomInput
                            label={'1 Dismissal For'}
                            type={'number'}
                            register={register("major_to_dismissal", {
                                required: {
                                    value: true,
                                    message: "Please enter dismissal",
                                },
                            })}
                            error={errors.major_to_dismissal}
                        />
                        <p className='absolute right-3 bottom-[14px] text-sm font-medium text-info'>Major</p>
                    </div>
                </div>
                <div className='md:flex items-center gap-5'>
                    <div className=' relative'>
                        <CustomInput
                            label={'Fines Per Minor'}
                            type={'number'}
                            register={register("fines_per_mainor", {
                                required: {
                                    value: true,
                                    message: "Please enter minor",
                                },
                            })}
                            error={errors.fines_per_mainor}
                        />
                        <p className='absolute right-3 bottom-[14px] text-sm font-medium text-dark-gray'>€</p>
                    </div>
                    <div className=' relative'>
                        <CustomInput
                            label={'Fines Per Major'}
                            type={'number'}
                            register={register("fines_per_major", {
                                required: {
                                    value: true,
                                    message: "Please enter major",
                                },
                            })}
                            error={errors.fines_per_major}
                        />
                        <p className='absolute right-3 bottom-[14px] text-sm font-medium text-dark-gray'>€</p>
                    </div>
                    <div className=' relative'>
                        <CustomInput
                            label={'Fines Per Dismissal'}
                            type={'number'}
                            register={register("fines_per_dismissal", {
                                required: {
                                    value: true,
                                    message: "Please enter dismissal",
                                },
                            })}
                            error={errors.fines_per_dismissal}
                        />
                        <p className='absolute right-3 bottom-[14px] text-sm font-medium text-dark-gray'>€</p>
                    </div>
                </div>
                <CustomModal
                    width={'600px'}
                    modalOPen={open}
                    setModalOpen={setOpen}
                    title={'Forgot Password'}
                    buttonText={'Reset Password'}
                >
                    <ForgotPassModal setOpenModal={setOpenModal} />
                </CustomModal>
            </div>
        </CustomModal>

    );
};

export default EditProfile;