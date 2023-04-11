import React, { useState } from 'react';
import './Message.css';
import { useEffect } from 'react';

function Message(props) {
  const [status, setStatus] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [type, setType] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [clientId, setClientId] = useState('');
  const [createdAt] = useState('');
  const [updatedAt] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState('');
  const [officer, setOfficer] = useState('');
  const [description, setDescription] = useState('');
  const [resolution] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [items, setItems] = useState('');


  
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



    fetch('https://sf-final-project-be.herokuapp.com/api/cases/', {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8",
      }
    })
    .then(response =>{
      response.json()
      setIsSend(true)
      console.log("Response status:", response.status);
    })
    .catch(error => console.error(error));
  }

  //сотрудники
  useEffect(() => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8"
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://sf-final-project-be.herokuapp.com/api/officers/", requestOptions)
  .then((result) => {
    console.log("Response status:", result.status);
    return result.json();
  })
  .then(
    (result) => {
      console.log("Data:", result.officers);
      const officersEmail = result.officers
      .filter((officer) => officer.approved)
      .map((officer) => officer._id);
      setItems(officersEmail); 
  })
},[]);


  if (isSend) {
    return (
    <div className='regSucsess'>
    <p>Ваше сообщение отправлено</p>
    </div>
    )
  }

  return (
    <div className= 'msg'>
    <form onSubmit={handleSubmit}>
    <label>
        Статус:
      </label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>new</option>
      </select>
      <label>
        Номер лицензии
      </label>
        <input type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
      <label>
        Тип велосипеда
      </label>
        <select value={type} onChange={e => setType(e.target.value)}>
        <option>Выберите тип</option>
         <option>general</option>
         <option>sport</option>
      </select>
      <label>
        ФИО пользователя 
      </label>
        <input type="text" value={ownerFullName} onChange={e => setOwnerFullName(e.target.value)} />
       
      <label>
       Цвет велосипеда
      </label>
        <input type="text" value={color} onChange={e => setColor(e.target.value)} />
      <label>
        Дата кражи
      </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <label>
        Ответственный сотрудник
      </label>
      <select value={officer} onChange={e => setOfficer(e.target.value)}>
        <option>Выберите ответственного сотрудника</option>
        { items &&
          items.length > 0 &&
          items.map((item, index) => <option key={index} value={item}>{item}
        </option>)}
      </select>
      <label>
        Дополнительная информация
      </label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Отправить</button>
    </form>
    </div>
  );
}

export default Message;