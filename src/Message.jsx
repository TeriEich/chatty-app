import React, {Component} from 'react';
import MessageList from './MessageList.jsx';


const Message = (props) => (
  <main className="messages">
    { props.messageList }
    <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>
  </main>
);

export default Message;