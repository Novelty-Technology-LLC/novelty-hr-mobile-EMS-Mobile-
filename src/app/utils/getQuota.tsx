import moment from "moment";

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
  const new_start = new Date(JSON.parse(newdate).startDate).getTime();
  const new_end_date = moment(JSON.parse(newdate).endDate).date();
  const new_end = JSON.parse(newdate).endDate
    ? new Date(JSON.parse(newdate).endDate).getTime()
    : new_start;
  const old_start = new Date(olddate.startDate).getTime();
  const old_start_date = moment(olddate.endDate).date();
  const old_end = olddate.endDate
    ? new Date(olddate.endDate).getTime()
    : old_start;

  if (old_start_date.toString() === new_end_date.toString()) {
    return true;
  } else {
    if (new_end !== new_start && old_end !== old_start) {
      if (new_start <= old_end && old_start <= new_end) return true;
    } else if (new_end === new_start && old_end !== old_start) {
      if (new_end <= old_end && new_end >= old_start) return true;
    } else if (old_start === old_end && new_end !== new_start) {
      if (old_end <= new_end && old_end >= new_start) return true;
    } else {
      return new_end === old_end;
    }
    return false;
  }
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
    if (checkRepeat(request.leave_date, values.date)) {
      repeat = true;
    }
  });
  return repeat;
};
