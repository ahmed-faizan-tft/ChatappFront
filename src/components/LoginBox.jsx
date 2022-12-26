import Input from './Input'
import React, {useEffect, useState } from 'react'
import Heading from './Heading'
import Button1 from './Button1'
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from 'react-router-dom';
import API from '../utils/api.js'
import cookie from '../utils/cookies.js'
import { ToastContainer, toast } from 'react-toastify';
import Span from './Span';



const LoginBox = () => {
  const navigate = useNavigate();
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

  function submitCredsByEnterKey(event) {
    if(event.key === 'Enter'){
        submitCreds();
    }
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
        <Input type="email" placeHolder = "Enter email" onChange={updateEmail} onEnterKeyPress={submitCredsByEnterKey}> <PersonIcon/> </Input>
        <Input type="password" placeHolder = "Enter Password" onChange={updatePasswod} onEnterKeyPress={submitCredsByEnterKey}> <KeyIcon/> </Input>
        <Button1 buttonType="normal" buttonStyle='button1-zerotop' name="Submit" backgroundColor="info"  onClick={submitCreds}/>
        <Span link="/signup" linkName = "Go to signup"/>
        
    </div>
  )
}

export default LoginBox