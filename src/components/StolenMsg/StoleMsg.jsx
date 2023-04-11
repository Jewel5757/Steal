import React, { useState } from 'react';
import './StoleMsg.css';


function StoleMsg(props) {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [type, setType] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [clientId, setClientId] = useState('');
  const [createdAt] = useState('');
  const [updatedAt] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');
  const [officer] = useState('');
  const [description, setDescription] = useState('');
  const [resolution] = useState('');
  const [isSend, setIsSend] = useState(false);

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      status:'new',
      licenseNumber,
      type,
      ownerFullName,
      clientId,
      createdAt,
      updatedAt,
      color,
      date,
      officer,
      description,
      resolution,
    };

    fetch('https://sf-final-project-be.herokuapp.com/api/public/report', {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8",
      }
    })

    .then(function(response) {
      if (response.status == 400 && !licenseNumber) {
        alert('Вы не ввели номер лицензии');
        return;
      } else if (response.status == 400 && !clientId) {
        alert('Вы не ввели ClientId');
        return;
      } else if (response.status == 400 && !ownerFullName) {
        alert('Вы не ввели ФИО');
        return;
      } else if (response.status == 400 && !type) {
        alert('Вы не ввели тип');
        return;
      } else if (response.status !== 200) {
        alert('Что-то пошло не так, ошибка:' + response.status);
        return;
      } 

      response.json().then(function(data) {
        alert('Сообщение отправлено');
  
        setIsSend(true)
      });
    })

    .catch(error => console.error(error));
  }

  if (isSend) {
    return (
    <div className='send'>
    <p>Ваше сообщение отправлено</p>
    </div>
    )
  }
 
  return (
    <div className= 'msg'>
    <form onSubmit={handleSubmit}>
      <label>
        Номер лицензии
      </label>
        <input type="text" value={licenseNumber} className={licenseNumber.length ? '' : 'error'}  onChange={e => setLicenseNumber(e.target.value)} />
        <label>
        Client ID:
      </label>
        <input type="text" value={clientId} className={clientId.length ? '' : 'error'} onChange={e => setClientId(e.target.value)} />
      <label>
        Тип велосипеда
      </label>
        <select value={type} className={type.length ? '' : 'error'}  onChange={e => setType(e.target.value)}>
        <option>Выберите тип</option>
         <option>general</option>
         <option>sport</option>
      </select>
      <label>
        ФИО пользователя 
      </label>
        <input type="text" value={ownerFullName} className={ownerFullName.length ? '' : 'error'} onChange={e => setOwnerFullName(e.target.value)} />
      <label>
       Цвет велосипеда
      </label>
        <input type="text" value={color} onChange={e => setColor(e.target.value)} />
      <label>
        Дата кражи
      </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <label>
        Дополнительная информация
      </label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Отправить</button>
    </form>
    </div>
  );
}


export default StoleMsg;