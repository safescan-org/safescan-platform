import { Icon } from '@iconify/react';
import React from 'react';
import toast from 'react-hot-toast';

const InfoToast = ({ message }) => {
    return (
        <>
            <div className="bg-dark-gray rounded-[16px] md:w-[570px] p-4">
                <div className="flex items-center gap-2 justify-between">
                    <div className='flex items-center gap-2'>
                        <Icon className='text-white text-2xl -rotate-2' icon="mdi:error" />
                        <h1 className="text-2xl font-bold text-white">Info Toast</h1>
                    </div>
                    <div className='bg-white/30 flex items-center justify-center w-6 h-6 rounded-full'>
                        <button onClick={() => toast.remove()}>
                            <Icon className='text-white text-lg' icon="gridicons:cross" />
                        </button>

                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-6'></div>
                    <p className='text-white mt-1.5'>{message}</p>
                </div>

            </div>
        </>
    );
};

export default InfoToast;