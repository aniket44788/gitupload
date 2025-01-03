const express = require("express")
const app = express();
const mongoose = require("mongoose")
const env = require("dotenv")
const route = require("./Routes/delete")
const cors = require("cors")
// app.use(cors());

app.use(cors());

const port = process.env.PORT || 9000   
env.config()

app.use(express.json())

const signup = require("./Routes/Signup")

app.use("/signup",signup) 
app.use("/api",route)
 
main().catch((err)=>console.log(err));
async function main(){
    await mongoose.connect(process.env.URL);
    console.log("connected")
}
app.listen(port,()=>{
    console.log("server is running")
})