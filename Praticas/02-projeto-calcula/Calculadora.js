function calcularNotaA1(exerc, trabalho, prova){
    return exerc + trabalho + prova
}

function calcularNotaA2(exerc, trabalho, prova){
    return exerc + trabalho + prova
}

function calcularNotaFinal (notaA1, notaA2){
    return (notaA1 * 0.4) + (notaA2 * 0.6)
}

module.exports = {
calcularNotaA1,
calcularNotaA2,
calcularNotaFinal
}