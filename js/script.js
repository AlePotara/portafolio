/* ============================================
   Script principal - Portafolio Alejandro Maidana
   Funcionalidades JavaScript:
   1. Modo claro / oscuro
   2. Validación del formulario de contacto
   3. Extras: saludo según la hora y año actual en el footer
   ============================================ */

// ============================================
// 1. MODO CLARO / OSCURO
// ============================================
const btnTema = document.getElementById("btnTema");
const iconoTema = document.getElementById("iconoTema");
const textoTema = document.getElementById("textoTema");

// Aplica el tema indicado ("light" u "oscuro") a toda la página
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-bs-theme", tema);

  if (tema === "dark") {
    iconoTema.className = "bi bi-sun";
    textoTema.textContent = "Modo claro";
  } else {
    iconoTema.className = "bi bi-moon-stars";
    textoTema.textContent = "Modo oscuro";
  }

  // Guardamos la preferencia del usuario (si el navegador lo permite)
  try {
    localStorage.setItem("temaPreferido", tema);
  } catch (e) {
    // Si localStorage no está disponible, simplemente no guardamos
  }
}

// Al hacer clic en el botón se alterna entre claro y oscuro
btnTema.addEventListener("click", function () {
  const temaActual = document.documentElement.getAttribute("data-bs-theme");
  const temaNuevo = temaActual === "dark" ? "light" : "dark";
  aplicarTema(temaNuevo);
});

// Al cargar la página, recuperamos el tema guardado (si existe)
try {
  const temaGuardado = localStorage.getItem("temaPreferido");
  if (temaGuardado) {
    aplicarTema(temaGuardado);
  }
} catch (e) {
  // Sin localStorage: se usa el tema claro por defecto
}

// ============================================
// 2. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ============================================
const formContacto = document.getElementById("formContacto");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoMensaje = document.getElementById("mensaje");
const alertaExito = document.getElementById("alertaExito");

// Muestra un mensaje de error debajo del campo y lo marca en rojo
function mostrarError(campo, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
}

// Limpia el error y marca el campo en verde
function marcarValido(campo, idError) {
  document.getElementById(idError).textContent = "";
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
}

// Valida que el correo tenga un formato correcto (ej: usuario@dominio.com)
function correoEsValido(correo) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(correo);
}

formContacto.addEventListener("submit", function (evento) {
  // Evitamos que el formulario se envíe y recargue la página
  evento.preventDefault();

  let formularioValido = true;

  // Validar nombre: no puede estar vacío y debe tener al menos 3 letras
  if (campoNombre.value.trim() === "") {
    mostrarError(campoNombre, "errorNombre", "El nombre es obligatorio.");
    formularioValido = false;
  } else if (campoNombre.value.trim().length < 3) {
    mostrarError(campoNombre, "errorNombre", "El nombre debe tener al menos 3 caracteres.");
    formularioValido = false;
  } else {
    marcarValido(campoNombre, "errorNombre");
  }

  // Validar correo: no puede estar vacío y debe tener formato válido
  if (campoCorreo.value.trim() === "") {
    mostrarError(campoCorreo, "errorCorreo", "El correo es obligatorio.");
    formularioValido = false;
  } else if (!correoEsValido(campoCorreo.value.trim())) {
    mostrarError(campoCorreo, "errorCorreo", "Ingresá un correo válido (ej: nombre@correo.com).");
    formularioValido = false;
  } else {
    marcarValido(campoCorreo, "errorCorreo");
  }

  // Validar mensaje: no puede estar vacío y debe tener al menos 10 caracteres
  if (campoMensaje.value.trim() === "") {
    mostrarError(campoMensaje, "errorMensaje", "El mensaje es obligatorio.");
    formularioValido = false;
  } else if (campoMensaje.value.trim().length < 10) {
    mostrarError(campoMensaje, "errorMensaje", "El mensaje debe tener al menos 10 caracteres.");
    formularioValido = false;
  } else {
    marcarValido(campoMensaje, "errorMensaje");
  }

  // Si todo está bien, mostramos la alerta de éxito y limpiamos el formulario
  if (formularioValido) {
    alertaExito.classList.remove("d-none");
    formContacto.reset();
    campoNombre.classList.remove("is-valid");
    campoCorreo.classList.remove("is-valid");
    campoMensaje.classList.remove("is-valid");

    // La alerta desaparece sola después de 4 segundos
    setTimeout(function () {
      alertaExito.classList.add("d-none");
    }, 4000);
  }
});

// ============================================
// 3. EXTRAS
// ============================================

// Saludo dinámico según la hora del día
const saludo = document.getElementById("saludo");
const horaActual = new Date().getHours();

if (horaActual >= 6 && horaActual < 12) {
  saludo.textContent = "¡Buenos días! Soy";
} else if (horaActual >= 12 && horaActual < 19) {
  saludo.textContent = "¡Buenas tardes! Soy";
} else {
  saludo.textContent = "¡Buenas noches! Soy";
}

// Año actual en el footer
document.getElementById("anio").textContent = new Date().getFullYear();
