import { min } from 'react-native-reanimated';

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
