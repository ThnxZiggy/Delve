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
import confetti from 'canvas-confetti';
// STEP 2: make the connection
const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

const socket = io.connect(socketURL, {secure: true});

// all listeners of socket.io we build will be inside of the useEffect

//confetti
require('canvas-confetti');
// const myCanvas = document.createElement('canvas');
// document.body.appendChild(myCanvas);

// const myConfetti = confetti.create(myCanvas, {
//   resize: true,
//   useWorker: true
// });
// myConfetti({
//   particleCount: 1500,
//   spread: 1600
//   // any other options from the global
//   // confetti function
// });

function App() {
  const [state, setState] = useState({
    user: {},
    room: {},
    makingRoom: false,
  });

  const [theme, setTheme] = useState('App light')
  
  useEffect(() =>{
    axios.get('/rooms')
      .then(res => {
        socket.emit('join_room', res.data[0].id);
        setState(prev => ({...prev, room:res.data[0]}));
      })
  }, [state.user])

//   party(event) {
//     setTheme('App party');
//     myConfetti();
//  }



   const partyConfetti = () => {
     
    var end = Date.now() + (15 * 400);
    
    (function frame() {
      //bottom
      confetti({
        // startVelocity: 55,
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y:1 },
      });
      confetti({
        // startVelocity: 55,
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y:1 },
      });

      //top corners
      confetti({
        startVelocity: 30,
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0 },
      });

      confetti({
        startVelocity: 30,
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0 },
      });

      //top middle
      // confetti({
      //   startVelocity: 30,
      //   particleCount: 2,
      //   angle: 120,
      //   spread: 55,
      //   origin: { x: .3, y: 0 },
      // });

      // confetti({
      //   startVelocity: 30,
      //   particleCount: 2,
      //   angle: 120,
      //   spread: 55,
      //   origin: { x: .87, y: 0 },
      // });

      // confetti({
      //   particleCount: 2,
      //   angle: 120,
      //   spread: 55,
      //   origin: { y: 0 },
      // });

      // requestAnimationFrame(frame)
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    }



  return (
    <div className={theme}>
      <span className="theme__icons">
      <i className="fa-solid fa-sun fa-3x" onClick={() => setTheme('App light')}></i>
      <i className="fa-solid fa-moon fa-3x" onClick={() => {setTheme('App dark')}}></i>
      <i className="fa-solid fa-cake-candles fa-3x" onClick={() => {setTheme('App party'); partyConfetti()}}></i>
      </span>

      {state.user.name && <Nav socket={socket} user={state.user} onClick={setState} state={state}/>}
      <header className="App-header" style={{display: 'flex',}}>
        {state.user.name&& !state.makingRoom && <Sidebar socket={socket} user={state.user} onClick={setState} state={state}/>}
        {state.user.name ? <Dashboard setState={setState} socket={socket} user={state.user} room={state.room} makingRoom={state.makingRoom} /> : <Login socket={socket} onSubmit={setState}/>}
      </header>
    </div>
  );
}

export default App;
