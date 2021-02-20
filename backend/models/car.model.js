const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CarSchema= new Schema({
    model:{
        type:String,
        required:true,
        minlenght :3
    },
    plaque:{
        type:String,
        required:true,
        minlenght:4,
        unique:true
    },
    fuelType:{
        type:String,
        minlenght:3
    },
    value:{
        type:Number,
        required:true
    },
    rentalValue:{
        type:Number,
        required:true
    },
    maintenance:{
        type:Number,
        default:15000
    },
    needMaintenance:{
        type:Boolean,
        default:false
    },
    km:{
        type:Number,
        default:0
    },
    createdBy:{
        type: String,
        required:true
    },
    status:{
        type:String,
        default:"Avaliable"
    },
    dealer:{
        type:String,
        default:"none"
    }
},
    {
    timestamps:true    
    }
)

const Car =mongoose.model('Car',CarSchema);

module.exports = Car;