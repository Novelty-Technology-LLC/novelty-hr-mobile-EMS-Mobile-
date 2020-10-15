import { dateStringMapper } from './dateMapper';

export default getDay = (item) => {
  let day =
    +new Date().toString().slice(8, 10) -
    +item.leave_date.startDate.slice(8, 10);

  let dayRange = dateStringMapper(
    item.leave_date.startDate,
    item.leave_date.endDate
  );

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
