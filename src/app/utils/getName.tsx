const getName = (data) => {
  let name = data?.user?.first_name + " " + data?.user?.last_name;

  return { name };
};

export const leadname = (data) => data?.first_name + " " + data?.last_name;

export default getName;
