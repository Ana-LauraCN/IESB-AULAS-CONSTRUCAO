require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
app.request(express.json())



// 🌐 Conectar no MongoDB Atlas usando variáveis do .env
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err))


// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`))

