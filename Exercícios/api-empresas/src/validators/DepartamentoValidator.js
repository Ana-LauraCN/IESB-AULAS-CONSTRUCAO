const yup = require('yup');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória')
});

const updateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string()
});

module.exports = { createSchema, updateSchema };
