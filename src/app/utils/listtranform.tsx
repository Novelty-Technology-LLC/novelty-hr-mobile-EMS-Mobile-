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

const transformDate = (date: Date, module: string) => {
  if (checkToday(date) && module === 'Leave') {
    return `On Leave Today`;
  } else if (checkToday(date)) {
    return 'Today';
  }

  return new Date(date).toDateString();
};

export const transformList = (itemList: any, module: string) => {
  const newList = itemList.map((item: any) => ({
    title: transformTitle(item?.title),
    subTitle: transformDate(item?.subTitle, module),
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
