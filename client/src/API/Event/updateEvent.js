import { API_BASE_URL } from "../ApiBaseUrl";

export const updateEvent = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fanout/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };