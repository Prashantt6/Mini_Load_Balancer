import httpProxy from 'http-proxy'
import express from 'express'
import axios from 'axios'
import { getServerId } from './lb-algorithm/consistentHashing'
import { addServerId } from './lb-algorithm/consistentHashing'


const app = express()
const proxy = httpProxy.createProxyServer({})

const serverMap: Record<string, string> ={
    "server-1": "http://localhost:3001",
    "server-2": "http://localhost:3002",
    "server-3": "http://localhost:3003"
}
const serverHealth: Record<string, boolean> ={}
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

// Handling Failure of servers
for (const serverId in serverMap){
    serverHealth[serverId] = false
}

const runhealthCheckup= async() =>{
    for(const[serverId, serverUrl] of Object.entries(serverMap)){
        const health = await checkHealth(serverUrl)
        serverHealth[serverId] = health
    }
}

setInterval(runhealthCheckup, 10000)
 
async function checkHealth(serverUrl:string): Promise<boolean> {
    try {
        const res = await axios.get(`${serverUrl}/health`,{
            timeout: 2000
        })
        return res.status === 200 
    }
    catch {
        return false
    }
}