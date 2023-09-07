import { API_BASE_URL } from "../ApiBaseUrl";

export const uploadVideoPost = async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Image/uploadVideo`, {
        method: 'POST',
        body: postData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };