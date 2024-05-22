export function formatDate(date: Date) {
  // Get the day of the week
  if (!(date instanceof Date)) date = new Date(date);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
  // Get the rest of the date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);

  // Combine them into the desired format
  return `${dayOfWeek}, ${formattedDate}`;
}
