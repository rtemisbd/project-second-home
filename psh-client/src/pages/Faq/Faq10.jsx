import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { placeFaqMenu } from "../../redux/reducers/smProfileMenuSlice";
export default function Faq10() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const dispatch = useDispatch();

  return (
    <div className="md:ps-20 sm:ps-0 md:pr-32 sm:pr-0 accourding-part">
      <div className=" cursor-pointer flex items-center">
        <div
          className="md:hidden sm:block"
          onClick={() => dispatch(placeFaqMenu(true))}
        >
          <HiArrowNarrowLeft style={{ width: "24px", height: "24px" }} />
        </div>
        <h3 className="text-xl font-bold md:ms-0 sm:ms-4 md:mb-0  ">
          PSH Business
        </h3>
      </div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">What is PSH Business?</p>
            <div className="absolute right-0">
              {open === 1 ? (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="md:pr-40 sm:pr-0">
          PSH business is a business solution that we offer for your company and
          business needs. PSH business provides Corporate Housing solutions
          (employee accommodation solutions) and Rucollab (advertising
          solutions, product placement, event sponsorship, etc.).
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between ">
            <p className="text-sm">How do I get PSH business services?</p>
            <div className="absolute right-0">
              {open === 2 ? (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="md:pr-40 sm:pr0">
          To get PSH Bisnis services, you can fill in the form on the service
          page you want. Our team will contact you soon.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What services does PSH Corporate Housing offer?
            </p>
            <div className="absolute right-0">
              {open === 3 ? (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="md:pr-40 sm:pr0">
          Corporate housing is one of PSH Bisnis' services that offers
          accommodation solutions according to your company and business needs.
          Corporate Housing provides services:
          <br />
          1.Employee residence <br />
          2.Employee mess <br />
          3.Corporate housing <br />
          4.Business travel accommodation
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">What is PSH Collab?</p>
            <div className="absolute right-0">
              {open === 4 ? (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown
                    style={{
                      width: "24px",
                      height: "24px",
                      transition: "rotate 0.2s ease-in-out",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="md:pr-40 sm:pr0">
          PSH collab is one of PSH Bisnis' services to answer your company and
          business needs. Rucollab can help you to reach target consumers and
          increase exposure. Rucollab provides services:
          <br />
          1.Advertising space on PSH offline products <br />
          2.Advertising space on the PSH online platform <br />
          3.Rent business areas in hundreds of PSH units
        </AccordionBody>
      </Accordion>
    </div>
  );
}
