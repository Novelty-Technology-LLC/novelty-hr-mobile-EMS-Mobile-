import { momentdate } from './momentDate';

export const createdDay = (date) => {
  let newdate = momentdate(date.log_date, 'llll');
  return newdate.substr(3, 8) + ', ' + newdate.substr(0, 3);
};

export const getHrs = (time) => {
  let hr = Math.floor(time / 60);
  let mins = time % 60;
  if (mins < 10) {
    mins = '0' + mins;
  }
  return hr + 'h' + mins + "'";
};

export const getHrsMins = (time) => {
  let hr = Math.floor(time / 60);
  let mins = time % 60;

  return { hr, mins };
};

export const isPast = (item) => {
  return new Date().getDate() - new Date(item.log_date).getDate() >= 7;
};

export const getWeek = (date) => {
  let onejan = new Date(new Date(date).getFullYear(), 0, 1);
  return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

export const isThisWeek = (item) => {
  return getWeek(new Date(item.log_date)) === getWeek(new Date())
    ? true
    : false;
};

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export const logMapper = (logs) => {
  let data = {};
  logs.map((log) => {
    let log_date = log.log_date + log.project.id;
    let oldLog = data[0] && data[0][log_date];
    if (!isEmpty(data)) {
      for (const key in data) {
        if (data[log_date] && data[log_date][0].project.id === log.project.id) {
          data[log_date] = [].concat(...data[log_date], log);
          break;
        } else {
          data[log_date] = [].concat(log);
          break;
        }
      }
    } else {
      data[log_date] = [].concat(log);
    }
  });
  return data;
};

export const totalHours = (item) => {
  const total = item.note.reduce((acc, curr) => acc + parseInt(curr.time), 0);
  return total;
};

export const totalWeekHours = (item) => {
  const total = item.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
  return total;
};

export const getDateWithOutTimeZone = (date) => {
  return new Date(
    date.getFullYear() +
      '-' +
      (parseInt(date.getMonth()) + 1) +
      '-' +
      `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
  );
};
