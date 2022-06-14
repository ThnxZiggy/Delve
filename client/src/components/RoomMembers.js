import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function RoomMembers({room, user}) {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    axios.get(`/rooms/members/${room.id}`)
      .then(res => {
        // response gives back a list of the user objects //
        const usersObjectArray = res.data;
        const usersNameArray = usersObjectArray.map(obj => obj = obj.name);
        for (let i = 0; i < usersNameArray.length; i++) {
          if (usersNameArray[i] === user.name) {
            usersNameArray.splice(i, 1);
            usersNameArray.push('me');
          }
        }
        
        setMemberList(usersNameArray);
      })
  }, [room])

  return (
    <div>
      <h3>Room Members:</h3>
      {memberList.map(member => {
          return (
              <div>{member}</div>
          )
        })}
    </div>
  )
}