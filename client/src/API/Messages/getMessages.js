import { API_BASE_URL } from "../ApiBaseUrl";

export const getMessages = async (senderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Message/getMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(senderId),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };