import React, { Component } from "react";
import '../StealCases/StealCases.css'
import { Link } from "react-router-dom";
import "../DetailOfficers/DetailOfficers"

export default class Officers extends Component {
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

    fetch("https://sf-final-project-be.herokuapp.com/api/officers/", requestOptions)
      .then((result) => {
        console.log("Response status:", result.status);
        return result.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.officers,
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
    window.location.href = `/officers/${itemId}`;
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
                <td><Link to={`/officers/${item._id}`} key={item._id}>
              {item.email}
               </Link></td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.approved? "одобрен" : "не одобрен" }</td>
            </tr>
      
          );
        }, this);

      return (
        <div className="cases">
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>Email</td>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>Статус одобрения</td>
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