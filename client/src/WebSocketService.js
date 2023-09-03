import { useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5001'; 

const WebSocketService = () => {
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Listen for real-time events (likeAdded')
    socket.on('likeAdded', (data) => {
      // Handle the 'likeAdded' event here
      console.log('New like added:', data);
      // Update your UI or state to reflect the new like
    });

    // Add more event listeners for other types of events as needed

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default WebSocketService;