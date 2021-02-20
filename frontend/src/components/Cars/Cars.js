import React, { useState,useEffect } from "react";
import CarContainer from "../CarContainer/CarContainer";
import CarForm from '../CarForm/CarForm'
import axios from 'axios'
import "./Cars.css";


function Cars({dealers ,User, Username }) {
  const [CurrentID, setCurrentID] = useState(null)
  const [cars, setcars] = useState([]);

  
  useEffect(async () => {
    if(User.length >0){
    const source = axios.CancelToken.source()
    const response = await  axios.get(`http://localhost:7000/cars/${User}`,{cancelToken: source.token,})
    .catch((err)=>{
    if (axios.isCancel(err)) {
      console.log("cancelled");
    } else {
        throw err
    }})

    if (response && response.data){
    setcars(response.data);
    }
    return () => {
      source.cancel()
    }
    }
  }, [])

  return (
    <div>
      {User.length > 0 ? (
        <div className="User">
          <header>
            <h1> Welcome to the Cars page {Username} !</h1>
            <h5> You can see your Company Cars here and interract with them</h5>
          </header>
          <section className="car-section">
            <CarForm dealers={dealers} User={User} setcars={setcars} cars={cars} CurrentID={CurrentID} setCurrentID={setCurrentID} />
            <div className=" car-container shadow bg-white rounded">
            {
              cars.map((car)=>{
                return (
                  <CarContainer  cars={cars} setcars={setcars} User={User} car={car} key ={car._id} setCurrentID={setCurrentID}/>
                )
              })
            }
            </div>
          </section>
        </div>
      ) : (
        <div className="notUser shadow mb-auto bg-white rounded">
          <p>You have to login to see this page</p>
        </div>
      )}
    </div>
  );
}

export default Cars;
