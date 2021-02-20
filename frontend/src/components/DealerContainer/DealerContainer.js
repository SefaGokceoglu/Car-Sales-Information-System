import React from "react";
import BusinessIcon from "@material-ui/icons/Business";
import axios from "axios";
import "./DealerContainer.css";
function DealerContainer({ dealers, setdealers, User, dealer, setCurrentID }) {
  const DeleteHandler = async (e) => {
    e.preventDefault();

    await axios
      .delete(`http://localhost:7000/dealers/${User}/${dealer._id}`)
      .catch((err) => {
        console.log(err);
      });

    const response = await axios
      .get(`http://localhost:7000/dealers/${User}`)
      .catch((err) => console.log(err));

    setdealers(response.data);
  };

  return (
    <div className=" Dealer-Container shadow rounded">
      <div className="ROW d-flex flex-row justify-content-between">
        <BusinessIcon
          className="icon shadow rounded"
          style={{ fontSize: 100 }}
        />

        <div className="primaryinfo-long bg-white shadow rounded">
          <p className="info-head mt-2"> City </p>
          <hr />
          <p>{dealer.city}</p>
        </div>
        <div className="primaryinfo-long bg-white shadow rounded">
          <p className="info-head mt-2"> District </p>
          <hr />
          <p>{dealer.district}</p>
        </div>

        <div className="primarylargeinfo-longx bg-white shadow rounded">
          <p className="info-head mt-2"> Adress </p>
          <hr />
          <p>{dealer.adress}</p>
        </div>
      </div>
      <div className="ROW d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <div className="secondaryinfo bg-white shadow rounded">
            <p className="info-head m-0"> Manager Name </p>
            <hr className="m-0" />
            <p>{dealer.manager.name}</p>
          </div>
          <div className="secondaryinfo-long bg-white shadow rounded">
            <p className="info-head m-0"> Manager Last Name </p>
            <hr className="m-0" />
            <p>{dealer.manager.lastname} </p>
          </div>
        </div>
        <div className="secondaryinfo-long bg-white shadow rounded">
          <p className="info-head m-0"> Dealer Phone Number </p>
          <hr className="m-0" />
          <p>{dealer.manager.phone}</p>
        </div>
        <div className="d-flex flex-row">
          <button
            type="button"
            onClick={() => {
              setCurrentID(dealer._id);
            }}
            className="car-update btn btn-warning rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={DeleteHandler}
            className="car-delete btn btn-danger rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealerContainer;
