import { Router } from "express";
import { auth } from "../../MiddleWares/auth.js";
import { signUpSchema } from "./user.validationSchemas.js";
import { validation } from "../../MiddleWares/validation.js";
import {allowedExtensions} from "../../utils/allowedExtensions.js"
import {multerMiddle} from "../../MiddleWares/multer.js"
import expressAsyncHandler from "express-async-handler";
import * as uc from './user.controller.js'

const router = Router()

router.post('/', validation(signUpSchema) , expressAsyncHandler(uc.signUp))

router.post('/login', expressAsyncHandler(uc.signIn))

router.put('/changePassword', auth(), expressAsyncHandler(uc.changePass))

router.put('/', auth(), expressAsyncHandler(uc.updateAccount))

router.delete('/', auth(), expressAsyncHandler(uc.deleteAccount))

router.delete('/softDelete', auth(), expressAsyncHandler(uc.softDelete))

router.get('/sofAcc', expressAsyncHandler(uc.checkSoftDelete))



export default router