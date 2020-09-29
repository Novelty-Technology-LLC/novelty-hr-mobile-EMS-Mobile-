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

  requests &&
    requests.map((data: userType, index: number) => {
      const newData: dataType = {
        id: data.id,
        date:
          data.leave_date.startDate.substring(
            4,
            data.leave_date.startDate.length - 4
          ) +
          ':' +
          data.leave_date.endDate.substring(
            4,
            data.leave_date.startDate.length - 4
          ),
        type: data.type.toUpperCase(),
        state: data.status,
        sender: data.requestor_id.toString(),
      };
      newRequests.push(newData);
    });

  return newRequests;
};

export { mapDataToRequest };
