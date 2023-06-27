import React,{useState} from 'react'
import { Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classes from "./Header.module.css"
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Avatar,Tooltip } from '@mui/material';



function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const enteredEmail=localStorage.getItem("email")
    const toggleAvtar=()=>{
      setIsHovered((prevValue) => !prevValue);
    }

    const handleSidebarToggle = () => {
      setSidebarOpen((prevOpen) => !prevOpen);
    };

    const logOutHandler=()=>{
    dispatch(authActions.logout());
    localStorage.removeItem("email")
    navigate("/");
    }

    
 
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary bg-gradient-to-b from-yellow-200 to-pink-500 flex justify-around">
      <Container>
        <div className='flex' style={{marginLeft:"10px"}}>
        {!isAuth && sidebarOpen &&
        <IconButton onClick={handleSidebarToggle}>
        <MenuIcon className='text-white text-xl'/>
        </IconButton>
}

        {isAuth && <Link to='/sidebar'>
        <IconButton onClick={handleSidebarToggle} >
        <MenuIcon className='text-white text-xl'/>
        </IconButton>
        </Link>}
        <img src='https://img.icons8.com/?size=1x&id=ho8QlOYvMuG3&format=png'
        alt=''
        style={{height:"30px",marginTop:"10px"}}/>
        <Navbar.Brand href="#home" className={`mr-8 mx-2 text-gray-100 font-bold bg-gradient-to-r from-blue-800 to-yellow-50 ${classes.logo} `}>MAIL BOX</Navbar.Brand>
        </div>


        <div className='flex' style={{display:"flex",justifyContent:"space-between"}}>
        {isAuth && (
              <Tooltip
                title={enteredEmail}
                placement="bottom"
                open={isHovered}
                onClose={() => setIsHovered(false)}
                onOpen={() => setIsHovered(true)}
              >
                <Avatar
                className='from-red-600 via-red-400 to-red-800'
              style={{ marginRight: "10px", cursor: "pointer",background:"red"}}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={toggleAvtar}
                >
                  {!isHovered ? (
                    <span className={classes.avatarText}>
                      {enteredEmail && <Avatar style={{background:"red"}}/>}
                    </span>
                  ) : (
                    <span>
                      {enteredEmail && enteredEmail.charAt(0).toUpperCase()}
                    </span>
                  )}
                </Avatar>
              </Tooltip>
            )}
       
        {!isAuth && (<Link to="/">
              <button className='bg-gradient-to-b from-red-600 via-red-400 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded'>LOGIN</button>
        </Link>)}
        {isAuth && (
            <button
              className='bg-gradient-to-b from-red-600 via-red-400 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded mx-5 '
              onClick={logOutHandler}
            >
              LOGOUT
            </button>
        )}
        </div>

        </Container> 
    </Navbar>


      
    </div>
  )
}

export default Header
