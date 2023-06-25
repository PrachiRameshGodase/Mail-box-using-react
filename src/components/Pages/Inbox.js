import React, { useEffect, useState } from 'react';

function Inbox() {
  const [emails, setEmails] = useState([]);

  const enteredEmail = localStorage.getItem('email');
  const changedEmail = enteredEmail.replace('@', '').replace('.', '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mailbox-http-default-rtdb.firebaseio.com/user/${changedEmail}.json`
        );
        const data = await response.json();
        if (response.ok) {
          if (data) {
            const emailsData = Object.values(data);
            setEmails(emailsData);
          } else {
            setEmails([]); // Set empty array if data is null or empty
          }
          console.log('Data fetched successfully');
        }
      } catch (error) {
        console.error('Error in fetching data from the database:', error);
      }
    };

    fetchData();
  }, [changedEmail]);

  if (emails.length === 0) {
    return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <div>
      {emails.map((email, index) => (
        <ul key={index}>
          <li>
            <h3>Subject: {email.subject}</h3>
            <p>Email Content: {email.emailContent}</p>
            <p>Email: {email.email}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Inbox;
