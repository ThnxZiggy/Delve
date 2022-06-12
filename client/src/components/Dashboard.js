import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Nav from './Nav';
import Chat from './Chat';
// import Video from './Video';

export default function Dashboard({user, room, socket}) {

  const [url, setUrl] = useState("");

  const handleURLChange = (event) => {
    setUrl(event.target.value);
    console.log(url)
  }



  return (
    <div>
      <h1>{room.name}</h1>
      <div style={{display: "flex"}}>
        <div className={"me-4"}>
          <input 
            style={{width: "640px", marginBottom: "20px", height: "30px", fontSize: "17px", borderRadius: "5px"}} 
            onChange={handleURLChange} 
            type="text" 
            placeholder="Input video url" 
          />
          <ReactPlayer style={{border: "solid 2px black"}} url={url} controls={true}/>
        </div>
        <Chat socket={socket} user={user} room={room}/>
      </div>
      {/* <Video socket={socket} room={room}/> */}
    </div>
  )
}