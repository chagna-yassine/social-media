import { API_BASE_URL } from "../ApiBaseUrl";

export const uploadPost = async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Image/uploadPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };