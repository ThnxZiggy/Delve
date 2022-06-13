import React from 'react';
import axios from 'axios';

export default function NewRoom({onClick}) {
  return (
    <div>
      <h1>Functioning</h1>
  
      <button onClick={() => onClick(prev => ({...prev, makingRoom: false}))}>Go Back</button>
    </div>
  )
}