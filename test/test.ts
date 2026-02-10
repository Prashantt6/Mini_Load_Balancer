const serverMap: Record<string, string> ={
    "server-1": "http://localhost:3001",
    "server-2": "http://localhost:3002",
    "server-3": "http://localhost:3003"
}
// console.log(serverMap["server-1"])
const removedServer: Record<string,string> = {}
// for (const[serverId,serverUrl] of Object.entries(serverMap)){
//     console.log(serverId, serverUrl)
//     // console.log("hi")
// }

for(const serverId in serverMap ){
    removedServer[serverId] = serverMap[serverId]
}

for(const[serverId, url] of Object.entries(removedServer)){
    console.log(`${serverId}: ${url}`)
}