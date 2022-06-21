import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/App.scss';

import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Sidebar from './Sidebar';
import About from './About';
import SignUp from './SignUp';
import io from 'socket.io-client';
import partyConfetti from "../helpers/confetti.js"

const { connect } = require('twilio-video');


// all we need to do is CONNECT to the backend socket server!
// STEP 0: Install socket.io-client <-- THE VER OF SERVER SOCKET.IO MUST MATCH
// STEP 1: import socket.io-client


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
    sessionComplete: false, 
    signingUp: false,
  });

  const [roomsList, setRoomsList] = useState([]);
  const [theme, setTheme] = useState('App light');
  const [memberList, setMemberList] = useState([]);
  const roomRef = useRef('');
  const [twilioRoom, setTwilioRoom] = useState(false);

  // useEffect(() =>{
  //   axios.get('/rooms')
  //     .then(res => {
  //       const unfilteredRooms = res.data;
  //       const filteredRooms = unfilteredRooms.filter(room => room.user_1_id === state.user.id || room.user_2_id === state.user.id || room.user_3_id === state.user.id || room.user_4_id === state.user.id)
  //       console.log('filteredRooms', filteredRooms);
  //       if (filteredRooms[0]){
  //         ///////////////////// uncomment if we want to start in a room!!!! /////////////////////////////////
  //         // socket.emit('join_room', filteredRooms[0].id);
  //         // setState(prev => ({...prev, room:filteredRooms[0]}));
  //       }
  //     })
  // }, [state.user])

  // useEffect(() => {
  //   if(state.user.name && state.room.id > 0) { 
  //     axios.get(`https://token-service3-2274-dev.twil.io/token?identity=${state.user.name}`)
  //     .then((res) => {
  //       console.log(`RES DATA: `,res.data)
  //       connect(res.data.accessToken, {
  //         name: state.room.id,
  //         audio: false,
  //         video: { width: 640 }
  //       })
  //       .then((res) => {
  //         console.log(`SECOND THEN: `,res)
  //         setTwilioRoom(res)
  //       })
  //     })
  //   }
  // },[state.user, state.room])
  
  
  return (
    <div className={theme}>
      <div className='banner'>
       <h1>DELVE</h1>
       {theme === "App party" && <div className="party"><span className="smiley-1">🥳</span><span className="smiley-2">🥳</span><span className="smiley-3">🥳</span></div>}

        <span className="theme__icons">
          <i className="fa-solid fa-sun" onClick={() => setTheme('App light')}></i>
          <i className="fa-solid fa-moon" onClick={() => {setTheme('App dark')}}></i>
          <i className="fa-solid fa-cake-candles" onClick={() => {setTheme('App party'); partyConfetti()}}></i>
        </span>
      </div>

      {state.user.name && <Nav socket={socket} user={state.user} onClick={setState} state={state}/>}
      {/* {theme === "App party" && <div className="party"><span className="smiley-1">🥳</span><span className="smiley-2">🥳</span><span className="smiley-3">🥳</span></div>} */}

      {state.aboutPage && <About setState={setState}/>}
      <header className="App-header" style={{display: 'flex'}}>
        {/* <div className="content"> */}
          <div class="box">
        {state.user.name && <Sidebar roomRef={roomRef} socket={socket} user={state.user} setState={setState} state={state} roomsList={roomsList} setRoomsList={setRoomsList}/>}
        {state.user.name && <Dashboard roomRef={roomRef} twilioRoom={twilioRoom} memberList={memberList} setMemberList={setMemberList} state={state} roomsList={roomsList} setRoomsList={setRoomsList} setState={setState} socket={socket} user={state.user} room={state.room} makingRoom={state.makingRoom} sessionComplete={state.sessionComplete}/> }
        {/* </div> */}
        </div>
        {!state.user.name && !state.signingUp && <Login socket={socket} setState={setState}/>}
        {!state.user.name && state.signingUp && <SignUp socket={socket} setState={setState}/>}
        
      </header>
      </div>
  );
}

export default App;
