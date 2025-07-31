// src/utils/formatters.js
export const formatMonthId = (id) => {
  if (!id || typeof id !== "string") return "";
  
  const parts = id.split("-");
  if (parts.length !== 2) return "";
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return "";
  }

  const date = new Date(year, month - 1, 1);
  
  // Handle invalid dates (like month = 13)
  if (isNaN(date.getTime())) return "";

  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

/**
 * Turn an ISO date string ("YYYY-MM-DD" or full ISO) into "MM/DD/YYYY".
 * Returns an empty string for falsy or invalid inputs.
 */
export function formatMDY(isoDate) {
  if (!isoDate || typeof isoDate !== "string") return "";
  // Strip time portion if present
  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return "";
  return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
}