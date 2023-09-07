import { API_BASE_URL } from "../ApiBaseUrl";

export const updatePic = async (picData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/updateProfilePic`, {
        method: 'POST',
        body: picData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };