import { API_BASE_URL } from "../ApiBaseUrl";

export const getPost = async (user_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Image/?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json(user_id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };