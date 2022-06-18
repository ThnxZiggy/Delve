import React, {useState, useEffect, useRef} from 'react';

export default function Video({socket, room}) {
  const [stream, setStream] = useState('');
  const [videos, setVideos] = useState([]);

  const myVideo = useRef();
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        const streamData = {
          room,
          video: stream,
        }
        socket.emit('stream', streamData);
      })

    // socket.on()
  }, [])

  useEffect(() => {
    socket.on('stream', (data) => {
      setVideos((prev) => [...prev, data])
    })
    // socket.on('receive_url', (data) => {

    // })
  }, [socket])
  
  return (
    <div>
      <video playsInline muted ref={myVideo} autoPlay style={{width: "300px", height: "300px"}}/>
      {videos && videos.map(thisVideo => {
        return (
          <video playsInline muted ref={thisVideo} autoPlay style={{width: "300px", height: "300px"}}/>
        )
      })}
    </div>
  )
}