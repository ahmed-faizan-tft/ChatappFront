import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image';
import avatar from '../asset/Avatar.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import API from '../utils/api.js';


function NavbarSide() {
  let [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchData(){
      const data = await API.getLoggedinUserInfo();
      const name = data.data.data.username;
      setUsername(name)
    }
    fetchData();
  });

  function logout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
        <Container className='navbar-container'>
          <Row className='navbar-row'>
            <Col xs={9}><h3>Chat Application</h3></Col>
            <Col xs={2}> <Image image={avatar}/> <span>{username}</span></Col>
            <Col><button onClick={logout} className='navbar-button'>Logout</button></Col>
          </Row>
        </Container>
    </>
  );
}

export default NavbarSide;