import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import UseFetch from "../../hooks/useFetch";
import SinglePromo from "./SinglePromo";
import { PropagateLoader } from "react-spinners";

const PromoList = () => {
  const { data } = UseFetch(`promo`);
  return (
    <div className="custom-container mb-36 md:mx-0 sm:mx-5">
      <div className="flex items-center gap-x-3 md:mt-8 sm:mt-5">
        <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
          <p>Home</p>
        </Link>
        <p className="sm:hidden md:block">
          <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
        </p>
        <Link to="/" className="md:hidden sm:block">
          <p>
            <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
          </p>
        </Link>
        <p>Promo</p>
      </div>
      <h4 className=" md:my-5 sm:my-2 font-bold text-xl">Ongoing promotion</h4>
      {data?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-x-4">
          {data
            ?.slice()
            ?.reverse()
            .map((promo) => (
              <div className="sm:mt-4 md:mt-0">
                <SinglePromo promo={promo} />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center py-56">
          {" "}
          <PropagateLoader
            size={13}
            speedMultiplier={0.8}
            color="#36d7b7"
          />{" "}
        </p>
      )}

      {/* <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Exclusive Voucher Offers{" "}
            </h2>
            {data.map((item) => (
              <div className="flex justify-between" key={item._id}>
                <Card className="mt-6 w-full">
                  <CardBody className="md:flex justify-between">
                    <div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        Available Vouchers:
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        {item.promoName}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        Voucher Code: {item.promoCode}
                      </Typography>
                      <li>Discount: {item.promoDiscount} %off</li>
                      <li> Minimum Booking: {item.minimumDays} Days</li>
                      <li> Expiration Date: {item.promoEnd}</li>
                    </div>
                    <Button
                      style={{ background: "#00bbb4", width: 220, height: 60 }}
                    >
                      Reddem Now
                    </Button>
                  </CardBody>
                  <div className="mt-6">
                    <div
                      className="flex items-center cursor-pointer justify-center"
                      onClick={() => handleToggleExpand(item._id)}
                      style={{
                        background: "#00bbb4",
                        height: 40,
                        color: "white",
                      }}
                    >
                      <span className="me-2 ">
                        {expandedItems[item._id]
                          ? "Hide Details"
                          : "Show Details"}
                      </span>
                      <Icon id={item._id} open={expandedItems[item._id]} />
                    </div>
                    {expandedItems[item._id] && (
                      <div className="mt-4 text-blue-gray p-5">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          How to Use Vouchers:
                        </Typography>
                        <p>1. Select a voucher from the list above.</p>
                        <p>
                          2. During the booking process, enter the voucher code.
                        </p>
                        <p>3.The discount will be applied to your total. </p>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2 mt-5"
                        >
                          Terms and Conditions:
                        </Typography>
                        <li>
                          {" "}
                          Vouchers are valid until the expiration date
                          mentioned.
                        </li>
                        <li>
                          {" "}
                          Minimum booking requirements must be met for each
                        </li>
                        <li> Voucher. Each voucher can be used only once.</li>
                      </div>
                    )}
                  </div>
   
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PromoList;
