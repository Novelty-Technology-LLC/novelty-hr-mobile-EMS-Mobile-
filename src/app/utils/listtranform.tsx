import { dateStringMapper } from './dateMapper';
import { getDayToday } from './momentDate';
import { checkRepeat } from '../utils';
import colors from '../../assets/colors';

const transformTitle = (title: string) => {
  return title.length > 18 ? `${title.substring(0, 18)} ...` : title;
};

const checkToday = (startDate: Date, endDate: Date) => {
  let todaydate = new Date().toDateString();
  if (new Date().getDay() === 0 || new Date().getDay() === 6) return false;
  return checkRepeat(
    { startDate: todaydate, endDate: todaydate },
    JSON.stringify({ startDate, endDate })
  );
};

const checkTomorrow = (date: Date) => {
  let todaydate = new Date();
  let newdate = new Date(date);
  if (new Date().getDay() === 0) return false;

  return (
    todaydate.getFullYear() === newdate.getFullYear() &&
    todaydate.getMonth() === newdate.getMonth() &&
    todaydate.getDate() + 1 === newdate.getDate()
  );
};

const formatDate = (month: number, day: number, monthdate: number) => {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${months[month]} ${monthdate}, ${days[day]} `;
};

export const transformDate = (date: any, module: string, isList: boolean) => {
  let startDate = date?.startDate ?? date;
  let endDate = date?.endDate ?? date;

  let month, day, monthdate;
  const days =
    startDate === endDate
      ? ''
      : `\n${dateStringMapper(startDate, endDate, true)}`;

  if (checkToday(startDate, endDate)) {
    return module === 'Leave' ? `On Leave Today ${days}` : 'Today';
  } else if (checkTomorrow(startDate)) {
    return module === 'Leave' ? `On Leave Tomorrow ${days}` : `Tomorrow`;
  }

  if (!isList) {
    month = new Date(startDate).getMonth();
    day = new Date(startDate).getDay();
    monthdate = new Date(startDate).getDate();
    return formatDate(month, day, monthdate);
  } else {
    return dateStringMapper(startDate, endDate);
  }
};

export const transformList = (
  itemList: any,
  module: string,
  isList?: boolean,
  truncate?: boolean
) => {
  const newList = itemList.map((item: any) => ({
    title: truncate ? transformTitle(item?.title) : item?.title,
    subTitle: transformDate(item?.leave_date ?? item?.subTitle, module, isList),
    status: item?.status,
    type: item?.type,
  }));

  return newList;
};

export const transformLunchItem = (item: any) => {
  if (item?.detailRoute === '/lunch') {
    const newItem = item.items.map((item: any) => {
      if (item?.subTitle === getDayToday()) {
        return { ...item, subTitle: 'Today','type':'lunch' };
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
      return 'Morning';
    case curHr < 17:
      return 'Afternoon';
    case curHr < 21:
      return 'Evening';
    default:
      return 'Night';
  }
};

export const getColor = (type: string, defaultColor: string) => {
  return type === 'holiday'
    ? colors.blue
    : type === 'event'
    ? colors.primary
    : defaultColor;
};
