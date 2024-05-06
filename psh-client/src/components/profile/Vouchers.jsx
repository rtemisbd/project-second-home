import React from "react";
import { Card, Typography } from "@material-tailwind/react";

import UseFetch from "../../hooks/useFetch";
import "./Voucher.css";
import { Link } from "react-router-dom";
// import MenuList from "./MenuList";
const Vouchers = () => {
  const { data } = UseFetch(`promo`);

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="mb-5 text-[32px] py-2 font-bold">Your Vouchers</h2>
      {data?.length > 0 ? (
        <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll mt-4">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 ">
                  <Typography className="font-normal leading-none opacity-70">
                    Voucher Title
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Code
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Minimum Booking
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    start
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    End
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Discount
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography className="font-normal leading-none opacity-70">
                    Details
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((promo) => {
                return (
                  <tr className="border " key={promo._id}>
                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {promo?.promoName}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-bold ">
                        {promo?.promoCode}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        {promo?.minimumDays} Days
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        {promo?.promoStart}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        {promo?.promoEnd}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        {promo?.promoDiscount === 100
                          ? ""
                          : `${promo?.promoDiscount}%`}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Link
                        to={`/promo/${promo?._id}`}
                        className="hover:text-[#27b3b1]"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <p>Not Found For You Voucher</p>
      )}
    </div>
    //  <div>
    //     <h1 className="title"> Your Voucher</h1>
    //     <div className="mt-5 flex justify-between box" style={{ width: "70%" }}>
    //       <div className="flex gap-x-5">
    //         <img src="./public/images/Frame 4069.png" alt="" />
    //         <div>
    //           <Typography className="voucher">Voucher Title or Name</Typography>
    //           <Typography className="code">Voucher Code: PSH5off</Typography>

    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal mt-2"
    //           >
    //             Expire Date: 09-12-2024
    //           </Typography>
    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal text_c_color mt-3"
    //           ></Typography>
    //         </div>
    //       </div>
    //       <div className="mt-7">
    //         <img src="./public/images/copy-02.png" alt="" />
    //       </div>
    //       <div className="mt-5">
    //         <button className="btn">Available</button>
    //         <div>
    //           <Typography className="details mt-2" component="div">
    //             Voucher Details
    //           </Typography>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="mt-5 flex justify-between box" style={{ width: "70%" }}>
    //       <div className="flex gap-x-5">
    //         <img src="./public/images/Frame 4069.png" alt="" />
    //         <div>
    //           <Typography className="voucher">Voucher Title or Name</Typography>
    //           <Typography className="code">Voucher Code: PSH5off</Typography>

    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal mt-2"
    //           >
    //             Expire Date: 09-12-2024
    //           </Typography>
    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal text_c_color mt-3"
    //           ></Typography>
    //         </div>
    //       </div>
    //       <div className="mt-7">
    //         <img src="./public/images/copy-02.png" alt="" />
    //       </div>
    //       <div className="mt-5">
    //         <button className="btn" style={{ background: "#00A1FF" }}>
    //           Used
    //         </button>
    //         <div>
    //           <Typography className="details mt-2" component="div">
    //             Voucher Details
    //           </Typography>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="mt-5 flex justify-between box" style={{ width: "70%" }}>
    //       <div className="flex gap-x-5">
    //         <img src="./public/images/Frame 4069.png" alt="" />
    //         <div>
    //           <Typography className="voucher">Voucher Title or Name</Typography>
    //           <Typography className="code">Voucher Code: PSH5off</Typography>

    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal mt-2"
    //           >
    //             Expire Date: 09-12-2024
    //           </Typography>
    //           <Typography
    //             variant="span"
    //             color="gray"
    //             className="font-normal text_c_color mt-3"
    //           ></Typography>
    //         </div>
    //       </div>
    //       <div className="mt-7">
    //         <img src="./public/images/copy-02.png" alt="" />
    //       </div>
    //       <div className="mt-5">
    //         <button className="btn" style={{ background: "#E04848" }}>
    //           Expired
    //         </button>
    //         <div>
    //           <Typography className="details mt-2" component="div">
    //             Voucher Details
    //           </Typography>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default Vouchers;
