import { Icon } from "@iconify/react";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../Shared/modal/DeleteModal";
import ProductsEdit from "./ProductsEdit";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../../../redux/features/admin/adminApi";
import SuccessToast from "../../Shared/Toast/SuccessToast";
import ErrorToast from "../../Shared/Toast/ErrorToast";

const ProductsTableAction = ({ refetch, row }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteProduct, { isSuccess, error,isLoading }] = useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = "Successfully Product Deleted";
      toast.custom(<SuccessToast message={message} />);
      refetch();
      setDeleteModal(false)
    }
    if (error) {
      const errorMgs = error?.data.error || error?.data.message
      toast.custom(<ErrorToast message={errorMgs} />)
    }
  }, [isSuccess, error]);

  const handelDelete = async () => {
    const id = `${row?.productid}`;
    await deleteProduct(id)

  }

  return (
    <>
      <div className=" flex items-center gap-1">
        <Tooltip placement="topLeft" title="Edit">
          <button onClick={() => setEdit(true)}>
            <Icon
              icon="mingcute:pencil-line"
              className="text-[22px] hover:text-[#0070F0] text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Delete">
          <button onClick={() => setDeleteModal(true)}>
            <Icon
              icon="gg:trash-empty"
              className="text-[22px] hover:text-red-500 text-[#8E9BBA]"
            />
          </button>
        </Tooltip>
      </div>

      {/* ============= Workers edit Modal============ */}
      <ProductsEdit item={row} modalOPen={edit} setModalOpen={setEdit} refetch={refetch} />

      {/* ============= Workers delete Modal============ */}
      <DeleteModal
        modalOPen={deleteModal}
        onDelete={() => handelDelete()}
        setModalOpen={setDeleteModal}
        title={"Delete Product!"}
        title2={
          "Are you sure you want to delete this product? This action cannot be undone."
        }
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductsTableAction;
