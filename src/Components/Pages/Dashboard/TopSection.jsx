import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { Icon } from '@iconify/react';

const TopSection = ({issue,workers,admins,counters,warning_issues}) => {


    const filterAdmin = admins?.filter((item)=>item?.is_active === true)
    const filterWorker = workers?.filter((item)=>item?.is_active === true)
    return (
        <>
            <div className='lg:flex items-center gap-5 justify-between mb-5'>
                <div className='w-full lg:w-1/2'>
                    <SectionWrapper>
                        <div className='p-5 md:flex items-center justify-between w-full '>
                            <div className='flex items-center gap-4 w-full md:w-[35%]'>
                                <div className='bg-primary/10 p-2.5 flex items-center justify-center rounded-[10px] h-[44px] w-[44px]'>
                                    <Icon className='w-[24] text-primary' icon="mingcute:user-3-line" />
                                </div>
                                <div className='h-10 -mt-2'>
                                    <p className='text-xs font-medium text-info/50'>Users</p>
                                    <h1 className='text-2xl font-bold text-dark-gray' >{filterWorker?.length+filterAdmin?.length}</h1>
                                </div>
                            </div>

                            <div className='flex items-center h-10 w-full  md:w-[65%]  justify-between mt-10 md:mt-0'>
                                <div className='w-[50%]'>
                                    <p className='text-xs font-medium text-info/50'>Workers</p>
                                    <h1 className='text-2xl font-bold text-dark-gray' >{filterWorker?.length}</h1>
                                </div>
                                <div className='w-[50%]'>
                                    <p className='text-xs font-medium text-info/50'>Admins</p>
                                    <h1 className='text-2xl font-bold text-dark-gray' >{filterAdmin?.length}</h1>
                                </div>
                            </div>
                        </div>
                    </SectionWrapper>
                </div>
                <div className='w-full lg:w-1/2 lg:mt-0 mt-5'>
                    <SectionWrapper>
                        <div className='p-5 md:flex items-center justify-between w-full bg-primary rounded-[20px] text-white'>
                            <div className='flex items-center gap-4 w-full md:w-[35%]'>
                                <div className='bg-black/20 p-2.5 flex items-center justify-center rounded-[10px] h-[44px] w-[44px]'>
                                    <Icon className='w-40' icon="lucide:gavel" />
                                </div>
                                <div className='h-10 -mt-2'>
                                    <p className='text-xs font-medium text-white/70'>Warning Issued</p>
                                    <h1 className='text-2xl font-bold ' >{issue?.Count}</h1>
                                </div>
                            </div>

                            <div className='flex items-center h-10 w-full  md:w-[65%]  justify-between mt-10 md:mt-0'>
                                <div className='w-[50%]'>
                                    <p className='text-xs font-medium text-white/70'>Total Fines</p>
                                    <h1 className='text-2xl font-bold ' >€{counters?.due_fines}</h1>
                                </div>
                                <div className='w-[50%]'>
                                    <p className='text-xs font-medium text-white/70'>Fines Outstanding</p>
                                    <h1 className='text-2xl font-bold ' >€{counters?.collected_fines}</h1>
                                </div>
                            </div>
                        </div>
                    </SectionWrapper>
                </div>
            </div>

        </>
    );
};

export default TopSection;