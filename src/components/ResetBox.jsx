import Input from './Input'
import React, {  useState } from 'react'
import Heading from './Heading'
import Button1 from './Button1'
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api.js'

const ResetBox = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
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
            console.log(newUser)
          if(newUser.status === 200 && newUser.data.success === true){
            console.log('resetbox---->');
            navigate('/login')
            return;
          }
    
        } catch (error) {
            console.log(error.response.data)
          setError(error.response.data.message)
        }
    }

  return (
    <div>
        <div className='inner-login-body'>
          <Heading headingName='Reset Password'/>
          <Input type="password" placeHolder = "Enter Password"  onChange={updatePasswod}> <KeyIcon/> </Input>
          <Input type="password" placeHolder = "Enter confirm password" onChange={updateConfirmPasswod}> <KeyIcon/> </Input>
          <Button1 marginTop="0px" name="Submit" backgroundColor="info" onClick={submitCreds}/>
    
      </div>
    </div>
  )
}

export default ResetBox