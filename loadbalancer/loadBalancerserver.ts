import httpProxy from 'http-proxy'
import express from 'express'
import { getServerId } from './lb-algorithm/consistentHashing'
import { addServerId } from './lb-algorithm/consistentHashing'


const app = express()
const proxy = httpProxy.createProxyServer({})

const serverMap: Record<string, string> ={
    "server-1": "http://localhost:3001",
    "server-2": "http://localhost:3002",
    "server-3": "http://localhost:3003"
}

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
    console.log("Routing to:", serverId, serverMap[serverId]);

    proxy.web(req, res, {
        target: serverMap[serverId]
    })
})

app.listen(8000);