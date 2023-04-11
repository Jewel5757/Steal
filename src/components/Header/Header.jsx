import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './Header.css'

function Header(props) {
    const {isAuthenticated, handleLogout} = props
    const [isMobile, setIsMobile] = useState(window.innerWidth < 620);
    const [Flag, setFlag] = useState(false);
    function MobileMenu() {
        
        if (isAuthenticated && isMobile && Flag) {
            return (
             <div className="mobile">
                <Link to="/">Главная</Link>
                <Link to="/StealCases">Случаи краж</Link>
                <Link to="/Officers">Ответственные сотрудники</Link>
                <Link to="/Message">Сообщить о краже (для сотрудников)</Link> 
             </div>
            )
        } else if (isMobile && Flag) {
            return (
                <div className="mobile">
                     <Link to="/">Главная</Link>
                     <Link to="/StealCases">Случаи краж</Link>
                     <Link to="/StoleMsg">Сообщить о краже</Link>
                     <Link to="/RegistrationForm">Регистрация</Link>
                     <Link to="/Login">Авторизация</Link>
                 </div>
            )
        }
        return null;
    }

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 620);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function LoginButton(props) {
        if (isAuthenticated) {
            return <div className="loggined"> <button className="loginBtn" onClick={handleLogout}>Выйти</button></div>
        } else {
        return <div className="loggined"> <Link to="/Login"><button className="loginBtn">Авторизация</button></Link></div>
        }
    }

    function HeaderInner(props) {
        if (isAuthenticated && !isMobile) {
           return (
            <>
                <Link to="/">Главная</Link>
                <Link to="/StealCases">Случаи краж</Link>
                <Link to="/Officers">Ответственные сотрудники</Link>
                <Link to="/Message">Сообщить о краже (для сотрудников)</Link> 
            </>
           )
        } else if (!isMobile) {
            return (
                <>  
                    <Link to="/">Главная</Link>
                    <Link to="/StealCases">Случаи краж</Link>
                    <Link to="/StoleMsg">Сообщить о краже</Link>
                    <Link to="/RegistrationForm">Регистрация</Link>
                    <Link to="/Login">Авторизация</Link>
                </>
            )
        }
        return null;
    }
   
    return (
    <>
        <header className="App-header">
        <nav>
            < LoginButton />
            {isMobile ? <div className="burger" onClick={() => 
            {
                setFlag(!Flag)
            }
                }>
            <div class="b"></div>
            <div class="b"></div>
            <div class="b"></div></div> : <HeaderInner />}
        </nav>
        </header>
        {isMobile && <MobileMenu />}
    </>
  );
}

export default Header;