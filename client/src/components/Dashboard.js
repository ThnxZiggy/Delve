import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import Chat from './Chat';
import NewRoom from './NewRoom';
import RoomMembers from './RoomMembers';
import Progress from './Progress';
import HomePageRooms from './HomePageRooms';
import HomePageNoRooms from './HomePageNoRooms';

import axios from 'axios';
import confetti from 'canvas-confetti';
// import Video from './Video';

export default function Dashboard({roomRef, memberList, setMemberList, roomsList, setRoomsList, socket, setState, state}) {

  const [url, setUrl] = useState("");
  const [roomChangeMessage, setRoomChangeMessage] = useState("");

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  }

  useEffect(() => {
    setUrl('');
    setState(prev => ({...prev, sessionComplete: false}));

  },[state.room])

  useEffect(() => {
    socket.on('send_new_room', (roomData) => {
      if (roomData.user_1_id === state.user.id || roomData.user_2_id === state.user.id || roomData.user_3_id === state.user.id || roomData.user_4_id === state.user.id) {
        setRoomsList(prev => ([...prev, roomData]));
        setRoomChangeMessage(`${roomData.maker} has added you to room: ${roomData.name}!!`);
        setTimeout(() => {
          setRoomChangeMessage('');
        }, 2000)
      }
    })

    socket.on('complete_session_all', () => {
      setState(prev => ({...prev, sessionComplete: true}));
      confetti();
    })

    socket.on('send_delete_room', (deleteInfo) => {
      if (deleteInfo.deletedRoom.user_1_id === state.user.id || deleteInfo.deletedRoom.user_2_id === state.user.id || deleteInfo.deletedRoom.user_3_id === state.user.id || deleteInfo.deletedRoom.user_4_id === state.user.id) {
        
        setRoomsList(prev => prev.filter(room => room.id !== deleteInfo.deletedRoom.id));

        setRoomChangeMessage(`${deleteInfo.deleter.name} has deleted room: ${deleteInfo.deletedRoom.name}`);
        setTimeout(() => {
          setRoomChangeMessage('');
        }, 2000)
      }
    })

    socket.on('added_to_room_info', (addedData) => {
      if (state.user.name === addedData.addedUser) {
        setRoomsList(prev => ([...prev, addedData.room]));

        setRoomChangeMessage(`${addedData.adder.name} has added you to room: ${addedData.room.name}`);
        setTimeout(() => {
          setRoomChangeMessage('');
        }, 2000)
      }

      if (roomRef.current.id === addedData.room.id) {
        setMemberList(prev => (prev.length < 4 ? [addedData.addedUser, ...prev] : [addedData.addedUser, ...prev.filter(user => user !== 'ADDMEMBER101')]));
      }
    })

  }, [socket])

  const addCompletedSession = () => {
    axios.post(`/rooms/session/${state.room.id}`).then(res => {
      setState(prev => ({...prev, sessionComplete: true}));
      socket.emit('complete_session', state.room.id);
    })
  }

  return (
    <div className="dashboard">

      {state.makingRoom && <NewRoom roomsList={roomsList} setRoomsList={setRoomsList} user={state.user} setState={setState} socket={socket}/>}

      {state.room.id < 0 &&
        <div>
          {roomChangeMessage && <div className="room-change-message">{roomChangeMessage}</div>}
          {roomsList.length > 0 ? 
            <HomePageRooms/> : 
            <HomePageNoRooms setState={setState}/>
          }
        </div>
      }

      {state.room.id > 0 &&
        <div className="room-container">
          
          {roomChangeMessage && <div className="room-change-message">{roomChangeMessage}</div>}
          
          <span className='current-activity'>
            {state.sessionComplete ? <button className='great-work'>&#x2605;</button> :<button onClick={() => {addCompletedSession(); confetti()}} className="mark-complete">&#10003;</button>}
            <h1>{state.room.name}</h1>
            <Progress state={state}/>
          </span>
          <div style={{display: "flex"}}>
            <div className={"me-4"}>
              <input 
                style={{width: "640px", marginBottom: "20px", height: "30px", fontSize: "17px", borderRadius: "5px"}} 
                onChange={handleURLChange} 
                type="text"
                value={url}
                placeholder="Input video url" 
              />
              <ReactPlayer playing={true} style={{border: "solid 1px black",   backgroundImage: "url(" + "../images/delve-logo-11.jpg" + ")",}} url={url} controls={true}/>
            </div>
            <Chat socket={socket} user={state.user} room={state.room} setUrl={setUrl}/>
            <RoomMembers memberList={memberList} setMemberList={setMemberList} socket={socket} room={state.room} user={state.user}/>
            
          </div>
        </div>
      }
    </div>
  )
}