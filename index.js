const texto = "A B C + / 2";
var cursor = 0;

const OPERATORS = ["+", "-", "*", "/", "%"]
const LETRAS = ["A","B","C","D","E","F","G"]
const ESPACIO = [" "]
const isOperator = character => OPERATORS.includes(character)
const isLetter = character => LETRAS.includes(character)
const isEmpty = character => ESPACIO.includes(character)

while (cursor < texto.length){
    const caracter = texto[cursor];

    if (isOperator(caracter)){
        console.log(caracter+" es un operador");
    };


    if (isLetter(caracter)){
        console.log(caracter+" es una letra");
    };

    if (isEmpty(caracter)){
        console.log(caracter+" hay espacio")
    }

    cursor++;
}

