import React, { useEffect, useState } from 'react';

function SentMail() {
  const [emails, setEmails] = useState([]);
  const enteredEmail = localStorage.getItem('email');
  const changedEmail = enteredEmail.replace('@', '').replace('.', '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mailbox-http-default-rtdb.firebaseio.com/sent/user/${changedEmail}.json`
        );
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          if (data) {
            const emailsInfo = Object.values(data);
            // setEmails(emailsInfo);
            console.log(emailsInfo)
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

  if (emails.length === 0) {
    return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <div>
    {emails.map((email, index) => (
      <div key={index}>
        <h3>Subject: {email.subject}</h3>
        <h3>Email Content: {email.emailContent}</h3>
        <h3>Email: {email.recipent}</h3>
      </div>
    ))}
  </div>
  );
}

export default SentMail;
