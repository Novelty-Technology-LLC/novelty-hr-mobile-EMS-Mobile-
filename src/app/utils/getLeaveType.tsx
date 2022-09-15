export const getLeaveOption = (leave_option: any) => {
  let name = "";

  if (leave_option === "FIRST HALF") {
    name = "1st Half";
  } else if (leave_option === "SECOND HALF") {
    name = "2nd Half";
  } else {
    name = "FULL DAY";
  }

  return name;
};
