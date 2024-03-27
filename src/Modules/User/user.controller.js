import User from "../../../DB/Models/user.model.js"
import bcrybt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next)=>{
    const {userName, email, password, age, gender, phone} =  req.body
    if(!userName && !email && !age && !phone && !password){
        return res.status(404).json({msg: "please enter required data first"})
    }
    const emailChecker = await User.findOne({email})
    if(emailChecker){
        return res.status(409).json({msg: "email used before"})
    }
    const hashPassword = bcrybt.hashSync(password, 10)
    const newUser = await User.create({userName, email, password: hashPassword, age, gender, phone})
    if(!newUser){
        return res.status(500).json({msg: "user registration failed"})
    }
    return res.status(201).json({msg: "user registration success", newUser})
}

export const signIn = async (req, res, next)=>{
    const {email, password} = req.body
    if(!email){
        return res.status(404).json({msg: "please enter your email"})
    }
    if(!password){
        return res.status(404).json({msg: "please enter your password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({msg: "invalid login credentials"})
    }
    const isPasswordCorr = bcrybt.compareSync(password, user.password)
    if(!isPasswordCorr){
        return res.status(404).json({msg: "invalid login credentials"})
    }
    const token = jwt.sign({id: user._id, userName: user.userName, email: user.email},
        "accessTokenSignature",
        {
            expiresIn: '1h'
        }
    )
    return res.status(200).json({msg: "login success", token})
}

export const changePass = async (req, res, next)=>{
    const {password} = req.body 
    const {_id} = req.authUser
    if(!password){
        return res.status(404).json({msg: "please enter the new password"})
    }
    const hashedPass = bcrybt.hashSync(password, 10)
    const updateUser = await User.findByIdAndUpdate(_id, {password: hashedPass})
    if (!updateUser) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', updateUser })
}

export const updateAccount = async (req, res, next)=>{
    const {userName, email, age, phone} = req.body
    const {_id} = req.authUser
    if(!userName && !email && !age && !phone){
        return res.status(404).json({msg: "please enter the new data first"})
    }
    if(email){
        const emailChecker = await User.findOne({email})
        if(emailChecker){
            return res.status(409).json({msg: "email used before"})
        }
    }
    const updateUser = await User.findByIdAndUpdate(_id, {userName, email, age, phone}, {new: true})
    if (!updateUser) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', updateUser})
}

export const deleteAccount = async (req, res, next)=>{
    const {_id} = req.authUser
    const deleteUser = await User.findByIdAndDelete(_id)
    if (!deleteUser) return res.status(404).json({msg: "delete failed"})
    res.status(200).json({ message: 'done' })
}

export const softDelete = async (req, res, next)=>{
    const {_id} = req.authUser
    const deleteUser = await User.findByIdAndUpdate(_id, {deleted: true}, {new: true})
    if (!deleteUser) {
        return res.status(404).json({ message: 'delted failed' })
    }
    res.status(200).json({ message: 'User soft-deleted successfully', deleteUser});
}

export const checkSoftDelete = async(req, res, next)=>{
    const softDeletedUsers = await User.find({deleted: true})
    if(!softDeletedUsers.length){
        return res.status(200).json({msg: "no data found"})
    }
    res.status(200).json(softDeletedUsers)
}

