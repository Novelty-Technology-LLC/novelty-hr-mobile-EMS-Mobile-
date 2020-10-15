const getName = (data) => {
  let name =
    data.user.first_name.length + data.user.last_name.length > 14
      ? data.user.first_name +
        ' ' +
        data.user.last_name.substr(0, 14 - 2) +
        '...'
      : data.user.first_name + ' ' + data.user.last_name;

  return { name };
};

export const leadname = (data) =>
  data.first_name.length + data.last_name.length > 14
    ? data.first_name + ' ' + data.last_name.substr(0, 14 - 2) + '...'
    : data.first_name + ' ' + data.last_name;

export default getName;


