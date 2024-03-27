import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    age:Number,
    gender:{
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    phone:{
        type: String,
        required:true
    },
    deleted:{
        type: Boolean,
        default: false
    }
},
    {timestamps: true})

const User = model("User", userSchema)

export default User