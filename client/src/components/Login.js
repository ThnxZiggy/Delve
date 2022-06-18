import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:8000');

export default function Login({ setState, error, socket, state}) {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [room, setRoom] = useState('');

  // const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // send socket.io the room id
    // socket.emit('join_room', room);
    // check if the user info is valid and if it is set user state to that user object
    return axios.post('/users/login', {user, password})
      .then((res) => {
        console.log(res.data);
        if (res.data === 'error'){
          setErrMsg("Invalid Userame or Password");
        } else {
          const currentUser = res.data[0];
          // onSubmit(prev => ({...prev, user:currentUser, room}));
          setState(prev => ({...prev, user:currentUser, makingRoom: false}));
        }
      })
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <Container>
      <p className="alert-danger">{errMsg}</p>
      <br></br>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} className="w-100" >
        <Form.Group>
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control 
            type="text"
            id="username"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required 
          />
          <Form.Label>Enter Your Password</Form.Label>
          <Form.Control 
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required 
          />
          {/* <Form.Label>Enter Room ID</Form.Label>
          <Form.Control 
            type="text"
            id="roomID"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            required 
          /> */}
        </Form.Group>
        <Button type="submit" className="me-2">Login</Button>
        <hr/>
        <h2>Don't have an Account?</h2><button onClick={() => setState(prev => ({...prev, signingUp: true}))}>Sign Up</button>
        {/* <Button variant="secondary">Create A New Id</Button> */}
      </Form>
      
    </Container>
  )
}