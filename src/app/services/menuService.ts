import { api } from "../api/api";
const editMenu = async (id: string, value: string): Promise<any> => {
    try {
        const data = JSON.stringify({ menu_name: value })
        const response = await api.patch(`lunch/${id}`, data);

        return response.data.data;

    } catch (error) {

        throw { success: false, message: error };
    }

}

export const menuServices = { editMenu };