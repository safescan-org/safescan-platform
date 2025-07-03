import React, { Suspense, useEffect, useState } from "react";
// import SectionWrapper from "../../Components/Shared/SectionWrapper";
import { Icon } from "@iconify/react";
import CustomButton from "../../Components/Shared/CustomButton";
import BreadCrumb from "../../Components/Shared/BreadCrumb";
import { useSelector } from "react-redux";
import {
  useGetPaymentMethodsMutation,
  useGetProfileQuery,
  useGetStripeProductsQuery,
} from "../../redux/features/admin/adminApi";
import Loader from "../../Components/Shared/Loader";
import { Alert, Empty, Typography } from "antd";
import AddPaymentMethod from "../../Components/Shared/modal/addPaymentMethod";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMethodCard from "../../Components/pageComponents/PaymentMethodCard/PaymentMethodCard";
import { useCreateStripeCustomerMutation } from "../../redux/features/superAdmin/superApi";
import toast from "react-hot-toast";
const stripePromise = loadStripe(
  "pk_test_51KDq0OAnr9h8Jix3A1gYu2auROK3UlD6CDgIVkiGloDSJLVMr1lrfKgObXzfxpbYAL6QDEUfCAyIX7kUxLpTfHkK009xzfvhAQ"
);
const Subscriptions = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOPen, setModalOpen] = useState(false);
  const queryitem = `${user?.userid}?username=${user?.username}`;
  const [stripeCusID, setStripeCusID] = useState(null);
  const { data, isLoading } = useGetProfileQuery(queryitem);
  const { data: data1, isLoading: isLoading1 } = useGetStripeProductsQuery(
    user?.username
  );
  const [
    createStripeCustomer,
    { isSuccess: isCusCreated, isLoading: isCusCreating, error: error2 },
  ] = useCreateStripeCustomerMutation();
  const [getPaymentMethods, { data: data2, isLoading: isLoading2 }] =
    useGetPaymentMethodsMutation();
  async function getStripeCustomer() {
    const stripeCusPayload = {
      username: user?.username,
    };
    const res = await createStripeCustomer(stripeCusPayload);
    setStripeCusID(res?.data?.id);
  }
  useEffect(() => {
    getStripeCustomer();
  }, [user?.username]);
  useEffect(() => {
    getPaymentMethods({ customerId: stripeCusID });
  }, [stripeCusID]);
  const currencyMapping = {
    usd: "$",
  };
  function hnadleAddPaymentMethod() {
    console.log("asd");
    setModalOpen(true);
  }
  return (
    <>
      <BreadCrumb
        title={"Subscription"}
        links={[
          { title: "Home", url: "/admin/dashboard" },
          { title: "Subscription", url: "/admin/subscription" },
        ]}
      />
      {isLoading || isLoading2 || isCusCreating ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex gap-8 w-full">
          <div className="w-[70%] grid lg2:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "basic" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px] ">
                <div>
                  {data?.plan === "basic" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="humbleicons:box" />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="humbleicons:box" />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                          Basic
                        </p>
                      </div>
                    </>
                  )}

                  {data?.plan === "basic" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                          Basic Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €100
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €100
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "basic" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>100 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>500 Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>100 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>500 Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "basic" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date:{" "}
                        {data?.expiry_date ? data?.expiry_date : "no date"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* --------premium plan */}
            {/* <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "premium" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px] ">
                <div>
                  {data?.plan === "premium" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon
                            className="text-2xl"
                            icon="lucide:codesandbox"
                          />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon
                            className="text-2xl"
                            icon="lucide:codesandbox"
                          />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                          Premium
                        </p>
                      </div>
                    </>
                  )}

                  {data.plan === "premium" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                          Premium Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €159
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €159
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "premium" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>250 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>1000 Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>250 Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>1000 Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "premium" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date:{" "}
                        {data?.expiry_date ? data?.expiry_date : "no date"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div> */}
            {/* --------platinum plan */}
            {data1?.map((item) => {
              return (
                <div className={`rounded-[20px]  overflow-hidden bg-white`}>
                  <div className=" w-full p-[25px]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="lucide:gem" />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px] capitalize">
                          {item?.name}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            {currencyMapping[item?.currency]}
                            {item?.price}
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1 capitalize">
                            /Per {item?.recurringInterval}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        {item?.methadata?.maxAssets && (
                          <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                            <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                            <span>{item?.methadata?.maxAssets} Assets</span>
                          </span>
                        )}
                        {item?.methadata?.maxUsers && (
                          <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                            <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                            <span>{item?.methadata?.maxUsers} Users</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {data?.plan === "platinum" ? (
                      <>
                        <div className="flex items-center gap-3 text-white/80 mt-20">
                          <img src="/images/calender.svg" alt="" />
                          <p className="text-base font-bold ">
                            Expire Date:{" "}
                            {data?.expiry_date ? data?.expiry_date : "no date"}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-white/80 mt-20 w-full">
                          <CustomButton className={"w-full"}>
                            <p>Upgrade Now</p>
                          </CustomButton>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {/* <div
              className={`rounded-[20px]  overflow-hidden ${
                data?.plan === "platinum" ? "bg-primary " : "bg-white"
              }`}
            >
              <div className=" w-full p-[25px]">
                <div>
                  {data?.plan === "platinum" ? (
                    <>
                      <div className="flex text-white items-center justify-between mb-2.5">
                        <div className="bg-black/20 h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="lucide:gem" />
                        </div>
                        <div className="bg-black/20 text-xs font-medium py-1.5 px-3 rounded-full">
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="bg-primary text-white h-[44px] w-[44px] rounded-[10px] flex items-center justify-center">
                          <Icon className="text-2xl" icon="lucide:gem" />
                        </div>
                        <p className="font-bold text-dark-gray text-[20px]">
                          Platinum
                        </p>
                      </div>
                    </>
                  )}

                  {data.plan === "platinum" ? (
                    <>
                      <div>
                        <h1 className="text-[20px] text-white font-bold">
                          Platinum Plan
                        </h1>
                        <div className="flex items-center">
                          <h1 className="text-[20px] text-white font-bold">
                            €259
                          </h1>
                          <span className="font-medium text-xs text-white/60 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-[28px] font-bold text-dark-gray">
                            €259
                          </h1>
                          <span className="font-medium text-xs text-info/80 mt-1">
                            /Per Month
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {data?.plan === "platinum" ? (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>Unlimited Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-white/60 mb-1">
                          <span className="bg-white w-1 h-1 rounded-full"></span>
                          <span>Unlimited Products</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>Unlimited Profiles</span>
                        </span>
                        <span className="flex items-center gap-2.5 text-sm text-info/80 mb-1">
                          <span className="bg-dark-gray w-1 h-1 rounded-full"></span>
                          <span>Unlimited Products</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {data?.plan === "platinum" ? (
                  <>
                    <div className="flex items-center gap-3 text-white/80 mt-20">
                      <img src="/images/calender.svg" alt="" />
                      <p className="text-base font-bold ">
                        Expire Date:{" "}
                        {data?.expiry_date ? data?.expiry_date : "no date"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80 mt-20 w-full">
                      <CustomButton className={"w-full"}>
                        <p>Upgrade Now</p>
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div> */}
          </div>
          <div id="paymentMethods" className="w-[30%]">
            <h2 className="text-xl font-bold">Payment Methods</h2>
            {data2?.length == 0 && (
              <Empty
                styles={{ image: { height: 60 } }}
                className="mt-6"
                description={
                  <Typography.Text>No Payment Method Added Yet</Typography.Text>
                }
              >
                <CustomButton
                  className={"w-full"}
                  onClick={hnadleAddPaymentMethod}
                >
                  <p>Add New Card</p>
                </CustomButton>
              </Empty>
            )}

            <div className="flex flex-col gap-[0.75rem] px-2">
              <Suspense fallback={<div>Loading...</div>}>
                {data2?.length > 0 ? (
                  data2.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      id={method.id}
                      card={method.card}
                      billing_details={method.billing_details}
                      // isDefault={method.isDefault}
                      customerId={method.customer}
                      onDelete={() => {}}
                      className="bg-gray-100"
                    />
                  ))
                ) : (
                  <div>No payment methods found.</div>
                )}
              </Suspense>
              {data2?.length > 0 && (
                <CustomButton
                  className={"w-full"}
                  onClick={hnadleAddPaymentMethod}
                >
                  <p>Add New Card</p>
                </CustomButton>
              )}
            </div>
            <AddPaymentMethod modalOPen={modalOPen} setModalOpen={setModalOpen}>
              <Elements stripe={stripePromise}>
                <AddPaymentMethodUI
                  key={stripeCusID}
                  stripeCusId={stripeCusID}
                />
              </Elements>
            </AddPaymentMethod>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscriptions;

const AddPaymentMethodUI = ({ stripeCusId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const customerId = "cus_R3JjtlL7vYXFhe";
  // const { customerMail } = useAuth();
  // const { getCustomerId } = useUserService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      try {
        // console.log("i am customer mail", customerMail);
        // const customerData = await getCustomerId(customerMail);
        // stripeCustomerId = customerData.id;
        const response = await fetch(
          "https://xjdfp31iah.execute-api.us-east-1.amazonaws.com/api/v1/add-payment-method",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: stripeCusId,
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          toast.success("Payment method added successfully");
          window.location.reload();
        } else {
          setError("Failed to add payment method: " + result.message);
        }
      } catch (error) {
        setError("Error adding payment method: " + error.message);
      }
      setIsLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form className="space-y-4">
      <div className="space-y-4">
        <label
          htmlFor="card-number"
          className="block text-md font-medium text-gray-700 "
        >
          Card number
        </label>
        <div className="relative paymentcards ">
          <CardNumberElement
            id="card-number"
            options={cardStyle}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Icon
            name="lucide:credit-card"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {/* <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
        </div>
      </div>
      <div className="flex paymentcardsEx gap-2">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="card-expiry"
            className="block text-md font-medium text-gray-700"
          >
            Expiration date
          </label>
          <div className="relative">
            <CardExpiryElement
              id="card-expiry"
              options={cardStyle}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Icon
              name="lucide:calendar"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label
            htmlFor="card-cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="relative">
            <CardCvcElement
              id="card-cvc"
              options={cardStyle}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Icon
              name="lucide:lock"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {/* <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleSubmit}
        disabled={!stripe || isLoading}
        className="bg-primary w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 my-bg"
      >
        {isLoading ? "Processing..." : "Add Method"}
      </button>
    </form>
  );
};
