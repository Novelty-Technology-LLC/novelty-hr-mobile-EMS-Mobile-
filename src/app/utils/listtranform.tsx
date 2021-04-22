import { getDayToday } from './momentDate';

const transformTitle = (title: string) => {
  return title.length > 15 ? `${title.substring(0, 15)} ...` : title;
};

const checkToday = (date: Date) => {
  let todaydate = new Date();
  let newdate = new Date(date);
  return (
    todaydate.getFullYear() === newdate.getFullYear() &&
    todaydate.getMonth() === newdate.getMonth() &&
    todaydate.getDate() === newdate.getDate()
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

const transformDate = (date: Date, module: string) => {
  let month, day, monthdate;
  if (checkToday(date) && module === 'Leave') {
    return `On Leave Today`;
  } else if (checkToday(date)) {
    return 'Today';
  } else if (checkTomorrow(date) && module === 'Leave') {
    return `On Leave Tomorrow`;
  } else if (checkTomorrow(date)) {
    return `Tomorrow`;
  }
  month = new Date(date).getMonth();
  day = new Date(date).getDay();
  monthdate = new Date(date).getDate();
  return formatDate(month, day, monthdate);
};

export const transformList = (itemList: any, module: string) => {
  const newList = itemList.map((item: any) => ({
    title: transformTitle(item?.title),
    subTitle: transformDate(item?.subTitle, module),
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
