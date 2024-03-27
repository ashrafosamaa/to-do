import Task from "../../../DB/Models/task.model.js"
import User from "../../../DB/Models/user.model.js"

export const addTask = async (req, res, next)=>{
    const {_id} = req.authUser
    const {title, desc, status, assignTo, deadline} = req.body
    const userAssign = await User.findById({_id: assignTo})
    if(!userAssign){
        return res.status(404).json({msg: "please enter correct user id"})
    }
    const newTask = await Task.create({title, desc, status, userId: _id, assignTo, deadline})
    if(!newTask){
        return res.status(500).json({msg: "task creation failed"})
    }
    return res.status(201).json({msg: "task creation success", newTask})
}

export const updateTask = async (req, res, next)=>{
    const {_id} = req.authUser
    const {title , desc , status, taskId} = req.body
    const taskUpdate = await Task.findOneAndUpdate({userId: _id, _id: taskId}, {title , desc , status}, {new: true})
    if(!taskUpdate){
        return res.status(400).json({msg: "update task failed"})
    }
    return res.status(200).json({msg: "task updated done", taskUpdate})
}

export const deleteTask = async (req, res, next)=>{
    const {_id} = req.authUser
    const {taskId} = req.body
    const task = await Task.findOneAndDelete({_id: taskId, userId: _id})
    if(!task){
        return res.status(404).json({msg: "task delete failed"})
    }
    res.status(200).json({msg: "task deleted done"})
}

export const getTaskUser = async (req, res, next)=>{
    const task = await Task.find()
    .populate([{path: 'userId', select: 'userName email phone -_id'}])
    .populate([{path: 'assignTo', select: 'userName email phone -_id'}])
    .select('-_id')
    if(!task.length){
        return res.status(200).json({msg: "no data found"})
    }
    res.status(200).json(task)
}

export const getUserTask = async (req, res, next)=>{
    const {_id} = req.authUser
    const tasks = await Task.find({assignTo: _id})
    .populate([{path: 'userId', select: 'userName email phone -_id'}])
    if(!tasks.length){
        return res.status(200).json({msg: "no data found"})
    }
    res.status(200).json(tasks)
}

export const tasksNotFinshed = async (req, res, next)=>{
    const tasks = await Task.find({status: {$ne: 'done'}, deadline: {$lt: new Date()}})
    .populate([{path: "assignTo", select: 'userName email phone -_id'}])
    if(!tasks.length){
        return res.status(200).json({msg: "no data found"})
    }
    res.status(200).json(tasks)
}