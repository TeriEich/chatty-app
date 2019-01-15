# Chatty App

Chatty App is a real time web application using ReactJS and WebSockets.

## Usage

1. Fork and clone this repository.
2. Install the dependencies using ```npm install```.
3. Start the WebSockets server from the chatty-server directory using ```npm start```. WebSockets server is hosted at <http://localhost:3001>.
4. In a new terminal instance, start the client server from the chatty-app directory using ```npm start```.
5. Open <http://localhost:3000>.

## Dependencies

### Root Directory

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom

### WebSockets Server Directory

* express
* ws
* uuid

## Screenshots

!["Screenshot of the app on initial page load, one user connected:"](https://github.com/TeriEich/chatty-app/blob/master/docs/chatty-app-initial.png?raw=true)

!["Screenshot of the app (open in three tabs) with three users connected, sending messages, and changing their usernames:"](https://github.com/TeriEich/chatty-app/blob/master/docs/chatty-app-multi.png?raw=true)

!["Screenshot of the app (open in two tabs) after a user has left:"](https://github.com/TeriEich/chatty-app/blob/master/docs/chatty-app-user-left.png?raw=true)