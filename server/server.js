const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3030;
// Key: userId, Value: { socket: WebSocket, messages: [] }
const connectedUsers = new Map(); // object w the id and a list of msgs and websocket ? 
// if the user disc, remove the entire pair from map
// if they recon, add the object, new socket, and list? i guess this should ideally b on the database and pulled from

app.use(express.static(path.join(__dirname, "public")));

wss.on('connection', (socket, req) => {
  const userId = req.url.split("?userId=")[1];
  console.log("A user connected " + userId);

  connectedUsers.set(userId, { socket: socket, messages: [] });

  // Listen for messages from the client
  socket.on("message", (message) => {
    console.log("Received message:", message.toString());

    const user = connectedUsers.get(userId);
    if (user) {
      user.messages.push(message.toString());
    }

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== socket && message.toString() !== "client-connected") {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("A user disconnected");
    connectedUsers.delete(userId);
  });
});
// Default route 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Landing/landing.html"));
});

app.get('/connected-users', (req, res) => {
  // const result = [];
  // connectedUsers.forEach((value, userId) => {
  //     result.push({ userId, messages: value.messages });
  // });
  // res.json(result); // Respond with the list of users and their messages
  const { id } = req.query; 

  // on open form these messages r shown
  // append msg adds to this list
  const user = connectedUsers.get(id);
  if (user) {
      // Return the specific user's data
      res.json({ userId, messages: user.messages });
  } else {
      // Respond with an error if the user is not found
      res.status(404).json({ error: `User with ID ${userId} not found` });
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
