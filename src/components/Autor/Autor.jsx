import React, { useState } from 'react';
import "./Autor.css"

function Autor() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', {
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    console.log(user);
  };

  return (
    <div className='auto'>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
      </label>
        <input
          type="email"
          name="email"
          value={user.email}
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
      <button type="submit">Войти</button>
    </form>
    </div>
  );
}

export default Autor;