const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Run Server
app.listen(port , ()=>{
    console.log(`Server is running on port : ${port}`);
})

// Connect DB
mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify :false}, (err)=>{
    if(err) throw err;
    console.log("MongoDB connected");
});

//Middleware User
const UsersRoute =require('./routes/user.router')
app.use('/users',UsersRoute)


//Middleware Car
const CarsRoute=require('./routes/car.router')
app.use('/cars',CarsRoute)

//Middleware Dealer
const DealerRoute = require('./routes/dealer.router')
app.use('/dealers',DealerRoute)
