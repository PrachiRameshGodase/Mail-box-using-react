import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function MailBox() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const sendEmailHandler = (event) => {
    event.preventDefault();

    
    // const enteredEmail=localStorage.getItem("email")
    const emailContent = editorState.getCurrentContent().getPlainText();
    const changedemail = email.replace("@", "").replace(".", "");
    console.log('Recipient:', email);
    console.log('Changed mail:', changedemail);
    console.log('Subject:', subject);
    console.log('Email Content:', emailContent);

    const newData = {
      email: emailContent,
      subject: subject,
      
    };
            // Send a POST request to store the new expense in the database
    fetch(`https://mailbox-http-default-rtdb.firebaseio.com/user/${changedemail}.json`, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          console.log('Email successfully send');
          console.log(response)
          if (response.ok) {
            return response.json(); 
          } else {
            throw new Error('Failed to send email');
          }
        })
        .then((data) => { 
          console.log(data);
            setEmail('');
            setSubject('');
            setEditorState(EditorState.createEmpty());
         
        })
        .catch((error) => {
          console.log(error);
        });


    
  };

  return (
    <form onSubmit={sendEmailHandler} className="w-full mt-8 bg-green-100 p-8 shadow-md " style={{marginRight:"100px"}}>
      <div className="mb-4">
        <label className="block text-gray-700">To</label>
        <input type="email" value={email} onChange={emailChangeHandler} className="form-input mt-1 block w-full py-2 px-2 hover:bg-red-50 rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subject</label>
        <input type="text" value={subject} onChange={subjectChangeHandler} className="form-input mt-1 block w-full py-2 px-2 hover:bg-red-50 rounded" />
      </div>
      <div className="mb-4 mt-5">
        <Editor
          editorState={editorState}
          toolbarClassName="flex"
          wrapperClassName="bg-white rounded p-3 focus:outline-none"
          editorClassName="w-full h-full"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Send</Button>
    </form>
  );
}

export default MailBox;
