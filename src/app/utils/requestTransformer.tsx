import { dataType } from '../interface';
interface userType {
  id: number;
  leave_date: { endDate: string; startDate: string };
  note: string;
  requestor_id: number;
  status: string;
  type: string;
  user: object;
  leave_approvals: Array<object>;
  lead: Array<string>;
  createdAt: string;
  updatedAt: string;
}

const mapDataToRequest = (requests: any) => {
  let newRequests: Array<dataType> = [];

  requests.length > 0 &&
    requests.map((data: userType, index: number) => {
      const newData: dataType = {
        id: data.id,
        date: dateMapper(data.leave_date.startDate, data.leave_date.endDate),
        type: data.type.toUpperCase(),
        state: data.status,
        sender: data.requestor_id.toString(),
        note: data.note,
        user: data.user,
        leave_approvals: data.leave_approvals,
        lead: data.lead,
        leave_date: data.leave_date,
      };
      newRequests.push(newData);
    });

  return newRequests;
};

const dateMapper = (start: string, end: string) => {
  return start.substring(8, start.length - 4) ===
    end.substring(8, end.length - 4)
    ? start.substring(4, start.length - 4) + '(1 day)'
    : start.substring(4, start.length - 5) +
        '-' +
        end.substring(8, end.length - 4) +
        `(${
          parseInt(end.substring(8, 10)) - parseInt(start.substring(8, 10)) + 1
        } days)`;
};

const mapObjectToRequest = (data: userType) => {
  let newRequest: Array<dataType> = [];

  const newData: dataType = {
    id: data.id,
    date: dateMapper(data.leave_date.startDate, data.leave_date.endDate),
    type: data.type.toUpperCase(),
    state: data.status,
    sender: data.requestor_id.toString(),
    note: data.note,
    user: data.user,
    lead: data.lead,
    leave_approvals: data.leave_approvals,
    leave_date: data.leave_date,
  };
  newRequest.push(newData);

  return newRequest;
};

export { mapDataToRequest, mapObjectToRequest };
