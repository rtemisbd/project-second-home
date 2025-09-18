const Pricing = () => {
  return (
    <div className="relative">
      <div className="flex md:hidden">
        {/* features */}
        <div className="w-[40%]">
          <table className="w-full border border-gray-200 text-center">
            <thead className=" w-full  bg-gray-200 text-white  ">
              <tr>
                <th className="px-4 py-10 border-r font-bold text-black">
                  Features
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300 border bg-gray-50 font-bold text-sm">
              <tr>
                <td className="h-[80px] px-4 py-4 ">Number of Properties</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Booking Tools</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Listing Visibility</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Analytics</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Support</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Payouts</td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Marketing Tools </td>
              </tr>
              <tr>
                <td className="h-[80px] px-4 py-4 ">Extra Benefits</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* content table */}
        <div className="w-[60%]">
          <div className="overflow-x-auto mb-5 ">
            <table className="w-full border border-gray-200 text-center">
              <thead className=" w-full  bg-gray-200 text-white  ">
                <tr className="flex w-full text-[16px]">
                  <th className="py-2  font-bold   bg-[#35b0a7] w-[200px]">
                    Basic
                    <br />
                    <p className=" text-sm">
                      Free (10% commission <br /> per booking)
                    </p>
                  </th>
                  <th className="px-4 py-5 font-bold bg-blue-400 w-[200px]">
                    Pro (Best Value)
                    <br />
                    <p className=" text-sm">BDT. 1000/month + 7% commission</p>
                  </th>
                  <th className="px-4 py-5 border-r font-bold   bg-[#01574e] w-[200px]">
                    Premium
                    <br />
                    <p className=" text-sm">BDT. 2500/month + 5% commission</p>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300 border">
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] font-bold">
                    1 property
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] font-bold bg-blue-50 border-t">
                    Up to 5 property
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px]  font-bold ">
                    Unlimited
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Standard calendar & booking system
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Advanced calendar (bulk updates, seasonal pricing)
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Smart calendar +{" "}
                    <span className="text-red-700"> dynamic pricing AI</span>
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Standard search placement
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Option to boost listings
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Automatic featured placement
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px]  ">
                    Basic (bookings, earnings)
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Booking & revenue analytics
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Advanced insights (occupancy rate, demand trends)
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Standard support (chat + email only)
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Priority support (call + chat + email)
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Dedicated account manager + 24/7 priority
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] ">Monthly </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Monthly{" "}
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">Monthly </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] "> - </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    Featured property option{" "}
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    Free featured slots + promotional campaigns
                  </td>
                </tr>
                <tr className="flex">
                  <td className="px-4 py-2 w-[200px] h-[79px] "> - </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] bg-blue-50 border-t-blue-gray-900">
                    -{" "}
                  </td>
                  <td className="px-4 py-2 w-[200px] h-[79px] ">
                    {" "}
                    Premium badge + verified host status
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
