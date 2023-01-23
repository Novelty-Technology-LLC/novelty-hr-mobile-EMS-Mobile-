import { dateStringMapper } from "./dateMapper";
import { momentdate } from "./momentDate";

export default getDay = (item) => {
  if (!item?.start_date) return "";
  let day = momentdate(item?.start_date, "MMM D").toString();

  let dayRange = dateStringMapper(item?.start_date, item?.end_date);

  let dayType = item?.start_date.slice(3, 10) - +item?.end_date.slice(8, 10);

  return {
    day,
    dayRange,
    dayType,
  };
};

export const responseDay = (date) =>
  new Date(date.updatedAt).toString().substr(3, 7);

export const startDate = (item) =>
  new Date(item.createdAt).toString().substr(3, 7);
