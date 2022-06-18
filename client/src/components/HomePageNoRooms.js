import React, {useState, useEffect} from 'react';

export default function HomePageNoRooms({state, setState}) {

  return (
    <div className="homepage-no-rooms">
      <div className='welcome-message'>
        <p>Welcome to</p><h1 className='app-name'>DELVE</h1>
      </div>
      <div className="homepage-message-no-rooms">
          Create a room, add some friends, and start Delving!
          <button onClick={() => setState(prev => ({...prev, makingRoom: true}))}>Create New Room</button>
      </div>
    </div>
  )
}