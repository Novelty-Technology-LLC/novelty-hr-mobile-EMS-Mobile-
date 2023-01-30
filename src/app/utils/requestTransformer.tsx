import { dataType } from "../interface";
import { dateStringMapper } from "./dateMapper";
export interface userType {
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
  leave_option: string;
  start_date: string;
  end_date: string;
}

const mapDataToRequest = (requests: any) => {
  let newRequests: Array<dataType> = [];

  requests.length > 0 &&
    requests.map((data: userType, index: number) => {
      const newData: dataType = {
        id: data.id,
        date: dateStringMapper(
          data?.leave_date?.startDate ?? "",
          data?.leave_date?.endDate ?? ""
        ),
        type: data?.type ? data?.type.toUpperCase() : data?.type,
        state: data?.status,
        sender: data.requestor_id.toString(),
        note: data?.note,
        user: data?.user,
        leave_approvals: data?.leave_approvals,
        device_tokens: data?.device_tokens,
        lead: data?.lead,
        end_date: data.end_date,
        start_date: data.start_date,
        leave_date: data?.leave_date ?? "",
        createdAt: data?.createdAt,
        leave_option: data?.leave_option ?? "",
      };

      newRequests.push(newData);
    });

  return newRequests;
};

const mapObjectToRequest = (data: userType) => {
  let newRequest: Array<dataType> = [];

  const newData: dataType = {
    id: data.id,
    date: dateStringMapper(
      data?.leave_date?.startDate,
      data?.leave_date?.endDate
    ),
    start_date: data.start_date,
    end_date: data.end_date,
    type: data?.type?.toUpperCase(),
    state: data?.status,
    sender: data?.requestor_id?.toString(),
    note: data?.note,
    user: data?.user,
    device_tokens: data?.device_tokens,
    lead: data?.lead,
    leave_approvals: data?.leave_approvals,
    leave_date: data?.leave_date,
    leave_option: data?.leave_option,
    createdAt: data?.createdAt,
  };
  newRequest.push(newData);

  return newRequest;
};

export { mapDataToRequest, mapObjectToRequest };
