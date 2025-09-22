import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

const Pricing = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="block md:hidden ">
        <h2 className="text-[#35B0A7] text-xl font-medium mb-3 ">
          Pricing Plan
        </h2>
        <Tabs value={index}>
          <TabsHeader
            className=" p-0  "
            indicatorProps={{
              className: "bg-transparent shadow-none rounded-none ",
            }}
          >
            <Tab
              value={0}
              onClick={() => setIndex(0)}
              className={`font-bold px-4 py-2 transition-all duration-300  ${
                index === 0
                  ? "bg-[#E9F5F4] scale-125 -translate-t-2 text-teal-600"
                  : "bg-gray-100"
              }`}
            >
              Basic
            </Tab>

            <Tab
              value={1}
              onClick={() => setIndex(1)}
              className={`font-bold px-4 py-2 transition-all duration-300  ${
                index === 1
                  ? "bg-blue-100 scale-125 translate-t-2 text-blue-600 "
                  : "bg-gray-100"
              }`}
            >
              Pro
            </Tab>

            <Tab
              value={2}
              onClick={() => setIndex(2)}
              className={`font-bold px-4 py-2 transition-all duration-300  ${
                index === 2
                  ? "bg-green-100 scale-125 translate-t-2 text-green-700"
                  : "bg-gray-100"
              }`}
            >
              Premium
            </Tab>
          </TabsHeader>
        </Tabs>

        <SwipeableViews index={index} onChangeIndex={(i) => setIndex(i)}>
          {/* Basic */}
          <div className="p-6 bg-[#E9F5F4]  h-[320px] ">
            <h3 className="font-bold text-lg text-teal-600 ">Basic</h3>
            <p>Free (10% commission per booking)</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>1 Property</li>
              <li>Standard calendar & booking system</li>
              <li>Standard search placement</li>
              <li>Basic analytics (bookings, earnings)</li>
              <li>Standard support (chat + email only)</li>
              <li>Monthly payouts</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="p-6 bg-blue-100  h-[320px] ">
            <h3 className="font-bold text-lg text-blue-600">
              Pro (Best Value)
            </h3>
            <p>BDT. 1000/month + 7% commission</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>Up to 5 Properties</li>
              <li>Advanced calendar (bulk updates, seasonal pricing)</li>
              <li>Option to boost listings</li>
              <li>Booking & revenue analytics</li>
              <li>Priority support (call + chat + email)</li>
              <li>Monthly payouts</li>
              <li>Featured property option (Marketing tools)</li>
            </ul>
          </div>

          {/* Premium */}
          <div className="p-6 bg-green-100   h-[320px] ">
            <h3 className="font-bold text-lg text-green-700">Premium</h3>
            <p>BDT. 2500/month + 5% commission</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>Unlimited Properties</li>
              <li>Smart calendar + dynamic pricing AI</li>
              <li>Automatic featured placement</li>
              <li>
                Analytics - advanced insights (occupancy rate, demand trends)
              </li>
              <li>Dedicated account manager + 24/7 priority</li>
              <li>Monthly payouts</li>
              <li>
                Free featured slots + promotional campaigns (Marketing tools)
              </li>
              <li>Premium badge + verified host status</li>
            </ul>
          </div>
        </SwipeableViews>
      </div>

      {/* larger device */}
      <div className="overflow-x-auto mb-5 sm:hidden md:block ">
        <table className="w-full border border-gray-200 text-center">
          <thead className=" w-full text-xl bg-gray-200 text-white  ">
            <tr>
              <th className="px-4 py-5 border-r font-bold text-black">
                Features
              </th>
              <th className="w-[60%] lg:w-[28%] px-4 py-5  font-bold   bg-[#35b0a7] ">
                Basic
                <br />
                <p className=" text-sm">Free (10% commission per booking)</p>
              </th>
              <th className="w-[28%] px-4 py-5 font-bold bg-blue-400">
                Pro (Best Value)
                <br />
                <p className=" text-sm">BDT. 1000/month + 7% commission</p>
              </th>
              <th className="w-[28%] px-4 py-5 border-r font-bold   bg-[#01574e]">
                Premium
                <br />
                <p className=" text-sm">BDT. 2500/month + 5% commission</p>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300 border">
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">
                Number of Properties
              </td>
              <td className="px-4 py-4 font-bold ">1 property</td>
              <td className="px-4 py-4 font-bold bg-blue-50 border-t">
                Up to 5 property
              </td>
              <td className="px-4 py-4  font-bold ">Unlimited</td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">Booking Tools</td>
              <td className="px-4 py-4 ">Standard calendar & booking system</td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Advanced calendar (bulk updates, seasonal pricing)
              </td>
              <td className="px-4 py-4 ">
                Smart calendar +{" "}
                <span className="text-red-700"> dynamic pricing AI</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">
                Listing Visibility
              </td>
              <td className="px-4 py-4 ">Standard search placement</td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Option to boost listings
              </td>
              <td className="px-4 py-4 ">Automatic featured placement</td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">Analytics</td>
              <td className="px-4 py-4  ">Basic (bookings, earnings)</td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Booking & revenue analytics
              </td>
              <td className="px-4 py-4 ">
                Advanced insights (occupancy rate, demand trends)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">Support</td>
              <td className="px-4 py-4 ">
                Standard support (chat + email only)
              </td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Priority support (call + chat + email)
              </td>
              <td className="px-4 py-4 ">
                Dedicated account manager + 24/7 priority
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">Payouts</td>
              <td className="px-4 py-4 ">Monthly </td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Monthly{" "}
              </td>
              <td className="px-4 py-4 ">Monthly </td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">
                Marketing Tools{" "}
              </td>
              <td className="px-4 py-4 "> - </td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                Featured property option{" "}
              </td>
              <td className="px-4 py-4 ">
                Free featured slots + promotional campaigns
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 bg-gray-50 font-bold">Extra Benefits</td>
              <td className="px-4 py-4 "> - </td>
              <td className="px-4 py-4 bg-blue-50 border-t-blue-gray-900">
                -{" "}
              </td>
              <td className="px-4 py-4 ">
                {" "}
                Premium badge + verified host status
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;
