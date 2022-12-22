export const DateParser = (date) => {
  let tempDate = new Date(Date.parse(date));
  if (!isNaN(tempDate)) {
    tempDate = tempDate.toLocaleString("es-AR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    tempDate = "";
  }
  return tempDate;
};
