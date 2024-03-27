import Joi from "joi";

export const signUpSchema ={
    body:Joi.object({
        userName:Joi.string().min(3).max(10).required(), 
        email:Joi.string().email().required(), 
        password:Joi.string().required(), 
        age:Joi.number().min(18).max(50), 
        gender:Joi.string().valid('male', 'female'), 
        phone:Joi.string().min(11).max(11)
    })
}

// import { body } from "express-validator";
// export const signUpSchema = ()=> [
//     body('userName')
//         .isString().notEmpty().withMessage("Name must not be empty")
//         .isLength({ min: 3, max: 10 }).withMessage("Name too short"),

//     body('email')
//         .isEmail().withMessage("Invalid email address")
//         .notEmpty().withMessage("Email must not be empty"),

//     body('password')
//         .isString().notEmpty().withMessage("Password must not be empty")
//         .isLength({ min: 8 }).withMessage("Password too short, please enter at least 8 characters"),

//     body('age')
//         .isNumeric().notEmpty().withMessage("Age must not be empty").bail()
//         .custom(age => age >= 18 && age <= 50).withMessage("Age must be between 18 and 50"),

//     body('gender')
//         .optional().isString()
//         .isIn(["male", "female"]).withMessage("Gender must be male or female"),

//     body('phone')
//         .notEmpty().withMessage("Phone must not be empty")
//         .isString().isLength({ min: 11, max: 11 }).withMessage("Phone must be 11 element"),
// ]