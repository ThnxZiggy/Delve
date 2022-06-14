import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import {Tab, Nav} from 'react-bootstrap';
// const util = require('util')

export default function Sidebar({user, onClick, socket, state}) {
  const [roomsList, setRoomsList] = useState([]);
  const [room, setRoom] = useState({})

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        setRoomsList((prev) => [...res.data]);
        setRoom(res.data[0]);
      })
  }, [state.sessionComplete])

  const changeRoom = (e) => {
    const thisRoom = roomsList.filter(room => room.name === e.currentTarget.value)[0];
    setRoom(prev => thisRoom);

    console.log('This room', thisRoom);
    console.log('Target',e.currentTarget);
    console.log('Target value', e.currentTarget.value);
    console.log(roomsList);

    socket.emit('leave_room', state.room.id);
    socket.emit('join_room', thisRoom.id);
    onClick(prev => ({...prev, room: thisRoom}));
  }

  const logout = () => {
    onClick(prev => ({...prev, user:{}}));
  }
  const makeRoom = () => {
    onClick(prev => ({...prev, makingRoom:true}));
  }
  
  return (
    <div>
      <div>
        {roomsList.map(thisRoom => {
          return (
            //////////////Attempt to make clickable div ////////////////////
              <div><button 
              onClick={changeRoom} 
              value={thisRoom.name}
              style={{border: "2px solid black", width: "200px"}}
              class={state.room.name === thisRoom.name ? "bg-success" : "bg-primary"}
            >
              <h3>{thisRoom.name}</h3>
              <h2>{thisRoom.date_time}</h2>
              <h6>Sessions Completed:{thisRoom.session_number}</h6>
            </button></div>
          //////////////////////////////////////////////////////////////////
          ////////////////Working version with buttons /////////////////////
          //   <div><button 
          //   onClick={changeRoom} 
          //   value={thisRoom.name} 
          //   type="button" 
          //   class={ room.name === thisRoom.name ? "btn btn-success" : "btn btn-primary"}>
          //     {thisRoom.name}
          // </button></div>
          //////////////////////////////////////////////////////////////////
          )
        })}
      </div>
    </div>
  )
}