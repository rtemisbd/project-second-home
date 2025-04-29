// Helper to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
};

export default getYouTubeVideoId;