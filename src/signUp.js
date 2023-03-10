

import React, { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Paper from '@mui/material/Paper';
import { LoginContext,UserContext } from './App';
function SignUp() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const birthDateRef = useRef(null);


  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setUserId,setUserName } = useContext(UserContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const birthDate = birthDateRef.current.value;
    fetch(`http://localhost:8086/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName:userName,
        password:password,
        email:email,
        birthDate: birthDate
      })
    }).then(response=>response.json())
    .then(response=>{
      console.log(response);
      if (response.error)  {
        throw response.error;
      }else{
        const user=response.user;
        setIsLoggedIn(true);
        setUserId(user.userId);
        setUserName(user.userName);
        localStorage.setItem('userId',user.userId);
        localStorage.setItem('userName',user.userName);
        navigate('/home');
      }
    }).catch(error=>{
      console.log("error : ",error);
    })
  };


  return (
    <>
      <Paper elevation={5} className="container w-50 my-3 py-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter name" ref={userNameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" ref={emailRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type="date" placeholder="Birth Date" ref={birthDateRef} />
          </Form.Group>
         
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Paper>
    </>
  );
}


export default SignUp;

// import React, { useRef, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Paper from '@mui/material/Paper';
// import { LoginContext,UserContext } from './App';
// function SignUp() {
//   const userNameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(LoginContext);
//   const { setUserId,setUserName } = useContext(UserContext);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userName = userNameRef.current.value;
//     const password = passwordRef.current.value;
  
//     fetch(`http://localhost:8086/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userName:userName,
//         password:password
//       })
//     }).then(response=>response.json())
//     .then(response=>{
//       console.log(response);
//       if (response.error)  {
//         throw response.error;
//       }else{
//         const user=response.user;
//         setIsLoggedIn(true);
//         setUserId(user.userId);
//         setUserName(user.userName);
//         localStorage.setItem('userId',user.userId);
//         localStorage.setItem('userName',user.userName);
//         navigate('/home');
//       }
//     }).catch(error=>{
//       console.log("error : ",error);
//     })
//   };

//   return (
//     <>
//       <Paper elevation={5} className="container w-50 my-3 py-3">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Username</Form.Label>
//             <Form.Control type="text" placeholder="Enter name" ref={userNameRef} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" ref={passwordRef} />
//           </Form.Group>
//           <Button variant="primary" type="submit" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Form>
//       </Paper>
//     </>
//   );
// }

// export default SignUp;
