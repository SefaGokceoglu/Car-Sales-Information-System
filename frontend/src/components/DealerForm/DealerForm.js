import React, { useEffect, useState } from "react";
import axios from "axios";
function DealerForm({ User, setdealers, dealers, setCurrentID, CurrentID }) {
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [adress, setadress] = useState("");
  const [m_name, setm_name] = useState("");
  const [m_lastname, setm_lastname] = useState("");
  const [phone, setphone] = useState("")

  const [Errors, setErrors] = useState("");
  const [Success, setSuccess] = useState(false);

  setTimeout(() => {
    setSuccess(false);
  }, 10000);

  setTimeout(() => {
    setErrors("");
  }, 10000);

  const cityHandler = (e) => {
    setcity(e.target.value);
  };

  const districtHandler = (e) => {
    setdistrict(e.target.value);
  };

  const addressHandler = (e) => {
    setadress(e.target.value);
  };

  const m_nameHandler = (e) => {
    setm_name(e.target.value);
  };

  const m_lastnameHandler = (e) => {
    setm_lastname(e.target.value);
  };
  const phoneHandler = (e) =>{
    setphone(e.target.value)
  } 


  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (CurrentID) {
      const response = await axios
        .patch(`http://localhost:7000/dealers/${User}/${CurrentID}`, {
          city,
          district,
          adress,
          name:m_name,
          lastname:m_lastname,
          phone
          
        })
        .catch((err) => {
          setErrors(err.response.data.msg);
        });

      if (response && response.data) {
        dealers.find((dealer, index) => {
          if (dealer._id === CurrentID) {
            dealers[index] = response.data;
          }
        });
        setdealers(dealers);
        setCurrentID(null);
      }
    } else {
      const response = await axios
        .post(`http://localhost:7000/dealers/${User}`, {
          city,
          district,
          adress,
          name:m_name,
          lastname:m_lastname,
          phone
        })
        .catch((err) => {
          setErrors(err.response.data.msg);
        });

      if (response && response.data) {
        const dealer = response.data;
        setdealers([...dealers, dealer]);
      }
    }
    setcity("");
    setdistrict("");
    setadress("");
    setm_name("");
    setm_lastname("");
    setphone("")
    setSuccess(true);
  };

  useEffect(() => {
    console.log(CurrentID);
    if (CurrentID) {
      console.log(CurrentID);

      const CurrentDealer = dealers.find((dealer) => dealer._id === CurrentID);
      if (CurrentDealer) {
        setcity(CurrentDealer.city);
        setdistrict(CurrentDealer.district);
        setadress(CurrentDealer.adress);
        setm_name(CurrentDealer.manager.name);
        setm_lastname(CurrentDealer.manager.lastname);
        setphone(CurrentDealer.manager.phone)
      }
    }
  }, [CurrentID]);

  return (
    <div className="dealer-add-container shadow bg-white rounded">
      {!CurrentID ? <h5>Adding Dealer</h5> : <h5>Updating Dealer</h5>}
      {Errors.length > 0 ? (
        <div className="Error    alert alert-warning rounded" role="alert">
          {Errors}
        </div>
      ) : Success ? (
        <div className="Success alert alert-success" role="alert">
          Succesfully submited the form !
        </div>
      ) : null}
      <form className="form">
        <div className="form-group">
          <label> Dealer City</label>
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={cityHandler}
          />
        </div>
        <div className="form-group">
          <label> Dealer District</label>
          <input
            type="text"
            className="form-control"
            placeholder="District"
            value={district}
            onChange={districtHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Dealers Adress
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Adress"
            value={adress}
            onChange={addressHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label> Manager Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Manager Name"
            value={m_name}
            onChange={m_nameHandler}
          />
        </div>
        <div className="form-group">
          <label> Manager Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Manager Last Name"
            value={m_lastname}
            onChange={m_lastnameHandler}
          />
        </div>
        <div className="form-group">
          <label> Manager Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Manager Phone Number"
            value={phone}
            onChange={phoneHandler}
          />
        </div>
        <button
          onClick={SubmitHandler}
          className="btn btn-secondary"
          type="submit"
        >
          {!CurrentID ? "Add Dealer" : "Update Dealer"}
        </button>
      </form>
    </div>
  );
}

export default DealerForm;
