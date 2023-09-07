import { API_BASE_URL } from "../ApiBaseUrl";

export const updateCover = async (coverData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/updateCover`, {
        method: 'POST',
        body: coverData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };