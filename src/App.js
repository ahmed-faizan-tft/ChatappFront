import Login  from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home  from './pages/Home';
import Signup from './pages/Signup'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Reset from './pages/Reset';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/reset/:id" element={<Reset/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>        
      </Router>
    </>
  );
}

export default App;
