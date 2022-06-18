import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chat({socket, user, room, setUrl}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    axios.get(`/messages/${room.id}`)
      .then(res => {
        // console.log(res.data);
        console.log('newest')
        res.data.forEach(message => message.time = message.time.slice(11, 16))
        setMessageList((prev) => [...res.data]); 
      })
  }, [room])
  
  const sendMessage = () => {
    // console.log(room);
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: user.name,
        content: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
    
    axios.post(`/messages/${room.id}/${user.id}`, {currentMessage})
      .then(res => {
      socket.emit('send_message', messageData);

      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage('');
    })
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prev) => [...prev, data])
    })
    // socket.on('receive_url', (data) => {

    // })
  }, [socket])

  const changeUrl = (e) => {
    const firstEight = e.target.innerHTML.slice(0,8);
    if(firstEight === "https://") {
      setUrl(e.target.innerHTML);
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={user.name === messageContent.author ? "you" : "other"}>
                <div>
                  <div className={messageContent.content.slice(0,8) === "https://" ? "message-content link_message" : "message-content"}>
                    <p onClick={changeUrl}>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p style={{marginRight: "3px"}}>{user.name === messageContent.author ? "me" : messageContent.author}</p>
                    <p>{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input 
          type="text" 
          value={currentMessage}
          placeholder="Hey...." 
          onChange={(e) => {setCurrentMessage(e.target.value)}}
          onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}
        />
        <button onClick={sendMessage}>&#x276F;</button>
      </div>
    </div>
  )
}