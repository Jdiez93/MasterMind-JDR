// NUMERO DE INTENTOS Y VIDAS INICIALES
let intentosRestantes = 5;
let vidasRestantes = 5;

// COLORES VALIDOS Y GENERACION ALEATORIA
const coloresValidos = ['rojo', 'verde', 'azul', 'amarillo'];
const combinacionSecreta = generarCombinacion();

// FUNCION GENERAR ALEATORIAMENTE COMBINACION
function generarCombinacion() {
  return Array.from({ length: 4 }, () => coloresValidos[Math.floor(Math.random() * coloresValidos.length)]);
}

// INPUT AÑADIR COLOR
function agregarColor(color) {
  document.getElementById('guessInput').value += color + ' ';
}

// FUNCION EVALUAR ADIVINANZA USUARIO
function evaluarAdivinanza(combinacionSecreta, intentoUsuario) {
  return { correctos: intentoUsuario.filter((color, i) => combinacionSecreta[i] === color).length };
}

// MOSTRAR RESULTADO INTERFAZ
function mostrarResultado(resultado) {
  document.getElementById('result').innerHTML = `<p>Colores correctos: ${resultado.correctos}</p>`;
}

// COLOREA LAS LETRAS SEGUN SI ESTAN BIEN O MAL
function mostrarJugada(intentoUsuario) {
  const attemptsList = document.getElementById('attempts');
  const listItem = document.createElement('li');

  const coloredAttempt = intentoUsuario.map((color, index) =>
    `<span style="color: ${combinacionSecreta[index] === color ? 'green' : 'red'};">${color}</span>`
  );

  listItem.innerHTML = coloredAttempt.join(' ');
  attemptsList.appendChild(listItem);
}

// FUNCION PARA MOSTRAR LAS VIDAS RESTANTES
function mostrarVidas() {
  const vidasContainer = document.getElementById('vidas');
  vidasContainer.innerHTML = '❤️'.repeat(vidasRestantes);
}

// FUNCION RESTAR VIDAS
function restarVida() {
  if (--vidasRestantes === 0) {
    alert('¡Se te acabaron las vidas! La combinación secreta era: ' + combinacionSecreta.join(', '));
  }
  mostrarVidas(); // ACTUALIZA LAS VIDAS DESPUES DE RESTAR
}

// COMPRUEBA ADIVINANZA
function comprobarAdivinanza() {
  const intentoUsuario = document.getElementById('guessInput').value.trim().split(' ');

  if (intentoUsuario.length !== 4 || !intentoUsuario.every(color => coloresValidos.includes(color))) {
    return alert('Has introducido mal los colores. Debes introducirlo así: color color color color');
  }

  const resultado = evaluarAdivinanza(combinacionSecreta, intentoUsuario);
  mostrarResultado(resultado);
  mostrarJugada(intentoUsuario);

  if (resultado.correctos === 4) {
    alert('¡Felicidades! Has adivinado la combinación.');
  } else {
    restarVida();
  }
  
  // REINICIA INPUT ADIVINANZA
  document.getElementById('guessInput').value = ''; 
}

// FUNCION QUE SE EJECUTA AL CARGAR LA VENTANA
window.onload = () => {
  generarBotones();
  mostrarVidas();
};

