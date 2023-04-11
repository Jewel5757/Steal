import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



function DetailOfficers(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(false);


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
          setIsLoaded(true);
          setItems(result.officers);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const { id } = useParams();
  const myId = id.toString()

    //Для удаления сотрудника
    const delOfficer = () => {
      let myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8"
      );
      let requestOptionsDel = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch("https://sf-final-project-be.herokuapp.com/api/officers/"+ myId, requestOptionsDel)
        .then((result) => {
          setIsLoaded(true);
          setItems(result.data);
        });
    };

    //редактировать сотрудника

    function EditOfficers() {
      const [user, setUser] = useState({});
        const [isEdit, setIsEdit] = useState(false);
        const [checked, setChecked] = useState(true);
        const handleInputChange = event => {
          const { name, value } = event.target;
          setUser(prevUser => ({ ...prevUser, [name]: value }));
        };
      
        const handleSubmit = event => {
          event.preventDefault();
          fetch('https://sf-final-project-be.herokuapp.com/api/officers/'+ myId, {
            method: 'PUT', 
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8"
            }
          })
 
            .then((result) => {
              setIsEdit(true);
              setItems(result.data);
            })
        };

        if (isEdit) {
          return <p>Данные изменены</p>;
        }
      
        if(checked){
          user.approved = false
        }else{
          user.approved = true
       }
        return (
          <div className='edit'>
          <form onSubmit={handleSubmit}>
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
              Статус:
            </label>
            <input type ="checkbox" id="isApproved"  onChange={() => setChecked(!checked)} ></input>
            <button type="submit" onClick={handleSubmit}>Готово</button>
          </form>
          </div>
          );
      }


  if (error) {
    return <p> Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p> Loading...</p>;
  } else {
    let restd =
    items &&
    items.length > 0 &&
    items.find(item => item._id == myId)
    if(restd == undefined)
        return (
        <div className='regSucsess'>
        <h2>Cотрудник не найден или удален</h2>
        <Link to="/Officers"><button>Назад</button></Link>
        </div>
        )
        
    else {
      
      return (
        <div className='detail'>
          <div className='detailInner'>
          <p><b>Email: </b>{restd.email}</p>
          <p><b>Имя:</b> {restd.firstName}</p>
          <p><b>ClientId:</b> {restd.clientId}</p>
          <p><b>Фамилия: </b>{restd.lastName}</p>
          <p><b>ID: </b>{restd._id}</p>
          <p><b>Статус:</b> {restd.approved? "одобрен" : "не одобрен" }</p>
          <button onClick = {() =>setEdit(true)} >Редактировать данные</button>
          
          {edit && < EditOfficers />}
          <button onClick = {delOfficer}>Удалить сотрудника</button>
          <Link to="/Officers"><button>Назад</button></Link>
          </div>
        </div>
      );
    }
  }
}


export default DetailOfficers;