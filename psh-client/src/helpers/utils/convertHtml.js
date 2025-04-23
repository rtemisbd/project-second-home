import DOMPurify from "dompurify";
export const convertHtml = (text) => {
  // Ensure DOMPurify only runs in the browser
  if (typeof window !== "undefined" && DOMPurify.sanitize) {
    return DOMPurify.sanitize(text);
  } else {
    return text;
  }
};