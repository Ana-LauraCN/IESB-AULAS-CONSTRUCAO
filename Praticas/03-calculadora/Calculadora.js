
console.log("######################################\n")




let a = 4
let b = 2

let soma= a + b

console.log("Resultado eh", soma )

console.log("############# SUBTRAIR #########\n")

let minimo = a - b

console.log("Resultado eh:\n ",minimo)

console.log("######### MULTIPLICAR ########### \n")

let MULTIPLICAR = a * b

console.log("Resultado eh: \n", MULTIPLICAR)


console.log("######### DIVISÃO #########\n")

let Dividir = a / b

console.log("Resultado eh: ", Dividir);

console.log("######### AO QUADRADO #########\n")

let aoquadrado = a * a 

console.log("Resultado eh: ",aoquadrado)


console.log("######### RAIZ #########\n")

 
let raiz = Math.sqrt(a) 

console.log("Resultado eh: ",raiz)

module.exports= {
    soma,
    minimo,
    MULTIPLICAR,
    Dividir,
    aoquadrado,
    raiz
}