import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import LoginForm from './components/Pages/LoginForm';
import ForgotPassword from './components/Pages/ForgotPassword';

function App() {
  return (
    <div>
      <Header/>
      
      <Routes>
      <Route path="/" element={ <LoginForm />} />
      <Route path='forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
