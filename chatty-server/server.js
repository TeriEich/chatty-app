const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Create the WebSockets server
const wss = new SocketServer({ server });

const messageDatabase = [];

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');
  console.log('wss.clients.size: ', wss.clients.size);
  const objectToBroadcast = {
    type: 'newClientConnected',
    clientCount: wss.clients.size
  }
  wss.broadcastJSON(objectToBroadcast);

  // ws.on('connection', data => {
  //   console.log('websocket connection data: ', data);
  //   const clientData = JSON.parse(data);
  //   const clientDataToBroadcast = {
  //     type: clientData.type,
  //     clientCount: wss.clients.size
  //   }
  //   broadcastJSON(clientDataToBroadcast);
  // });

  ws.on('message', data => {
    const objData = JSON.parse(data);
    console.log('objData: ', objData);

    switch (objData.type) {
      // case 'newClientConnected':
      //   const updateToBroadcast = {
      //     clientCount: wss.clients.size,
      //       type: 'newClientConnected'
      //   };
      //   wss.broadcastJSON(updateToBroadcast);
      //   break;
      case 'postMessage':
        console.log(`Got message from the client: User ${objData.username} said ${objData.content}`);
        const objectToBroadcast = {
          id: uuidv4(),
          type: 'incomingMessage',
          username: objData.username,
          content: objData.content
        };
        messageDatabase.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      case 'postNotification':
        console.log(`Got message from the client: ${objData.content}`);
        const objContent = objData.content;
        objectToBroadcast = {
          id: uuidv4(),
          type: 'incomingNotification',
          content: objContent.toString()
        };
        messageDatabase.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      default:
    }
  });

  const initialMessage = {
    type: 'initial-messages',
    messages: messageDatabase
  };

  ws.send(JSON.stringify(initialMessage));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    const objectToBroadcast = {
      type: 'newClientConnected',
      clientCount: wss.clients.size
    }
  wss.broadcastJSON(objectToBroadcast);
  });
});

