export const createdDay = (date) => {
  let newdate = new Date(date.log_date).toString();
  return newdate.substr(3, 7) + ', ' + newdate.substr(0, 3);
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

const getWeek = (date) => {
  let onejan = new Date(new Date(date).getFullYear(), 0, 1);
  return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

export const isThisWeek = (item) => {
  return getWeek(new Date(item.log_date)) === getWeek(new Date())
    ? true
    : false;
};

export const logMapper = (logs) => {
  let data = [];
  logs.map((log) => {
    let log_date = log.log_date;
    let oldLog = data[0] && data[0][log_date];
    console.log('old', oldLog);
    data[0] && console.log('date', Object.keys(data[0]));
    data.push({ [log_date]: [].concat(log) });
    // data[0] && console.log('old', data[0][log_date.toString()], log_date);
    // data.map((item) => {
    //   if (log_date in item) {
    //     console.log('exits');
    //     return;
    //   } else {
    //   }
    // });
  });
  console.log('dd', Object.keys(data), data);
};
