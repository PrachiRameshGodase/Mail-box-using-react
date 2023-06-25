import React, { useEffect, useState } from 'react';

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
            const emailsInfo = Object.values(data);
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
    // Store the selected email in localStorage
    localStorage.setItem('selectedEmail', JSON.stringify(email));
  };

  if (emails.length === 0) {
    return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <div>
      {selectedEmail ? ( // If an email is selected, display the full email content
        <div className="border bg-gray-50 p-2 rounded-4 mx-2 mt-5 mb-1 border-gray-300 ">
          <p className="text-gray-600">Subject: {selectedEmail.subject}</p>
         
          <p className="text-gray-600">Email Content: {selectedEmail.emailContent}</p>
          <p className="text-gray-600">Email: {selectedEmail.recipent}</p>
        </div>
      ) : ( // If no email is selected, display the highlighted list
        <div className="border border-gray-300  rounded-3 mx-2 mt-5 mb-1 hover:bg-gray-50">
          {emails.map((email, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleEmailClick(email)}
            >

              <p className="font-bold mt-0 mx-2">{email.recipent}<p className="font-bold mt-0 mx-2">{email.subject}</p> </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SentMail;
