window.addEventListener("DOMContentLoaded", () => obtenerLexemas());
const lexico = document.getElementById("datos");
const sintac = document.getElementById("aSintactico");
let codigo = document.getElementById("codigo");
let cCodigo = document.getElementById("container_codigo");
let lexemas;
let tokens = [];

/* obteniendo la informacion de la bd y pasandola a una variable local */
const obtenerLexemas = async () => {
  try {
    const rs = await fetch("lexemas.json");
    const data = await rs.json();
    lexemas = data;
  } catch (error) {
    console.log(error);
  }
};

/* buscar palabra en lexemas */
function buscar(listaDePalabras) {
  let subTokens = [];
  /* recorrer la lista que nos pasan */
  listaDePalabras.forEach((palabra) => {
    /* combrobar si la palabra se encuentra en la bd lexemas */
    lexemas.some((item) => item.nombre == palabra) ?
      lexemas.filter((item) => {
        if (item.nombre == palabra) {
          subTokens.push(item);
        }
      })
      /* combrobar si la palabra noencontrada no es un string vacio*/
      : comprobarPalabraNoEncontrada(palabra) !== undefined ?
        subTokens.push(comprobarPalabraNoEncontrada(palabra)) :
        console.log("ads");
  });
  tokens.push(subTokens);
  console.log(tokens);
  lexico.innerHTML = ``;
  tokens.forEach(item => {
    lexico.innerHTML += `
      <tr>
      <td class='linea text-body-1' colspan='3'>
      Linea ${tokens.indexOf(item) + 1}
      </td>
      </tr>`
    item.forEach(item => {
      lexico.innerHTML += `
      <thead>
      <tr>
          <th class="h6">nombre</th>
          <th class="h6">tipo</th>
          <th class="h6">codigo</th>
      </tr>
  </thead>
      <tr>
      <td class="text-body-1">
          "${item.nombre}"
      </td>
      <td class="text-body-1">
        ${item.tipo}
      </td>
      <td class="text-body-1">
        ${item.codigo}
      </td>
    </tr>`;
    })
  })
}

/*  funcion que compara las palabras no encontradas*/
function comprobarPalabraNoEncontrada(palabra) {
  /*   console.log('No se encontro',palabra); */
  let temp;
  /* comprueba si no es un string vacio y no es un numero */
  if (palabra !== '' && isNaN(palabra)) {
    temp = {
      nombre: palabra,
      tipo: "identificador",
      codigo: "101"
    }
    /* comprueba si no es un string vacio y si es un numero */
  } else if (palabra !== '' && !isNaN(palabra)) {
    temp = {
      nombre: palabra,
      tipo: "número",
      codigo: "102"
    }
  }
  return temp;
}

/* funcion que divide el texto en bloque de codigo */
function dividirBloque(cadenas) {
  let bloques = cadenas.split(';\n')
  console.log(bloques);
  return bloques;
}
/* funcion que separa los casos */
function comprobarCaso(bloques) {
  let respuestas = [];
  let respuesta;
  let i = 0;
  bloques.forEach(item => {

    if (item.match(/^[a-zA-Z]+([0-9]+)?\sTexto;|Entero;|Real;$/)) {
      respuesta = [i + 1, 'Inicialización de variable'];

    } else if (item.match(/^[a-zA-Z]+([0-9]+)?\s[=]\s((["][a-zA-Z0-9\s,.-/]+["])?|[a-zA-Z0-9/])[;]$/)) {
      respuesta = [i + 1, 'Asignación de variable'];

    } else if (item.match(/^[a-zA-Z]+([0-9]+)?\s[=]\sCaptura[.](Texto|Entero|Real)[(][)][;]$/)) {
      respuesta = [i + 1, 'Lectura de datos'];

    } else if (item.match(/^Mensaje[.]Texto[(]["][a-zA-Z0-9\s]+["][)][;]$/)) {
      respuesta = [i + 1, 'Escritura de datos'];

    } else {
      respuesta = [i + 1, 'No reconozco esa sintaxis'];
    }
    respuestas.push(respuesta);
    console.log(respuestas);
    i++;
  })
  sintac.innerHTML = ``;
  respuestas.forEach(item => {
    sintac.innerHTML += `
    <p class='text-body-1'>
    Bloque de codigo ${item[0]}
    </p>
    <p class='text-body-1'>
    ${item[1]}
    </p>
    `;
  })
}
/* funcion que divide el texto en lineas */
function dividirLineas(cadenas) {
  let listDeCadenas = cadenas.split(/\n/g);
  console.log("LISTA_DE_CADENAS", listDeCadenas);
  return listDeCadenas;
}
/* funcion que divide el texto en palabras y luego las busca en la bd lexemas */
function dividirPalabras(cadenas) {
  /* recorremos las lineas */
  cadenas.forEach((cadena) => {
    /* en cada linea separamos los simbolos*/
    cadena = cadena.replace(';', ' ;');
    cadena = cadena.replace('=', ' =');
    cadena = cadena.replace('+', ' +');
    cadena = cadena.replace('.', ' . ');
    cadena = cadena.replace('(', ' ( ');
    cadena = cadena.replace(')', ' ) ');
    /*     console.log(cadena) */
    /* separamos cada linea por los espacios */
    let listaDePalabras = cadena.split(/\s/g);
    /*     console.log(listaDePalabras); */
    /* buscamos cada parabra */
    buscar(listaDePalabras);
  });
}
/* agregando la accion al form */
cCodigo.addEventListener('submit', event => {
  event.preventDefault();
  tokens = [];
  dividirPalabras(dividirLineas(codigo.value));
  comprobarCaso(dividirBloque(codigo.value));
  /*   dividirLineas() */
})
cCodigo.addEventListener('reset', event => {
  lexico.innerHTML = ``;
  sintac.innerHTML = ``;
})