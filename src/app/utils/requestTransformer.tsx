import { dataType } from '../interface';

const mapDataToRequest = (requests: any) => {
  interface userType {
    id: number;
    leave_date: { endDate: string; startDate: string };
    note: string;
    requestor_id: number;
    status: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
  let newRequests: Array<dataType> = [];

  requests.map((data: userType, index: number) => {
    const newData: dataType = {
      id: data.id,
      date:
        data.leave_date.startDate.substring(5, 10) +
        ':' +
        data.leave_date.endDate.substring(5, 10),
      type: data.type,
      state: data.status,
      sender: data.requestor_id.toString(),
    };
    newRequests.push(newData);
  });

  return newRequests;
};

export { mapDataToRequest };
