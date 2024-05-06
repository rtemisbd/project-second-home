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
export default function Faq8() {
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
          Accounts and Security
        </h3>
      </div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">How to create an account?</p>
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
          To create an account:
          <p>1. Click "Sign Up" on the homepage.</p>
          <p>
            2. Fill out the required information: name, mobile number, email,
            and password.
          </p>
          <p>
            3. Verify your mobile number by entering the OTP sent to your phone.
          </p>
          <p>4. Log in with your credentials.</p>
          <p>5. Start exploring and booking rooms!</p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between ">
            <p className="text-sm">Why haven't I received an OTP?</p>
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
          If you haven't received an OTP:
          <p>1. Check your spam or junk folder in your email.</p>
          <p>2. Ensure that the mobile number provided is correct.</p>
          <p>3. Wait for a few minutes as OTP delivery may take some time.</p>
          <p>4. Resend the OTP if the option is available.</p>
          <p>5. Contact our support team if the issue persists.</p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="">
          <div className="flex justify-between ">
            <p className="text-sm">What should I do if I forget my password?</p>
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
          If you forget your password, you can easily reset it by following
          these steps:
          <p>1. Go to the login page on our website.</p>
          <p>2. Click on the "Forgot Password?" link.</p>
          <p>3. Enter your email address associated with your account.</p>
          <p>4. Click on the "Reset Password" button.</p>
          <p>
            5. You will receive an email with instructions on how to reset your
            password.
          </p>
          <p>
            6. Follow the instructions in the email to set a new password for
            your account.
          </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
