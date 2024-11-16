import React from 'react';

const SectionWrapper = ({children}) => {
    return (
        <div className={`rounded-[20px] bg-white overflow-hidden`}>
            {children}
        </div>
    );
};

export default SectionWrapper;