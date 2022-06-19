import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function SignUp ({setState}) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const userRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    return axios.post('/users/signup', {user, password, email})
      .then((res) => {
        console.log(res.data);
        if (res.data === 'error'){
          setErrMsg("That username is already in use");
        } else {
          const currentUser = res.data[0];
          setState(prev => ({...prev, user:currentUser, signingUp:false, makingRoom: false}));
        }
      })
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div>
      <Container>
        <p className="alert-danger">{errMsg}</p>
        <br></br>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit} className="w-100" >
          <Form.Group>
          <Form.Label>Enter Your Email</Form.Label>
            <Form.Control 
              type="text"
              id="roomID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required 
            />
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
          <Button type="submit" className="me-2">Sign Up</Button>
          <hr />
          <h4>Already have an account?</h4><button onClick={() => setState(prev => ({...prev, signingUp: false}))}>Login</button>
          {/* <Button variant="secondary">Create A New Id</Button> */}
        </Form>
        
      </Container>
    </div>
  )
}

