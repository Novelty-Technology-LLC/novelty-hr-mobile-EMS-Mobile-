import { api } from '../api/api';

export const updateImage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post(`/user/updateimage/${id}`, data);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const updateEmployeeDetail = async (id: number, profileData: any) => {
  try {
    const data = JSON.stringify({ 'fiscal_year': '079-080', ...profileData })
    const response = await api.patch(`user/${id}`, data);

    return response.data.data;

  } catch (error) {

    throw { success: false, message: error };
  }
}


