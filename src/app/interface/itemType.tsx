interface dataType {
  id: number;
  date: string;
  type: string;
  state: string;
  sender: string;
  note: string;
  user: object;
  leave_approvals: Array<object>;
  lead: Array<string>;
  leave_date: { endDate: string; startDate: string };
}

export { dataType };
