export const formatContentForList = (text = "") => {
  const content = text.trim();
  const rowContent = content
    .split("\n")
    .filter((row) => row !== "")
    .map((row) => row.trim());
  return rowContent;
};

export const formatContentFromList = (content = []) => {
  if (content.length === 0) return "";
  const text = content.join("\n");
  return text;
};
