// import React, { useEffect, useState } from 'react';

// function SentMail() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null); // Track the selected email

//   const enteredEmail = localStorage.getItem('email');
//   const changedEmail = enteredEmail.replace('@', '').replace('.', '');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://mailbox-http-default-rtdb.firebaseio.com/sent/user/${changedEmail}.json`
//         );
//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//           if (data) {
//             const emailsInfo = Object.values(data);
//             setEmails(emailsInfo);
//           }
//           console.log('Data fetched successfully!');
//         }
//       } catch (error) {
//         console.error('Error in fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [changedEmail]);

// const handleDeleteEmail = async (emailId) => {
//     try {
//       await fetch(
//         `https://mailbox-http-default-rtdb.firebaseio.com/sent/user/${changedEmail}/${emailId}.json`,
//         { 
//             method: 'DELETE'
//          }
//       );
//       setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId));
//       console.log('Email deleted successfully!');
//     } catch (error) {
//       console.error('Error in deleting email:', error);
//     }
//   };


//   const handleEmailClick = (email) => {
//     setSelectedEmail(email); // Set the selected email
    
//   };

//   if (emails.length === 0) {
//     return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
//   }

//   return (
//     <div>
//       {selectedEmail ? ( // If an email is selected, display the full email content
//         <div className="border bg-gray-50 p-2 rounded-4 mx-2 mt-5 mb-1 border-gray-300 ">
//           <p className="text-gray-600">Subject: {selectedEmail.subject}</p>
         
//           <p className="text-gray-600">Email Content: {selectedEmail.emailContent}</p>
//           <p className="text-gray-600">Email: {selectedEmail.recipent}</p>
//         </div>
//       ) : ( // If no email is selected, display the highlighted list
//       <div>
//         <div className="">
//           {emails.map((email, index) => (
//             <div
//               key={index}
//               className="cursor-pointer border border-gray-300  rounded-3 mx-2 mt-2 mb-1 hover:bg-gray-50"
//               onClick={() => handleEmailClick(email)}
//             >

//                <p className="font-bold mt-0 mx-2">{email.recipent}<p className="font-bold mt-0 mx-2">{email.subject}</p> </p>
               
//               {/* {index !== emails.length - 1 && <h className="my-2" />} Add a horizontal line except for the last email */}
//               <button
//                 className="text-red-500 hover:text-red-700"
//                 onClick={(e) => {
//                 e.stopPropagation(); // Prevent email selection when clicking delete button
//                 handleDeleteEmail(email.id);
//                 }}
//                 >
//                 Delete
//                 </button> 
//             </div>
           
//           ))}
            
//         </div>
//         </div>
        
//       )}
//     </div>
//   );
// }

// export default SentMail;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function SentMail() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null); // Track the selected email

  const enteredEmail = localStorage.getItem('email');
  const changedEmail = enteredEmail.replace('@', '').replace('.', '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mailbox-http-default-rtdb.firebaseio.com/sent/user/${changedEmail}.json`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          if (data) {
            const emailsInfo = Object.entries(data).map(([id, email]) => ({ id, ...email }));
            setEmails(emailsInfo);
          }
          console.log('Data fetched successfully!');
        }
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    fetchData();
  }, [changedEmail]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email); // Set the selected email
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      await fetch(
        `https://mailbox-http-default-rtdb.firebaseio.com/sent/user/${changedEmail}/${emailId}.json`,
        { 
            method: 'DELETE'
         }
      );
      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId));
      console.log('Email deleted successfully!');
    } catch (error) {
      console.error('Error in deleting email:', error);
    }
  };

  if (emails.length === 0) {
    return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <div>
      {selectedEmail ? (
        // If an email is selected, display the full email content
        <div className="border bg-gray-50 p-2 rounded-4 mx-2 mt-5 mb-1 border-gray-300">
          <p className="text-gray-600">Subject: {selectedEmail.subject}</p>
          <p className="text-gray-600">Email Content: {selectedEmail.emailContent}</p>
          <p className="text-gray-600">Email: {selectedEmail.recipent}</p>
        </div>
      ) : (
        // If no email is selected, display the highlighted list
        <div>
          <div>
            {emails.map((email) => (
              <div
                key={email.id}
                className="border border-gray-300 rounded-3 mx-2 mt-2 mb-1 hover:bg-gray-50"
                onClick={() => handleEmailClick(email)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold mt-0 mx-2">{email.recipent}<p className="font-bold mt-0 mx-2">{email.subject}</p></p>
                    
                  </div>
                  <button
                    className="text-grey-500 hover:text-red-700 m-3"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent email selection when clicking delete button
                      handleDeleteEmail(email.id);
                    }}
                  >
                   <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
     </div>
  );
}

export default SentMail;

