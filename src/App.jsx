import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      // loading: true,
      clients: '',
      currentUser: {
        name: 'Anonymous'},
      messages: []
    };

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 5003, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    //Creates a new WebSocket
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
      // const clientInstance = {
        // type: 'newClientConnected'
      // };
      // this.socket.send(JSON.stringify(clientInstance));
      // console.log('client connect event: ', event);
    };

    //Logs message whenever the socket receives a message from the server:
    this.socket.onmessage = event => {
      console.log(`Got message from the server: ${event}`);
      const json = JSON.parse(event.data);
      console.log('json: ', json);

      switch (json.type) {
        case 'newClientConnected':
          console.log('client - newClient', json.clientCount);
          this.setState({
            clients: json.clientCount
          });
          break;
        case 'incomingMessage':
          this.setState({
            messages: [...this.state.messages, json]
            });
          break;
        case 'incomingNotification':
          this.setState({
            messages: [...this.state.messages, json]
          });
          break;
        case 'initial-messages':
          this.setState({ messages: json.messages });
          break;
        default:
          //show error in console if message type is unknown
          throw new Error("Unknown event type" + data.type);

      }
    };

    this.onclose = () => {
      console.log('Client disconnected');
    };
  }

  _postNotification = (newUsername, oldUsername) => {
    const newUser = {name: newUsername};
    console.log('n, o: ', newUsername, oldUsername);
    const notificationToSend = {
      type: 'postNotification',
      content: 'User ' + oldUsername + ' changed their name to ' + newUsername
    };
    this.setState({ currentUser: newUser})
    this.socket.send(JSON.stringify(notificationToSend));
  };

  _postMessage = (newMessageInput) => {
    const username = this.state.currentUser.name;
    const objectToSend = {
      type: 'postMessage',
      username: username,
      content: newMessageInput
    };

    this.socket.send(JSON.stringify(objectToSend));
  };

  render() {
    return (
      <div>
        <NavBar userCount={this.state.clients} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} _postNotification={this._postNotification} _postMessage={this._postMessage} />
      </div>
    );
  }
}


export default App;

