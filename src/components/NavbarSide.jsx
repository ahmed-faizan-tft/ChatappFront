import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image';
import avatar from '../asset/Avatar.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import cookie from '../utils/cookies.js'
import userInfo from '../utils/states/UserInfo';

function NavbarSide() {
  const userName = useContext(userInfo)
  const navigate = useNavigate();

  function logout(){
    cookie.clearCookie('token')
    navigate('/');
  }

  return (
    <>
        <Container className='navbar-container'>
          <Row className='navbar-row'>
            <Col xs={9}><h3>Chat Application</h3></Col>
            <Col xs={2}> <Image image={avatar}/> <span>{userName}</span></Col>
            <Col><button onClick={logout} className='navbar-button'>Logout</button></Col>
          </Row>
        </Container>
    </>
  );
}

export default NavbarSide;