import React, { useEffect, useState } from 'react'
import Chats from '../components/Chats'
import NavbarSide from '../components/NavbarSide';
import Users from '../components/Users'
import { useNavigate } from 'react-router-dom';
import cookie from '../utils/cookies.js'
import userInfo from '../utils/states/UserInfo';

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")

  useEffect(() => {
    let isAuth = cookie.getCookie('token');
    if(!isAuth) {
        navigate("/login");
    }
  }, []);

function getUserNameFromChat(data){
  setUsername(data);
}

  return (
    <>

      <userInfo.Provider value={username}>
        <div className='Navbar-side'>
          <NavbarSide/>
        </div>

        <div className='entire-side'>
          <div className='left-side'> 
            <Users/>
          </div>

          <div className='right-side'> 
            <Chats getUserNameFromChat={getUserNameFromChat}/>
          </div>
        </div>
      </userInfo.Provider>
      
    </>
  )
}

export default Home