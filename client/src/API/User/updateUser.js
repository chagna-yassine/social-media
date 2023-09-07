import { API_BASE_URL } from "../ApiBaseUrl";

export const updateUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/updateUser`, {
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