import { API_BASE_URL } from "../ApiBaseUrl";

export const sendMessage = async (messageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Message/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };