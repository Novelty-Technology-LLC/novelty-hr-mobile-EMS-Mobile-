import { api } from "../api/api";

const lookup = async (): Promise<any> => {
  try {
    const response = await api.get("webportal/lookups");
    return response.data.data;
  } catch (error) {
    throw { success: false, message: error };
  }
};

const lookupField = async (field: string): Promise<any> => {
  try {
    const response = await api.get(`webportal/lookups/field?field=${field}`);
    return response.data.data;
  } catch (error) {
    throw { success: false, message: error };
  }
};

export const lookupServices = { lookup, lookupField };