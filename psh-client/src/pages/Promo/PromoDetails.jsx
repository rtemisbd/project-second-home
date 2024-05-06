import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown, IoMdCopy } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import UseFetch from "../../hooks/useFetch";

const PromoDetails = () => {
  const { id } = useParams();
  const { data } = UseFetch(`promo/${id}`);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // State to track whether the link is copied
  const handleCopy = () => {
    navigator.clipboard.writeText(data?.promoCode); // Copy invite link to clipboard
    setIsCopied(true);
    toast.success("Promo Code Successfully copied");
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const promoDetailsSplit = data?.promoDetails?.split(/(\D)(?=\d)/);
  return (
    <div className="custom-container">
      <div className="flex items-center gap-x-3 md:mt-8 sm:mt-5 mb-5">
        <Link to="/" className="hover:text-[#00bbb4] md:block sm:hidden">
          <p>Home</p>
        </Link>
        <p className="sm:hidden md:block">
          <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
        </p>
        <Link to="/promo" className="md:hidden sm:block">
          <p>
            <MdKeyboardArrowLeft className="w-[20px] h-[20px]" />
          </p>
        </Link>
        <Link to="/promo" className="hover:text-[#00bbb4] md:block sm:hidden">
          <p>Promo</p>
        </Link>
        <p className="sm:hidden md:block">
          <MdKeyboardArrowRight className="w-[20px] h-[20px]" />
        </p>

        <p>{data?.promoName}</p>
      </div>
      <div className="md:mx-0 sm:mx-2">
        {data?.photos?.length > 0 ? (
          <img
            className="w-full md:h-[400px] sm:h-[200px]"
            src={data?.photos[0]}
            alt=""
          />
        ) : (
          <p className="text-center ">Loading...</p>
        )}

        <div className=" mb-10">
          <div className="">
            <h2 className="text-2xl font-bold mt-5">{data?.promoName}</h2>
            <div className="flex justify-between">
              <Card className="mt-3 w-full">
                <CardBody className="md:flex justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-x-2">
                      <p className="font-bold text-xl">
                        {" "}
                        Promo Code : {data?.promoCode}
                      </p>
                      <div onClick={handleCopy}>
                        <IoMdCopy className="w-[20px] h-[20px]" />
                      </div>
                    </div>
                    {data?.promoDiscount === 100 ? (
                      <li>Discount Type: {data?.discountAmount} Taka Offer</li>
                    ) : (
                      <li>Discount: {data?.promoDiscount} %off</li>
                    )}

                    <li> Minimum Booking: {data?.minimumDays} Days</li>
                    <li> Expiration Date: {data?.promoEnd}</li>
                  </div>
                </CardBody>
                {data?.promoDetails ? (
                  <>
                    <p className="ps-5 mb-2 text-xl font-bold">
                      Offer Details :
                    </p>
                    {promoDetailsSplit?.filter(Boolean).map((line, index) => (
                      <p key={index} className="ps-5">
                        {line}
                      </p>
                    ))}
                  </>
                ) : (
                  ""
                )}
                <div className=" md:mb-10 sm:mb-10 mt-2">
                  <div className=" text-blue-gray p-5">
                    <Typography variant="h5" className="mb-2 font-bold">
                      How to Use Vouchers:
                    </Typography>
                    <p>1. Select a voucher from the list above.</p>
                    <p>
                      2. During the booking process, enter the voucher code.
                    </p>
                    <p>3.The discount will be applied to your total. </p>
                    <Typography variant="h5" className="mb-2 mt-5 font-bold">
                      Terms and Conditions:
                    </Typography>
                    <li>
                      {" "}
                      Vouchers are valid until the expiration date mentioned.
                    </li>
                    <li> Minimum booking requirements must be met for each</li>
                    <li> Voucher. Each voucher can be used only once.</li>
                  </div>
                </div>
                {/* ... (your existing JSX) */}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDetails;
