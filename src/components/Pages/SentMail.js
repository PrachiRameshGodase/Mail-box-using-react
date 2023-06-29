import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export default function SentMail() {
  const [emails, setEmails] = useState([]);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [visible, setVisible] = useState([]);
  const dispatch = useDispatch();


  const enteredEmail = localStorage.getItem("email");
  const updatedEmail = enteredEmail.replace("@", "").replace(".", "");
  
  const token = localStorage.getItem("token");

  const toggleEmailHandler = (id) => {
    setExpandedEmail((prevId) => (prevId === id ? null : id));
    console.log(id);
  };

  useEffect(() => {
    dispatch(authActions.login(token));
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mail-client-92dd6-default-rtdb.firebaseio.com/sent/user/${updatedEmail}.json`
        );
        const data = await response.json();
        console.log("DATA", data);

        if (response.ok) {
          const emailsData = Object.entries(data).map(([id, email]) => ({
            id: id,
            recipent: email.recipent,
            subject: email.subject,
            emailContent: email.emailContent,
            receivedTime:email.receivedTime
          }));
          setEmails(emailsData);
          const visibilityData = Object.entries(data).map(
            ([id, email]) => email.visibility
          );
          setVisible(visibilityData);
          console.log("Emails Data", emailsData);
        }
      } catch (error) {
        console.error("Error fetching data from the database:", error);
      }
    };

    fetchData();
  }, [updatedEmail, dispatch, token]);

  const hideBtnHandler = async (index, emailId) => {
    setVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false;
      return updatedVisibility;
    });

    try {
      const response = await fetch(
        `https://mail-client-92dd6-default-rtdb.firebaseio.com/sent/user/${updatedEmail}/${emailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: emailId,
            recipent: emails[index].recipent,
            subject: emails[index].subject,
            emailContent: emails[index].emailContent,
            receivedTime:emails[index].receivedTime,
            visibility: false ,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("PUT", response);
        throw new Error("Error updating visibility data in the database");
      }
    } catch (error) {
      console.error("Error updating visibility data in the database:", error);
    }
  };

  const handleDeleteEmail =(emailId) => {
    
    fetch(
        `https://mail-client-92dd6-default-rtdb.firebaseio.com/sent/user/${updatedEmail}/${emailId}.json`,
        {
          method: "DELETE",
        }
      )

      .then((response) => {
        if (response.ok) {
          console.log('Expense successfully deleted');
          setEmails((prevExpenses) => prevExpenses.filter((email) => email.id !== emailId));
        } else {
          throw new Error('Failed to delete expense');
        }
      })
      .catch((error) => { 
        console.log(error);
      });
    }

    if(emails.length===0){
      <h1>Empty SentBox!</h1>
    }

  // const counter = visible.filter((visible) => visible).length;

  return (
    <div className=" mt-5" style={{marginLeft:"10%",marginRight:"10px"}}>
      {/* <Button className="mx-5 mt-3 mb-3 bg-gradient-to-r from-green-800 to-red-600">Unread Messages: {counter}</Button> */}
     
        {emails.map((email, index) => (
            <div className='rounded shadow-md mx-5 flex py-3 justify-between hover:bg-blue-100 bg-white mb-2 cursor-pointer'
            key={email.id}
            onClick={() => toggleEmailHandler(email.id)}>
            
              <div className="mx-3"
                  onClick={() => hideBtnHandler(index, email.id)}>
                  {/* {visible[index] && <VisibilityIcon className="text-blue-500 mx-2" />} */}
                  <span className="text-lg">{email.recipent}</span>
                  <span className="mx-3 text-gray-500">{email.subject}</span>
                  {expandedEmail === email.id && (
                  <div className="mx-3">
                    <span className="text-gray-400">{email.emailContent}</span>
                  {/* {email.receivedTime && (
                  <span className="text-gray-600 mt-3">{email.receivedTime.split(" ")}</span>
                  )} */}
                  </div>
                  )}
              </div> 

              <div>
                <button className="text-grey-500 mx-5" onClick={() => {handleDeleteEmail(email.id)}}>
                  <FontAwesomeIcon icon={faTrashAlt} className='hover:text-red-400'/>
                </button>
              </div>
            </div>
          
        ))}
        
        
    </div>
  );
}
