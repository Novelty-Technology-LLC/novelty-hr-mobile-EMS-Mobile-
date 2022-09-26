import { dateStringMapper } from "./dateMapper";
import { getDayToday } from "./momentDate";
import { checkRepeat } from "../utils";
import colors from "../../assets/colors";
import moment from "moment";

const transformTitle = (title: string, transform: boolean) => {
  return title.length > 18
    ? `${title.substring(0, !transform ? 45 : 18)} ...`
    : title;
};

const checkToday = (startDate: Date, endDate: Date) => {
  let todaydate = moment(new Date().toDateString().slice(0, 10))
    .utc()
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);
  let startDates = moment(new Date(startDate).toDateString().slice(0, 10))
    .utc()
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);
  console.log(
    moment(todaydate).day().toString(),
    " moment(todaydate).day().toString()",
    moment(startDates).day().toString(),
    "moment(startDates).day().toString()"
  );

  if (todaydate === startDates) {
    return true;
  } else {
    return false;
  }

  // if (todaydate.day() === 0 || todaydate.day() === 6) {
  //   return false;
  // } else {
  //   return checkRepeat(
  //     { startDate: todaydate, endDate: todaydate },
  //     JSON.stringify({
  //       startDate: new Date(startDate).toDateString(),
  //       endDate: new Date(endDate).toDateString(),
  //     })
  //   );
  // }
};

const checkTomorrow = (date: Date) => {
  let todaydate = moment(new Date().toDateString().slice(0, 10))
    .add(1, "day")
    .utc()
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);
  let newdate = moment(new Date(date).toDateString().slice(0, 10))
    .utc()
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);
  if (todaydate === newdate) {
    return true;
  } else {
    return false;
  }
  // if (new Date().getDay() === 0) return false;
  // return (
  //   todaydate.getFullYear() === newdate.getFullYear() &&
  //   todaydate.getMonth() === newdate.getMonth() &&
  //   todaydate.getDate() + 1 === newdate.getDate()
  // );
};

const formatDate = (month: number, day: number, monthdate: number) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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

  return `${months[month]} ${monthdate}, ${days[day]} `;
};

export const transformDate = (date: any, module: string, isList: boolean) => {
  let startDate = date?.startDate ?? date;
  let endDate = date?.endDate ?? date;

  let month, day, monthdate;
  const days =
    startDate === endDate
      ? ""
      : `\n${dateStringMapper(startDate, endDate, true)}`;

  if (checkToday(startDate, endDate)) {
    return module === "Leave" ? `On Leave Today ${days}` : "Today";
  } else if (checkTomorrow(startDate)) {
    return module === "Leave" ? `On Leave Tomorrow ${days}` : `Tomorrow`;
  }

  if (!isList) {
    if (module === "Leave") {
      month = new Date(startDate).getMonth();
      day = new Date(startDate).getDay();
      /* todo : holiday date is changed acc to timezone */
      monthdate = new Date(startDate).getDate();
    } else {
      month = new Date(startDate).getUTCMonth();
      day = new Date(startDate).getUTCDay();
      /* todo : holiday date is changed acc to timezone */
      monthdate = new Date(startDate).getUTCDate();
    }

    return formatDate(month, day, monthdate);
  } else {
    return dateStringMapper(startDate, endDate);
  }
};

export const transformList = (
  itemList: any,
  module: string,
  isList?: boolean,
  truncate?: boolean,
  transform?: boolean
) => {
  const newList = itemList.map((item: any) => ({
    title: truncate ? transformTitle(item?.title, transform) : item?.title,
    subTitle: transform
      ? transformDate(item?.leave_date ?? item?.subTitle, module, isList)
      : item.subTitle,
    status: item?.status,
    type: item?.type,
    html: item?.html ?? "",
    date: item?.date?.slice(0, 10),
  }));

  return newList;
};

export const transformLunchItem = (item: any) => {
  if (item?.detailRoute === "/lunch") {
    const newItem = item.items.map((item: any) => {
      if (item?.subTitle === getDayToday()) {
        return { ...item, subTitle: "Today", type: "lunch" };
      } else {
        return item;
      }
    });
    item.items = newItem;
  }

  return item;
};

export const time = () => {
  var today = new Date();
  var curHr = today.getHours();

  switch (true) {
    case curHr < 12:
      return "Morning";
    case curHr < 17:
      return "Afternoon";
    case curHr < 21:
      return "Evening";
    default:
      return "Night";
  }
};

export const getColor = (type: string, defaultColor: string): any => {
  return type === "holiday"
    ? colors.blue
    : type === "event"
    ? colors.primary
    : defaultColor;
};
