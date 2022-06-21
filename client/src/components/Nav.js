import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import {Tab, Nav} from 'react-bootstrap';
// const util = require('util')

export default function Nav({user, onClick, socket, state}) {
  const [roomsList, setRoomsList] = useState([]);
  const [room, setRoom] = useState({})

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        setRoomsList((prev) => [...res.data]);
        setRoom(res.data[0]);
      })
  }, [])

  // const changeRoom = (e) => {
  //   const thisRoom = roomsList.filter(room => room.name === e.target.value)[0];
  //   setRoom(prev => thisRoom);
  //   console.log('This room', thisRoom);
  //   console.log('Target value', e.target.value);
  //   console.log(roomsList);
  //   socket.emit('leave_room', state.room.id);
  //   socket.emit('join_room', thisRoom.id);
  //   onClick(prev => ({...prev, room: thisRoom}));
  // }

  const logout = () => {
    onClick(prev => ({...prev,room:{id: -1}, user:{}, makingRoom: false, aboutPage: false}));

    const leaveRoomData = {
      room: state.room,
      user,
    }

    socket.emit('leave_room', leaveRoomData);
  }

  const makeRoom = () => {
    if (state.makingRoom) {
      onClick(prev => ({...prev, makingRoom: false, aboutPage: false}))
    }else {
      onClick(prev => ({...prev, makingRoom: true, aboutPage: false}))
    }
  }

  const showAboutPage = () => {
    if (state.aboutPage) {
      onClick(prev => ({...prev, aboutPage: false}))
    }else {
      onClick(prev => ({...prev, aboutPage: true}))
    }
  }

  const homePage = () => {
    onClick(prev => ({...prev, aboutPage: false, makingRoom: false, room: {id: -1}}))

    const leaveRoomData = {
      room: state.room,
      user,
    }

    socket.emit('leave_room', leaveRoomData);
  }

  return (
    <div class="d-flex">
      <div className='nav-banner welcome'>
        <h1>Welcome {user.name}!</h1>
      </div>
      <div className="nav-banner buttons">
        <div><button onClick={homePage} type="button">Home</button></div>
        <div><button onClick={makeRoom} type="button">Create New Room</button></div>
        <div><button onClick={showAboutPage} type="button">About Us</button></div>
        <div><button onClick={logout} type="button">Logout</button></div>
      </div>
    </div>
  )
}