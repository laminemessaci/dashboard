export const timestamp = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(Date.now());

const dateFormat = (date) => {
  const newDate = new Date(date);
  return date.includes("/") ? date : newDate.toLocaleDateString();
};
