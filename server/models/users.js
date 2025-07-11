import mongoose from "mongoose";
import { Schema } from "mongoose";

const users = Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
    }
})

const Users = mongoose.model('Users',users);
export default Users;