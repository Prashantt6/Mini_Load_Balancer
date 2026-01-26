import express from 'express'

const app = express();
app.use(express.json())

const PORT = 3003;
app.use((req ,res) =>{
    res.send("Request handled by server 3")
})

app.listen(PORT) //PORT = 3003