import React,{useState,useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import NavbarX from './components/NavbarX/NavbarX'
import Dealers from "./components/Dealers/Dealers";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cars from './components/Cars/Cars'


export default function App() {

  const [User, setUser] = useState("")
  const [Username, setUsername] = useState("")
  const [dealers, setdealers] = useState([])
  useEffect( ()=>{



    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setUser(loggedInUser);
      setUsername(localStorage.getItem("username"))

      axios.get(`http://localhost:7000/dealers/${loggedInUser}`)
      .then((response) =>{
        setdealers(response.data)
      })
      .catch((err)=>console.log(err))
    }
  },[]);

  return (
    <Router>
      <NavbarX User={User} setUser={setUser} /> 
        <Switch>
          <Route path="/dealers" component={()=> <Dealers dealers={dealers} setdealers={setdealers} User={User} Username={Username} />} />
          <Route path="/" exact component={Home} />
          <Route path="/cars" component={()=> <Cars dealers={dealers} User={User} Username={Username} />} />
          <Route path="/login" component={()=><Login setUser={setUser} setUsername={setUsername} />} />
          <Route path="/register" component={()=><Register setUser={setUser} setUsername={setUsername} />} />
        </Switch>
    </Router>
  );
}

