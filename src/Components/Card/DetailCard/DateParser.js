export const DateParser = (date) => {
  const tempDate = new Date(Date.parse(date));
  return tempDate.toLocaleString("es-AR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
