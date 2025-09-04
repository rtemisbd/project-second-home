import React from "react";

const CancellationPolicy = ({ category }) => {
  return (
    <div className="w-full pb-5">
      <h2
        id="apartmentDetails"
        className="text-xl font-bold text-gray-900 mb-5 w-full  facility_h1 p-2 mt-5"
      >
        Cancellation Policy
      </h2>
      <div>
        <p className="my-5">
          All cancellations must be made in writing (email/message). Refunds, if
          applicable, will be processed within 7–14 business days. Any
          transaction or service fees are non-refundable.
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 w-full ">
              <tr>
                {category !== "Home Stay" && <th></th>}
                <th
                  className={`px-4 py-3 text-left font-bold ${
                    category === "Home Stay" ? "w-1/2" : "w-1/3"
                  }`}
                >
                  Cancellation Timing
                </th>
                <th className="px-4 py-3 text-left font-bold">Refund</th>
              </tr>
            </thead>
            {category === "Home Stay" ? (
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">7+ days before check-in</td>
                  <td className="px-4 py-3 text-green-600 font-medium">
                    Full Refund
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">3–6 days before check-in</td>
                  <td className="px-4 py-3 text-[#FCA22A] font-medium">
                    50% Refund
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">Within 48 hours / No-show</td>
                  <td className="px-4 py-3 text-red-600 font-medium">
                    No Refund
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-300">
                {/* Short Stays */}
                <tr>
                  <td
                    className="px-4 py-3 font-semibold bg-gray-50"
                    rowSpan={3}
                  >
                    Short Stays <br />
                    <span className="text-sm text-gray-500">
                      (Daily/Weekly)
                    </span>
                  </td>
                  <td className="px-4 py-3">7+ days before check-in</td>
                  <td className="px-4 py-3 text-green-600 font-medium">
                    Full Refund
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">3–6 days before check-in</td>
                  <td className="px-4 py-3 text-[#FCA22A] font-medium">
                    50% Refund
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Within 48 hours / No-show</td>
                  <td className="px-4 py-3 text-red-600 font-medium">
                    No Refund
                  </td>
                </tr>
                <tr className="border-none">
                  <td className=" bg-gray-300"></td>
                  <td className=" bg-gray-300"></td>
                  <td className=" bg-gray-300"></td>
                </tr>

                {/* Long Stays */}
                <tr>
                  <td
                    className="px-4 py-3 font-semibold bg-gray-50"
                    rowSpan={4}
                  >
                    Long Stays <br />
                    <span className="text-sm text-gray-500">
                      (Monthly Co-Living)
                    </span>
                  </td>
                  <td className="px-4 py-3">Before Move-In (14+ days)</td>
                  <td className="px-4 py-3 text-green-600 font-medium">
                    Full refund of deposit
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Before Move-In (7–13 days)</td>
                  <td className="px-4 py-3 text-[#FCA22A] font-medium">
                    50% refund of deposit
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Before Move-In (&lt;7 days)</td>
                  <td className="px-4 py-3 text-red-600 font-medium">
                    No refund of deposit
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    After Move-In (early termination)
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    Requires 30 days’ notice; current month non-refundable;
                    deposit may be partially/fully forfeited
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <h2 className="text-red-600 font-semibold">
          ** Host-Initiated Cancellations
        </h2>

        <p>
          Full refund if the property cancels a booking. Assistance with
          relocation may be offered in exceptional cases.
        </p>
        <h2 className="text-red-600 font-semibold mt-5">
          ** Special Circumstances
        </h2>

        <p>
          Exceptions may be considered for medical emergencies, government
          restrictions, or force majeure events (e.g., natural disasters,
          pandemics).
        </p>
      </div>
    </div>
  );
};

export default CancellationPolicy;
