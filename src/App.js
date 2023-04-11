import './App.css';
import { Route,  Routes } from "react-router-dom";
import { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import StoleMsg from './components/StolenMsg/StoleMsg';
import StealCases from './components/StealCases/StealCases';
import Login from './components/Login/Login';
import Officers from './components/Officers/Officers';
import Message from './components/Message/Message';
import DetailSteal from './components/DetailSteal/DetailSteal';
import DetailOfficers from './components/DetailOfficers/DetailOfficers';
import Footer from './components/Footer/Footer';


function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
  };

  return (
    <div className="App">
      <Header isAuthenticated = {isAuthenticated} userEmail = {userEmail} handleLogout = {handleLogout}/>
      <Routes>
        <Route path="/RegistrationForm" element={<RegistrationForm/>} />
        <Route path="/StoleMsg"  element={<StoleMsg isAuthenticated = {isAuthenticated} />} />
        <Route path="/StealCases" element={<StealCases />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Login" element={<Login 
            userEmail ={userEmail}
            setUserEmail ={setUserEmail}
            isAuthenticated= {isAuthenticated}
            setIsAuthenticated ={setIsAuthenticated}
            email = {email}
            setEmail= {setEmail}
            password = {password}
            setPassword ={setPassword}
            isLoading ={isLoading}
            setIsLoading ={setIsLoading}
            handleLogout = {handleLogout}
        /> } />
        <Route path="/Officers" element={<Officers />} />
        <Route path="/" element={<Main />} />
        <Route path="cases/:id" element={<DetailSteal 
            isAuthenticated= {isAuthenticated} />} />
        <Route path="officers/:id" element={<DetailOfficers  />} />
      </Routes> 
      <Footer />
    </div>
  );

}

export default App;
