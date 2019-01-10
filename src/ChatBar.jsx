import React, {Component} from 'react';

function ChatBar(props) {

  const _sendNewUsername = evt => {
    const newUsername = evt.target.value;
    console.log('newUsername: ', newUsername);
    return props._updateUsername(newUsername);
  };

  const _messageOnEnter = evt => {
    if (evt.key === 'Enter') {
      const newMessageInput = evt.target.value;
      evt.target.value = '';
      return props._getMessage(newMessageInput);
    }
  };

  return (
    <footer className="chatbar" onKeyPress={_messageOnEnter} >
      <input className="chatbar-username" type="text" name='currentUser' placeholder={props.currentUser} onChange={_sendNewUsername} />
      <input className="chatbar-message" type="text" name='messageInput' placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

export default ChatBar;
