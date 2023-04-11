import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './Footer.css'
import logo from "./logo1.png";

function Footer(props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 920);


    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 920);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

   
    return (
    <>
        <footer className="App-footer">
        <img src={logo} alt="логотип" />
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/StealCases">Случаи краж</Link>
        </nav>
        <p>Created by Tatyana Chayko</p>
        </footer>
    </>
  );
}

export default Footer;