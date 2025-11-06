const express = require('express');
const Tarefa = require('../models/TarefaModel');
const validate = require('../middlewares/validateMiddleware');
const { createSchema, updateSchema } = require('../validators/TarefaValidator');

const router = express.Router();

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const t = await Tarefa.create(req.body);
    const populated = await Tarefa.findById(t._id).populate(['responsavel', 'projeto']);
    res.status(201).json(populated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const tarefas = await Tarefa.find().populate(['responsavel', 'projeto']);
  res.json(tarefas);
});

router.get('/:id', async (req, res) => {
  try {
    const t = await Tarefa.findById(req.params.id).populate(['responsavel', 'projeto']);
    if (!t) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(t);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.put('/:id', validate(updateSchema), async (req, res) => {
  try {
    const updated = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['responsavel', 'projeto']);
    if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Tarefa.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa removida' });
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

module.exports = router;
