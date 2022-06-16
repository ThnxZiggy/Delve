import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
// import {Tab, Nav} from 'react-bootstrap';
// const util = require('util')

export default function Sidebar({roomRef, user, setState, socket, state, roomsList, setRoomsList}) {
  // const [roomsList, setRoomsList] = useState([]);
  // console.log('changes made');
  const [room, setRoom] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [sidebarRoomList, setSidebarRoomList] = useState([]);
  // const roomRef = useRef('');


  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        const unfilteredRooms = res.data;
        const filteredRooms = unfilteredRooms.filter(room => room.user_1_id === user.id || room.user_2_id === user.id || room.user_3_id === user.id || room.user_4_id === user.id)
        console.log(filteredRooms);
        setRoomsList(filteredRooms);
        // setRoom(filteredRooms[0]);
        setSidebarRoomList(filteredRooms);
      })
  }, [state.sessionComplete])

  useEffect(() => {
    socket.on('send_delete_room', (deleteInfo) => {
      console.log('roomRef', roomRef.current.id);
      console.log('deletedroom.id',deleteInfo.deletedRoom.id);
      if (roomRef.current.id === deleteInfo.deletedRoom.id) {
        console.log('got to set room');
        setState(prev => ({...prev, room:{id: -1}}));
        }
    })
  }, [socket])

  const changeRoom = (e) => {
    console.log('rooms list', roomsList[2].id);
    const currentID = parseInt(e.currentTarget.value);
    console.log(currentID);
    const thisRoom = roomsList.filter(el => el.id == currentID)[0];
    setRoom(prev => thisRoom);
    roomRef.current = thisRoom;
    console.log(roomRef);

    // console.log('This room', thisRoom);
    // console.log('Target',e.currentTarget);
    // console.log('Target value', e.currentTarget.value);
    // console.log(roomsList);
    const leaveRoomData = {
      room: state.room,
      user,
    }

    socket.emit('leave_room', leaveRoomData);
    
    console.log('this room', thisRoom);
    const joinRoomData = {
      room: thisRoom,
      user,
    }

    socket.emit('join_room', joinRoomData);

    setState(prev => ({...prev, room: thisRoom}));
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
        if (state.room.id === deletedRoom.id) {
          setState(prev => ({...prev, room:{id: -1}}));
        }
        
        const deleteInfo = {
          deletedRoom,
          deleter: user,
        }
        socket.emit('delete_room', deleteInfo)
      })
  }
  
  return (
    <div>
      <div>
        {confirmDelete && 
          <div className='delete-confirmation'>
            <p>Are you sure you want to delete <strong><em>{confirmDelete.name.toUpperCase()}</em></strong>?</p>
            <span className='yes-no'>
            <button onClick={deleteConfirmed} className='delete-yes'>Yes</button>
            <button onClick={() => setConfirmDelete(false)} className='delete-no'>No</button>
            </span>
          </div>
        }
        {roomsList.map(thisRoom => {
          return (
            <div>
              <button 
                onClick={changeRoom} 
                value={thisRoom.id}
                // style={{border: "2px solid black", width: "200px"}}
                class={state.room.id === thisRoom.id ? "bg-success" : "bg-primary"}
              >
              <h3>{thisRoom.name}</h3>
              <h2>{thisRoom.date_time}</h2>
              <i class="fa-solid fa-trash" onClick={(e) => deleteRoom(e, thisRoom)} ></i>
            </button></div>
          )
        })}
      </div>
    </div>
  )
}