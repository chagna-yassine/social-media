import { API_BASE_URL } from "../ApiBaseUrl";

export const getUserName = async (_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fanout/GetName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_id),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };