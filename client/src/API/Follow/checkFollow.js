import { API_BASE_URL } from "../ApiBaseUrl";

export const checkFollow = async (followData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/follow/checkFollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };