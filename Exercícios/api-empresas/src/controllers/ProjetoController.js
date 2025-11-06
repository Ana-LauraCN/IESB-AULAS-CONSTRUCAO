const express = require('express');
const Projeto = require('../models/ProjetoModel');
const validate = require('../middlewares/validateMiddleware');
const { createSchema, updateSchema } = require('../validators/ProjetoValidator');

const router = express.Router();

router.post('/', validate(createSchema), async (req, res) => {
  try {
    const p = await Projeto.create(req.body);
    res.status(201).json(p);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const projetos = await Projeto.find();
  res.json(projetos);
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Projeto.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(p);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.put('/:id', validate(updateSchema), async (req, res) => {
  try {
    const updated = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Projeto.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json({ message: 'Projeto removido' });
  } catch (err) { res.status(400).json({ error: 'ID inválido' }); }
});

module.exports = router;
