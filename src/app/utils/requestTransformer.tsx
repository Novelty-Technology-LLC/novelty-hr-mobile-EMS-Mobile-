import { dataType } from '../interface';
interface userType {
  id: number;
  leave_date: { endDate: string; startDate: string };
  note: string;
  requestor_id: number;
  status: string;
  type: string;
  user: object;
  createdAt: string;
  updatedAt: string;
}

const mapDataToRequest = (requests: any) => {
  let newRequests: Array<dataType> = [];

  requests &&
    requests.map((data: userType, index: number) => {
      const newData: dataType = {
        id: data.id,
        date:
          data.leave_date.startDate.substring(
            4,
            data.leave_date.startDate.length - 4
          ) +
          '-' +
          data.leave_date.endDate.substring(
            8,
            data.leave_date.startDate.length - 4
          ),
        type: data.type.toUpperCase(),
        state: data.status,
        sender: data.requestor_id.toString(),
        note: data.note,
        user: data.user,
        leave_date: data.leave_date,
      };
      newRequests.push(newData);
    });

  return newRequests;
};

const mapObjectToRequest = (data: userType) => {
  let newRequest: Array<dataType> = [];

  const newData: dataType = {
    id: data.id,
    date:
      data.leave_date.startDate.substring(
        4,
        data.leave_date.startDate.length - 4
      ) +
      '-' +
      data.leave_date.endDate.substring(
        8,
        data.leave_date.startDate.length - 4
      ),
    type: data.type.toUpperCase(),
    state: data.status,
    sender: data.requestor_id.toString(),
    note: data.note,
  };
  newRequest.push(newData);

  return newRequest;
};

export { mapDataToRequest, mapObjectToRequest };
