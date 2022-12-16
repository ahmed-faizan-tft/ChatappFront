import Input from './Input'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Button1 from './Button1'
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupBox = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchData(){

      let isAuth = localStorage.getItem('token');
      if(isAuth && isAuth !== null) {
        navigate('/home');
      }
    }
    fetchData();
  }, []);

  function updateUsername(event){
    setUsername(event.target.value);
    
  }

  function updateEmail(event){
    setEmail(event.target.value);
  }

  function updatePasswod(event){
    setPassword(event.target.value);
  }

  async function submitCreds(){
    try {
      
      let newUser = await axios.post('http://localhost:8000/user/create',{username, email, password});

      if(newUser.status === 201 && newUser.data.success === true){
        navigate('/login')
        return;
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <>
      
      <div className='inner-login-body'>
          <Heading headingName='SignUp'/>
          <Input type="text" placeHolder = "Enter Username"  onChange={updateUsername}> <PersonIcon/> </Input>
          <Input type="email" placeHolder = "Enter email" onChange={updateEmail}> <EmailIcon/> </Input>
          <Input type="password" placeHolder = "Enter Password" onChange={updatePasswod}> <KeyIcon/> </Input>
          <Button1 marginTop="0px" name="Submit" backgroundColor="info" onClick={submitCreds}/>
          <Button1 marginTop="20px" name="Facebook" backgroundColor="primary"> <FacebookIcon/> </Button1>
          <Button1 marginTop="10px" name="Google" backgroundColor="danger"  link={`http://localhost:8000/user/auth/google`}> <GoogleIcon/> </Button1>

      </div>
    </>
  )
}

export default SignupBox