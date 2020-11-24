export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    const number = parsePhoneNumberFromString(`+1${phoneNumber}`);
    return number?.formatNational();
  }
  return null;
};
