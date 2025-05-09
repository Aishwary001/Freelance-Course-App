import mongoose from "mongoose";

mongoose.connect(process.env.db)
.then(()=>console.log('connected'))
.catch(()=>console.log("Disconnected"))

export default mongoose;