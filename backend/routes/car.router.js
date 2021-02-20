const router =require('express').Router();
const Car = require('../models/car.model')
const jwt = require('jsonwebtoken');
const  mongoose  = require('mongoose');


router.get('/:token',async (req,res)=>{
    const id=  jwt.verify(req.params.token,process.env.JWT_PASSWORD).id

     const cars =await Car.find({createdBy:id})
    res.json(cars)
})


router.post('/:token',async (req,res)=>{
    const id= await jwt.verify(req.params.token,process.env.JWT_PASSWORD).id

    const {model,plaque,fuelType,value,rentalValue,maintenance,needMaintenance,km,dealer}=req.body;

    if( !model || !plaque || !fuelType ){
       return res.status(400).json({msg: "Please enter all needed areas "})
    }
    if(model.length < 3){
        return res.status(400).json({msg: "Car Model have to be at lest 3 characters"})
    }
    if(plaque.length < 4){
        return res.status(400).json({msg: "Car Plaque have to be at lest 4 characters"})
    }
    if(fuelType.length <3){
        return res.status(400).json({msg: "Please select Fuel Type"})
    }
    if(value.length <1){
        return res.status(400).json({msg: "Please enter Price for Car"})
    }
    if(rentalValue.length <1){
        return res.status(400).json({msg: "Please enter Renting Price for Car"})
    }

    if(needMaintenance){
        status="Need Maintenance"
    }else{
        status="Avaliable"
    }
    const newCar =new Car({
        model,
        plaque,
        fuelType,
        value,
        rentalValue,
        maintenance,
        status,
        needMaintenance,
        km,
        dealer,
        createdBy:id
    })

    const savedCar =await newCar.save();
    


    res.json(savedCar)
})


router.patch("/:token/:_id", async (req,res) =>{
    const user_id= await jwt.verify(req.params.token,process.env.JWT_PASSWORD).id
    const car_id = req.params._id

    if(!mongoose.Types.ObjectId.isValid(car_id)){
        return res.status(400).json({msg: "This Car doesnt exist "})
    }

    const {model,plaque,fuelType,value,rentalValue,maintenance,needMaintenance,km,status,dealer}=req.body;


    if( !model || !plaque || !fuelType ){
        return res.status(400).json({msg: "Please enter all needed areas "})
     }
     if(model.length < 3){
         return res.status(400).json({msg: "Car Model have to be at lest 3 characters"})
     }
     if(plaque.length < 4){
         return res.status(400).json({msg: "Car Plaque have to be at lest 4 characters"})
     }
     if(fuelType.length <3){
         return res.status(400).json({msg: "Please select Fuel Type"})
     }
     if(value.length <1){
         return res.status(400).json({msg: "Please enter Price for Car"})
     }
     if(rentalValue.length <1){
         return res.status(400).json({msg: "Please enter Renting Price for Car"})
     }
     

     

     const updatedCar = await Car.findByIdAndUpdate(car_id,
    {model,plaque,fuelType,value,rentalValue,maintenance,needMaintenance,status,km,dealer,createdBy:user_id}
    ,{new:true,useFindAndModify:false}
    )
    .catch(err=>{console.log(err);})
 
     res.json(updatedCar)
})

router.delete("/:token/:_id", async (req,res) =>{
    const user_id= await jwt.verify(req.params.token,process.env.JWT_PASSWORD).id
    const car_id = req.params._id

    if(!mongoose.Types.ObjectId.isValid(car_id)){
        return res.status(400).json({msg: "This Car doesnt exist "})
    }

    const deletedCar = await Car.findByIdAndRemove(car_id)
    .catch(err=>{console.log(err);})
 
     res.json(deletedCar)
})

module.exports=router