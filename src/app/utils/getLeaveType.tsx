export const getLeaveOption = (leave_option: any) => {
  let name = "FULL DAY";

  if (leave_option === "FIRST HALF") {
    name = "1st Half";
  } else if (leave_option === "SECOND HALF") {
    name = "2nd Half";
  } else {
    name = "Full Day";
  }

  return name;
};
