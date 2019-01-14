import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      clients: '',
      currentUser: {
        name: 'Anonymous'},
      messages: []
    };

  }

  componentDidMount() {

    //Creates a new WebSocket
    this.socket = new WebSocket("ws://localhost:3001/");

    //Logs message whenever the socket receives a message from the server:
    this.socket.onmessage = event => {
      const json = JSON.parse(event.data);

      switch (json.type) {
        case 'newClientConnected':
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

  }

  //sends data for name change to WebSocket server and updates state of current user's name
  //called in ChatBar.jsx
  _postNotification = (newUsername, oldUsername) => {
    const newUser = {name: newUsername};
    const notificationToSend = {
      type: 'postNotification',
      content: 'User ' + oldUsername + ' changed their name to ' + newUsername
    };
    this.setState({ currentUser: newUser})
    this.socket.send(JSON.stringify(notificationToSend));
  };

  //sends data for new message to WebSocket server
  //called in ChatBar.jsx
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

