const express = require('express');
const Departamento = require('../models/DepartamentoModel');
const validate = require('../middlewares/validateMiddleware');
const { createSchema, updateSchema } = require('../validators/DepartamentoValidator');

const router = express.Router();

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const dept = await Departamento.create(req.body);
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const depts = await Departamento.find();
  res.json(depts);
});

router.get('/:id', async (req, res) => {
  try {
    const dept = await Departamento.findById(req.params.id);
    if (!dept) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json(dept);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.put('/:id', validate(updateSchema), async (req, res) => {
  try {
    const updated = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Departamento.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json({ message: 'Departamento removido' });
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

module.exports = router;
