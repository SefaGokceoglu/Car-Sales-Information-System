import React from "react";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import mercedes from "./mercedes.jpg";
import bmw from "./bmw.jpg";
import audi from "./audi.jpg";
import ferrari from "./ferrari.jpg";
function Home() {
  return (
    <div>
      <Carousel className="main-slide mx-auto ">
        <Carousel.Item>
          <img className="d-block w-100" src={mercedes} alt="First slide" />
          <Carousel.Caption>
            <h3>This is a Car Dealership Company Information System</h3>
            <p>You need to Register and Login to See Cars/Dealers Page</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={ferrari} alt="First slide" />
          <Carousel.Caption>
            <h3>This is a Car Dealership Company Information System</h3>
            <p>You can add cars to your account</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={audi} alt="Third slide" />

          <Carousel.Caption>
            <h3>This is a Car Dealership Company Information System</h3>
            <p>You can set Car Status Avaliab-Sold-Rented-Need Maintenance</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bmw} alt="Third slide" />

          <Carousel.Caption>
            <h3>This is a Car Dealership Company Information System</h3>
            <p>Every Car colorized due to the car status</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
