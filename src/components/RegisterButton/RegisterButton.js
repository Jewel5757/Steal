import React from 'react';
import './RegisterButton.css'

function RegisterButton(props) {
  return (
    <button onClick={props.onClick}>Регистрация</button>
  );
}

export default RegisterButton;