import { API_BASE_URL } from "../ApiBaseUrl";

export const getConversations = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Message/getConversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };