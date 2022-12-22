import React, { useEffect } from 'react'
import Chats from '../components/Chats'
import NavbarSide from '../components/NavbarSide';
import Users from '../components/Users'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    let isAuth = localStorage.getItem('token');
    if(!isAuth && isAuth === null ) {
        navigate("/login");
    }
    
}, []);
  return (
    <>
        <div className='Navbar-side'>
          <NavbarSide/>
        </div>

        <div className='entire-side'>
          <div className='left-side'> 
            <Users/>
          </div>

          <div className='right-side'> 
            <Chats/>
          </div>
        </div>
      
    </>
  )
}

export default Home