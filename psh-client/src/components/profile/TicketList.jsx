import { Typography, Card } from "@material-tailwind/react";
import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/UserProvider";
import TicketCreate from "./TicketCreate";
import { TicketDetails } from "./TicketDetails";
import UseFetch from "../../hooks/useFetch";

export default function TicketList() {
  const { data } = UseFetch(`issue`);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const main = data?.filter((pd) => pd?.email === email);
  const [seeTicket, setSeeTicket] = useState(null);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [detailsShow, setDetailsShow] = useState(false);
  const handleDetailsShow = () => setDetailsShow(!detailsShow);

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Issu Details</h1>
        <div>
          <button
            onClick={handleOpen}
            className="text-sm bg-[#35B0A7] px-5 py-3 text-white rounded "
          >
            Create Ticket
          </button>
        </div>
        <TicketCreate handleOpen={handleOpen} open={open} />
      </div>
      <hr className="mt-5 bg-gray-600 border-0 rounded dark:bg-gray-700" />
      {main.length > 0 ? (
        <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll mt-4">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 ">
                  <Typography
                    className="font-normal leading-none opacity-70
                    "
                  >
                    Ticket ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Date & Time
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Branch
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Category
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Status
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Action
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {main.map((item) => {
                const formattedDate = new Date(item.createdAt).toLocaleString();

                return (
                  <tr className="even:bg-blue-gray-50/50 border">
                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {item._id.slice(19)}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {formattedDate}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography className="font-normal ">
                        {item?.branch?.name}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Typography as="span" href="#" className="font-medium">
                        {item.name}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography
                        as="span"
                        href="#"
                        className="font-medium capitalize "
                        style={{
                          color: item.status === "pending" ? "red" : "#00bbb4",
                        }}
                      >
                        {item.status}
                      </Typography>
                    </td>
                    <td
                      className="p-2 border"
                      onClick={() => setSeeTicket(item)}
                    >
                      <button onClick={handleDetailsShow}>View Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <p className="text-center text-xl text-red-500 mt-5">
          No Tricket Found
        </p>
      )}

      <TicketDetails
        handleDetailsShow={handleDetailsShow}
        detailsShow={detailsShow}
        seeTicket={seeTicket}
      />
    </div>
  );
}
