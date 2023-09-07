import { API_BASE_URL } from "../ApiBaseUrl";

export const Like = async (user_id, post_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Like/?user_id=${user_id}&post_id=${post_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(user_id, post_id),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };