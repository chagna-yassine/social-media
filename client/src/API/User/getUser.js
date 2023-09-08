import { API_BASE_URL } from "../ApiBaseUrl";

export const getUser = async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(username),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };