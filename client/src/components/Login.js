import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Login({ setState}) {
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    return axios.post('/users/login', {user, password})
      .then((res) => {
        if (res.data === 'error'){
          setErrMsg("Invalid Userame or Password");
        } else {
          const currentUser = res.data[0];
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
      <Form onSubmit={handleSubmit} className="login" >
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
        </Form.Group>
        <Button type="submit" className="me-2">Login</Button>
        <hr/>
        <h2>Don't have an Account?</h2><button onClick={() => setState(prev => ({...prev, signingUp: true}))}>Sign Up</button>
      </Form>
      
    </Container>
  )
}