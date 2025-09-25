const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const pessoasRouter = require('./routes/Pessoas');
app.use('/', pessoasRouter);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
