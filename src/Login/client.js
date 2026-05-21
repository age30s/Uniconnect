// websocket.js
// export const socket = new WebSocket('ws://localhost:3030');

// // Handle WebSocket events
// socket.addEventListener("open", () => {
//   socket.send('connecting');

//   console.log("Connected to WebSocket server!");
// });

// socket.addEventListener("message", (event) => {
//   console.log("Message from server:", event.data);
// });

// socket.addEventListener("close", () => {
//   console.log("WebSocket connection closed");
// });

// socket.addEventListener("error", (error) => {
//   console.error("WebSocket error:", error);
// });

// // Export the WebSocket instance
// export default socket;

import { getSocket } from '../websocket.js';

const socket = getSocket();

// Handle WebSocket events
// socket.on("open", () => {
//   socket.send('connecting');
  
//   console.log("Connected to WebSocket server!");
// });




// create a chattab for each friend instance
// store the ids on the server, when a chat is sent, send w the id of the reciever
// if the reciever is also stored on the server, update their chat tab if they check
// do this by setting the chat tab to render a list of messages when opened 
// id, [list of msgs]