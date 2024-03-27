import { Router } from "express";
import { auth } from "../../MiddleWares/auth.js";
import expressAsyncHandler from "express-async-handler";
import * as tc from "./task.controller.js"

const router = Router()

router.post('/', auth(), expressAsyncHandler(tc.addTask))

router.put('/',auth(), expressAsyncHandler(tc.updateTask))

router.delete('/', auth(), expressAsyncHandler(tc.deleteTask))

router.get('/', expressAsyncHandler(tc.getTaskUser))

router.get('/getTasks', auth(), expressAsyncHandler(tc.getUserTask))

router.get('/notFinished', expressAsyncHandler(tc.tasksNotFinshed))

export default router