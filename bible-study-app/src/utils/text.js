export const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const excerpt = (value = "", words = 20) => {
  const text = stripHtml(value);
  if (!text) return "";
  return text.split(" ").slice(0, words).join(" ");
};
