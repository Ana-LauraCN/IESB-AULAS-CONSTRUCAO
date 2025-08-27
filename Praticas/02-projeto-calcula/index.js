let prompt = require('prompt-sync')()

let nome = prompt("Qual seu nome?")

console.log("olá" + " " + nome)

let {calcularNotaA1, calcularNotaA2, calcularNotaFinal} = require('./Calculadora')

let exercA1 = parseFloat(prompt("Nota exercicio A1:"))
let trabalhoA1 = parseFloat(prompt("Nota ttrabalho A1:"))
let provaA1 = parseFloat(prompt("Nota prova A1:"))
let notaA1 = calcularNotaA1(exercA1, trabalhoA1, provaA1)

console.log("### CALCULO DA NOTA A1")
console.log("Nota exerc A1: ", exercA1)
console.log("Nota trabalho A1:", trabalhoA1)
console.log("Nota Prova A1: ", provaA1)
console.log("### Nota A1 calculada: ", notaA1)

let exercA2 = parseFloat(prompt("Nota exercicio A2:"))
let trabalhoA2 = parseFloat(prompt("Nota ttrabalho A1:"))
let provaA2 = parseFloat(prompt("Nota prova A2:"))
let notaA2 = calcularNotaA1(exercA2, trabalhoA2, provaA2)

console.log("### CALCULO DA NOTA A2")
console.log("Nota exerc A2: ", exercA2)
console.log("Nota trabalho A2:", trabalhoA2)
console.log("Nota Prova A2: ", provaA2)
console.log("### Nota A1 calculada: ", notaA2)

let notaFinal = calcularNotaFinal (notaA1, notaA2)

console.log("## Calculo da NOTA FINAL ##")
console.log("Nota Final: ", notaFinal)

if (notaFinal >= 5){
    console.log("Paabéns" + nome + ", você foi aprovado!!")
} else {
    console.log(nome + ", estude mais, reprovado.")
}
