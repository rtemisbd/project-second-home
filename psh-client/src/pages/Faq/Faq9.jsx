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
export default function Faq9() {
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
          Property Owner
        </h3>
      </div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What services does PSH provide to property owners?
            </p>
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
          PSH provides services: <br />
          1.Property management <br />
          2.Design and Build (Planning, architectural, design to construction
          services)
          <br />
          3.Room Make Over (interior design & photography services)
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between ">
            <p className="text-sm">
              What are the advantages of registering property with PSH?
            </p>
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
          Registering your property with PSH offers benefits like increased
          visibility, access to a targeted audience, marketing support, booking
          management tools, secure payment processing, professional support, and
          flexible rental terms.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">How do I register my property on PSH?</p>
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
          To register your property on PSH, follow these steps :
          <p>
            1. Visit the PSH website and navigate to the "Register Property"
            section.
          </p>
          <p>2. Click on the "List Your Property" button.</p>
          <p>3. Fill out the required information about your property.</p>
          <p>4. Submit your property listing for review by our team.</p>
          <p>
            5. Once your listing is approved, it will be published on the PSH
            platform, and potential guests can book your property.
          </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
