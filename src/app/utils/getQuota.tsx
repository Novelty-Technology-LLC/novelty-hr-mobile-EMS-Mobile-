import { momentdate } from './momentDate';

export const checkValidityQuota = (
  quota: Array<object>,
  type: string,
  day: number
) => {
  let isValid = true;
  quota.map((item) => {
    if (item.leave_type === type.toUpperCase()) {
      isValid = item.leave_used < day;
    }
  });
  return isValid;
};

const checkRepeat = (olddate: Object, newdate: Object) => {
  const new_start = momentdate(JSON.parse(newdate).startDate, 'll');
  const new_end = JSON.parse(newdate).endDate
    ? momentdate(JSON.parse(newdate).endDate, 'll')
    : new_start;
  const old_start = momentdate(olddate.startDate, 'll');
  const old_end = olddate.endDate
    ? momentdate(olddate.endDate, 'll')
    : old_start;

  if (old_start <= new_start && new_start <= old_end) return true;
  if (old_start <= new_end && new_end <= old_end) return true;
  if (new_start < old_start && old_end < new_end) return true;
  return false;
};

export const checkIfRequested = (
  allrequests: Array<Object>,
  values: Object
) => {
  let repeat = false;
  allrequests.map((request) => {
    if (checkRepeat(request.leave_date, values.date)) {
      repeat = true;
    }
  });
  return repeat;
};
