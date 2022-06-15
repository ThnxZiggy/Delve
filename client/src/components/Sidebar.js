import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import {Tab, Nav} from 'react-bootstrap';
// const util = require('util')

export default function Sidebar({user, onClick, socket, state, roomsList, setRoomsList}) {
  // const [roomsList, setRoomsList] = useState([]);
  // console.log('changes made');
  const [room, setRoom] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        const unfilteredRooms = res.data;
        const filteredRooms = unfilteredRooms.filter(room => room.user_1_id === user.id || room.user_2_id === user.id || room.user_3_id === user.id || room.user_4_id === user.id)
        console.log(filteredRooms);
        setRoomsList((prev) => [...filteredRooms]);
        setRoom(filteredRooms[0]);
      })
  }, [state.sessionComplete])

  const changeRoom = (e) => {
    const thisRoom = roomsList.filter(room => room.name === e.currentTarget.value)[0];
    setRoom(prev => thisRoom);

    // console.log('This room', thisRoom);
    // console.log('Target',e.currentTarget);
    // console.log('Target value', e.currentTarget.value);
    // console.log(roomsList);

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

  const deleteRoom = (e, thisRoom) => {
    e.stopPropagation()
    setConfirmDelete(thisRoom);
    // axios.post(`/rooms/delete/${}`)
  }

  const deleteConfirmed = () => {
    axios.put(`/rooms/delete/${confirmDelete.id}`)
      .then((res) => {
        setConfirmDelete(false)
        console.log(roomsList);
        const deletedRoom = res.data.rows[0]
        const filteredRooms = roomsList.filter(room => room.id !== deletedRoom.id);
        setRoomsList(filteredRooms);
      })
  }
  
  return (
    <div>
      <div>
        {confirmDelete && 
          <div>
            <p>Are You Sure you want to delete {confirmDelete.name}</p>
            <button onClick={deleteConfirmed}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        }
        {roomsList.map(thisRoom => {
          return (
              <div><button 
              onClick={changeRoom} 
              value={thisRoom.name}
              // style={{border: "2px solid black", width: "200px"}}
              class={state.room.name === thisRoom.name ? "bg-success" : "bg-primary"}
            >
              <h3>{thisRoom.name}</h3> <button onClick={(e) => deleteRoom(e, thisRoom)}>X</button>
              <h2>{thisRoom.date_time}</h2>
              <h6>Sessions Completed:{thisRoom.session_number}</h6>
            </button></div>
          )
        })}
      </div>
    </div>
  )
}