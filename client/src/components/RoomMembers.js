import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';

export default function RoomMembers({room, user, socket, memberList, setMemberList}) {
  // const [memberList, setMemberList] = useState([]);
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
        for (let i = 0; i < 4; i++) {
          if (!usersNameArray[i]) {
            usersNameArray.push("ADDMEMBER101");
            break;
          }
        }
        
        setMemberList(usersNameArray);
      })
  }, [room])

  const confirmAddMember = () => {
    if (newMember === "") {
      setErrMsg("member name cannot be blank");
      return
    }
    if (memberList.includes(newMember)) {
      setErrMsg(`${newMember} is already a member of ${room.name}`)
      setNewMember('')
      return
    }
    if (newMember === user.name) {
      setErrMsg(`You can't add yourself to a room`)
      setNewMember('')
      return
    }
    axios.put(`/rooms/members/add/${room.id}`, {userName: newMember})
      .then(res => {
        if (res.data !== 'success') {
          setErrMsg(res.data);
          setNewMember('');
          return
        }
        setMemberList(prev => (prev.length < 4 ? [newMember, ...prev] : [newMember, ...prev.filter(user => user !== 'ADDMEMBER101')]));
        setErrMsg('');
        setNewMember('');
        setAddingMember(false);
        const addedData = {
          room,
          addedUser: newMember,
          adder: user,
        }
        socket.emit('added_to_room', addedData)
      })
  }

  return (
    <div className="room-members">
      <h3>Members</h3>
      {errMsg && <p>{errMsg}</p>}
      {memberList.map((member) => {
        if (member === "ADDMEMBER101"){
          return (
            <div>
              {addingMember ? (
                <div>
                  <input 
                    placeholder='member name' 
                    value={newMember} 
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                  <button onClick={confirmAddMember} className='add-member-yes'>ADD</button>
                  <button onClick={() => {setAddingMember(false); setErrMsg("")}} className='add-member-no'>cancel</button>
                </div>
              ) : (
                <button onClick={() => {setAddingMember(true)}} className="add-member">+</button>
              )}
            </div>
          )
        } else {
          return (
              <div className='member-name'>{member}</div>
          )
        }
      })}
    </div>
  )
}