import { API_BASE_URL } from "../ApiBaseUrl";

export const search = async (searchData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };