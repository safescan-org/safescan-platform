import { Pie } from '@ant-design/plots';
import React from 'react';

const FinesAmountChart = ({ data }) => {

    const config = {
        appendPadding: 10,
        data,
        legend: false,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        color: ['#B0A4FF', '#664DFF'],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '',
            },
        },
        tooltip: {
            customContent: (title, items) => {
                return (
                    <div>
                        {items?.map((item, index) => {
                            const { name } = item;
                            return (
                                <>
                                    <span key={index} className='relative'>
                                        <span className='bg-dark-gray h-5 w-5 rotate-45 absolute top-4 -left-1 z-[-1]'></span>
                                        <span
                                            key={index}
                                            className="flex flex-col pl-2.5 pr-7 py-2 bg-dark-gray rounded-[10px] z-10 mx-0"
                                            data-index={index}
                                        >
                                            <span className='flex items-center gap-1'>
                                                <span className={`h-1.5 w-1.5 rounded-full  ${name === 'Due' ? 'bg-[#B0A4FF]' : 'bg-primary'}`}></span>
                                                <span className='text-xs font-medium text-white/70'>Fines {name}</span>
                                            </span>
                                            <span className='text-white font-bold text-lg'>€{item?.data?.amount}</span>
                                        </span>
                                    </span>
                                </>
                            );
                        })}

                    </div>
                );
            },
        },
    };
    return (
        <div className='mx-auto'>
            <div className='h-[228px]  mt-12'>
                <Pie {...config} />
            </div>
           <div className='mt-4 flex items-center justify-between w-[240px]'>
           {
                data.map((fine, index) => <div key={index} className=''>
                    <span className=''>
                        <span className='flex items-center gap-1'>
                            <span  className={`h-2.5 w-2.5 rounded-full  ${fine.type === 'Due' ? 'bg-[#B0A4FF]' : 'bg-primary'}`}></span>
                            <span className='text-xs font-medium text-info'>Fines {fine.type}</span>
                        </span>
                        <span className='text-dark-gray font-bold text-lg'>€{fine.amount}</span>
                    </span>
                </div>)
            }
           </div>

        </div>

    );
};

export default FinesAmountChart;