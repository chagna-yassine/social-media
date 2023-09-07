import { API_BASE_URL } from "../ApiBaseUrl";

export const Comment = async (user_id, post_id, text) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, post_id, text}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };