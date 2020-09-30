const getName = (data) => {
  let name =
    data.user.first_name + data.user.last_name > 14
      ? data.user.first_name +
        ' ' +
        data.user.last_name.substr(0, 14 - 2) +
        '...'
      : data.user.first_name + ' ' + data.user.last_name;

  return { name };
};

export default getName;
