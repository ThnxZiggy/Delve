import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Nav from './Nav';
import Chat from './Chat';
import NewRoom from './NewRoom';
import axios from 'axios';
// import Video from './Video';

export default function Dashboard({user, room, socket, makingRoom, sessionComplete, setState}) {

  const [url, setUrl] = useState("");
  // const [sessionComplete, setSessionComplete] = useState(false)

  const handleURLChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  }

  useEffect(() => {
    setUrl('');
    setState(prev => ({...prev, sessionComplete: false}));
  },[room])

  const addCompletedSession = () => {
    axios.post(`/rooms/session/${room.id}`).then(res => {
      setState(prev => ({...prev, sessionComplete: true}));
    })
  }

  return (
    <div>
    { makingRoom ? (
      <NewRoom user={user} setState={setState}/>
      ) : (
        <div>
          <h1>{room.name}</h1>
          {sessionComplete ? <p>Great Work!</p> :<button onClick={addCompletedSession}>Session Complete!</button>}
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
          </div>
        </div>
      )
    }
    </div>
  )
}