import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image';
import avatar from '../asset/Avatar.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


function NavbarSide() {
  let [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchData(){
      const data = await axios.get(`http://localhost:8000/user/get`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
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
        <Container style={{height:'100%', width:"100%", backgroundColor:"yellow", border:'none'}}>
          <Row style={{marginLeft:"2%", height:'100%', width:"100%"}}>
            <Col xs={9}><h3>Chat Application</h3></Col>
            <Col xs={2}> <Image image={avatar}/> <span>{username}</span></Col>
            <Col><button onClick={logout} style={{backgroundColor:'blueviolet', outline:'none', border:'none'}}>Logout</button></Col>
          </Row>
        </Container>
    </>
  );
}

export default NavbarSide;