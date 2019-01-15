import React from 'react';

function ChatBar(props) {

  //sends updated user name to App.jsx
  const _sendNewUsername = evt => {
    const oldUsername = props.currentUser;
    const newUsername = evt.target.value;
    if (newUsername !== oldUsername && newUsername) {
      return props._postNotification(newUsername, oldUsername);
    }
  };

  //sends new message data to App.jsx
  const _messageOnEnter = evt => {
    if (evt.key === 'Enter') {
      const newMessageInput = evt.target.value;
      evt.target.value = '';

      return props._postMessage(newMessageInput);
    }
  };

  return (
    <footer className="chatbar" onKeyPress={_messageOnEnter} >
      <input className="chatbar-username" type="text" name='currentUser' placeholder={props.currentUser} onBlur={_sendNewUsername} />
      <input className="chatbar-message" type="text" name='messageInput' placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

export default ChatBar;
