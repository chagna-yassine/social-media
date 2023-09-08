import { API_BASE_URL } from "../ApiBaseUrl";

export const updatePassword = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Recovery/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };