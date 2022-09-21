export const getWorkShift = (shiftType: any) => {
  let workShift = "";

  if (shiftType === "9AM - 6PM") {
    workShift = "First Shift";
  } else {
    workShift = "Second Shift";
  }

  return workShift;
};
