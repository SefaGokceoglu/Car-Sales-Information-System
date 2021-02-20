import React, { useState,useEffect } from "react";
import axios from 'axios'
import DealerForm from '../DealerForm/DealerForm'
import DealerContainer from '../DealerContainer/DealerContainer'
import './Dealers.css'

function Dealers({ User, Username,dealers,setdealers }) {
  const [CurrentID, setCurrentID] = useState(null)

  
  return (
    <div>
      {User.length > 0 ? (
        <div className="User">
          <header>
            <h1> Welcome to the Dealers Page {Username} !</h1>
            <h5> You can see your  Company Dealers here and interract with them</h5>
          </header>
          <section className="dealer-section">
            <DealerForm User={User} setdealers={setdealers} dealers={dealers} CurrentID={CurrentID} setCurrentID={setCurrentID} />
            <div className=" dealer-container shadow bg-white rounded">
            {
              dealers.map((dealer)=>{
                return (
                <DealerContainer  dealers={dealers} setdealers={setdealers} User={User} dealer={dealer} key ={dealer._id} setCurrentID={setCurrentID}/>
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

export default Dealers;
