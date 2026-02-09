import express from 'express'

const app = express();
app.use(express.json())

const PORT = 3002;
app.use((req ,res) =>{
    res.send("Request handled by server 2")
})
app.get("/health",(req,res)=>{
    res.status(200).send("OK")
})

app.listen(PORT) //PORT = 3002