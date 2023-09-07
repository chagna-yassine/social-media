import { API_BASE_URL } from "../ApiBaseUrl";

export const getComment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Comment/Get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };