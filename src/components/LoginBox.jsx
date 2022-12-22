import Input from './Input'
import React, {useEffect, useState } from 'react'
import Heading from './Heading'
// import Span from './Span'
import Button1 from './Button1'
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GoogleIcon from '@mui/icons-material/Google';
import {useNavigate} from 'react-router-dom';
import API from '../utils/api.js'



const LoginBox = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
      async function fetchData(){

        let isAuth = localStorage.getItem('token');
        if(isAuth && isAuth !== null) {
          navigate('/home')
        }
      }
      fetchData();
  }, []);
  

  function updateEmail(event){
    setEmail(event.target.value);
  }

  function updatePasswod(event){
    setPassword(event.target.value);
  }

  async function submitCreds(){
    try {

      let Data = await API.loginUser({email, password});
      let accessToken = Data.data.data.access_token;

      localStorage.setItem('token', accessToken);

      if(Data.status === 200 && Data.data.success === true){
        navigate(`/home`)
        return;
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  }


  return (
    <div className='inner-login-body'>
        <Heading headingName='Sign in'/>
        <Input type="email" placeHolder = "Enter email" onChange={updateEmail}> <PersonIcon/> </Input>
        <Input type="password" placeHolder = "Enter Password" onChange={updatePasswod}> <KeyIcon/> </Input>
        <Button1 buttonStyle='button1-zerotop' name="Submit" backgroundColor="info"  onClick={submitCreds}/>
        {/* <Span/> */}
        {/* <Button1 marginTop="20px" name="Facebook" backgroundColor="primary"> <FacebookIcon/> </Button1>
        <Button1 marginTop="10px" name="Google" backgroundColor="danger"  link={`http://localhost:8000/user/auth/google`}> <GoogleIcon/> </Button1> */}
        
    </div>
  )
}

export default LoginBox