import React from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

export function TicketDetails({ handleDetailsShow, detailsShow, seeTicket }) {
  const formattedDate = new Date(seeTicket?.createdAt)?.toLocaleString();

  return (
    <>
      <Dialog
        open={detailsShow}
        handler={handleDetailsShow}
        size="md"
        className="px-5"
      >
        <DialogHeader>
          {" "}
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "inter" }}>
            Ticket Details
          </h2>
        </DialogHeader>
        <DialogBody
          divider
          className=" xl:h-[35rem] lg:h-[30rem] md:h-[30rem] sm:h-[30rem] xs:h-[30rem] overflow-scroll lg:overflow-hidden xl:overflow-hidden"
        >
          <h3 className="text-[24px] text-[#00BBB4] font-bold">
            Ticket ID {seeTicket?._id.slice(15)}
          </h3>
          <h5 className="text-xl  font-bold">{formattedDate}</h5>
          <div className="text-xl mt-5">
            <div>
              <span>
                Issu For - <span className="font-bold">My Room</span>
              </span>
            </div>
            <div>
              <span>
                Issu Category -{" "}
                <span className="font-bold">Air Condition Problem</span>
              </span>
            </div>
            <div>
              <span>
                Sub Category - <span className="font-bold">Ac not Working</span>
              </span>
            </div>
            <div>
              <span>
                Branch Name -{" "}
                <span className="font-bold">{seeTicket?.branch?.name}</span>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-[24px] font-bold">{seeTicket?.name}</h2>
            <p>{seeTicket?.desc}</p>
          </div>
          <div className="flex items-center mt-20">
            <h2 className="text-[24px] font-bold ">Problem Status</h2>
            <div className="pl-5 mt-2">
              <span
                style={{
                  color: seeTicket?.status === "pending" ? "red" : "green",
                }}
              >
                ({seeTicket?.status})
              </span>
            </div>
          </div>
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
