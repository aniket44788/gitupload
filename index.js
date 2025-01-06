const express = require("express")
const app = express();
const mongoose = require("mongoose")
const env = require("dotenv")
const route = require("./Routes/delete")
const cors = require("cors")
const signup = require("./Routes/Signup");
const update = require("./Routes/Update");
// app.use(cors());

app.use(cors());

const port = process.env.PORT || 9000   
env.config()

app.use(express.json())



app.use("/signup",signup) 
app.use("/api",route)
app.use("/update",update)
 
main().catch((err)=>console.log(err));
async function main(){
    await mongoose.connect(process.env.URL);
    console.log("connected")
}
app.listen(port,()=>{
    console.log("server is running")
})