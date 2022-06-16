import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Nav from './Nav';
import Chat from './Chat';
import NewRoom from './NewRoom';
import RoomMembers from './RoomMembers';
import axios from 'axios';
import confetti from 'canvas-confetti';
// import Video from './Video';

export default function Dashboard({roomRef, memberList, setMemberList, roomsList, setRoomsList, user, room, socket, makingRoom, sessionComplete, setState, state}) {

  const [url, setUrl] = useState("");
  const [roomChangeMessage, setRoomChangeMessage] = useState("")
  // const [sessionComplete, setSessionComplete] = useState(false)

  const handleURLChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  }

  useEffect(() => {
    setUrl('');
    setState(prev => ({...prev, sessionComplete: false}));

  },[room])

  useEffect(() => {
    socket.on('send_new_room', (roomData) => {
      console.log('sent room', roomData);
      if (roomData.user_1_id === user.id || roomData.user_2_id === user.id || roomData.user_3_id === user.id || roomData.user_4_id === user.id) {
        console.log('worked');
        setRoomsList(prev => ([...prev, roomData]));
        console.log('show')
        setRoomChangeMessage(`${roomData.maker} has added you to room: ${roomData.name}!!`);
        setTimeout(() => {
          console.log('close')
          setRoomChangeMessage('');
        }, 2000)
      }
    })

    socket.on('complete_session_all', () => {
      setState(prev => ({...prev, sessionComplete: true}));
      confetti();
    })

    socket.on('send_delete_room', (deleteInfo) => {
      if (deleteInfo.deletedRoom.user_1_id === user.id || deleteInfo.deletedRoom.user_2_id === user.id || deleteInfo.deletedRoom.user_3_id === user.id || deleteInfo.deletedRoom.user_4_id === user.id) {
        console.log('worked', deleteInfo);
        
        setRoomsList(prev => prev.filter(room => room.id !== deleteInfo.deletedRoom.id));

        setRoomChangeMessage(`${deleteInfo.deleter.name} has deleted room: ${deleteInfo.deletedRoom.name}`);
        setTimeout(() => {
          setRoomChangeMessage('');
        }, 2000)
      }
    })

    socket.on('added_to_room_info', (addedData) => {
      if (user.name === addedData.addedUser) {
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
    axios.post(`/rooms/session/${room.id}`).then(res => {
      setState(prev => ({...prev, sessionComplete: true}));
      socket.emit('complete_session', room.id);
    })
  }

  return (
    <div>

      {makingRoom && <NewRoom roomsList={roomsList} setRoomsList={setRoomsList} user={user} setState={setState} socket={socket}/>}

      {room.id < 0 &&
        <div>
          {roomChangeMessage && <p>{roomChangeMessage}</p>}
          {<h1>starting page</h1>}
        </div>
      }

      {room.id > 0 &&
        <div>
          {roomChangeMessage && <p>{roomChangeMessage}</p>}
          <span className='current-activity'>
            {sessionComplete ? <button className='great-work'>&#x2605;</button> :<button onClick={() => {addCompletedSession(); confetti()}} className="mark-complete">&#10003;</button>}
            <h1>{room.name}</h1>
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
              <ReactPlayer playing={true} style={{border: "solid 2px black"}} url={url} controls={true}/>
            </div>
            <Chat socket={socket} user={user} room={room} setUrl={setUrl}/>
            <RoomMembers memberList={memberList} setMemberList={setMemberList} socket={socket} room={room} user={user}/>
          </div>
        </div>
      }

    </div>
  )
}