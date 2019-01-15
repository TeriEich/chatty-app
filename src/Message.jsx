import React, {Component} from 'react';

class Message extends Component {

  render() {

    const message = this.props;

    switch (message.type) {
      case 'incomingNotification':
        return (
          <div className="notification">
            <span className="notification-content" key={message.id}>
              {message.content}
            </span>
          </div>
        );
      case 'incomingMessage':
        return (
          <div className="message" key={message.id}>
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      default:
        return null;
    }
  }

}

export default Message;