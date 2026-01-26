import express from "express";

const router = express.Router()

router.post("./req", () =>{
    console.log("HI from Server-1")
})

export default router