// utils/dates.js
export function createSafeDate(year, month, day = 1) {
  // Explicit local time construction
  const date = new Date(year, month - 1, day);
  
  // Validate the date didn't overflow (e.g. month = 13)
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month) {
    throw new Error(`Invalid date: ${year}-${month}-${day}`);
  }
  
  return date;
}