import React, {Component} from 'react';

function MessageList(props) {
  const messages = props.messages;

  let listMessage = [];

    for (let message of messages) {
      if (message.type === 'incomingNotification') {
        listMessage = messages.map((message) =>
          <div className="notification">
            <span className="notification-content" key={message.id}>
              {message.oldName} changed their name to {message.name}.
            </span>
          </div>
        );
      } else {
      listMessage = messages.map((message) =>
        <div className="message" key={message.id}>
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
        );
      }

    }
    return <div>{listMessage}</div>;

}

export default MessageList;