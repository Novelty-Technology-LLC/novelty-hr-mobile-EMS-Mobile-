import moment from 'moment';
import { stringifyDate } from './timelog';
const today = moment();
const thisWeekStart = today.startOf('week').format('YYYY-MM-DD');
const thisWeekEnd = today.endOf('week').format('YYYY-MM-DD');

const thisMonthStart = moment().startOf('month').format('YYYY-MM-DD');
const thisMonthEnd = moment().endOf('month').format('YYYY-MM-DD');

const thisQuarterStart = moment().startOf('quarter').format('YYYY-MM-DD');
const thisQuarterEnd = moment().endOf('quarter').format('YYYY-MM-DD');

const thisYearStart = moment().startOf('year').format('YYYY-MM-DD');
const thisYearEnd = moment().endOf('year').format('YYYY-MM-DD');

const lastWeekStart = moment()
  .subtract(1, 'weeks')
  .startOf('week')
  .format('YYYY-MM-DD');
const lastWeekEnd = moment()
  .subtract(1, 'weeks')
  .endOf('week')
  .format('YYYY-MM-DD');

const lastMonthStart = moment()
  .subtract(1, 'months')
  .startOf('month')
  .format('YYYY-MM-DD');
const lastMonthEnd = moment()
  .subtract(1, 'months')
  .endOf('month')
  .format('YYYY-MM-DD');

const lastQuarterStart = moment()
  .subtract(1, 'Q')
  .startOf('quarter')
  .format('YYYY-MM-DD');
const lastQuarterEnd = moment()
  .subtract(1, 'Q')
  .endOf('quarter')
  .format('YYYY-MM-DD');

const lastYearStart = moment()
  .subtract(1, 'year')
  .startOf('quarter')
  .format('YYYY-MM-DD');
const lastYearEnd = moment()
  .subtract(1, 'year')
  .endOf('quarter')
  .format('YYYY-MM-DD');

export const todayDate = () => {
  return {
    start: new Date(moment().format('YYYY-MM-DD')),
    end: new Date(moment().format('YYYY-MM-DD')),
  };
};

export const yesterdayDate = () => {
  return {
    start: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')),
    end: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')),
  };
};

export const thisWeek = () => {
  return {
    start: new Date(thisWeekStart),
    end: new Date(thisWeekEnd),
  };
};

export const pastWeek = () => {
  return {
    start: new Date(lastWeekStart),
    end: new Date(lastWeekEnd),
  };
};

export const thisMonth = () => {
  return {
    start: new Date(thisMonthStart),
    end: new Date(thisMonthEnd),
  };
};

export const lastMonth = () => {
  return {
    start: new Date(lastMonthStart),
    end: new Date(lastMonthEnd),
  };
};

export const thisQuarter = () => {
  return {
    start: new Date(thisQuarterStart),
    end: new Date(thisQuarterEnd),
  };
};

export const lastQuarter = () => {
  return {
    start: new Date(lastQuarterStart),
    end: new Date(lastQuarterEnd),
  };
};

export const thisYear = () => {
  return {
    start: new Date(thisYearStart),
    end: new Date(thisYearEnd),
  };
};

export const lastYear = () => {
  return {
    start: new Date(lastYearStart),
    end: new Date(lastYearEnd),
  };
};

export const showAll = () => {
  return {
    start: new Date('2000-01-01'),
    end: new Date(thisYearEnd),
  };
};

export const dateRange = (startDate: any, endDate: any) => {
  return {
    start: new Date(moment(startDate).format('YYYY-MM-DD')),
    end: new Date(moment(endDate).format('YYYY-MM-DD')),
  };
};
