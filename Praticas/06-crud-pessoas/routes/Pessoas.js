const express = require('express')
const router = express.Router()

let listaPessoas = [
    {
        id: 1,
        nome: "João",
        cpf: "00000000",
        email: "jão@gmail.com",
        dataNascimento: "01/01/01"
    },
    {
        id: 2,
        nome: "João",
        cpf: "00000000",
        email: "jão@gmail.com",
        dataNascimento: "01/01/01"
    },
]

router.get('/pessoas', (req, res, next) => {
    res.json(listaPessoas)
})

router.get('/pessoas/:id', (req, res, next)=> {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    if(!pessoa){
        return res.status(404).json({error: "Pessoa não encontrada!!!"})
    }
    res.json(pessoa)
})
module.exports = router


router.post('/pessoas', (req,res,next) => {
    const { nome, cpf, email, dataNascimento } = req.body
    if(!nome || !cpf || !email || !dataNascimento){
        return res.status(409).json({error: "CPF já cadastrado!"})
    }

    const novaPessoa = {
        id: Date.now(),
        nome,
        cpf,
        email,
        dataNascimento
    }

    listaPessoas.push(novaPessoa)
    res.status(201).json({ massage: "Pessoa cadastrada com sucesso", novaPessoa})
})

router.put('/pessoas/:id', (req, res, next) => {
    const id = req.params.id

    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)

    if(!pessoa){
        return res.status(404).json({error: "Pessoa não encontrada"})
    }
    const {nome, email, dataNascimento} = req.body
    if(!nome || !email || !dataNascimento){
        return res.status(400).json({error: "nome, email, dataNascimento são obrigatótios"})
    }

    pessoa.nome = nome
    pessoa.email = email
    pessoa.dataNascimento = dataNascimento

    res.json({message: "Pessoa atualizada com sucesso!", pessoa})
})

router.delete('/pessoas/:id', (req, res, next) => {
    const id = req.params.id

    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)

    if(!pessoa){
        return res.status(404).json({ error:"pessoa não encontrada!!" })
    }

    listaPessoas = listaPessoas.filter(pessoa => pessoa.id != id)

    res.json({message: "Pessoa deleta com sucesso!", pessoa})
})