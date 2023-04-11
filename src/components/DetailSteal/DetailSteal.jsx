import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./DetailSteal.css"

function DetailSteal(props) {
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

    fetch("https://sf-final-project-be.herokuapp.com/api/cases/", requestOptions)
      .then((result) => {
        return result.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);



  const { id } = useParams();
  const myId = id.toString()

  //Для удаления задачи
  const delCase = () => {
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

    fetch("https://sf-final-project-be.herokuapp.com/api/cases/"+ myId, requestOptionsDel)
      .then((result) => {
        setIsLoaded(true);
        setItems(result.data);
      });
  };


  // Для редактирования задачи
  function EditCase() {
    const [cases, setCases] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [selection, setSelection] = useState([]);
    const handleInputChange = event => {
    const { name, value } = event.target;
    setCases(prevUser => ({ ...prevUser, [name]: value }));
    };

    useEffect(() => {
       //Запрос на всех сотрудников
       let myHeaders3 = new Headers();
       myHeaders3.append(
         "Authorization",
         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8"
       );
       let requestOptions3 = {
         method: "GET",
         headers: myHeaders3,
       };
       fetch("https://sf-final-project-be.herokuapp.com/api/officers/", requestOptions3)
         .then((result) => {
           console.log("Response status:", result.status);
           return result.json();
         })

         .then((result) => {
            setSelection(result.officers);
           });
          }, []);
 
    const handleSubmit = event => {
        event.preventDefault();
        fetch('https://sf-final-project-be.herokuapp.com/api/cases/'+ myId, {
          method: 'PUT', 
          body: JSON.stringify(cases),
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzU4ODExZDE5ODcwNDg1NWE3YjQyMCIsImlhdCI6MTY4MTIzMDExMCwiZXhwIjoxNjgxODM0OTEwfQ.0b81G-yJJmZK6rXTQ13ifFN5nBQSOu7tvIfdrZeMYD8"
          }
        })

        .then((result) => {
          setIsEdit(true);
          setItems(result.data);
        })
      
        if (cases.status !== "done"){
        }
};
   
      if (isEdit) {
        return <p>Данные изменены</p>;
      }
      
      return (
        <div className='edit'>
        <form onSubmit={handleSubmit}>
          <label>
            ФИО
          </label>
            <input
              type="text"
              name="ownerFullName"
              value={cases.ownerFullName}
              onChange={handleInputChange}
            />
          <label>
            Цвет
          </label>
            <input
              type="text"
              name="color"
              value={cases.color}
              onChange={handleInputChange}
            />
          <label>
            Дата
          </label>
            <input
              type="text"
              name="date"
              placeholder='DD/MM/YY'
              value={cases.date}
              onChange={handleInputChange}
            />
          <label>
            Дополнительная информация
          </label>
            <input
              type="text"
              name="description"
              value={cases.description}
              onChange={handleInputChange}
            />
          <label>
            Номер лицензии
          </label>
            <input
              type="text"
              name="licenseNumber"
              value={cases.licenseNumber}
              onChange={handleInputChange}
            />
            <label>
            Ответственный:
          </label>
          <select 
          name="officer" 
          value={cases.officer} 
          onChange={handleInputChange}
          >
          {selection &&
          selection.length > 0 &&
          selection.map(item => {
            if (item.approved){
              return (
                <option key={item._id}>{item._id}</option>
              )
          }
        })
      }
        </select>
          <label>
            Тип велосипеда
          </label>
          <select name="type" value={cases.type} onChange={handleInputChange}>
            <option>Выберите тип</option>
            <option>general</option>
            <option>sport</option>
          </select>
          <label>
            Завершающий комментарий*
          </label>
          <input
              type="text"
              name="resolution"
              value={cases.resolution}
              onChange={handleInputChange}
              disabled={cases.status !== 'done'}
          />
            <label>
            Статус
          </label>
          <select name="status" value={cases.status} onChange={handleInputChange}>
            <option>Выберите статус</option>
            <option>new</option>
            <option>in_progress</option>
            <option>done</option>
          </select>

          <button type="submit" onClick={handleSubmit} disabled={!cases.resolution && cases.status == 'done'}>Готово</button>
          <p>*Доступно при статусе "done"</p>
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
        <div className='stealDel'>
        <h2>Cлучай не найден или был удален</h2>
        <Link to="/StealCases"><button>Назад</button></Link>
        </div>
        )
    else {

      return (
        <div className='detail'>
          <div className='detailInner'>
          <p><b>ID задачи:</b> {restd._id}</p>
          <p><b>ФИО:</b> {restd.ownerFullName}</p>
          <p><b>ClientId:</b> {restd.clientId}</p>
          <p><b>Цвет: </b>{restd.color}</p>
          <p><b>Дата кражи:</b>{new Date(restd.date).toLocaleDateString("en-GB")} </p>
          <p><b>Ответственный сотрудник:</b> {restd.officer}</p>
          <p><b>Тип велосипеда: </b>{restd.type}</p>
          <p><b>Статус задачи:</b> {restd.status}</p>
          <p><b>Номер лицензии:</b> {restd.licenseNumber}</p>
          <p><b>Дата создания сообщения:</b> {new Date(restd.createdAt).toLocaleDateString("en-GB")}</p>
          <p><b>Дата последнего обновления сообщения:</b> {new Date(restd.updatedAt).toLocaleDateString("en-GB")}</p>
          <p><b>Дополнительная информация: </b>{restd.description}</p>
          <p><b>Завершающий комментарий:</b> {restd.resolution}</p>
          <button className={props.isAuthenticated === true ? 'test' : 'test2'} onClick = {delCase}>Удалить задачу</button>
          <button className={props.isAuthenticated === true ? 'test1' : 'test2'} onClick = {() =>setEdit(true)} >Редактировать данные</button>
          {edit && < EditCase />}
          <Link to="/StealCases"><button>Назад</button></Link>
          </div>
        </div>
      );
    }
  }
}

export default DetailSteal;