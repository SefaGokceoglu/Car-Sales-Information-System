import React from "react";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import "./CarContainer.css";
import axios from 'axios'
function CarContainer({cars,setcars,User,car,setCurrentID}) {
    let className="Car-Container shadow rounded"

    if(car.status ==="Need Maintenance"){
      className += " status-needMaintenance"
    }
    if(car.status ==="Rented"){
      className += " status-rented"
    }
    if(car.status ==="Sold"){
      className += " status-sold"
    }




    const SoldHandler =async () =>{

      const response = await axios.patch(
        `http://localhost:7000/cars/${User}/${car._id}`,
        {
          model :car.model,
          plaque:car.plaque,
          fuelType:car.fuelType,
          value:car.value,
          rentalValue:car.rentalValue,
          maintenance:car.maintenance,
          needMaintenance:car.needMaintenance,
          km:car.km,
          dealer:car.dealer,
          status:"Sold"
        }
      ).catch((err) =>{console.log(err);});

      if(response && response.data){
        const soldid  = response.data._id
        cars.find((car,index)=>{
          if(car._id ===soldid){
            cars[index]=response.data
          }
        })
        setcars([...cars])
        }
    }


    const RentedHandler =async () =>{
      const response = await axios.patch(
        `http://localhost:7000/cars/${User}/${car._id}`,
        {
          model :car.model,
          plaque:car.plaque,
          fuelType:car.fuelType,
          value:car.value,
          rentalValue:car.rentalValue,
          maintenance:car.maintenance,
          needMaintenance:car.needMaintenance,
          km:car.km,
          dealer:car.dealer,
          status:"Rented"
        }
      ).catch(err =>{console.log(err.response.data.msg);});



      if(response && response.data){
        const rentedid  = response.data._id
        cars.find((car,index)=>{
          if(car._id ===rentedid){
            cars[index]=response.data
          }
        })
        setcars([...cars])
        }
    }


    const DeleteHandler = async (e) =>{
      e.preventDefault()

       await axios.delete(`http://localhost:7000/cars/${User}/${car._id}`)
      .catch((err)=>{console.log(err)})


      const response= await  axios.get(`http://localhost:7000/cars/${User}`).catch((err)=>console.log(err))

      setcars(response.data);
      }

    return (
    <div className={className}  >
      <div className="ROW d-flex flex-row justify-content-around ">
        <DirectionsCarOutlinedIcon
          className="icon shadow rounded"
          style={{ fontSize: 100 }}
        />
        <div className="primaryinfo-long bg-white shadow rounded">
          <p className="info-head mt-2">Car Plaque </p>
          <hr />
          <p>{car.plaque}</p>
        </div>
        <div className="primaryinfo-long bg-white shadow rounded">
          <p className="info-head mt-2">Fuel Type </p>
          <hr />
          <p>{car.fuelType}</p>
        </div>
        <div className="primarylargeinfo-long bg-white shadow rounded">
          <p className="info-head mt-2">Price </p>
          <hr />
          <p>{car.value}</p>
        </div>
        <div className="primarylargeinfo-long bg-white shadow rounded">
          <p className="info-head mt-2"> Renting Price </p>
          <hr />
          <p>{car.rentalValue}</p>
        </div>
      </div>
      <div className="ROW d-flex flex-row justify-content-around ">
        <div className="secondaryinfo-long bg-white shadow rounded">
          <p className="info-head m-0">Car Model </p>
          <hr className="m-0" />
          <p>{car.model}</p>
        </div>
        <div className="secondaryinfo-longx bg-white shadow rounded">
          <p className="info-head m-0"> Maintenance Range </p>
          <hr className="m-0" />
          <p>{car.maintenance} kilometers</p>
        </div>
        <div className="secondaryinfo-longx bg-white shadow rounded">
          <p className="info-head m-0"> Car Kilometers </p>
          <hr className="m-0" />
          <p>{car.km} kilometers</p>
        </div>
        <div className="secondaryinfo-long bg-white shadow rounded">
          <p className="info-head m-0">  Car Location </p>
          <hr className="m-0" />
          <p>{car.dealer}</p>
        </div>
        <div className="status bg-white shadow rounded">
          <p className="info-head m-0"> Car Status </p>
          <hr className="m-0" />
          <p> {car.status}</p>
        </div>
        <button type="button" onClick={()=>{setCurrentID(car._id)}} className="car-update btn btn-warning rounded">Update</button>
        <button type="button" onClick={SoldHandler} className=" car-sold btn btn-success rounded">Sold</button>
        <button type="button" onClick={RentedHandler} className="car-rented btn btn-primary rounded">Rented</button>
        <button type="button" onClick={DeleteHandler} className="car-delete btn btn-danger rounded">Delete</button>
      </div>
    </div>
  );
}

export default CarContainer;
