import { dateStringMapper } from './dateMapper';
import { getDayToday } from './momentDate';
import { checkRepeat } from '../utils';

const transformTitle = (title: string) => {
  return title.length > 18 ? `${title.substring(0, 18)} ...` : title;
};

const checkToday = (startDate: Date, endDate: Date) => {
  let todaydate = new Date();
  return checkRepeat(
    { startDate: todaydate, endDate: todaydate },
    JSON.stringify({ startDate, endDate })
  );
};

const checkTomorrow = (date: Date) => {
  let todaydate = new Date();
  let newdate = new Date(date);

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

const transformDate = (date: any, module: string, isList: boolean) => {
  let startDate = date?.startDate ?? date;
  let month, day, monthdate;

  if (checkToday(date?.startDate, date?.endDate)) {
    return module === 'Leave'
      ? `On Leave Today ${
          date?.startDate === date?.endDate
            ? ''
            : `\n${dateStringMapper(
                new Date(date?.startDate).toString().substring(0, 15),
                date?.endDate
                  ? new Date(date?.endDate).toString().substring(0, 15)
                  : new Date(date?.startDate).toString().substring(0, 15),
                true
              )}`
        }`
      : 'Today';
  } else if (checkTomorrow(startDate)) {
    return module === 'Leave' ? `On Leave Tomorrow` : `Tomorrow`;
  }

  if (!isList && module !== 'Leave') {
    month = new Date(startDate).getMonth();
    day = new Date(startDate).getDay();
    monthdate = new Date(startDate).getDate();
    return formatDate(month, day, monthdate);
  } else {
    return dateStringMapper(
      new Date(date?.startDate).toString().substring(0, 15),
      date?.endDate
        ? new Date(date?.endDate).toString().substring(0, 15)
        : new Date(date?.startDate).toString().substring(0, 15)
    );
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
        return { ...item, subTitle: 'Today' };
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

  if (curHr < 12) {
    return 'Morning';
  } else if (curHr < 18) {
    return 'Afternoon';
  } else if (curHr < 20) {
    return 'Evening';
  } else {
    return 'Night';
  }
};
