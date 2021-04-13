import { momentdate } from './momentDate';
import moment from 'moment';

export const createdDay = (date) => {
  let newdate = momentdate(date.log_date, 'llll');
  let splittedDate = newdate.split(',');
  return splittedDate[1] + ', ' + splittedDate[0];
};

export const getHrs = (time) => {
  let hr = Math.floor(time / 60);
  let mins = time % 60;
  if (mins < 10) {
    mins = '0' + mins;
  }
  return hr + 'h' + mins + 'm';
};

export const getHrsMins = (time) => {
  let hr = Math.floor(time / 60);
  let mins = time % 60;

  return { hr, mins };
};

export const formatDate = (resDate: string) => {
  const stringDate = JSON.stringify(resDate);
  const splitDate = stringDate
    .split('T')[0]
    .substring(1, stringDate.length - 1)
    .split('/');
  return splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
};

export const totalHours = (item) => {
  const total = item.note.reduce((acc, curr) => acc + parseInt(curr.time), 0);
  return total;
};

export const totalWeekHours = (item) => {
  const total = item.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
  return total / 60;
};

export const checkunder24Hrs = (duration) => {
  return duration > 1440 ? false : true;
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

export const getStringDate = (modalDate: Date) => {
  return momentdate(JSON.stringify(modalDate).substring(1, 11), 'lll').split(
    ','
  )[0];
};

// export const getDateWithOutTimeZone = (date) => {
//   const month =
//     date.getMonth() > 9
//       ? parseInt(date.getMonth() + 1)
//       : '0' + parseInt(date.getMonth() + 1);
//   return new Date(
//     date.getFullYear() +
//       '-' +
//       month +
//       '-' +
//       `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
//   );
// };

export const groupByproject = (logs: Array<Object>) => {
  let projectsObject = {};
  logs.map((log) => {
    if (projectsObject[log.project.name] !== undefined) {
      projectsObject[log.project.name].push(log);
    } else {
      projectsObject[log.project.name] = [log];
    }
  });
  return projectsObject;
};

export const groupBydate = (logs: Array<Object>) => {
  let dateLogObject = {};
  logs.map((log) => {
    if (dateLogObject[log.log_date] !== undefined) {
      dateLogObject[log.log_date].push(log);
    } else {
      dateLogObject[log.log_date] = [log];
    }
  });
  return dateLogObject;
};

export const filterLastWeek = (logs: Array<Object>) => {
  const lastWeekStart = new Date(
    moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD')
  );
  const lastWeekEnd = new Date(
    moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD')
  );

  return logs.filter(
    (log) =>
      new Date(log.log_date) >= lastWeekStart &&
      new Date(log.log_date) <= lastWeekEnd
  );
};
