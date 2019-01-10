import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      // loading: true,
      currentUser: { name: 'Anonymous'},
      messages: [],
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
    };

    //Logs message whenever the socket receives a message from the server:
    this.socket.onmessage = payload => {
      console.log(`Got message from the server: ${payload}`);
      const json = JSON.parse(payload.data);
      console.log('json: ', json);

      switch (json.type) {
        case 'text-message':
          this.setState({
            messages: [...this.state.messages, json],
            });
          break;
        case 'initial-messages':
          this.setState({ messages: json.messages });
          break;
        default:
      }
    };

    this.onclose = () => {
      console.log('Client disconnected');
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} _getMessage={this._getMessage} />
      </div>
    );
  }

  _getMessage = (newMessageInput) => {

    const objectToSend = {
      type: 'text-message',
      username: this.state.currentUser.name,
      content: newMessageInput
    };

    this.socket.send(JSON.stringify(objectToSend));
  }
}


export default App;

