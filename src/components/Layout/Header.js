import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classes from "./Header.module.css"


function Header() {
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary bg-gradient-to-r from-red-900 via-yellow-200 to-green-400 ">
      <Container>
        <Navbar.Brand href="#home" className={`mr-8 text-gray-100 font-bold bg-gradient-to-r from-blue-800 to-yellow-50 ${classes.logo} `}>MAIL BOX</Navbar.Brand>
        
        <Link to="/">
              <button className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded'>LOGIN</button>
            </Link>
        </Container>
    </Navbar>


      
    </div>
  )
}

export default Header
