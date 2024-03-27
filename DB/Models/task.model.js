import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    status:{
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default: 'toDo'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deadline:{
        type: Date, 
        required: true
    },
    assignTo:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {timestamps: true})

const Task = model('Task', taskSchema)

export default Task