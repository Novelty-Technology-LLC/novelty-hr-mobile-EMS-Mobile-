import moment from 'moment';
import { checkRepeat } from './getQuota';

export const stringifyDate = (date: Date) => {
  return momentdate(JSON.stringify(date).substring(1, 11), 'lll').substring(
    0,
    12
  );
};

export const momentdate = (date?: Date, format?: string) => {
  if (date) {
    return moment(date).format(format);
  } else {
    return moment(date).format(format);
  }
};

export const getYesterday = () => {
  return moment().subtract(1, 'day').format('l');
};

export const getToday = () => {
  return moment().format('l');
};

export const getDayToday = () => {
  let day = new Date().getDay();

  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';

    default:
      break;
  }
};

export const checkDate = (date: any, selectDate: any) => {
  return stringifyDate(date) === stringifyDate(selectDate);
};

export const isThisWeek = (item) => {
  return moment(item.log_date).add(1, 'day').format('W') ===
    moment().add(1, 'day').format('W')
    ? true
    : false;
};

export const isPastWeek = (item) => {
  return moment(item.log_date)
    .subtract(1, 'weeks')
    .add(1, 'day')
    .format('W') === moment().add(1, 'day').format('W')
    ? true
    : false;
};

export const checkAndReplace = (
  data: any,
  timelogs: any,
  dispatchTimeLog: Function
) => {
  if (checkDate(data.log_date, timelogs.selectedDate.start)) {
    dispatchTimeLog({
      type: 'EDIT',
      payload: {
        present: data,
      },
    });
  }
  if (Object.keys(timelogs.historyDate).length !== 0) {
    checkRepeat(
      {
        startDate: timelogs.historyDate.start,
        endDate: timelogs.historyDate.end,
      },
      JSON.stringify({
        startDate: data.log_date,
        endDate: data.log_date,
      })
    ) &&
      dispatchTimeLog({
        type: 'EDIT',
        payload: {
          past: data,
        },
      });
  }
};
