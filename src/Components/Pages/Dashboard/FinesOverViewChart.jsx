import { Area } from '@ant-design/plots';
import React from 'react';

const FinesOverViewChart = ({ chartData }) => {
    const config = {
        data: chartData,
        xField: 'day',
        yField: 'value',
        smooth: true,
        legend: false,
        color: '#664DFF',
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'l(90) 1:#D9D9D9 0:#EBEBEB',
                        lineWidth: 1,
                        lineDash: [4, 5],
                        strokeOpacity: 1,
                        cursor: 'pointer',
                    },
                },
            },
        },
        yAxis: {
            grid: {
                line: {
                    style: {
                        stroke: '#252F67',
                        lineWidth: 0,
                        cursor: 'pointer',
                    },
                },
            },
        },
        areaStyle: () => ({
            // fill: 'l(270) 1:#D3D5E1 0.2:#fff',
            fill: 'l(270) 0:#ffffff 0.5:#D3D5E1 1:#664DFF',
        }),
        tooltip: {
            customContent: (title, items) => {
                return (
                    <div>
                        {items?.map((item, index) => {
                            const { title, value } = item;
                            return (
                                <span className='relative'>
                                    <span className='bg-dark-gray h-5 w-5 rotate-45 absolute top-4 -left-1 z-[-1]'></span>
                                    <span
                                        key={index}
                                        className="flex flex-col pl-2.5 pr-7 py-2 bg-dark-gray rounded-[10px] z-10 mx-0"
                                        data-index={index}
                                    >
                                        <span className='text-white w-full text-[20px] font-bold'>{value}</span>
                                        <span className="text-white/60 mt-2 font-medium text-[11px]">{title}</span>
                                    </span>
                                </span>
                            );
                        })}

                    </div>
                );
            },
        },
        theme: 'custom-theme'
    };
    return (
        <div className='h-[292px]'>
            <Area {...config} />
        </div>
    );
};

export default FinesOverViewChart;