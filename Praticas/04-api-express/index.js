const express = require('express')

const app = express()

const porta = 3000

app.get('/teste', (req, res, next) => {

    res.send("Teste atualizado!!")
})

app.use((req, res, next) => {
    console.log("Time: ", new Date().tolocaleString())
    console.log("Time:")
    next()
})



app.listen(porta,()=>{
    console.log("Aplicação rodando em http://localhost:3000")
})