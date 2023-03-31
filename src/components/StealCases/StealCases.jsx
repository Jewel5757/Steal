import React , { Component } from "react";
import "./StealCases.css"

export default class StealCases extends Component {
 constructor(props) {
    super(props);
    this.state = {
        error:null,
        isLoaded: false,
        items: [] 
    };
 }

componentDidMount() {
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZhNGMyYTMzZTZkNTIzYjJiNjJjZSIsImlhdCI6MTY4MDE5MjI1NSwiZXhwIjoxNjgwNzk3MDU1fQ.qTSy7ztiBNumM_GGz1tk-qBm16kje4wgANFIaWA_hn0");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  


     fetch("https://sf-final-project-be.herokuapp.com/api/cases/", requestOptions)
    .then(res => res.json())
    .then(
        (result) => {
        this.setState({
            isLoaded:true,
            items:result.data
        });
    },
        (error) => {
            this.setState ({
                isLoaded: true,
            });
        }
    )
}

 render () {
    const {error, isLoaded, items } = this.state;
    if (error) {
        return <p> Error { error.message }</p>
    } else if (!isLoaded) {
        return <p> Loading...</p>
    } else {
        let res = items.map(function(item) {
            return <tr key={item._id}>
               <td>{item._id}</td>
               <td>{item.status}</td>
               <td>{item.licenseNumber}</td>
               <td>{item.ownerFullName}</td>
               <td>{item.createdAt}</td>
            </tr>;
         });
      
         return <div className='table'>
        <table>
            <thead>
               <tr>
                  <td>ID</td>
                  <td>Статус</td>
                  <td>Лицензия</td>
                  <td>ФИО</td>
                  <td>Дата</td>
               </tr>
            </thead>
            <tbody>
               {res}
            </tbody>
         </table>
         </div>;
    }
 }
}
