import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';

export default function RoomMembers({room, user, socket, memberList, setMemberList}) {
  // const [memberList, setMemberList] = useState([]);
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [inRoom, setInRoom] = useState([]);

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

  useEffect(() => {
    socket.on('user_joined', (joinRoomData) => {
      console.log('connection made', joinRoomData);
      const newMember = joinRoomData.user.name;
      console.log('newMember', newMember);
      setInRoom(prev => ([...prev, newMember]))
    })
  }, [socket])

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
    <div>
      <h3>Room Members:</h3>
      {errMsg && <p>{errMsg}</p>}
      {memberList.map((member, index) => {
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
                  <button onClick={confirmAddMember}>ADD</button>
                  <button onClick={() => {setAddingMember(false); setErrMsg("")}}>cancel</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => {setAddingMember(true)}}>+</button>
                </div>
              )}
            </div>
          )
        } else {
          return (
              <div>{inRoom.includes(member) || member === 'me' ? 
                  <img width="10em" height="10em" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clker.com%2Fcliparts%2Fu%2Fg%2FF%2FR%2FX%2F9%2Fgreen-circle-hi.png&f=1&nofb=1"/> : 
                  <img width="10em" height="10em" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.linganorewines.com%2Fwp-content%2Fuploads%2F2021%2F02%2FBlank-Gray-Circle-1024x1024.png&f=1&nofb=1"/>
                }
                {`  ${member}`}
              </div>
          )
        }
      })}
    </div>
  )
}