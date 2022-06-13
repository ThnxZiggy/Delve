import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Nav from './Nav';
import Chat from './Chat';
import NewRoom from './NewRoom';
// import Video from './Video';

export default function Dashboard({user, room, socket, makingRoom, setState}) {

  const [url, setUrl] = useState("");
  // const [makingRoom, setMakingRoom] = useState(false);

  const handleURLChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  }

  // const showForm = () => {
  //   setState(prev => ({...prev, makingRoom: true}));
  // }



  return (
    <div>
    { makingRoom ? (
      <NewRoom user={user} setState={setState}/>
      ) : (
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
          {/* <button onClick={showForm}>Create Room</button> */}
        </div>
      )
    }
    </div>
  )
}