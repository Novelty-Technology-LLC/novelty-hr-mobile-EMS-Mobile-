import { dateStringMapper } from "./dateMapper";
import { getDayToday } from "./momentDate";
import { checkRepeat } from "../utils";
import colors from "../../assets/colors";
import moment from "moment";

const transformTitle = (title: string, transform: boolean) => {
  return title?.length > 18
    ? `${title.substring(0, !transform ? 45 : 18)} ...`
    : title;
};

const checkToday = (startDate: Date, endDate: Date) => {
  let todaydate = moment(new Date().toDateString().slice(0, 10))
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);

  let startDates = moment(new Date(startDate).toDateString().slice(0, 10))
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);
  let endDates = moment(new Date(endDate).toDateString().slice(0, 10))
    .local(true)
    .format("YYYY-MM-DD")
    .toString()
    .slice(0, 10);

  if (todaydate === startDates) {
    return true;
  } else {
    return checkRepeat(
      { startDate: todaydate, endDate: todaydate },
      JSON.stringify({
        startDate: startDates,
        endDate: endDates,
      })
    );
  }

  // if (todaydate.day() === 0 || todaydate.day() === 6) { */previous  code/*
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

const checkholidayToday = (startDate: string, endDate: string) => {
  return moment(moment().format("YYYY-MM-DD")).isSame(
    moment(startDate).format("YYYY-MM-DD")
  );
};

const checkHolidayTomorrow = (date: string) => {
  return moment(moment().format("YYYY-MM-DD")).add(1, "day").isSame(date);
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

const transfromDateForLeave = (startDate: string, endDate: string) => {
  if (
    moment(moment().format("YYYY-MM-DD")).isBetween(
      startDate,
      endDate,
      null,
      "[]"
    )
  ) {
    return `On Leave Today\n${dateStringMapper(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    )}`;
  }
  if (moment(moment().format("YYYY-MM-DD")).add(1, "day").isSame(startDate)) {
    return `On Leave Tomorrow\n${dateStringMapper(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    )}`;
  }
  return `${dateStringMapper(
    moment(startDate).format("YYYY-MM-DD"),
    moment(endDate).format("YYYY-MM-DD")
  )}`;
};

export const transformDate = (date: any, module: string, isList: boolean) => {
  let startDate = date?.startDate ?? date;
  let endDate = date?.endDate ?? date;

  let month, day, monthdate;

  if (checkholidayToday(startDate, endDate)) {
    return "Today";
  } else if (checkHolidayTomorrow(startDate)) {
    return "Tomorrow";
  }

  if (!isList) {
    month = moment(startDate.toString().slice(0, 10)).month();
    day = moment(startDate.toString().slice(0, 10)).day();
    monthdate = moment(startDate.toString().slice(0, 10)).date();
    return formatDate(month, day, monthdate);
  } else {
    return dateStringMapper(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  }
};

export const transformList = (
  itemList: any,
  module: string,
  isList?: boolean,
  truncate?: boolean,
  transform?: boolean
) => {
  if (module === "shoutouts") {
    return itemList;
  }

  const newList = itemList?.map((item: any) => {
    return {
      id: item?.id,
      title: truncate ? transformTitle(item?.title, transform) : item?.title,
      subTitle: transform
        ? module === "Leave"
          ? transfromDateForLeave(
              moment(item?.leave_date?.startDate).format("YYYY-MM-DD"),
              moment(item?.leave_date?.endDate).format("YYYY-MM-DD")
            )
          : transformDate(
              {
                startDate: item?.subTitle.slice(0, 10).toString(),
                endDate: item?.subTitle.slice(0, 10).toString(),
              },
              module,
              isList
            )
        : item.html,
      status: item?.status,
      type: item?.type,
      html: item?.html ?? "",
      date: item?.date?.slice(0, 10),
      leave_option: item?.leave_option,
      avatar: item?.avatars,
    };
  });

  return newList;
};

export const transformLunchItem = (item: any) => {
  if (item?.detailRoute === "/lunch") {
    const newItem = item?.items?.map((item: any) => {
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
