import { API_BASE_URL } from "../ApiBaseUrl";

export const removeReply = async (replyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Comment/removeReply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };