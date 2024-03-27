import mongoose from "mongoose";

const db_connection = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/to-do-app")
    .then(()=> console.log("DB connected success"))
    .catch((err)=> console.log("DB connection fail", err))
}

export default db_connection