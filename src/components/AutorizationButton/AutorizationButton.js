import React from 'react';
import './AutorizationButton.css'

function AutorizationButton(props) {
  return (
    <button onClick={props.onClick}>Авторизация</button>
  );
}

export default AutorizationButton;