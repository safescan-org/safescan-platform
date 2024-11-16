import React from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Shared/modal/CustomModal";
import CustomInput from "../../Shared/input/CustomInput";


const CreatedWorkers = ({ item, setModalOpen, modalOPen }) => {

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        phoneNumber: item.phoneNumber,
    },
  });

  const onSubmit = (data) => {
    setModalOpen(false);
  };

  return (
    <CustomModal
      modalOPen={modalOPen}
      setModalOpen={setModalOpen}
      handleSubmit={handleSubmit(onSubmit)}
      width={590}
      title="Edit Created Workers"
      buttonText={"Save Changes"}
    >

        <CustomInput
          label={"phone Number"}
          type={"text"}
          register={register("phoneNumber", {
            required: {
              value: true,
              message: "Please enter last name",
            },
          })}
          error={errors.lastName}
          placeholder={"Enter Last Name"}
        />


    </CustomModal>
  );
};

export default CreatedWorkers;
