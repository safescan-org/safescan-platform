import React from 'react';

const SectionHeading = ({children}) => {
    return (
        <div>
            <h2 className='text-2xl font-bold text-dark-gray'>{children}</h2>
        </div>
    );
};

export default SectionHeading;