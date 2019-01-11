import React, {Component} from 'react';

function NavBar(props) {
  console.log('navBar props: ', props);
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="navbar-counter">{props.users.clientCount} users online</span>
    </nav>
    );
}

export default NavBar;
