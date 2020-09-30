export default getDay = (item) => {
  let day =
    +new Date().toString().slice(8, 10) -
    +item.leave_date.startDate.slice(8, 10);

  let dayRange =
    item.leave_date.startDate.slice(3, 10) +
    '-' +
    item.leave_date.endDate.slice(8, 10) +
    ' ';

  let dayType =
    item.leave_date.startDate.slice(3, 10) -
    +item.leave_date.endDate.slice(8, 10);

  let startDate = item.leave_date.startDate.substr(3, 8);

  return {
    day,
    dayRange,
    dayType,
    startDate,
  };
};
