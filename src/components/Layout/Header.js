import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classes from "./Header.module.css"
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function Header() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const logOutHandler=()=>{
    dispatch(authActions.logout());
    localStorage.removeItem("email")
    navigate("/");
    }
 
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary bg-gradient-to-r from-red-900 via-yellow-200 to-green-400 ">
      <Container>
        <Navbar.Brand href="#home" className={`mr-8 text-gray-100 font-bold bg-gradient-to-r from-blue-800 to-yellow-50 ${classes.logo} `}>MAIL BOX</Navbar.Brand>
        <NavLink to="/inbox">Inbox</NavLink>
        <NavLink to="/sent">Sent</NavLink>
        {!isAuth && (<Link to="/">
              <button className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded'>LOGIN</button>
        </Link>)}

        {isAuth && (
            <button
              className='bg-gradient-to-b from-red-600 via-red-500 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded mx-5 '
              onClick={logOutHandler}
            >
              LOGOUT
            </button>
        )}
        </Container> 
    </Navbar>


      
    </div>
  )
}

export default Header
