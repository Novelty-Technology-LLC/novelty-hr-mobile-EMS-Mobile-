export default getDay = (item) => {
  let day =
    +new Date().toString().slice(8, 10) -
    +item.leave_date.startDate.slice(8, 10);

  let dayRange =
    item.leave_date.startDate.substring(
      8,
      item.leave_date.startDate.length - 4
    ) ===
    item.leave_date.endDate.substring(8, item.leave_date.endDate.length - 4)
      ? item.leave_date.startDate.substring(
          4,
          item.leave_date.startDate.length - 4
        ) + '(1 day)'
      : item.leave_date.startDate.substring(
          4,
          item.leave_date.startDate.length - 5
        ) +
        '-' +
        item.leave_date.endDate.substring(
          8,
          item.leave_date.endDate.length - 4
        ) +
        `(${
          parseInt(item.leave_date.endDate.substring(8, 10)) -
          parseInt(item.leave_date.startDate.substring(8, 10))
        } days)`;

  let dayType =
    item.leave_date.startDate.slice(3, 10) -
    +item.leave_date.endDate.slice(8, 10);

  let startDate = new Date(item.createdAt).toString().substr(3, 7);

  return {
    day,
    dayRange,
    dayType,
    startDate,
  };
};

export const responseDay = (date) =>
  new Date(date.updatedAt).toString().substr(3, 7);
