// PaymentMethodCard Component
export default function PaymentMethodCard({
  id,
  card = {},
  billing_details,
  defaultMethodText = "Set As Default",
  isDefault = false,
  customerId,
  onDelete,
  ...props
}) {
  const cardDescription = `${card?.brand} Ending in ${card?.last4}`;
  const cardExpiry = `Expiry ${card?.exp_month < 10 ? "0" : ""}${
    card?.exp_month
  }/${card?.exp_year}`;

  function paymentMethodDelete() {}
  async function paymentMethodSetDefault() {}
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-start gap-[0.75rem] p-[1.00rem] border-2 border-solid  flex-1 rounded-lg`}
      style={{ borderColor: isDefault ? "#70B896" : "" }}
    >
      {/* Card brand icon */}
      <div className="flex rounded-md border border-solid border-gray-100_01 bg-[#ffffff] px-[0.38rem] py-[0.63rem]">
        <img
          src={`${card.brand}.svg`}
          alt={`${card.brand} icon`}
          width={20}
          height={20}
          className="h-[1.5rem] w-[1.5rem]"
        />
      </div>

      {/* Card information container */}
      <div className="flex flex-1 flex-col gap-[0.50rem] self-center">
        <div className="flex flex-col items-start">
          <h2 className="font-inter text-[0.88rem] font-medium text-[#2f4d3f] capitalize">
            {cardDescription}
          </h2>
          <h3 className="font-inter text-[0.88rem] font-normal text-primary">
            {cardExpiry}
          </h3>
        </div>

        <div>
          <div className="flex">
            <h2
              className="font-inter text-[0.88rem] font-medium text-primary"
              onClick={() => {
                if (!isDefault) {
                  paymentMethodSetDefault();
                }
              }}
            >
              {isDefault ? "Default Method" : defaultMethodText}
            </h2>
            {isDefault ? null : (
              <h2
                className="font-inter text-[0.88rem] pl-3 font-medium !text-red-600 cursor-pointer capitalize"
                onClick={() => paymentMethodDelete()}
              >
                delete
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
