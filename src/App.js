import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import LoginForm from './components/Pages/LoginForm';
import ForgotPassword from './components/Pages/ForgotPassword';
import MailBox from './components/Pages/MailBox';
import Inbox from './components/Pages/Inbox';

function App() {
  return (
    <div>
      <Header/>
      
      <Routes>
      <Route path="/" element={ <LoginForm />} />
      <Route path="/mailbox" element={ <MailBox/>} />
      <Route path="inbox" element={<Inbox/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
