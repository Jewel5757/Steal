import React, { useState } from 'react';
import './StoleMsg.css'

function StoleMsg() {
  const [status, setStatus] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [type, setType] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [clientId, setClientId] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');
  const [officer, setOfficer] = useState('');
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('');

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
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  return (
    <div className= 'msg'>
    <form onSubmit={handleSubmit}>
      <label>
        Номер лицензии
      </label>
        <input type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
      
      <label>
        Тип велосипеда
      </label>
        <select value={type} onChange={e => setType(e.target.value)}>
         <option>general</option>
         <option>sport</option>
      </select>
      <label>
        ФИО пользователя (арендатора велосипеда)
      </label>
        <input type="text" value={ownerFullName} onChange={e => setOwnerFullName(e.target.value)} />
      <label>
        Client ID:
      </label>
        <input type="text" value={clientId} onChange={e => setClientId(e.target.value)} />
      <label>
        Дата создания сообщения
      </label>
        <input type="text" value={createdAt} onChange={e => setCreatedAt(e.target.value)} />
      <label>
        Дата последнего обновления сообщения
      </label>
        <input type="text" value={updatedAt} onChange={e => setUpdatedAt(e.target.value)} />
      <label>
       Цвет велосипеда
      </label>
        <input type="text" value={color} onChange={e => setColor(e.target.value)} />
      <label>
        Дата кражи
      </label>
        <input type="text" value={date} onChange={e => setDate(e.target.value)} />
      <label>
        Ответственный сотрудник
      </label>
        <input type="text" value={officer} onChange={e => setOfficer(e.target.value)} />
      <label>
        Дополнительный комментарий
      </label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <label>
        Завершающий комментарий
      </label>
        <textarea value={resolution} onChange={e => setResolution(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}


export default StoleMsg;