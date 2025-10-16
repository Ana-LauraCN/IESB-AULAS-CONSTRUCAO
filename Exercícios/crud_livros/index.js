require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// 🌐 Conectar no MongoDB Atlas usando variáveis do .env
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err))

// 📝 Schema e Model do Livro
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
})

const Livro = mongoose.model('Livro', livroSchema)

// 📚 Listar todos os livros
app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find()
    res.json(livros)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔍 Buscar livro por ID
app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id)
    if (!livro) return res.status(404).json({ error: "Livro não encontrado!" })
    res.json(livro)
  } catch {
    res.status(400).json({ error: "ID inválido!" })
  }
})

// ➕ Criar novo livro
app.post('/livros', async (req, res) => {
  try {
    const livro = new Livro(req.body)
    const novoLivro = await livro.save()
    res.status(201).json({ message: "Livro cadastrado com sucesso!", novoLivro })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ✏️ Atualizar livro por ID (flexível)
app.put('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!livro) return res.status(404).json({ error: "Livro não encontrado!" })
    res.json({ message: "Livro atualizado com sucesso!", livro })
  } catch {
    res.status(400).json({ error: "Erro ao atualizar livro!" })
  }
})

// 🗑️ Deletar livro por ID
app.delete('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id)
    if (!livro) return res.status(404).json({ error: "Livro não encontrado!" })
    res.json({ message: "Livro deletado com sucesso!", livro })
  } catch {
    res.status(400).json({ error: "Erro ao deletar livro!" })
  }
})

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`))
