

import React, { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { LoginContext, UserContext } from './App';
import Paper from '@mui/material/Paper';

function Login() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setUserId,setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        if(!response.user){
          throw "user not found";
        }
        else if (response.error) {
          throw response.error;
        } else {
          const user = response.user;
          console.log("user : ",user);
          setIsLoggedIn(true);
          setUserId(user.userId);
          setUserName(user.userName);
          localStorage.setItem('userId',user.userId);
          localStorage.setItem('userName',user.userName);
          navigate('/home');
        }
      }).catch(error => {
        console.log("error : ", error);
      })
  }

  return (
    <div className='login-page'>
            <Paper elevation={5} className="container w-50 my-3 py-3">

      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className='form-container'>
            <Form.Group className="mb-3"controlId="formBasicuserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="userName" placeholder="Enter userName" ref={userNameRef} />
            </Form.Group>
            <Form.Group className="mb-3"controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group >
            <Button className="mb-3"variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      </Paper>
    </div>
  );
}

export default Login;

