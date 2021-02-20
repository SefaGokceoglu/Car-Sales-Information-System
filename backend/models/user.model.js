const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique :true,
        minlenght:3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlenght:6
    }
},{
    timestamps: true
});


const User =mongoose.model('User',UserSchema);

module.exports = User;
