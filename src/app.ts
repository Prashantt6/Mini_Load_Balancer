import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.send("HI this is the load balancer server")
})

export default app;