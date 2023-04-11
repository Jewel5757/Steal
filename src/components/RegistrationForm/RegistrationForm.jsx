import React, { useState } from 'react';
import "./RegistrationForm.css"
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    clientId: '',
    approved: ''
  });
  const [isRegistred, setIsRegistred] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  let flag = true;


  const handleSubmit = event => {
    event.preventDefault();
  
    if (user.clientId === '3fade701-708b-44d9-bd44-598f7b2cc024') {
      user.approved = true;
    } else {
      user.approved = false;
    }
  
    fetch('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (response.status !== 200) {
          alert('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        response.json().then(function(data) {
          alert('Вы успешно зарегистрированы');
          flag = false;
          let foo = document.querySelector('.reg');
          foo.classList.remove('reg');
          foo.classList.add('regnon');
          setIsRegistred(true);
        });
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  };

  if (isRegistred) {
    return (
    <div className='regSucsess'>
      <p>Вы успешно зарегистированы!</p>
      <Link to="/"><button>На главную</button></Link>
    </div>
  )}

  if (user.clientId == '3fade701-708b-44d9-bd44-598f7b2cc024'){
    user.approved = true
  } else {
    user.approved = false
  }

  return (
    <div className='reg'>
    <form onSubmit={handleSubmit}>
      <label>
        E-mail:
      </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      <label>
        Имя
      </label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
        />
      <label>
        Фамилия
      </label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
        />
      <label>
        Пароль:
      </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
       <label>
        Client ID
      </label>
        <input
          type="text"
          name="clientId"
          value={user.clientId}
          onChange={handleInputChange}
        />
      <button type="submit">Регистрация</button>
    </form>
    </div>
    );
}

export default RegistrationForm;