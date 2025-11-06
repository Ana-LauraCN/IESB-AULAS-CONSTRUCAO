const express = require('express');
const Cargo = require('../models/CargoModel');
const validate = require('../middlewares/validateMiddleware');
const { createSchema, updateSchema } = require('../validators/CargoValidator');

const router = express.Router();

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const c = await Cargo.create(req.body);
    res.status(201).json(c);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const cargos = await Cargo.find();
  res.json(cargos);
});

router.get('/:id', async (req, res) => {
  try {
    const c = await Cargo.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json(c);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.put('/:id', validate(updateSchema), async (req, res) => {
  try {
    const updated = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Cargo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json({ message: 'Cargo removido' });
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

module.exports = router;
