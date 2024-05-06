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
export default function Faq11() {
  const [open, setOpen] = useState(1);
  const dispatch = useDispatch();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
          About PSH
        </h3>
      </div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">What is PSH?</p>
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
          Project Second Home (PSH) is a leading platform that offers a diverse
          range of rental accommodations, catering to individuals seeking
          temporary or long-term housing solutions. PSH provides a seamless
          booking experience, connecting users with a wide selection of
          residential properties, including apartments, houses, and rooms,
          across various locations. With a focus on convenience, affordability,
          and quality, PSH aims to simplify the process of finding and securing
          comfortable living spaces for its users. Whether you're a student,
          professional, or traveler, PSH strives to be your trusted partner in
          finding your ideal "home away from home.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between ">
            <p className="text-sm">What is Coliving?</p>
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
          Coliving is a modern housing concept emphasizing communal living.
          Residents share living spaces and amenities while fostering community
          and collaboration. It offers private bedrooms alongside shared common
          areas and facilities, promoting affordability and convenience.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What are the advantages of living in Coliving?{" "}
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
          Advantages of coliving:
          <p>Affordability: Shared living spaces reduce individual costs.</p>
          <p>
            Community: Instant access to a diverse and supportive social
            network.
          </p>
          <p>Convenience: Furnished accommodations and inclusive amenities.</p>
          <p>
            Networking: Opportunities to connect with like-minded individuals.
          </p>
          <p>
            Flexibility: Short-term leases and hassle-free moving arrangements.
          </p>
          <p>
            Social opportunities: Regular events and activities to foster
            interaction.
          </p>
          <p>
            Location benefits: Prime locations in urban hubs with easy access to
            amenities.
          </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">Why do I need Coliving?</p>
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
          With Coliving, you can enjoy the privacy of your private room, but
          still get the social and family aspects of interacting with other
          residents.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5}>
        <AccordionHeader onClick={() => handleOpen(5)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What is the difference between Coliving and boarding?
            </p>
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
          Coliving offers an environment that is more conducive to living in a
          community and both enjoying public spaces and facilities that are
          usually rare or less available in boarding houses.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6}>
        <AccordionHeader onClick={() => handleOpen(6)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              Where are the Coliving PSH units located?{" "}
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
          PSH is currently available in Jakarta, Bogor, Depok, Tangerang,
          Bekasi, Bandung, Surabaya, Malang, Yogyakarta, Semarang and Bali. Type
          the area of ​​your choice in the search box on https://psh.com.bd/ to
          display a selection of units available in that area.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 7}>
        <AccordionHeader onClick={() => handleOpen(7)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What are the advantages of living in a PSH residence?
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
          PSH provides high quality Coliving residences that prioritize design
          and comfort at affordable prices.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 8}>
        <AccordionHeader onClick={() => handleOpen(8)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What is the difference between PSH and RuPartner residences?{" "}
            </p>
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
          PSH's residence is managed comprehensively by PSH, including room
          cleaning and laundry services. Meanwhile, for RuPartner residences,
          management and services are managed by the respective boarding house
          owners.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 9}>
        <AccordionHeader onClick={() => handleOpen(9)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What are the advantages of living in a RuPartner residence?{" "}
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
          There are various choices of comfortable boarding houses in strategic
          locations, with easy booking via PSH. Management and services are
          managed by the respective boarding house owners, but residents can
          still get benefits in the form of access as tenants to the PSH
          application and special offers from various PSH partner brands.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 10}>
        <AccordionHeader onClick={() => handleOpen(10)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What is community life like at Coliving PSH?{" "}
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
          We will help you move into Coliving PSH, and immediately feel
          comfortable like at home. Our Community Team will also always be there
          to help with whatever you need. We hold regular events for networking
          and socializing with other PSH residents and members, so that from PSH
          you can build lasting friendships.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 11}>
        <AccordionHeader onClick={() => handleOpen(11)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">Can you rent an apartment in PSH? </p>
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
          We are working on the Apartment section.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 12}>
        <AccordionHeader onClick={() => handleOpen(12)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What would Coliving be like if it were located in an apartment?{" "}
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
          You will get a private bedroom. However, you will share other rooms
          such as the kitchen, sitting room, dining room, and so on with
          housemates.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 13}>
        <AccordionHeader onClick={() => handleOpen(13)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">
              What benefits can I get by becoming a member of the PSH Community?{" "}
            </p>
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
          Members can participate in regular networking events at PSH, exercise
          classes, and discounts and promotions at various locations. As a
          member, you can also connect to the PSH social network which includes
          members from the top 500 companies in Bangladesh.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 14}>
        <AccordionHeader onClick={() => handleOpen(14)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">Are the rooms at PSH fully furnished?</p>
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
          Yes, all rooms at PSH are fully furnished, ensuring a comfortable and
          convenient stay for our guests. Each room is equipped with essential
          furniture items such as beds, tables, chairs, and storage units.
          Additionally, amenities like curtains, lighting fixtures, and mirrors
          are provided to enhance the functionality and aesthetics of the space.
          Our goal is to offer a hassle-free living experience where guests can
          move in seamlessly without the need to worry about furnishing their
          accommodations.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
