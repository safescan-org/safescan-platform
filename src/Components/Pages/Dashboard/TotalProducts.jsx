import React, { useEffect, useState } from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import TimePickerButton from '../../Shared/TimePickerButton';
import TotalProductsChart from './TotalProductsChart';
import { formattedDate } from '../../../helper/jwt';

const TotalProducts = ({ products }) => {
    const [selected, setSelected] = useState('Weekly');
    const [getSlice, setGetSlice] = useState(7);
    const allProducts = products?.Items

    useEffect(() => {
        if (selected === 'Daily') {
            setGetSlice(1)
        }
        if (selected === 'Weekly') {
            setGetSlice(7)
        }
        if (selected === 'Monthly') {
            setGetSlice(31)
        }
    }, [selected])

    const countSameDateOccurrences = (products) => {
        const dateCounts = {};
        products?.forEach(product => {
            const date = formattedDate(product.created_at);
            if (dateCounts[date]) {
                dateCounts[date]++;
            } else {
                dateCounts[date] = 1;
            }
        });

        return dateCounts;
    }

    const convertToObjectArray = (dateCounts) => {
        return Object.keys(dateCounts)?.map(date => ({
            day: date,
            value: dateCounts[date]
        }));
    }

    const dateOccurrences = countSameDateOccurrences(allProducts);
    const arrayOfObjects = convertToObjectArray(dateOccurrences);

    const dataDay = ["Daily","Weekly", "Monthly"];

    const data = arrayOfObjects?.slice(0, getSlice)

    return (
        <div>
            <SectionWrapper>
                <div className='py-7 px-[25px]'>
                    <div className='mb-10 flex items-center gap-5 justify-between flex-wrap'>
                        <div >
                            <p className={`text-sm text-info`}>Total Assets</p>
                            <h1 className={`text-[28px] font-bold text-dark-gray`}>{allProducts?.length}</h1>
                        </div>
                        <TimePickerButton
                            className="font-bold"
                            selected={selected}
                            setSelected={setSelected}
                            data={dataDay}
                        />
                    </div>
                    <div >
                        <TotalProductsChart data={data} />
                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
};

export default TotalProducts;