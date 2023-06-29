import React from 'react'
import { FiEdit, FiSend} from "react-icons/fi";
import {  Link,} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function SiderBar({ showSidebar, handleCloseSidebar }) {

    
    
  return (

<>

<Offcanvas onHide={handleCloseSidebar} className='mt-5 bg-gradient-to-b from-yellow-200 via-pink-400 to-pink-400' show={showSidebar}  style={{ width: '250px',top:"15px" }}>
<Offcanvas.Header closeButton className="justify-content-end"> 
  
</Offcanvas.Header>
<Offcanvas.Body>
<div class="h-full overflow-y-auto" style={{ marginRight: '10%', position: 'sticky' }}>
       <ul class="space-y-2 font-medium">
         
        <span className="flex items-center justify-between">
         <Link to="/mailbox" style={{ textDecoration: 'none' }}>
     <Button
       style={{
        fontSize: '20px',
        color: 'black',
        background: "linear-gradient(to right, #fcf9bd, #f908cd)",
        boxShadow: '0px 2px 7px -2px rgba(0, 0, 0, 0.75)',
        borderRadius: '20px',
        textTransform: 'capitalize',
        marginBottom: '15px',
        marginTop: '15px',
        marginLeft: 'px',
        padding: '10px',
       
      }} 
      onClick={handleCloseSidebar}
      ><FiEdit/>Compose</Button>
      </Link>
         </span>
         <li>
            <Link to="/inbox" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" style={{ textDecoration: 'none' }} >
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap" onClick={handleCloseSidebar}>Inbox</span>
               
               {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
            </Link>
         </li>
        <li>
       

      <li>
            <Link to="/sent" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" style={{ textDecoration: 'none' }} >

               <FiSend className="mr-2" />
               <span class="flex-1 ml-3 whitespace-nowrap" onClick={handleCloseSidebar}>Sent</span>

            </Link>
         </li>
        </li>
         
        </ul>
        </div>
  
</Offcanvas.Body>
</Offcanvas>
</>
  )
}

export default SiderBar
