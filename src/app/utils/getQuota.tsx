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
