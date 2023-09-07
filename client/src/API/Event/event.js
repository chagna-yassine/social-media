import { API_BASE_URL } from "../ApiBaseUrl";

export const event = async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fanout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };