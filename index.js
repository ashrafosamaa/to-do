import express from "express";
import db_connection from "./DB/connection.js";
import userRouter from "./src/Modules/User/user.routes.js"
import taskRouter from "./src/Modules/Task/task.routes.js"
import { globalResponse } from "./src/MiddleWares/globalResponse.js";



const app = express()

app.use(express.json())
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use(globalResponse)

db_connection()

app.listen(3000, ()=>{
    console.log("running on port 3000");
})

