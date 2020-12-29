import moment from 'moment';

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
