import { API_BASE_URL } from "../ApiBaseUrl";

export const createConversation = async (conversationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Message/createConversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversationData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };