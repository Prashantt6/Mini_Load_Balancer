import express from 'express'

const app = express();
app.use(express.json())

const PORT = 3003;
app.get("*",(req,res) =>{
    res.send("Request handled by server 1")
})

app.listen(PORT, () =>{
    console.log("Server is running at port 3003")
})