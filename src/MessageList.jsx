import React, {Component} from 'react';

function MessageList(props) {
  const messages = props.messages;
  const listMessage = messages.map((message) =>
    <div className="message" key={message.id}>
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );

  return (
    <div>
      {listMessage}
    </div>
  );
}

export default MessageList;