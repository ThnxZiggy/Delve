import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.scss';

import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Sidebar from './Sidebar';
import About from './About';

import partyConfetti from "../helpers/confetti.js"




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
    room: {id: -1},
    makingRoom: false,
    aboutPage: false,
    sessionComplete: false
  });

  const [roomsList, setRoomsList] = useState([]);
  const [theme, setTheme] = useState('App light')
  
  // useEffect(() =>{
  //   axios.get('/rooms')
  //     .then(res => {
  //       const unfilteredRooms = res.data;
  //       const filteredRooms = unfilteredRooms.filter(room => room.user_1_id === state.user.id || room.user_2_id === state.user.id || room.user_3_id === state.user.id || room.user_4_id === state.user.id)
  //       console.log('filteredRooms', filteredRooms);
  //       socket.emit('join_room', filteredRooms[0].id);
  //       setState(prev => ({...prev, room:filteredRooms[0]}));
  //     })
  // }, [state.user])

  useEffect(() =>{
    axios.get('/rooms')
      .then(res => {
        const unfilteredRooms = res.data;
        const filteredRooms = unfilteredRooms.filter(room => room.user_1_id === state.user.id || room.user_2_id === state.user.id || room.user_3_id === state.user.id || room.user_4_id === state.user.id)
        console.log('filteredRooms', filteredRooms);
        if (filteredRooms[0]){
          socket.emit('join_room', filteredRooms[0].id);
          setState(prev => ({...prev, room:filteredRooms[0]}));
        }
      })
  }, [state.user])

  return (
    <div className={theme}>
      <div className='banner'>
        DELVE
        <span className="theme__icons">
          <i className="fa-solid fa-sun" onClick={() => setTheme('App light')}></i>
          <i className="fa-solid fa-moon" onClick={() => {setTheme('App dark')}}></i>
          <i className="fa-solid fa-cake-candles" onClick={() => {setTheme('App party'); partyConfetti()}}></i>
        </span>
      </div>

      {state.user.name && <Nav socket={socket} user={state.user} onClick={setState} state={state}/>}
      {state.aboutPage && <About setState={setState}/>}
      <header className="App-header" style={{display: 'flex',}}>
        {state.user.name && !state.makingRoom && <Sidebar socket={socket} user={state.user} setState={setState} state={state} roomsList={roomsList} setRoomsList={setRoomsList}/>}
        {state.user.name && state.room.id > 0 && <Dashboard roomsList={roomsList} setRoomsList={setRoomsList} setState={setState} socket={socket} user={state.user} room={state.room} makingRoom={state.makingRoom} sessionComplete={state.sessionComplete}/> }
        {!state.user.name && <Login socket={socket} onSubmit={setState}/>}
        {state.user.name && state.room.id < 0 && <h1>starting page</h1> }
      </header>
    </div>
  );
}

export default App;
