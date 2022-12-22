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
import cookie from '../utils/cookies.js'
import { ToastContainer, toast } from 'react-toastify';



const LoginBox = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
      async function fetchData(){
        let isAuth = cookie.getCookie('token');
        if(isAuth) {
            navigate("/home");
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

      
      cookie.setCookie('token', accessToken);
      

      if(Data.status === 200 && Data.data.success === true){
        navigate(`/home`)
        return;
      }

    } catch (error) {
      console.log('hello toast')
      setError(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      
    }
  }


  return (
    <div className='inner-login-body'>
        <Heading headingName='Sign in'/>
        <ToastContainer />
        <Input type="email" placeHolder = "Enter email" onChange={updateEmail}> <PersonIcon/> </Input>
        <Input type="password" placeHolder = "Enter Password" onChange={updatePasswod}> <KeyIcon/> </Input>
        <Button1 buttonStyle='button1-zerotop' name="Submit" backgroundColor="info"  onClick={submitCreds}/>        
    </div>
  )
}

export default LoginBox