import { API_BASE_URL } from "../ApiBaseUrl";

export const getUserId = async (post_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fanout/GetId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post_id),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };