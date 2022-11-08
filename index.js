document.addEventListener('DOMContentLoaded', function () {

    const btn_analizar = document.getElementById('btn_analizar');
    const btn_limpiar = document.getElementById('btn_limpiar');

    const OPERATORS = ["+", "-", "*", "/", "%", "="];
    const NUMBER = /^[0-9]+$/
    const LETRAS = /[a-zA-Z]/
    const ESPACIO = [" "];
    const PALABRAS_RESERVADAS = ["TEXTO", "ENTERO", "REAL", "CAPTURA.TEXTO()"];
    const DELIMITADORES = [";", "(", ")", '"', "'", ":"];

    const isOperator = character => OPERATORS.includes(character);
    const isNumber = character => NUMBER.test(character);
    const isLetter = character => LETRAS.test(character);
    const isEmpty = character => ESPACIO.includes(character);
    const isWordReserved = character => PALABRAS_RESERVADAS.includes(character);
    const isDelimiter = character => DELIMITADORES.includes(character);

    btn_analizar.onclick = analizar;
    btn_limpiar.onclick = limpiar_campos;

    function mostrar(lineas_texto_area){
        var array = [];
        array.push(lineas_texto_area);
        return array
    }

    function analizar() {
        const lineas_texto_area = document.getElementById('entrada_texto').value.split('\n');
        const texto_area = document.getElementById('entrada_texto').value;
        const texto_area2 = document.getElementById('entrada_texto').value.split(/\s/);


        for (var i = 0; i < lineas_texto_area.length; i++) {
            var cursor = 0;
            console.log("Linea", i + 1, lineas_texto_area[i]);
            var array = [];
            while (cursor < texto_area.length) {
                const caracter = texto_area[cursor];

                if (isOperator(caracter)) {
                    //console.log("es un operador",caracter);
                }

                if (isLetter(caracter)) {
                    let symbol = caracter;
                    while (isLetter(texto_area[++cursor])) {
                        symbol += texto_area[cursor];
                    }
                }

                if (isNumber(caracter)) {
                    let number = caracter;
                    while (isNumber(texto_area[++cursor])) {
                        number += texto_area[cursor];
                    }
                    console.log("Es un numero", number);
                }

                if (isEmpty(caracter)) {
                    //console.log("es un espacio",caracter);
                }

                if (isDelimiter(caracter)) {
                    //console.log("es un delimitador",caracter);
                }

                if (caracter == "\n") {
                    //console.log("Es un salto de línea "+caracter);
                }
                cursor++; //Recorre cada caracter

            }

            cursor = 0; // Se reinicia el valor del cursor a 0 para poder terminar de leer los caracteres de la línea
        }

        analizador_sintactico(lineas_texto_area, texto_area);
    }

    function limpiar_campos() {
        const texto_area = document.getElementById('entrada_texto').value = "";
        console.log("area de texto limpiada")
    }

    function analizador_sintactico(lineas_texto_area, texto_area) {
        let expReg_CrearVariable = /[a-zA-Z]+([0-9]+)?\s[REAL|TEXTO|ENTERO]+[;]/;
        let expReg_AsignarValorVariable = /[a-zA-Z]+([0-9]+)?\s[=]\s(["][a-zA-Z0-9\s,.-/]+["])?|([a-zA-Z0-9\s,.-/]+)?[;]/;
        for (var i = 0; i < lineas_texto_area.length; i++) {
            res = expReg_CrearVariable.test(texto_area);
            if (expReg_CrearVariable.test(texto_area) == true) {
                const retorno = {"texto" : texto_area,"tipo": "es una creacion de variable"}
                console.log(retorno);
            } else if (expReg_AsignarValorVariable.test(texto_area) == true) {
                const retorno = {"texto" : texto_area,"tipo": "es una asignacion de variable"}
                console.log(retorno);

            }
        }
    }

});