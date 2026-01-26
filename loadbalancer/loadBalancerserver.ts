import express from 'express'
import { getServerId } from './lb-algorithm/consistentHashing'
import { addServerId } from './lb-algorithm/consistentHashing'


const app = express()
const router = express.Router()
app.use(express.json())


app.use((req,res) =>{
    // res.send("This is the loadbalancer server")
    const key = req.path 
    const serverId = getServerId(key)


})

app.listen(8000, () =>{
    console.log("Server is running at port 8000")
})