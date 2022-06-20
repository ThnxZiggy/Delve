import React from 'react';

export default function Nav({user, setState, socket, state}) {

  const logout = () => {
    setState(prev => ({...prev,room:{id: -1}, user:{}, makingRoom: false, aboutPage: false}));

    const leaveRoomData = {
      room: state.room,
      user,
    }

    socket.emit('leave_room', leaveRoomData);
  }

  const makeRoom = () => {
    if (state.makingRoom) {
      setState(prev => ({...prev, makingRoom: false, aboutPage: false}))
    }else {
      setState(prev => ({...prev, makingRoom: true, aboutPage: false}))
    }
  }

  const showAboutPage = () => {
    if (state.aboutPage) {
      setState(prev => ({...prev, aboutPage: false}))
    }else {
      setState(prev => ({...prev, aboutPage: true}))
    }
  }

  const homePage = () => {
    setState(prev => ({...prev, aboutPage: false, makingRoom: false, room: {id: -1}}))

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
        <div><button onClick={showAboutPage} type="button">About Us</button></div>
        <div><button onClick={makeRoom} type="button">Create New Room</button></div>
        <div><button onClick={logout} type="button">Logout</button></div>
      </div>
    </div>
  )
}