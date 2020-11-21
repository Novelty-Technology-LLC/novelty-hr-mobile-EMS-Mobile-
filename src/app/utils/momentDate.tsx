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
  return moment(item.log_date).format('W') === moment().format('W')
    ? true
    : false;
};
