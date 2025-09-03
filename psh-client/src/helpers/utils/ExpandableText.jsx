import { useState, useEffect, useRef } from "react";

const ExpandableText = ({ htmlContent }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  // Clean up HTML content: trim whitespace and remove leading/trailing line breaks
  const cleanedHtml = htmlContent
    ?.replace(/^\s+|\s+$/g, "") // Trim spaces
    ?.replace(/^\s*<br\s*\/?>\s*/gi, "") // Remove leading <br>
    ?.replace(/\s*<br\s*\/?>\s*$/gi, ""); // Remove trailing <br>

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * 5;
      if (contentRef.current.scrollHeight >= maxHeight + 1) {
        setIsOverflowing(true);
      }
    }
  }, [cleanedHtml]);

  return (
    <div className="w-full">
      <div
        ref={contentRef}
        className={`leading-4 w-full transition-all duration-300 ${
          expanded ? "" : "line-clamp-4"
        }`}
        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
      ></div>

      {isOverflowing && (
        <div
          className="flex justify-end cursor-pointer"
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

export default ExpandableText;
