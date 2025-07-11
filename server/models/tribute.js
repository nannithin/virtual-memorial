import mongoose from "mongoose";
import { Schema } from "mongoose";

const tributeSchema = Schema({
    name : {
        type : String,
        required : true,

    },
    service : {
        type : String,
        required : true
    },
    lastrank : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true,
    },
    pob : {
        type : String,
        required : true,
    },
    armreg : {
        type : String,
        required : true,
    },
    unit : {
        type : String,
        required : true,
    },
    martyrdom : {
        type : String,
        required : true,
    },
    content : {
        type : [],
        required : true
    },
    approved : {
        type : Boolean,
        default : false
    }
    
},
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

}
)

const Tribute = mongoose.model('Tribute', tributeSchema);

export default Tribute;
