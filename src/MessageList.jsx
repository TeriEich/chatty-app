import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log('MessageList props: ', this.props);
    const messages = this.props.messages;
    return (
      <main className="messages">
        { messages.map((message) =>
          <Message key={message.id} type={message.type} username={message.username} content={message.content} />
        )}
      </main>
    );
  }
  // const messages = props.messages;

  // let listMessage = [];

  //   for (let message of messages) {
  //     if (message.type === 'incomingNotification') {
  //       listMessage = messages.map((message) =>
  //         <div className="notification">
  //           <span className="notification-content" key={message.id}>
  //             {message.oldName} changed their name to {message.name}.
  //           </span>
  //         </div>
  //       );
  //     } else {
  //     listMessage = messages.map((message) =>
  //       <div className="message" key={message.id}>
  //         <span className="message-username">{message.username}</span>
  //         <span className="message-content">{message.content}</span>
  //       </div>
  //       );
  //     }

  //   }
  //   return <div>{listMessage}</div>;

}

export default MessageList;