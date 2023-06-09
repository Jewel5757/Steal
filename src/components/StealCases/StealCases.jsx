import React, { Component } from "react";
import "./StealCases.css";
import { Link } from "react-router-dom";
import "../DetailSteal/DetailSteal"


export default class StealCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  
  componentDidMount() {
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
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
          });
        }
      );
      
  }

  handleItemClick = (itemId) => {
    window.location.href = `/cases1/${itemId}`;
  };



  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p> Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p> Loading...</p>;
    } else {
      let restd =
        items &&
        items.length > 0 &&
        items.map(function (item) {
          return (
            <tr key={item._id} >
               <td><Link to={`/cases/${item._id}`} key={item._id}>
              {item._id}
               </Link></td>
              <td>{item.status}</td>
              <td>{item.licenseNumber}</td>
              <td>{item.ownerFullName}</td>
              <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
            </tr>
      
          );
        }, this);

      return (
        <div className="cases">
        <div className="table">
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
            <tbody>{restd}</tbody>
          </table>
       
        </div>
        </div>
      );
    }
  }
}