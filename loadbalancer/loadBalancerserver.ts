import express from 'express'
import { getServerId } from './lb-algorithm/consistentHashing'
import { addServerId } from './lb-algorithm/consistentHashing'


const app = express()
const router = express.Router()
app.use(express.json())

function addServer() {
    addServerId("server-1");
    addServerId("server-2");
    addServerId("server-3");
}
addServer()
app.use((req,res) =>{
    // res.send("This is the loadbalancer server")
    const key = req.path 
    const serverId = getServerId(key)
})

app.listen(8000, () =>{
    console.log("Server is running at port 8000")
})