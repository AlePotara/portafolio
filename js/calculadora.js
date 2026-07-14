/* ============================================
   Calculadora Web - Alejandro Maidana
   Proyecto desarrollado con JavaScript puro.
   ============================================ */

const pantalla = document.getElementById("pantalla");

// Agrega un número u operador a la pantalla
function agregar(valor) {
  // Si la pantalla muestra 0 o un error, se reemplaza por el nuevo valor
  if (pantalla.value === "0" || pantalla.value === "Error") {
    // Los operadores pueden continuar después del 0 (ej: 0.5)
    if ("+-*/%".includes(valor)) {
      pantalla.value = pantalla.value === "Error" ? "0" + valor : pantalla.value + valor;
    } else {
      pantalla.value = valor;
    }
    return;
  }

  const ultimoCaracter = pantalla.value.slice(-1);

  // Evitamos dos operadores seguidos (ej: 5++3): se reemplaza el anterior
  if ("+-*/%".includes(ultimoCaracter) && "+-*/%".includes(valor)) {
    pantalla.value = pantalla.value.slice(0, -1) + valor;
    return;
  }

  // Evitamos dos puntos decimales en el mismo número
  if (valor === ".") {
    const partes = pantalla.value.split(/[+\-*/%]/);
    const numeroActual = partes[partes.length - 1];
    if (numeroActual.includes(".")) {
      return;
    }
  }

  pantalla.value += valor;
}

// Borra todo (botón C)
function limpiar() {
  pantalla.value = "0";
}

// Borra el último carácter (botón retroceso)
function borrarUltimo() {
  if (pantalla.value.length <= 1 || pantalla.value === "Error") {
    pantalla.value = "0";
  } else {
    pantalla.value = pantalla.value.slice(0, -1);
  }
}

// Calcula el resultado (botón =)
function calcular() {
  try {
    // Verificamos que la expresión solo tenga caracteres permitidos
    if (!/^[0-9+\-*/%.]+$/.test(pantalla.value)) {
      pantalla.value = "Error";
      return;
    }

    // Function evalúa la expresión matemática de forma controlada
    let resultado = Function('"use strict"; return (' + pantalla.value + ")")();

    // Controlamos divisiones por cero e infinitos
    if (!isFinite(resultado)) {
      pantalla.value = "Error";
      return;
    }

    // Redondeamos para evitar decimales larguísimos (ej: 0.1 + 0.2)
    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = String(resultado);
  } catch (e) {
    pantalla.value = "Error";
  }
}

// Soporte de teclado: números, operadores, Enter (=), Escape (C) y Backspace
document.addEventListener("keydown", function (evento) {
  const tecla = evento.key;

  if ("0123456789+-*/%.".includes(tecla)) {
    agregar(tecla);
  } else if (tecla === "Enter" || tecla === "=") {
    evento.preventDefault();
    calcular();
  } else if (tecla === "Escape") {
    limpiar();
  } else if (tecla === "Backspace") {
    borrarUltimo();
  }
});

// Año actual en el footer
document.getElementById("anio").textContent = new Date().getFullYear();
