import { Route, Link, Routes } from "react-router-dom";
import React from 'react';
import RegistrationForm  from "../RegistrationForm/RegistrationForm";
import Autor  from "../Autor/Autor";
import StoleMsg from "../StolenMsg/StoleMsg";
import StealCases from "../StealCases/StealCases";
import './Header.css'

function Header() {
    return (
    <>
        <header className="App-header">
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/RegistrationForm">Регистрация</Link>
            <Link to="/Autor">Авторизация</Link>
            <Link to="/StoleMsg">Сообщить о краже</Link>
            <Link to="/StealCases">Случаи краж</Link>
            
        </nav>
        <div>
        </div>
        </header>
        <Routes>
          <Route path="/RegistrationForm" element={<RegistrationForm/>} />
          <Route path="/Autor" element={<Autor />} />
          <Route path="/StoleMsg" element={<StoleMsg />} />
          <Route path="StealCases" element={<StealCases />} />
        </Routes>
        </>
  );
}

export default Header;