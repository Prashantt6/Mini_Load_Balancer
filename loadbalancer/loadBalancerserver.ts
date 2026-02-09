import httpProxy from 'http-proxy'
import express from 'express'
import axios from 'axios'
import { getServerId } from './lb-algorithm/consistentHashing'
import { addServerId } from './lb-algorithm/consistentHashing'
import { removeServerId } from './lb-algorithm/consistentHashing'


const app = express()
const proxy = httpProxy.createProxyServer({})

const serverMap: Record<string, string> ={
    "server-1": "http://localhost:3001",
    "server-2": "http://localhost:3002",
    "server-3": "http://localhost:3003"
}
const serverHealth: Record<string, boolean> ={}
const failureCount: Record<string, number> = {}
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

    if (!serverHealth[serverId]) {
        return res.status(503).send('Service unavailable')
    }

    proxy.web(req, res, {
        target: serverMap[serverId]
    })
})

app.listen(8000);


const runhealthCheckup= async() =>{
    for(const[serverId, serverUrl] of Object.entries(serverMap)){
        const health = await checkHealth(serverUrl)
        serverHealth[serverId] = health
        if(serverHealth[serverId] == false){
            failCount(serverId)
            handlingFailedServer()
        }
        else{
            failureCount[serverId] = 0
        }
        console.log(
          `Health: ${serverId} = ${health}, failures = ${failureCount[serverId]}`
        )
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
for(const serverId in serverMap){
    failureCount[serverId]= 0
}
function failCount(serverId:string){
    if (failureCount[serverId]!==undefined){
        failureCount[serverId] += 1
    }
    else {
        failureCount[serverId] = 1
    }
}
function handlingFailedServer(){
    for(const[serverId, count] of Object.entries(failureCount)){
        if (count >= 5){
            console.log(`Removing ${serverId} due to repeated failures`)
            removeServerId(serverId)
            delete failureCount[serverId]
            delete serverHealth[serverId]
        }
    }
}
