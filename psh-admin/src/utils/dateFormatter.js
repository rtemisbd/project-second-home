const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
const formatDate = (date) => date.toLocaleDateString("en-CA");

  // Generate array of dates between two dates
  const generateDateArray = (start, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);

    let dates = [];
    while (startDate <= endDate) {
      dates.push(formatDate(new Date(startDate)));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

  const convertToISODate = (dmy) => {
    const [day, month, year] = dmy.split("-");
    return `${year}-${month}-${day}`;
  };

  

export const dateFormatter = {months, formatDate, generateDateArray , convertToISODate}