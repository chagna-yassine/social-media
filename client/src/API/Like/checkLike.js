import { API_BASE_URL } from "../ApiBaseUrl";

export const checkLike = async (likeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Like/checkLike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };