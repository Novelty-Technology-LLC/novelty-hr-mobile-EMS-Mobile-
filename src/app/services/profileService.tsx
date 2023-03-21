import { api } from "../api/api";

export const updateImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post(`/user/updateimage`, data);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const updateEmployeeDetail = async (
  id: number,
  profileData: any,
  fiscalYear: string
) => {
  try {
    const data = JSON.stringify({ fiscal_year: fiscalYear, ...profileData });
    const response = await api.patch(`user/${id}`, data);

    return response.data.data;
  } catch (error) {
    throw { success: false, message: error };
  }
};
