import { API_BASE_URL } from "../ApiBaseUrl";

export const uploadImgPost = async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Image/uploadImg`, {
        method: 'POST',
        body: postData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };