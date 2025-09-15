import React from "react";

const Pricing = () => {
  return (
    <div className="overflow-x-auto mb-5  ">
      <table className="w-full border border-gray-200 text-center">
        <thead className=" w-full text-xl bg-gray-200  ">
          <tr>
            <th className="px-4 py-5 border-r font-bold ">Features</th>
            <th className="px-4 py-5 border-r font-bold shadow-md text-teal-400 bg-teal-50 ">
              Basic
              <br />
              <p className=" text-sm">Free (10% commission per booking)</p>
            </th>
            <th className="px-4 py-5 border-r font-bold shadow-md text-blue-600 bg-blue-50">
              Pro (Best Value)
              <br />
              <p className=" text-sm">BDT. 1000/month + 7% commission</p>
            </th>
            <th className="px-4 py-5 border-r font-bold shadow-md text-red-700 bg-red-100">
              Premium
              <br />
              <p className=" text-sm">BDT. 2500/month + 5% commission</p>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300 border">
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Number of Properties
            </td>
            <td className="border-r px-4 py-4 font-bold ">1 property</td>
            <td className="border-r px-4 py-4 font-bold">Up to 5 property</td>
            <td className="border-r px-4 py-4 text-red-700 font-bold">
              Unlimited
            </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Booking Tools
            </td>
            <td className="border-r px-4 py-4 ">
              Standard calendar & booking system
            </td>
            <td className="border-r px-4 py-4">
              Advanced calendar (bulk updates, seasonal pricing)
            </td>
            <td className="border-r px-4 py-4">
              Smart calendar +{" "}
              <span className="text-red-700"> dynamic pricing AI</span>
            </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Listing Visibility
            </td>
            <td className="border-r px-4 py-4 ">Standard search placement</td>
            <td className="border-r px-4 py-4">Option to boost listings</td>
            <td className="border-r px-4 py-4">Automatic featured placement</td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Analytics
            </td>
            <td className="border-r px-4 py-4 ">Basic (bookings, earnings)</td>
            <td className="border-r px-4 py-4">Booking & revenue analytics</td>
            <td className="border-r px-4 py-4">
              Advanced insights (occupancy rate, demand trends)
            </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">Support</td>
            <td className="border-r px-4 py-4 ">
              Standard support (chat + email only)
            </td>
            <td className="border-r px-4 py-4">
              Priority support (call + chat + email)
            </td>
            <td className="border-r px-4 py-4">
              Dedicated account manager + 24/7 priority
            </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">Payouts</td>
            <td className="border-r px-4 py-4 ">Monthly </td>
            <td className="border-r px-4 py-4">Monthly </td>
            <td className="border-r px-4 py-4">Monthly </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Marketing Tools{" "}
            </td>
            <td className="border-r px-4 py-4 "> - </td>
            <td className="border-r px-4 py-4">Featured property option </td>
            <td className="border-r px-4 py-4">
              Free featured slots + promotional campaigns
            </td>
          </tr>
          <tr>
            <td className="border-r px-4 py-4 bg-gray-50 font-bold">
              Marketing Tools{" "}
            </td>
            <td className="border-r px-4 py-4 "> - </td>
            <td className="border-r px-4 py-4">- </td>
            <td className="border-r px-4 py-4">
              {" "}
              Premium badge + verified host status
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Pricing;
