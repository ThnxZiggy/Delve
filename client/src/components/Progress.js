import React, { useEffect } from 'react';
import {CircleProgress} from 'react-gradient-progress'


export default function Progress({state}) {

  return (
    <div className='progress-bar'>
    {state.room.session_number >= state.room.session_goal
    ? 
    <div>
      <h5>
      <CircleProgress percentage={100} strokeWidth={3} width={55} primaryColor={['#9eecd5', '#45d5aa']} fontSize={'1rem'}/>
      &ensp; Goal: {state.room.goal || 10}
          {/* Sessions Completed: {state.sessionComplete ? state.room.session_number + 1 : state.room.session_number} */}
          </h5>
    </div>
    :
    <div>
        <div>
        { state.sessionComplete ?
        <div>
          <h5>
          <CircleProgress percentage={Math.floor((state.room.session_number + 1) / state.room.session_goal * 100)} strokeWidth={3} width={55} primaryColor={['#9eecd5', '#45d5aa']} fontSize={'1rem'}/>
          &ensp; Goal: {state.room.goal || 10}
          {/* Sessions Completed: {state.room.session_number + 1} */}
          </h5>
        </div>
        :
        <div >
          <h5>
          <CircleProgress percentage={Math.floor(state.room.session_number / state.room.session_goal * 100)} strokeWidth={3} width={55} primaryColor={['#9eecd5', '#45d5aa']} fontSize={'1rem'}/>
          &ensp; Goal: {state.room.goal || 10}
          {/* Sessions Completed: {state.room.session_number} */}
          </h5>
        </div>
        }
      </div>
    </div>
    }
    </div>
  )
}