import { Column } from '@ant-design/plots';
import React from 'react';

const TotalUserChart = ({ data }) => {
    const config = {
        data: data,
        isGroup: true,
        seriesField: 'name',
        xField: 'day',
        yField: 'value',
        legend: false,
        color: ['#664DFF', '#B0A4FF'],
        interactions: [{ type: 'element-active' }],
        dodgePadding: 0,
        state: {
            active: {
                animate: { duration: 100, easing: 'easeLinear' },
                style: {
                    lineWidth: 3,
                    fill: '#664DFF', // Set the fill color to white when active (hovered)
                    stroke: '#664DFF',
                },
            },
        },
        minColumnWidth: 12,
        maxColumnWidth: 12,
        columnStyle: {
            radius: [15, 15, 15, 15], // Set the radius for rounded corners
        },
        yAxis: {
            label: {
                style: {
                    fill: '#ffffff',
                },
            },
            grid: {
                line: {
                    style: {
                        stroke: '#ffffff',
                        lineWidth: 0,
                        cursor: 'pointer',
                    },
                },
            },
        },
        xAxis: {
            label: {
                style: {
                    fill: '#68769F',
                },
            },
            tickLine: {
                style: {
                    stroke: '#ffffff', // Set the tick line color to white
                },
            },
            line: {
                style: {
                    stroke: '#ffffff', // Set the axis line color to white
                },
            },
        },
        tooltip: {
            customContent: (title, items) => {
                return (
                    <div className='flex flex-col pl-2.5 pr-7 py-2 bg-dark-gray z-10 mx-0 rounded-[10px]'>

                        <span className='bg-dark-gray h-5 w-5 rotate-45 absolute top-4 left-2 z-[-1]'></span>
                        {items?.map((item, index) => {
                            const { name, value } = item;
                            return (
                                <>
                                    <span key={index} className='relative'>
                                        <span
                                            key={index}
                                            className=" flex items-center justify-between gap-2"
                                            data-index={index}
                                        >
                                            <span className='flex items-center gap-1'>
                                                <span className={`h-1.5 w-1.5 rounded-full  ${name === 'Worker' ? 'bg-[#B0A4FF]' : 'bg-primary'}`}></span>
                                                <span className='text-xs font-medium text-white/70'>{name} user</span>
                                            </span>
                                            <span className='text-white font-bold text-sm'>{value}</span>
                                        </span>
                                       
                                    </span>
                                </>
                            );
                        })}
                         <span className='text-xs font-medium text-white/70 mt-1'>{title} </span>

                    </div>
                );
            },
        },

    };
    return (
        <div className='h-[300px]'>
            <Column {...config} />
        </div>
    );
};

export default TotalUserChart;