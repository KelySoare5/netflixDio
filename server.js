//npm i express

const express = require("express") //import express/ servidor local
const path = require("path") //import biblioteca/ referente caminho dos arquivos
const port = 3333
let initialPath = path.join(__dirname, "public") //caminho inicial

let app = express() //intancia de aplicação
app.use(express.static(initialPath)) //servidor estatico

app.get("/", (req, res)=>{ //porta de entrada
    res.sendFile(path.join(initialPath, "index.html")) //arquivo
}) 

app.listen(port, ()=>{
    console.log(`server start up on port ${port}!`)
})