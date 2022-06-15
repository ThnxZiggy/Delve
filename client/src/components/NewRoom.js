import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function NewRoom({setState, user, socket}) {
  const [name, setName] = useState("");
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("");
  const [user4, setUser4] = useState("");
  // const [meetTime, setMeetTime] = useState("");
  const [errMsg, setErrMsg] = useState('');

  const createRoom = (e) => {
    e.preventDefault();

    axios.post(`/rooms/${user.id}`, {name, user2, user3, user4})
      .then(res => {
        if (typeof res.data !== "string") {
          const roomData = res.data.rows[0];
          roomData.maker = user.name
          setState(prev => ({...prev, makingRoom: false}))
          socket.emit('create_room', roomData)
        } else {
          console.log('false', res.data);
          setErrMsg(res.data);
        }
      })
  }

  return (
    <div className="create-room">
      <button onClick={() => setState(prev => ({...prev, makingRoom: false}))} className='back-button'><span>&#x2190;</span><br/>Back</button>
      <div className="create-room-form">
      <h1>Create a Room</h1>
    
        <form onSubmit={createRoom} >
        <p className="alert-danger">{errMsg}</p>
          <div className="form-entry">
            <input
              placeholder='Delve Subject'
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required 
            />
          </div>
          <div className="form-entry">
            <input 
              placeholder='Add Room Member (username)'
              type="text"
              id="user2"
              onChange={(e) => setUser2(e.target.value)}
              value={user2}
            />
          </div>
          <div className="form-entry">
            <input 
              placeholder='Add Room Member (username)'
              type="text"
              id="user3"
              onChange={(e) => setUser3(e.target.value)}
              value={user3}
            />
          </div>
          <div className="form-entry">
            <input 
              placeholder='Add Room Member (username)'
              type="text"
              id="user4"
              onChange={(e) => setUser4(e.target.value)}
              value={user4}
            />
          </div>
            {/* <input 
              type="text"
              id="meetTime"
              onChange={(e) => setMeetTime(e.target.value)}
              value={meetTime}
              required 
            /> */}

          <button type="submit" className="me-2">Create Room</button>
          
        </form>
        </div>
    </div>
  )
}