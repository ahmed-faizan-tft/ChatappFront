import Input from './Input'
import React, {  useState } from 'react'
import Heading from './Heading'
import Button1 from './Button1'
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api.js'
import { ToastContainer, toast } from 'react-toastify';

const ResetBox = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {id} = useParams();

    function updatePasswod(event){
        setPassword(event.target.value);
    }

    function updateConfirmPasswod(event){
        setConfirmPassword(event.target.value);
    }

    async function submitCreds(){
        try {
          
          let newUser = await API.resetPassword({id, password, confirmPassword});
          if(newUser.status === 200 && newUser.data.success === true){
            navigate('/login')
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
    <div>
        <div className='inner-login-body'>
          <Heading headingName='Reset Password'/>
          <Input type="password" placeHolder = "Enter Password"  onChange={updatePasswod}> <KeyIcon/> </Input>
          <Input type="password" placeHolder = "Enter confirm password" onChange={updateConfirmPasswod}> <KeyIcon/> </Input>
          <Button1 buttonStyle='button1-zerotop' name="Submit" backgroundColor="info" onClick={submitCreds}/>
          <ToastContainer/>
      </div>
    </div>
  )
}

export default ResetBox