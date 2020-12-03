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

export const checkRepeat = (olddate: Object, newdate: Object) => {
  const new_start = momentdate(JSON.parse(newdate).startDate, 'll');
  const new_end = JSON.parse(newdate).endDate
    ? momentdate(JSON.parse(newdate).endDate, 'll')
    : new_start;
  const old_start = momentdate(olddate.startDate, 'll');
  const old_end = olddate.endDate
    ? momentdate(olddate.endDate, 'll')
    : old_start;

  // if (new_end !== new_end && old_end !== old_start) {
  if (new_start <= old_end && old_start <= new_end) return true;
  // } else if (new_end === new_start) {
  //   if (new_end <= old_end && new_end >= old_start) return true;
  // } else if (old_end === old_end) {
  //   if (old_end <= new_end && old_end >= new_start) return true;
  // } else {
  //   return new_end === old_end;
  // }
  return false;
};

export const checkIfRequested = (
  allrequests: Array<Object>,
  values: Object,
  olddata?: Object
) => {
  let repeat = false;
  if (olddata) {
    allrequests = allrequests.filter((req) => req.id !== olddata.id);
  }

  allrequests.map((request) => {
    console.log(checkRepeat(request.leave_date, values.date));
    if (checkRepeat(request.leave_date, values.date)) {
      repeat = true;
    }
  });
  return repeat;
};
