import { API_BASE_URL } from "../ApiBaseUrl";

export const getFeed = async (user_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };