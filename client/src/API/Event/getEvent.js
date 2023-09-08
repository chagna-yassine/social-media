import { API_BASE_URL } from "../ApiBaseUrl";

export const getEvent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fanout/Get`, {
        method: 'POST',
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