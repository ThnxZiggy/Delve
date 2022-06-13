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
    aboutPage: false,
  });

  const [theme, setTheme] = useState('App light')
  
  useEffect(() =>{
    axios.get('/rooms')
      .then(res => {
        socket.emit('join_room', res.data[0].id);
        setState(prev => ({...prev, room:res.data[0]}));
      })
  }, [state.user])

  return (
    <div className={theme}>
      <button onClick={() => setTheme('App light')}>Light</button>
      <button onClick={() => setTheme('App dark')}>Dark</button>
      <button onClick={() => setTheme('App party')}>Party</button>
      {state.user.name && <Nav socket={socket} user={state.user} onClick={setState} state={state}/>}
      {state.aboutPage && <h1>state functioning</h1>}
      <header className="App-header" style={{display: 'flex',}}>
        {state.user.name&& !state.makingRoom && <Sidebar socket={socket} user={state.user} onClick={setState} state={state}/>}
        {state.user.name ? <Dashboard setState={setState} socket={socket} user={state.user} room={state.room} makingRoom={state.makingRoom} /> : <Login socket={socket} onSubmit={setState}/>}
      </header>
    </div>
  );
}

export default App;
