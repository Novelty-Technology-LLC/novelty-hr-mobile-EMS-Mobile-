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

export const dateStringMapper = (
  startDate: string,
  endDate: string,
  dateOnly?: boolean
) => {
  const start = new Date(startDate).toString().substring(0, 15);
  const end = new Date(endDate ?? startDate).toString().substring(0, 15);
  let nextmonth =
    start.substring(4, 7) === end.substring(4, 7) ? null : end.substring(4, 7);
  return start.substring(8, start.length - 4) ===
    end.substring(8, end.length - 4)
    ? start.substring(4, start.length - 4) + '(1 day)'
    : start.substring(4, start.length - 5) +
        '-' +
        `${nextmonth ? nextmonth + ' ' : ''}` +
        end.substring(8, end.length - 4) +
        `${dateOnly ? '' : `(${dateMapper(start, end)} days)`}  `;
};
