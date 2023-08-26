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

export const search = async (searchQuery) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?username=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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