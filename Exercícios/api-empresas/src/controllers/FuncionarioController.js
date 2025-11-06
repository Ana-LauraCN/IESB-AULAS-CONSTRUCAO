const express = require('express');
const Funcionario = require('../models/FuncionarioModel');
const validate = require('../middlewares/validateMiddleware');
const { createSchema, updateSchema } = require('../validators/FuncionarioValidator');

const router = express.Router();

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const f = await Funcionario.create(req.body);
    const populated = await f.populate(['cargo','departamento']).execPopulate?.() || await Funcionario.findById(f._id).populate(['cargo','departamento']);
    res.status(201).json(populated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const funcionarios = await Funcionario.find().populate(['cargo','departamento']);
  res.json(funcionarios);
});

router.get('/:id', async (req, res) => {
  try {
    const f = await Funcionario.findById(req.params.id).populate(['cargo','departamento']);
    if (!f) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json(f);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.put('/:id', validate(updateSchema), async (req, res) => {
  try {
    const updated = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['cargo','departamento']);
    if (!updated) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Funcionario.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json({ message: 'Funcionário removido' });
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

module.exports = router;
