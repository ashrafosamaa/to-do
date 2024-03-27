import jwt from 'jsonwebtoken'
import User from '../../DB/Models/user.model.js'

export const auth = () => {
    return async(req, res, next) => {
        try {
            const {accesstoken} = req.headers
            if(!accesstoken){
                return res.status(400).json({msg: "please login first"})
            }
            if(!accesstoken.startsWith("accesstoken_")){
                return res.status(400).json({msg: "invalid token prefix"})
            }
            const token = accesstoken.split("accesstoken_")[1]
            const decodedToken = jwt.verify(token, "accessTokenSignature")
            if(!decodedToken || !decodedToken.id){
                return res.status(400).json({msg: "invalid token payload"})
            }
            const findUser = await User.findById(decodedToken.id, "userName email")
            if(!findUser){
                return res.status(404).json({msg: "please signUp first"})
            }
            req.authUser = findUser
            next()
        }catch (error){
            res.status(500).json({msg: "catch error in auth middleware"})
        }
    }
}
