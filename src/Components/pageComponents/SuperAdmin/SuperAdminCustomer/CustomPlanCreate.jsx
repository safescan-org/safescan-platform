import { Icon } from "@iconify/react";
import { Modal, Tabs, Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../Shared/input/CustomInput";
import CustomButton from "../../../Shared/CustomButton";
import {
  useCreateCustomePlanMutation,
  useUpdateUserPlanMutation,
  useDeleteUserPlanMutation,
} from "../../../../redux/features/superAdmin/superApi";
import { useGetStripeProductsQuery } from "../../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";

const CustomPlanCreate = ({ modalOPen, setModalOpen, userName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  let isUpdating;
  const [activeTab, setActiveTab] = useState("create");
  const [editPlanId, setEditPlanId] = useState(null);

  const [createCustomePlan, { isLoading: isCreating }] =
    useCreateCustomePlanMutation();
  // const [updatePlan, { isLoading: isUpdating }] = useUpdateUserPlanMutation();
  // const [deletePlan] = useDeleteUserPlanMutation();

  const {
    data: userPlans,
    isLoading: isLoadingPlans,
    refetch,
  } = useGetStripeProductsQuery(userName, {
    skip: !modalOPen,
  });

  useEffect(() => {
    if (modalOPen) {
      refetch?.();
    }
  }, [modalOPen, refetch]);

  const onSubmit = async (data) => {
    const planData = {
      ...data,
      maxAssets: Number(data?.maxAssets),
      maxUsers: Number(data?.maxUsers),
      customAmount: Number(data?.customAmount),
      username: userName,
    };

    try {
      if (editPlanId) {
        // await updatePlan({ planId: editPlanId, ...planData }).unwrap();
        toast.success("Plan updated successfully");
      } else {
        await createCustomePlan(planData).unwrap();
        toast.success("Plan created successfully");
      }

      reset();
      setEditPlanId(null);
      setActiveTab("list");
      refetch?.();
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (plan) => {
    console.log(plan);

    setEditPlanId(plan.id);
    setActiveTab("create");
    setValue("name", plan.name);
    setValue("description", plan.description);
    setValue("maxAssets", plan.maxAssets);
    setValue("maxUsers", plan.maxUsers);
    setValue("customAmount", plan.price);
  };

  const handleDelete = async (planId) => {
    // try {
    //   await deletePlan({ planId, username: userName }).unwrap();
    //   toast.success("Plan removed successfully");
    //   refetch?.();
    // } catch (err) {
    //   toast.error(err?.data?.message || "Failed to remove plan");
    // }
  };

  const planColumns = [
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Max Users",
      dataIndex: "maxUsers",
      key: "maxUsers",
    },
    {
      title: "Max Assets",
      dataIndex: "maxAssets",
      key: "maxAssets",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "customAmount",
      render: (text) => `$${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Remove
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal
      centered
      footer={null}
      open={modalOPen}
      closeIcon={null}
      onOk={() => setModalOpen(false)}
      onCancel={() => {
        setModalOpen(false);
        setEditPlanId(null);
        reset();
        setActiveTab("create");
      }}
      width={650}
    >
      <div className="z-[50000000] rounded-[20px] bg-white">
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h2 className="text-[24px] font-bold text-dark-gray">
            Manage Custom Plans
          </h2>
          <button
            onClick={() => {
              setModalOpen(false);
              setEditPlanId(null);
              reset();
              setActiveTab("create");
            }}
            className="text-[30px] h-[14px] hover:text-[#FF5959] text-[#68769F]"
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="px-6">
          <Tabs.TabPane
            tab={editPlanId ? "Update Plan" : "Create Plan"}
            key="create"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full mt-2 space-y-4 pb-6"
            >
              <CustomInput
                label={"Plan Name"}
                type={"text"}
                register={register("name", {
                  required: "Please enter plan name",
                })}
                error={errors.name}
                placeholder={"Enter Plan Name"}
              />
              <CustomInput
                label={"Description"}
                type={"text"}
                register={register("description")}
                error={errors.description}
                placeholder={"Enter Plan Description"}
              />
              <CustomInput
                label={"Max Assets"}
                type={"number"}
                register={register("maxAssets", {
                  required: "Please enter asset count",
                  valueAsNumber: true,
                })}
                error={errors.maxAssets}
                placeholder={"Enter Max. Assets Count"}
              />
              <CustomInput
                label={"Max Users"}
                type={"number"}
                register={register("maxUsers", {
                  required: "Please enter user count",
                  valueAsNumber: true,
                })}
                error={errors.maxUsers}
                placeholder={"Enter Max. Users Count"}
              />
              <CustomInput
                label={"Custom Amount"}
                type={"number"}
                register={register("customAmount", {
                  required: "Please enter amount",
                  valueAsNumber: true,
                })}
                error={errors.customAmount}
                placeholder={"Enter Amount (e.g., $500)"}
              />
              <CustomButton className={"w-full mt-3"}>
                {editPlanId
                  ? isUpdating
                    ? "Updating..."
                    : "Update Plan"
                  : isCreating
                  ? "Creating..."
                  : "Create Plan"}
              </CustomButton>
            </form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="User Plans" key="list">
            <div className="px-2 py-4">
              <Table
                loading={isLoadingPlans}
                columns={planColumns}
                dataSource={userPlans || []}
                rowKey="_id"
                pagination={false}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default CustomPlanCreate;
