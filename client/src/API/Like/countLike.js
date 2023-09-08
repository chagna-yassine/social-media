import { API_BASE_URL } from "../ApiBaseUrl";

export const countLike = async (Data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Like/countLike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };