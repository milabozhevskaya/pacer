export const formatContentForTable = (cellCount = 3, text = "") => {
  const lastRowContent = ",".repeat(cellCount - 1);
  const content = text.trim().replace(lastRowContent, "");
  const rowContent = content.split("\n").filter((row) => row !== "");
  const formattedContent = [...rowContent, lastRowContent].map((row) => {
    const cells = row.split(",").map((cell) => cell.trim());
    if (cells.length < cellCount) {
      for (let i = cells.length; i < cellCount; i++) {
        cells.push("");
      }
    }
    return cells;
  });
  return formattedContent;
};

export const formatContentFromTable = (content = []) => {
  if (content.length === 0) return "";
  const text = content
    .slice(0, -1)
    .map((row) => row.join(", "))
    .join("\n");
  return text;
};
