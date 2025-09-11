const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log("--------------------")
    console.log("Tempo: ", new Date().toLocaleString()) // CORRIGIDO
    console.log("Metodo: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:3000`);
})

app.get('/nomes', (req, res, next) => {
    const primeiroNome = req.query.primeiroNome
    const sobreNome = req.query.sobreNome


    res.send("Olá" + primeiroNome + sobreNome)

})

const calculadoraNotaRouter = require('./routes/CalculadoraNota')
app.use('/calculadora', calculadoraNotaRouter)