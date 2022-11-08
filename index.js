document.addEventListener('DOMContentLoaded', function () {

    const btn_analizar = document.getElementById('btn_analizar');
    const btn_limpiar = document.getElementById('btn_limpiar');

    const OPERATORS = ["+", "-", "*", "/", "%", "="];
    const NUMBER = /^[0-9]+$/
    const LETRAS = /^[a-zA-Z|A-Za-z]+/
    const ESPACIO = /\s/;
    const PALABRAS_RESERVADAS = ["TEXTO;", "ENTERO;", "REAL;", "CAPTURA.TEXTO();"];
    const DELIMITADORES = /\;/;

    const isOperator = character => OPERATORS.includes(character);
    const isNumber = character => NUMBER.test(character);
    const isLetter = character => LETRAS.test(character);
    const isEmpty = character => ESPACIO.test(character);
    const isWordReserved = character => PALABRAS_RESERVADAS.includes(character);
    const isDelimiter = character => DELIMITADORES.test(character);

    btn_analizar.onclick = analizador_lexico;
    btn_limpiar.onclick = limpiar_campos;


    function analizador_lexico() {
        const lineas_texto_area = document.getElementById('entrada_texto').value.split('\n');
        const texto_area = document.getElementById('entrada_texto').value;
        const texto_area2 = document.getElementById('entrada_texto').value.split(/\s/);


        for (var i = 0; i < lineas_texto_area.length; i++) {
            var cursor = 0;
            console.log("Linea", i + 1, lineas_texto_area[i]);
            //console.log(lineas_texto_area[i]);
            var espacios = lineas_texto_area[i].split(" ");
            for (var i = 0; i < espacios.length; i++) {
                if (isWordReserved(espacios[i])) {
                    console.log("es una palabra reservada", espacios[i]);
                }else{
                    console.log("Es un identificador",espacios[i]);
                }
                if(isNumber(espacios[i])){
                    console.log("hay numeros",espacios[i]);

                }
            }

            analizador_sintactico(lineas_texto_area, texto_area);

        }
    }



    function limpiar_campos() {
        const texto_area = document.getElementById('entrada_texto').value = "";
        console.log("area de texto limpiada")
    }

    function analizador_sintactico(lineas_texto_area, texto_area) {

        let expReg_CrearVariable = /[a-zA-Z]+([0-9]+)?\s[REAL|TEXTO|ENTERO]+[;]/g;
        let expReg_AsignarValorVariable = /[a-zA-Z]+([0-9]+)?\s[=]\s["][a-zA-Z0-9\s,.-/]+["][;]/;
        for (var i = 0; i < lineas_texto_area.length; i++) {
            res = expReg_CrearVariable.test(texto_area);
            console.log(res);
        }
    }

});
