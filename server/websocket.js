// websocket.js
let socket;

export const getSocket = () => {
  if (!socket) {
    socket = new WebSocket('ws://localhost:3030');

    socket.onopen = () => {
      console.log("WebSocket connected!");
      socket.send('client-connected'); // Send a message upon initial connection
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      // Handle incoming messages globally if needed
      console.log("Received:", event.data);
    };
  }
  return socket;
};