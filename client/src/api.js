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

export const checkExistence = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/checkExistence`, {
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

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Image/deletePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postId),
    });
    const data = await response.json();
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

export const Like = async (user_id, post_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Like/?user_id=${user_id}&post_id=${post_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(user_id, post_id),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const unLike = async (Data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Like/unLike`, {
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

export const Comment = async (user_id, post_id, text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id, post_id, text}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getComment = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment/Get`, {
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

export const countComment = async (Data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment/countComment`, {
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

export const sendReply = async (replyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment/sendReply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeReply = async (replyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment/removeReply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeComment = async (commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Comment/removeComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getFeed = async (user_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCover = async (coverData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/User/updateCover`, {
      method: 'POST',
      body: coverData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePic = async (picData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/User/updateProfilePic`, {
      method: 'POST',
      body: picData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/User/updateUser`, {
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

export const checkEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Recovery/checkEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Recovery`, {
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

export const updatePassword = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Recovery/updatePassword`, {
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

export const event = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Fanout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserId = async (post_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Fanout/GetId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_id),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Fanout/Get`, {
      method: 'POST',
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

export const updateEvent = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Fanout/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json(id);
    return data;
  } catch (error) {
    throw error;
  }
};