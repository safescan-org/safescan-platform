import { Icon } from "@iconify/react";
import { Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../Shared/CustomButton";
import AddGaForm from "./AddGaForm";
import EditGaForm from "./EditGaForm";
import { formattedDate } from "../../../../helper/jwt";
import DeleteModal from "../../../Shared/modal/DeleteModal";
import { useDeleteGa1Mutation } from "../../../../redux/features/admin/adminApi";
import SuccessToast from "../../../Shared/Toast/SuccessToast";
import ErrorToast from "../../../Shared/Toast/ErrorToast";
import toast from "react-hot-toast";

const GaForm = ({ row, refetch }) => {
  const [modalOPen, setModalOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [singalData, setSingalData] = useState(null);
  const [index, setIndex] = useState();

  const [deleteGa1, { isLoading, isSuccess, error }] = useDeleteGa1Mutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Ga1 form delete success";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setDeleteModal(false);
    }
    if (error) {
      toast.custom(
        <ErrorToast message={error?.data.error || error?.data.message} />
      );
    }
  }, [isSuccess, error]);

  const onDelete = async () => {
    const body = {
      index: index,
    };
    const id = row?.productid;
    await deleteGa1({ id, body });
  };

  return (
    <>
      <Tooltip placement="topLeft" title="View GA1 Form">
        <button
          onClick={() => setModalOpen(true)}
          className={`text-[14px] font-normal text-info flex items-center gap-1 cursor-pointer`}
        >
          <Icon icon="lucide:image" className=" text-[20px]" />
          {row?.ga1_form ? row?.ga1_form?.length : 0}
        </button>
      </Tooltip>
      <Modal
        centered
        cancelText
        cancelButtonProps
        footer={null}
        open={modalOPen}
        closeIcon={null}
        styles={{ borderRadius: 30 }}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={905}
        className={` bg-red-500 pt-3 rounded-[30px]`}
      >
        <div className="p-7">
          <div className=" flex items-center justify-between">
            <h2 className=" text-[28px] font-[700] text-dark-gray">GA1 Form</h2>
            <button
              onClick={() => setModalOpen(false)}
              className=" w-[40px] text-[30px] h-[40px] rounded-lg flex items-center justify-center hover:bg-[#FDEEEE] hover:text-[#FF5959] text-[#969BB3]"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className=" flex items-center mt-3 mb-5 justify-between">
            <h2 className=" text-[24px] font-[500] text-[#47548C]">
              Add New GA1 Form
            </h2>
            <CustomButton
              onClick={() => setAddModal(true)}
              className={" w-[200px]"}
            >
              {"Add New Form"}
            </CustomButton>
          </div>

          <div className=" mt-3 flex flex-col gap-5 max-h-[70vh] overflow-y-scroll">
            {row?.ga1_form?.length === 0 ? (
              <div className=" flex items-center border border-gray-300 p-5 rounded-xl shadow-sm justify-center h-[450px] w-full">
                  <h2 className=" text-[25px] font-bold text-dark-gray">Please add GA1 Form</h2>
              </div>
            ) : (
              <>
                {row?.ga1_form?.map((card, index) => (
                  <div
                    key={index}
                    className=" border border-gray-300 p-5 rounded-xl shadow-sm"
                  >
                    <div className="w-full h-[450px] bg-gray-400 rounded-xl overflow-hidden">
                      <img
                        src={`https://scansafes3.s3.amazonaws.com/${card?.image}`}
                        alt=""
                        className=" w-full h-full object-contain "
                      />
                    </div>
                    <div className=" mt-[16px] flex items-center justify-between">
                      <p className="text-[20px] font-bold text-dark-gray">
                        {"Expire Date"}: 
                        <span className="text-lg ml-1 font-medium">
                          {formattedDate(card?.expiry_date)}
                        </span>
                      </p>
                      <div className=" flex items-center gap-5">
                        <button
                          onClick={() => {
                            setEditModal(true);
                            setIndex(index);
                            setSingalData(card);
                          }}
                          className=" h-[38px] flex items-center justify-center hover:bg-primary/80 text-white duration-300 gap-2 px-5 text-[14px] font-medium rounded-[4px] bg-primary "
                        >
                          <Icon
                            icon="lucide:folder-edit"
                            className="text-[16px]"
                          />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setIndex(index);
                            setDeleteModal(true);
                          }}
                          className=" h-[38px] w-[38px] flex items-center justify-center hover:bg-[#FF2F2F] hover:text-white duration-300 gap-2 text-[14px] font-medium rounded-[4px] bg-[#FF2F2F]/10 text-[#FF2F2F]"
                        >
                          <Icon icon="lucide:trash-2" className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* =======Add gaForm Modal====== */}
      <AddGaForm
        row={row}
        addModal={addModal}
        setAddModal={setAddModal}
        refetch={refetch}
      />
      {/* =======Edit gaForm Modal====== */}
      <EditGaForm
        row={row}
        singalData={singalData}
        refetch={refetch}
        index={index}
        addModal={editModal}
        setAddModal={setEditModal}
      />

      <DeleteModal
        modalOPen={deleteModal}
        onDelete={() => onDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Ga1 Form!"}
        title2={
          "Are you sure you want to delete this Ga1 Form? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </>
  );
};

export default GaForm;
