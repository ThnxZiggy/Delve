import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import {Tab, Nav} from 'react-bootstrap';

export default function Nav({user, onClick, socket, state}) {
  const [roomsList, setRoomsList] = useState([]);
  const [room, setRoom] = useState('')

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        setRoomsList((prev) => [...res.data])
        setRoom(res.data[0].name)
      })
  }, [])

  const changeRoom = (e) => {
    setRoom(prev => e.target.value);
    // console.log(e.target.value);
    socket.emit('leave_room', state.room)
    socket.emit('join_room', e.target.value);
    onClick(prev => ({...prev, room: e.target.value}));
  }

  const logout = () => {
    onClick(prev => ({...prev, user:""}));
  }
  
  return (
    <div class="d-flex justify-content-between">
      <div><h1>Welcome {user.name}!</h1></div>
      <div>
        {roomsList.map(thisRoom => {
          return (
            <button onClick={changeRoom} value={thisRoom} type="button" class={ room === thisRoom.name ? "btn btn-success" : "btn btn-primary"}>{thisRoom.name}</button>
          )
        })}
      </div>
      <div><button onClick={logout} type="button" class="btn btn-danger">Logout</button></div>
    </div>
  )
}