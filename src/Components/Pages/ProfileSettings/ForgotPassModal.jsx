import React from 'react';
import CustomInput from '../../Shared/input/CustomInput';

const ForgotPassModal = () => {
    return (
        <div>
            <div>
                <CustomInput
                    label={"Email Address"}
                    type={'email'}
                    register={'email'}
                    error={'Email is required'}
                    placeholder={'Enter Email Address'}
                />
            </div>
        </div>
    );
};

export default ForgotPassModal;