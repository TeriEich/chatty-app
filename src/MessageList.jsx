import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages;

    return (
      <main className="messages">
        { messages.map((message) =>
          <Message key={message.id} type={message.type} username={message.username} content={message.content} />
        ) }
      </main>
    );
  }

}

export default MessageList;