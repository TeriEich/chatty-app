import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
  render() {
    const message = this.props;
    const username = message.username;
    switch (message.type) {
      case 'incomingNotification':
        return (
          <div className="notification">
               <span className="notification-content" key={message.id}>
                 {message.content}
               </span>
             </div>
        );
        break;
      case 'incomingMessage':
        return (
          <div className="message" key={message.id}>
           <span className="message-username">{message.username}</span>
           <span className="message-content">{message.content}</span>
         </div>
          );
        break;
      default:
        return null;
    }
  }

}

export default Message;