import React, { useEffect, useState } from "react";
import axios from "axios";
function CarForm({ User, setcars, cars, setCurrentID, CurrentID, dealers }) {
  const [model, setmodel] = useState("");
  const [plaque, setplaque] = useState("");
  const [fuelType, setfuelType] = useState("");
  const [value, setvalue] = useState("");
  const [rentalValue, setrentalValue] = useState("");
  const [maintenance, setmaintenance] = useState("");
  const [needMaintenance, setneedMaintenance] = useState(false);
  const [km, setkm] = useState("");
  const [dealer, setdealer] = useState("");

  const [Errors, setErrors] = useState("");
  const [Success, setSuccess] = useState(false);

  setTimeout(() => {
    setSuccess(false);
  }, 7000);

  setTimeout(() => {
    setErrors("");
  }, 7000);

  const modelHandler = (e) => {
    setmodel(e.target.value);
  };

  const plaqueHandler = (e) => {
    setplaque(e.target.value.toUpperCase());
  };

  const fuelTypeHandler = (e) => {
    setfuelType(e.target.value);
  };
  const valueHandler = (e) => {
    setvalue(e.target.value);
  };

  const rentalValueHandler = (e) => {
    setrentalValue(e.target.value);
  };

  const maintenanceHandler = (e) => {
    setmaintenance(e.target.value);
  };

  const needMaintenanceHandler = (e) => {
    setneedMaintenance(e.target.checked);
  };
  const kmHandler = (e) => {
    setkm(e.target.value);
  };
  const dealerHandler = (e) => {
    setdealer(e.target.value);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    let status;
    if (needMaintenance) {
      status = "Need Maintenance";
    } else {
      status = "Avaliable";
    }
    if (CurrentID) {
      const response = await axios
        .patch(`http://localhost:7000/cars/${User}/${CurrentID}`, {
          model,
          plaque,
          fuelType,
          value,
          rentalValue,
          maintenance,
          needMaintenance,
          km,
          dealer,
          status,
        })
        .catch((err) => {
          setErrors(err.response.data.msg);
        });

      if (response && response.data) {
        cars.find((car, index) => {
          if (car._id === CurrentID) {
            cars[index] = response.data;
          }
        });
        setcars(cars);
        setCurrentID(null);
      }
    } else {
      const response = await axios
        .post(`http://localhost:7000/cars/${User}`, {
          model,
          plaque,
          fuelType,
          value,
          rentalValue,
          maintenance,
          needMaintenance,
          km,
          dealer,
          status,
        })
        .catch((err) => {
          setErrors(err.response.data.msg);
        });

      if (response && response.data) {
        const car = response.data;
        setcars([...cars, car]);
      }
    }
    setmodel("");
    setplaque("");
    setfuelType("");
    setvalue("");
    setrentalValue("");
    setmaintenance("");
    setneedMaintenance(false);
    setkm("");
    setdealer("");
    setSuccess(true);
  };

  useEffect(() => {
    if (CurrentID) {
      const CurrentCar = cars.find((car) => car._id === CurrentID);
      if (CurrentCar) {
        setmodel(CurrentCar.model);
        setplaque(CurrentCar.plaque);
        setfuelType(CurrentCar.fuelType);
        setvalue(CurrentCar.value);
        setrentalValue(CurrentCar.rentalValue);
        setmaintenance(CurrentCar.maintenance);
        setneedMaintenance(CurrentCar.needMaintenance);
        setkm(CurrentCar.km);
        setdealer(CurrentCar.dealer)
      }
    }
  }, [CurrentID]);

  return (
    <div className="car-add-container shadow bg-white rounded">
      {!CurrentID ? <h5>Adding Car</h5> : <h5>Updating Car</h5>}
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
          <label> Car Model</label>
          <input
            type="text"
            className="form-control"
            placeholder="Car Model"
            value={model}
            onChange={modelHandler}
          />
        </div>
        <div className="form-group">
          <label> Car Plaque</label>
          <input
            type="text"
            className="form-control"
            placeholder="06-SG-2222"
            value={plaque}
            onChange={plaqueHandler}
          />
        </div>
        <div className="form-group">
          <label> Dealer's City</label>
          <select
            className="custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            onChange={dealerHandler}
            value={dealer}
          >
            <option>Choose City</option>
            {dealers.map((dealer, index) => {
              return (
                <option key={index} value={dealer.city}>
                  {dealer.city}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label> Fuel Type</label>
          <select
            className="custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            onChange={fuelTypeHandler}
            value={fuelType}
          >
            <option>Choose Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="form-group">
          <label> Price (TL)</label>
          <input
            type="text"
            className="form-control"
            placeholder="15000"
            value={value}
            onChange={valueHandler}
          />
        </div>
        <div className="form-group">
          <label> 1 Week renting price (TL)</label>
          <input
            type="text"
            className="form-control"
            placeholder="15000"
            value={rentalValue}
            onChange={rentalValueHandler}
          />
        </div>
        <div className="form-group">
          <label> How many kilometers for maintenance ?</label>
          <input
            type="text"
            className="form-control"
            placeholder="15000"
            value={maintenance}
            onChange={maintenanceHandler}
          />
        </div>

        <div className="form-group">
          <label> Car current kilometer </label>
          <input
            type="text"
            className="form-control"
            placeholder="15000"
            value={km}
            onChange={kmHandler}
          />
        </div>
        <div className="custom-control custom-checkbox pb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            onChange={needMaintenanceHandler}
            checked={needMaintenance}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Check if needs maintenance
          </label>
        </div>
        <button
          onClick={SubmitHandler}
          className="btn btn-secondary"
          type="submit"
        >
          {!CurrentID ? "Add Car" : "Update Car"}
        </button>
      </form>
    </div>
  );
}

export default CarForm;
