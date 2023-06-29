import React,{useState} from 'react'
import { Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import classes from "./Header.module.css"
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Avatar,Tooltip } from '@mui/material';
import SiderBar from './SiderBar';





function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  
    
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const enteredEmail=localStorage.getItem("email")
    const toggleAvtar=()=>{
      setIsHovered((prevValue) => !prevValue);
    }

    

    const logOutHandler=()=>{
      
    dispatch(authActions.logout());
    localStorage.removeItem("email")
   
    navigate("/");
    }

    const handleShowSidebar = () => {
      setShowSidebar(true);
    };
  
    const handleCloseSidebar = () => {
      setShowSidebar(false);
    };
    
 
  return (
    <div >
    <div>
    <Navbar expand="lg" className="bg-body-tertiary bg-gradient-to-b from-yellow-200 to-pink-500 flex justify-around">
      <Container>
        <div style={{display:"flex"}}>
      
        <IconButton onClick={handleShowSidebar}>
                <MenuIcon className="text-white text-xl" />
        </IconButton>
      
        <img src='https://img.icons8.com/?size=1x&id=ho8QlOYvMuG3&format=png'
        alt=''
        style={{height:"30px",marginTop:"10px"}}/>
        <Navbar.Brand href="#home" className={`mr-8 mx-2 text-gray-100 font-bold bg-gradient-to-r from-blue-800 to-yellow-50 ${classes.logo} `}>MAIL BOX</Navbar.Brand>
        </div>


        <div  style={{display:"flex",justifyContent:"",width:"150px"}}>
        {isAuth && (
              <Tooltip
                title={enteredEmail}
                placement="bottom"
                open={isHovered}
                onClose={() => setIsHovered(false)}
                onOpen={() => setIsHovered(true)}
              >
                <Avatar
                className="bg-gradient-to-b from-yellow-200 to-pink-600"
              style={{ marginRight: "10px", cursor: "pointer"}}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={toggleAvtar}
                >
                  {!isHovered ? (
                    <span className={classes.avatarText}>
                      {enteredEmail && <Avatar className="bg-gradient-to-b from-yellow-200 to-pink-700" />}
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
              <button className='bg-gradient-to-b from-red-600 via-red-400 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded mx-6'>LOGIN</button>
        </Link>)}
        {isAuth && (
            <button
              className='bg-gradient-to-b from-red-600 via-red-400 to-red-800  hover:bg-purple-600 py-2 px-4 font-bold text-white rounded mx-5 '
              style={{marginLeft:"20px"}}
              onClick={logOutHandler}
            >
              LOGOUT
            </button>
        )}
        </div>

        </Container> 
    </Navbar>

    
      
    </div>
    <div>
    {isAuth && <SiderBar showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar} />}
    </div>

      </div>
  )
}

export default Header
