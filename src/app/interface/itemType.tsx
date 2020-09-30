interface dataType {
  id: number;
  date: string;
  type: string;
  state: string;
  sender: string;
  note: string;
  user: object;
  leave_date: { endDate: string; startDate: string };
}

export { dataType };
