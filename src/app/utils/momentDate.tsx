import moment from 'moment';
import { checkRepeat } from './getQuota';
import { stringifyDate } from './timelog';

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
