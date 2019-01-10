import React, {Component} from 'react';

function ChatBar(props) {

  const _messageOnEnter = evt => {
    if (evt.key === 'Enter') {
      const newMessageInput = evt.target.value;
      evt.target.value = '';
      return props._getMessage(newMessageInput, evt);
    }
  };

  return (
    <footer className="chatbar" >
      <input className="chatbar-username" name='currentUser' placeholder={props.currentUser} />
      <input className="chatbar-message" name='messageInput' placeholder="Type a message and hit ENTER" onKeyPress={_messageOnEnter} />
    </footer>
  );
}

export default ChatBar;
