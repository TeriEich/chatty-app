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
      user: { name: 'Anonymous'},
      messages: [
        {
          id: 5001,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 5002,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ],
      counter: 5004
    };
    // this._getMessage = this._getMessage.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 5003, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.user.name} _getMessage={this._getMessage} />
      </div>
    );
  }

  _getMessage = newMessageInput => {

    const newMessage = {
        id: this.state.counter,
        username: this.state.user.name,
        content: newMessageInput
      };
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    const oldCounter = this.state.counter;
    const newCounter = oldCounter + 1;
    this.setState({
      messages: newMessages,
      counter: newCounter
    });
  }
}


export default App;

