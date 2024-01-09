import moment from "moment";

export const dateMapper = (start: string, end: string) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let daysCount: number = 0;
  while (startDate <= endDate) {
    var dayNo = startDate.getDay();
    startDate.setDate(startDate.getDate() + 1);
    if (dayNo && dayNo >= 1 && dayNo <= 5) {
      daysCount += 1;
    }
  }
  return daysCount;
};

export const getDateDifference = (startDate: string, endDate: string) => {
  return moment(startDate).diff(endDate);
};

export const dateRange = (start: string, end: string) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  const date = {
    startDate: end,
    endDate: start,
  };
  return date;
};

export const dateStringMapper = (
  startDate: string,
  endDate: string,
  dateOnly?: boolean,
  leaveOption = 1
) => {
  const start = moment(startDate, "YYYY-MM-DD").toString().substring(0, 15);
  const end = moment(endDate ?? startDate, "YYYY-MM-DD")
    .toString()
    .substring(0, 15);
  let nextmonth =
    start.substring(4, 7) === end.substring(4, 7) ? null : end.substring(4, 7);
  return start.substring(8, start.length - 4) ===
    end.substring(8, end.length - 4)
    ? start.substring(4, start.length - 4) + `(${leaveOption} day)`
    : start.substring(4, start.length - 5) +
        "-" +
        `${nextmonth ? nextmonth + " " : ""}` +
        end.substring(8, end.length - 4) +
        `${dateOnly ? "" : `(${dateMapper(start, end) * leaveOption} days)`}  `;
};

export const getShortDate = (date: any) => {
  return moment(date).format("MMM D").slice(0, 6);
};
export const getFormatedDate = (date: any) => {
  return moment(date).format("MMM  D, YYYY");
};

export const getFullDate = (date: any) => {
  return moment(date).format("MMM  D,YYYY");
};

export const compareDateBetween = (
  date: string,
  start_date: string,
  end_date: string
) => {
  if (!start_date) return false;
  return moment(date).isBetween(start_date, end_date, null, "[]");
};
