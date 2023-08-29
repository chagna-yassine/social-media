// client/src/api.js

const API_BASE_URL = 'http://localhost:5001'; // Update with your server URL

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Image/upload`, {
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
    throw error;
  }
};

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

export const follow = async (followData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow`, {
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

export const unFollow = async (followData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow/unFollow`, {
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


export const createConversation = async (conversationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Message/createConversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversationData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Message/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getConversations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Message/getConversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMessages = async (senderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Message/getMessages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(senderId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};