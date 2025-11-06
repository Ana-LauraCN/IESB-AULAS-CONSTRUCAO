const yup = require('yup');
const { isValidObjectId } = require('./IDValidator');

const enderecoSchema = yup.object({
  cep: yup.string(),
  logradouro: yup.string(),
  numero: yup.string(),
  complemento: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  uf: yup.string()
});

const createSchema = yup.object({
  nome: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().email('Email inválido').required(),
  telefone: yup.string().required(),
  data_contratacao: yup.date().required(),
  data_nascimento: yup.date().required(),
  genero: yup.string().required(),
  endereco: enderecoSchema,
  cargo: yup.string().required().test('is-objectid', 'Cargo inválido', value => isValidObjectId(value)),
  departamento: yup.string().required().test('is-objectid', 'Departamento inválido', value => isValidObjectId(value))
});

const updateSchema = yup.object({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email('Email inválido'),
  telefone: yup.string(),
  data_contratacao: yup.date(),
  data_nascimento: yup.date(),
  genero: yup.string(),
  endereco: enderecoSchema,
  cargo: yup.string().test('is-objectid', 'Cargo inválido', value => !value || isValidObjectId(value)),
  departamento: yup.string().test('is-objectid', 'Departamento inválido', value => !value || isValidObjectId(value))
});

module.exports = { createSchema, updateSchema };
