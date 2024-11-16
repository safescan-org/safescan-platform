import React from 'react';

const CustomButton = ({type="submit",style,children,className,onClick=()=>{}}) => {
    return (
        <button style={style} type={type} onClick={onClick} className={` px-3.5 h-10 bg-primary hover:bg-primary/70 duration-300 rounded-[4px]  font-medium text-sm text-white flex items-center justify-center ${className}`}>
            {children}
        </button>
    );
};

export default CustomButton;