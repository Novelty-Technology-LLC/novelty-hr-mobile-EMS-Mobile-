import { dateStringMapper } from './dateMapper';

export default getDay = (item) => {
  let day =
  new Date(item.leave_date.startDate).toString().substr(3, 7);

  let dayRange = dateStringMapper(
    item.leave_date.startDate,
    item.leave_date.endDate
  );

  let dayType =
    item.leave_date.startDate.slice(3, 10) -
    +item.leave_date.endDate.slice(8, 10);

  return {
    day,
    dayRange,
    dayType,
  };
};

export const responseDay = (date) =>
  new Date(date.updatedAt).toString().substr(3, 7);

export const startDate = (item)=>new Date(item.user.createdAt).toString().substr(3, 7);