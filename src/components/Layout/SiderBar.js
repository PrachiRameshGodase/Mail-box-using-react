import React from 'react'
import classes from "./SiderBar.module.css"

import { Button } from '@mui/material'
import { FiEdit,FiInbox, FiSend} from "react-icons/fi";
import {  NavLink } from 'react-router-dom';

function SiderBar() {
  return (
    <div className={`${classes.sidebar} max-w-sm shadow-lg bg-gradient-to-b to-yellow-200 via-yellow-200 from-pink-400`}>
    <NavLink to="/mailbox" style={{ textDecoration: 'none' }}>
      <Button
       style={{
        fontSize: '20px',
        color: 'black',
        boxShadow: '0px 2px 5px -2px rgba(0, 0, 0, 0.75)',
        borderRadius: '30px',
        textTransform: 'capitalize',
        marginBottom: '15px',
        marginTop: '15px',
        marginLeft: '10px',
        padding: '10px',
       
      }} 
   
      ><FiEdit style={{marginRight:"5px"}}/>Compose</Button>
      </NavLink>
      
      <NavLink 
      to="/inbox"
              className="flex items-center py-2 px-4 hover:bg-red-50 hover:text-red-600 text-dark "
               style={{ textDecoration: 'none'}} >
              <FiInbox className="mr-2" style={{marginRight:"20px"}}/>
              <span style={{ marginLeft: "5px" }}>Inbox</span>
             
      </NavLink>

      <NavLink 
              to="/sent"
              className="flex items-center py-2 px-4 hover:bg-red-50 hover:text-red-600  text-dark" 
              style={{ textDecoration: 'none' }} >
              <FiSend className="mr-2" style={{marginRight:"20px"}}/>
              <span style={{ marginLeft: "5px" }}>Sent</span>
              
      </NavLink>
      
    </div>
  )
}

export default SiderBar
