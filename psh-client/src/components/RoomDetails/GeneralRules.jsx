import { useEffect, useRef, useState } from "react";

const GeneralRules = ({ category }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * 6;
      if (contentRef.current.scrollHeight >= maxHeight + 1) {
        setIsOverflowing(true);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <h2
        id="apartmentDetails"
        className="text-xl font-bold text-gray-900 mb-5 facility_h1 p-2 mt-5"
      >
        {category} General Rules
      </h2>

      {/* Expandable wrapper */}
      <div
        ref={contentRef}
        className={`leading-4 w-full transition-all duration-300 ${
          expanded ? "" : "line-clamp-6"
        }`}
      >
        {/* Check-in / Check-out */}
        <div>
          <h2 className="font-bold my-2">Check-in / Check-out</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Check-in: after 12:00 PM</li>
            <li>Check-out: before 10:00 AM</li>
            <li>Late check-out must be requested in advance.</li>
          </ul>
        </div>

        {/* Respect & Privacy */}
        <div>
          <h2 className="font-bold my-2">Respect & Privacy</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Respect other guests and family members.</li>
            <li>Keep noise levels low, especially after 11:00 PM.</li>
            <li>No unregistered visitors without prior approval.</li>
          </ul>
        </div>

        {/* Cleanliness */}
        <div>
          <h2 className="font-bold my-2">Cleanliness</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Keep your room tidy.</li>
            <li>
              No food or drinks (other than water) inside the bedroom to avoid
              pests.
            </li>
            <li>Dispose of trash in the bins provided.</li>
          </ul>
        </div>

        {/* Smoking, Alcohol & Substances */}
        <div>
          <h2 className="font-bold my-2">Smoking, Alcohol & Substances</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Smoking is strictly prohibited inside.</li>
            <li>
              Alcohol, drugs or illegal substances are strictly forbidden.
            </li>
          </ul>
        </div>

        {/* Kitchen & Meals */}
        <div>
          <h2 className="font-bold my-2">Kitchen & Meals</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Complimentary breakfast included.</li>
            <li>Light kitchen use is allowed.</li>
            <li>If allowed, please:</li>
            <ul className="ms-6 list-disc list-inside">
              <li>Clean up immediately after use.</li>
              <li>Label and store your food properly.</li>
              {category !== "Home Stay" && (
                <li>Do not use others’ food without permission.</li>
              )}
            </ul>
          </ul>
        </div>

        {/* Bathroom Etiquette */}
        <div>
          <h2 className="font-bold my-2">Bathroom Etiquette</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            {category !== "Home Stay" && (
              <>
                <li>Share bathroom respectfully if not private.</li>
                <li>
                  Limit shower time to 10–15 minutes when others are waiting.
                </li>
              </>
            )}
            <li>Always leave the bathroom clean and dry.</li>
          </ul>
        </div>

        {/* Bedroom Rules */}
        <div>
          <h2 className="font-bold my-2">Bedroom Rules</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Do not rearrange furniture without consent.</li>
            <li>Sheets and towels are provided every day.</li>
            <li>Report any damages immediately.</li>
          </ul>
        </div>

        {/* Internet & Utilities */}
        <div>
          <h2 className="font-bold my-2">Internet & Utilities</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Wi-Fi is for personal use only.</li>
            <li>No heavy downloads/streaming that slow down the network.</li>
            <li>
              Switch off lights, fans, AC, and water heater when leaving the
              room.
            </li>
          </ul>
        </div>

        {/* Pets */}
        <div>
          <h2 className="font-bold my-2">Pets</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Not allowed.</li>
          </ul>
        </div>

        {/* Safety & Security */}
        <div>
          <h2 className="font-bold my-2">Safety & Security</h2>
          <ul className="ms-3 leading-6 text-sm list-inside list-disc">
            <li>Always lock doors and windows when leaving.</li>
            <li>Do not share entry codes/keys with outsiders.</li>
            <li>In case of emergency, follow host instructions immediately.</li>
          </ul>
        </div>
      </div>

      {/* Toggle button */}
      {isOverflowing && (
        <div
          className="flex justify-end cursor-pointer "
          onClick={() => setExpanded(!expanded)}
        >
          <p className="bg-[#F4F4F4] p-2 md:px-5 md:py-3 text-sm md:text-base font-bold">
            {expanded ? "See Less" : "See More"}
          </p>
        </div>
      )}
    </div>
  );
};

export default GeneralRules;
