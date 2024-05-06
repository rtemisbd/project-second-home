import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";

import { placeFaqMenu } from "../../redux/reducers/smProfileMenuSlice";

export default function Faq1() {
  const [open, setOpen] = useState(1);
  const dispatch = useDispatch();
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="md:ps-20 sm:ps-0 md:pr-32 sm:pr-0 accourding-part ">
      <div className=" cursor-pointer flex items-center">
        <div
          className="md:hidden sm:block"
          onClick={() => dispatch(placeFaqMenu(true))}
        >
          <HiArrowNarrowLeft style={{ width: "24px", height: "24px" }} />
        </div>
        <h3 className="text-xl font-bold md:ms-0 sm:ms-4 md:mb-0  ">
          Search and Order
        </h3>
      </div>

      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              How can I search and find a room that suits my preferences?
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
        <AccordionBody className="md:pr-40 sm:pr0">
          You can search on the PSH website by entering criteria, your
          destination location, and your check-in date. You can also apply
          filters to get search results that align with your preferences.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between ">
            <p className="text-sm">
              What if the housing I want is not available?
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
          If the room you want is unavailable, you can adjust your search
          criteria or explore alternative options on our website.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What equipment is available at PSH's residence?
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
          PSH residences provide various amenities for a comfortable stay. All
          rooms are fully furnished, with each residence featuring a kitchen and
          dining area equipped with standard amenities. Guests can easily order
          Add-Ons for additional equipment if needed to enhance their
          experience.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Can I book a room for a check-in date more than 1 month from now?
            </p>
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
          Yes, you can book a room for a check-in date that is more than 1 month
          from now. Our booking system allows you to schedule your stay well in
          advance, giving you the flexibility to plan your trip accordingly.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5}>
        <AccordionHeader onClick={() => handleOpen(5)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">How do I book a place to stay in PSH?</p>
            <div className="absolute right-0">
              {open === 5 ? (
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
          To reserve accommodation at Project Second Home (PSH):
          <p>
            1. Visit our official website{" "}
            <a
              href="www.psh.com.bd"
              style={{
                textDecoration: "underline",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              www.psh.com.bd
            </a>
          </p>
          <p>2. Browse and select your preferred accommodation.</p>
          <p>3. Specify your desired dates.</p>
          <p>
            4. Complete the booking process by reviewing your reservation
            details and making payment.
          </p>
          <p>
            5. Upon completion, you will receive a confirmation of your booking.
          </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6}>
        <AccordionHeader onClick={() => handleOpen(6)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              How much does it cost to rent a residential room in PSH?
            </p>
            <div className="absolute right-0">
              {open === 6 ? (
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
          The cost of renting a residential room in PSH varies depending on
          factors such as the location, size, and amenities of the room. For
          specific pricing information, please visit our website or contact our
          customer support team.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 7}>
        <AccordionHeader onClick={() => handleOpen(7)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              How do I do it if I want to check the location first?
            </p>
            <div className="absolute right-0">
              {open === 7 ? (
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
          If you want to check the location first, you can visit our website and
          explore the map feature to view the locations of our properties.
          Additionally, you can contact our customer support team for assistance
          in finding properties in your desired location.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 8}>
        <AccordionHeader onClick={() => handleOpen(8)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">What is a deposit?</p>
            <div className="absolute right-0">
              {open === 8 ? (
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
          Deposit is a security fee that residents must pay before check-in.
          This deposit is non-refundable but will be adjusted with your final
          rent amount.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 9}>
        <AccordionHeader onClick={() => handleOpen(9)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Do I need to pay a deposit when booking PSH?
            </p>
            <div className="absolute right-0">
              {open === 9 ? (
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
          Yes, you need to pay a deposit of BDT 500 to confirm the booking. This
          deposit is non-refundable but will be adjusted with your final rent
          amount.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 10}>
        <AccordionHeader onClick={() => handleOpen(10)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Can I pay a down payment first when placing an order?
            </p>
            <div className="absolute right-0">
              {open === 10 ? (
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
          You can choose to pay the deposit first, then pay the rent before
          checking in or at the beginning of every month you live in PSH.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 11}>
        <AccordionHeader onClick={() => handleOpen(11)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">Can you afford the monthly rent?</p>
            <div className="absolute right-0">
              {open === 11 ? (
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
          Yes, PSH has several flexible and profitable payment methods for you.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 12}>
        <AccordionHeader onClick={() => handleOpen(12)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Is there any additional charge for parking?
            </p>
            <div className="absolute right-0">
              {open === 12 ? (
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
          No, there are no additional parking charges at Project Second Home.
          Parking facilities are included in your booking, ensuring convenient
          access for your vehicle during your stay.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 13}>
        <AccordionHeader onClick={() => handleOpen(13)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">Is there a minimum rental length?</p>
            <div className="absolute right-0">
              {open === 13 ? (
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
          Certainly, the minimum rental length at Project Second Home is one
          day, but guests can choose to extend their stay for longer durations
          based on availability and their preferences.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 14}>
        <AccordionHeader onClick={() => handleOpen(14)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Do laundry and room cleaning have to be paid for?
            </p>
            <div className="absolute right-0">
              {open === 14 ? (
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
          No, laundry and room cleaning are included in your rent amount. You
          can enjoy these services without any additional charges during your
          stay at PSH.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 15}>
        <AccordionHeader onClick={() => handleOpen(15)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What payment methods can be used to place an order?
            </p>
            <div className="absolute right-0">
              {open === 15 ? (
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
          At Project Second Home, we provide convenient payment options to
          ensure a seamless booking experience for our guests. Currently, we
          accept payments via Bkash or Cash. To confirm your booking, you can
          make an advance payment online using Bkash. Once your payment is
          confirmed, you can conveniently check the payment update through our
          website in your profile section. We strive to make your booking
          process smooth and efficient.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 16}>
        <AccordionHeader onClick={() => handleOpen(16)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              How do I know that my order was successful?
            </p>
            <div className="absolute right-0">
              {open === 16 ? (
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
          You will receive a confirmation email and SMS with your booking
          details, including your booking ID, once your order is successful.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 17}>
        <AccordionHeader onClick={() => handleOpen(17)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What should I do when I have paid but my order status has not
              changed?{" "}
            </p>
            <div className="absolute right-0">
              {open === 17 ? (
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
          If you have paid but your order status has not changed, please contact
          our customer support team immediately. They will assist you in
          resolving the issue and updating your order status accordingly.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
