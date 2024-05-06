import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-900">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
            <div className="flex justify-center items-center">
              <img src="https://i.ibb.co/gD2pdvf/Thank-you-PSH-1.png" alt="" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 p-5">
              YOUR TITLE HERE!
            </h2>

            <div className="mt-5 mb-24">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="lg:inline-block">
              <div className="hidden md:block mt-5 mb-24">
                <Link to={"/"}>
                  <button className="sign_btn">HOME PAGE</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
