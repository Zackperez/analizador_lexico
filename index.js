
var cursor = 0;

const btn_analizar = document.getElementById('btn_analizar');
const btn_limpiar = document.getElementById('btn_limpiar');



const OPERATORS = ["+", "-", "*", "/", "%", "="];
const LETRAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const ESPACIO = [" "];
const PALABRAS_RESERVADAS = ["TEXTO","ENTERO","REAL","CAPTURA.TEXTO()"];
const DELIMITADORES = [";", "(", ")", '""', "''"];
const isOperator = character => OPERATORS.includes(character);
const isLetter = character => LETRAS.includes(character);
const isEmpty = character => ESPACIO.includes(character);

btn_analizar.onclick = function(){
    const texto_area = document.getElementById('entrada_texto').value;

    while (cursor < texto_area.length){
        const caracter = texto_area[cursor];
    
        if (isOperator(caracter)){
            console.log(caracter+" es un operador");
        };
    
        if (isLetter(caracter)){
            console.log(caracter+" es una letra");
        };
    
        if (isEmpty(caracter)){
            console.log(caracter+" hay espacio");
        }
    
        cursor++;
    }

    cursor = 0;

}

btn_limpiar.addEventListener("click", function(){
    const texto_area = document.getElementById('entrada_texto').value = "";

})

