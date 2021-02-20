const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const DealerSchema = new Schema({
    city :{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    manager:{
        name:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            default:"Unknown"
        }
    },
    createdBy:{
        type:String,
        required:true
    }
},{
    timestamps:true
})




const Dealer = mongoose.model("Dealer",DealerSchema);


module.exports=Dealer