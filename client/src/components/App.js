import { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import axios from 'axios';
import '../styles/App.scss';

import Nav from './Nav';
import Sidebar from './Sidebar';


// all we need to do is CONNECT to the backend socket server!
// STEP 0: Install socket.io-client <-- THE VER OF SERVER SOCKET.IO MUST MATCH
// STEP 1: import socket.io-client
import io from 'socket.io-client';
// STEP 2: make the connection
const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

const socket = io.connect(socketURL, {secure: true});

// all listeners of socket.io we build will be inside of the useEffect

function App() {
  const [state, setState] = useState({
    user: {},
    room: {},
    makingRoom: false,
  });
  
  useEffect(() =>{
    axios.get('/rooms')
      .then(res => {
        socket.emit('join_room', res.data[0].id);
        setState(prev => ({...prev, room:res.data[0]}));
      })
  }, [state.user])

  // useEffect(() => {
  //   console.log('RUNS ONLY ONCE!!');
  //   connection.on('INITIAL_CONNECTION', (data) => {
  //     console.log('DATA HAS COME FROM THE SERVER!');
  //     console.log(data);
  //     setUser(data.name);
  //     setUsers(data.userList);
  //   });

  //   connection.on('NEW_USER', (data) => {
  //     setUsers(prev => [...prev, data.name]);
  //   });
  // }, [])

  return (
    <div className="App">
      {state.user.name && <Nav socket={socket} user={state.user} onClick={setState} state={state}/>}
      <header className="App-header" style={{display: 'flex',}}>
        {state.user.name&& !state.makingRoom && <Sidebar socket={socket} user={state.user} onClick={setState} state={state}/>}
        {state.user.name ? <Dashboard setState={setState} socket={socket} user={state.user} room={state.room} makingRoom={state.makingRoom} /> : <Login socket={socket} onSubmit={setState}/>}
      </header>
    </div>
  );
}

export default App;
