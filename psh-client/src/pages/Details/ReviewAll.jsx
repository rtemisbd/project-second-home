import React, { useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Card,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";

import profileIcon from "../../assets/img/profile.png";

export function ReviewAll({ handleDetailsShow, detailsShow, activeReviews }) {
  return (
    <>
      <Dialog open={detailsShow} size="md" className="px-5">
        <DialogHeader>
          {" "}
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "inter" }}>
            All {activeReviews?.length} Reviews
          </h2>
        </DialogHeader>
        <DialogBody
          divider
          className=" lg:h-[33rem] xl:h-[50rem] md:h-[30rem] sm:h-[30rem] xs:h-[30rem] overflow-y-scroll overflow-x-hidden"
        >
          {/* {activeReviews?.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-x-3 mt-4">
                <p>
                  <img src={profileIcon} alt="" />
                </p>
                <p>{item?.userName}</p>
                <p className="bg-[#FFB800] text-white px-2 rounded">5.0</p>
                <p>
                  {item?.createdAt
                    ? format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss")
                    : ""}
                </p>
              </div>
              <p className="mt-2 pl-12">{item?.comment}</p>
            </div>
          ))} */}
          <>
            <h2 className="mb-5 text-[32px] py-2 font-bold">Whishlist</h2>
            <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll mt-4">
              <table className="w-full min-w-max table-auto text-left border">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                      <Typography className="font-normal leading-none opacity-70">
                        Picture
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography className="font-normal leading-none opacity-70">
                        Name
                      </Typography>
                    </th>

                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography className="font-normal leading-none opacity-70">
                        Review Star
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography className="font-normal leading-none opacity-70">
                        Comment
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography className="font-normal leading-none opacity-70">
                        Created At
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeReviews?.map((item) => {
                    const formattedDate = new Date(
                      item?.createdAt
                    ).toLocaleString();

                    return (
                      <tr className="even:bg-blue-gray-50/50" key={item._id}>
                        <td className="p-4">
                          <img
                            src={profileIcon}
                            alt=""
                            style={{ width: 120 }}
                          />
                        </td>
                        <td className="p-4">
                          <Typography className="font-normal">
                            {item?.userName}
                          </Typography>
                        </td>

                        <td className="p-4">
                          <Typography className="font-normal ">5</Typography>
                        </td>

                        <td className="p-4">
                          <Typography className="font-normal ">
                            {item?.comment}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography className="font-normal ">
                            {item?.createdAt
                              ? format(
                                  new Date(item.createdAt),
                                  "yyyy-MM-dd HH:mm:ss"
                                )
                              : ""}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </>
        </DialogBody>
        <div
          onClick={() => handleDetailsShow(null)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span>
            <AiOutlineClose style={{ width: "30px", height: "30px" }} />
          </span>
        </div>
      </Dialog>
    </>
  );
}
