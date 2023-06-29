import { useState ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import SiderBar from '../Layout/SiderBar';

function MailBox() {
  const dispatch=useDispatch()
  const [recipent, setEmail] = useState('');
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      dispatch(authActions.login(token));
    }
  },[dispatch])

  const sendEmailHandler = (event) => {
    event.preventDefault();

    
    const enteredEmail=localStorage.getItem("email")
    const changedEnteredEmail=enteredEmail.replace("@", "").replace(".", "")
    const emailContent = editorState.getCurrentContent().getPlainText();
    const changedemail = recipent.replace("@", "").replace(".", "");
    console.log('Recipient:', recipent);
    console.log('Changed mail:', changedemail);
    console.log('Subject:', subject);
    console.log('Email Content:', emailContent);
    console.log('enteredEmail',enteredEmail)
    const currentTime = new Date().toLocaleString(); // Get the current time
    const visibility=true;
    const newData = {
      subject: subject,
      emailContent: emailContent,
      enteredEmail:enteredEmail,
      receivedTime: currentTime ,// Include received time in newData
      visibility:visibility

     };

    console.log("newData",newData)
            // Send a POST request to store the new data in the database
    fetch(`https://mail-client-92dd6-default-rtdb.firebaseio.com/user/${changedemail}.json`, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: { 'Content-Type': 'application/json' },
      })
      const senddata = {
        subject: subject,
        emailContent: emailContent,
        recipent:recipent,
        sendTime: currentTime // Include received time in newData
        };
       console.log("senddata",senddata)
      fetch(`https://mail-client-92dd6-default-rtdb.firebaseio.com/sent/user/${changedEnteredEmail}.json`, {
        method: 'POST',
        body: JSON.stringify(senddata),
        headers: { 'Content-Type': 'application/json' },
      })
        // .then((response) => {
        //   console.log('Email successfully send');
        //   console.log(response)
        //   if (response.ok) {
        //     return response.json(); 
        //   } else {
        //     throw new Error('Failed to send email');
        //   }
        // })
        // .then((data) => { 
        //   console.log(data);
            setEmail('');
            setSubject('');
            setEditorState(EditorState.createEmpty());
         
        // })
        // .catch((error) => {
        //   console.log(error);
        // });


    
  };

  return (
    <>
   
    <section className=" bg-gradient-to-b from-yellow-200 via-pink-400 to-pink-400 p-8 shadow-lg rounded-3" style={{marginLeft:"17%",marginRight:"12%",position:"relative", marginTop: "70px"}}>
    <form onSubmit={sendEmailHandler} className='bg-gradient-b from-red-600 to-red-800'>
      <div className="mb-4">
        <label className="block text-gray-700">To:</label>
        <input type="email" value={recipent} onChange={emailChangeHandler} className="form-input mt-1 block w-full py-2 px-2 hover:bg-red-50 rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subject:</label>
        <input type="text" value={subject} onChange={subjectChangeHandler} className="form-input mt-1 block w-full py-2 px-2 hover:bg-red-50 rounded" />
      </div>
      <label className="block text-gray-700">Write Mail:</label>
      <div className="mb-4 mt-2">
        <Editor
          editorState={editorState}
          toolbarClassName= "none"
          wrapperClassName="bg-white rounded p-3 focus:outline-none"
          editorClassName="w-full h-full"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <Button type="submit" className="bg-blue-500 text-white py-2 px-4 font-light">Send</Button>
    </form>
    </section>
    </>
  );
}

export default MailBox;
