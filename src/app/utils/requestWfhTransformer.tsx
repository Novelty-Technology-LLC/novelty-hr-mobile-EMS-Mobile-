import { dataType } from "../interface";
import { dateStringMapper } from "./dateMapper";
export interface Request {
  createdAt: Date;
  created_at: Date;
  device_tokens: DeviceToken[];
  end_date: string;
  fiscal_year: string;
  id: number;
  lead: any;
  total: any;
  note: string;
  remaining: any;
  option: string;
  start_date: string;
  status: string;
  updatedAt: Date;
  updated_at: Date;
  user_id: number;
  user: User[];
  wfh_days: number;
}

export interface DeviceToken {
  createdAt: Date;
  created_at: Date;
  device_id: string;
  id: number;
  notification_token: string;
  platform: string;
  updatedAt: Date;
  updated_at: Date;
  user_id: number;
}

export interface User {
  createdAt: Date;
  first_name: string;
  image_url: string;
  last_name: string;
}

const mapDataToWFHRequest = (requests: any) => {
  let newRequests: Array<dataType> = [];

  requests.length > 0 &&
    requests.map((data: Request, index: number) => {
      const newData: dataType = {
        id: data?.id,
        start_date: data?.start_date,
        end_date: data?.end_date,
        // type: data?.type?.toUpperCase(),
        status: data?.status,
        // sender: data?.user_id?.toString(),
        note: data?.note,
        // remaining: data?.remaining,
        // total: data?.total,
        fiscal_year: data?.fiscal_year,
        user_id: data?.user_id,
        user: data?.user,
        // device_tokens: data?.device_tokens,
        lead: data?.lead,
        // leave_approvals: data?.leave_approvals,
        // leave_date: data?.leave_date,
        option: data?.option,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
        created_at: data?.createdAt,
        updated_at: data?.updatedAt,
        // wfh_days: data?.wfh_days,
      };

      newRequests.push(newData);
    });

  return newRequests;
};

const mapObjectToWFHRequest = (data: Request) => {
  let newRequest: Array<dataType> = [];

  const newData: dataType = {
    id: data?.id,
    start_date: data?.start_date,
    end_date: data?.end_date,
    // type: data?.type?.toUpperCase(),
    status: data?.status,
    // sender: data?.user_id?.toString(),
    note: data?.note,
    // remaining: data?.remaining,
    // total: data?.total,
    fiscal_year: data?.fiscal_year,
    user_id: data?.user_id,
    user: data?.user,
    // device_tokens: data?.device_tokens,
    lead: data?.lead,
    // leave_approvals: data?.leave_approvals,
    // leave_date: data?.leave_date,
    option: data?.option,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    created_at: data?.createdAt,
    updated_at: data?.updatedAt,
    // wfh_days: data?.wfh_days,
  };
  newRequest.push(newData);

  return newRequest;
};

export { mapObjectToWFHRequest, mapDataToWFHRequest };
