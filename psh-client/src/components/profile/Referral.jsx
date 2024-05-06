import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast, { Toaster } from "react-hot-toast";

import "./Referral.css";

const Referral = () => {
  const MySwal = withReactContent(Swal);
  const [inviteLink, setInviteLink] = useState(
    "https://www.pshbd.com.com/user/ref/12535"
  ); // State to store invite link
  const [isCopied, setIsCopied] = useState(false); // State to track whether the link is copied

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink); // Copy invite link to clipboard
    setIsCopied(true);
    toast.success("Copied");
  };
  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h1 className="title">Invite and Referral</h1>
      <div className="mt-10">
        <h6 className="profile ">Your Profile Link : </h6>
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="email"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded"
            onClick={handleCopy}
          >
            {isCopied ? "Copied!" : "Copy Invite Link"}
          </Button>
        </div>

        <p className="invite my-5">
          Invite your friends and get 10% Discount Cupons
        </p>
      </div>
      <div>
        <h6 className="terms">Terms and Conditions :</h6>
      </div>
      <div>
        <h6 className="terms_h1">
          1. Eligibility:
          <span className="terms_p">
            To be eligible for the referral discount, guests must be registered
            users of our platform.
          </span>{" "}
        </h6>
        <h6 className="terms_h1">
          2. Qualified Referra:
          <span className="terms_p">
            A qualified referral is considered when the referred friend signs up
            using the unique referral link and completes their first booking.
          </span>{" "}
        </h6>
        <h6 className="terms_h1">
          3. Discount Redemption:
          <span className="terms_p">
            The 10% discount will be applied to the referrer's next booking
            after the referred friend's stay is completed and confirmed.
          </span>{" "}
        </h6>
        <h6 className="terms_h1">
          4. Non-Cumulative:
          <span className="terms_p">
            The referral discount cannot be combined with other offers or
            discounts and is valid for a single booking only.
          </span>{" "}
        </h6>
        <h6 className="terms_h1">
          5. Limitations:
          <span className="terms_p">
            There is no limit to the number of referrals a guest can make, but
            the total referral discount cannot exceed 50% of the booking amount.
          </span>{" "}
        </h6>
      </div>
      <Toaster
        containerStyle={{ top: 150 }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </div>
  );
};

export default Referral;
