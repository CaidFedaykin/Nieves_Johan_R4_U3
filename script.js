let numeroActual = "";
let numeroAnterior = "";
let operacion = "";
let expresionVisible = "";

const pantalla = document.getElementById("pantalla");
const botonesNumero = document.querySelectorAll(".numero");
const botonesOperador = document.querySelectorAll(".operador");
const botonIgual = document.querySelector(".igual");
const botonLimpiar = document.querySelector(".accion:not(.igual)");

botonesNumero.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (valor === ".") {
            if (numeroActual.includes(".")) return;

            if (numeroActual === "") {
                numeroActual = "0.";
                expresionVisible += "0.";
            } else {
                numeroActual += ".";
                expresionVisible += ".";
            }
        } else {
            numeroActual += valor;
            expresionVisible += valor;
        }

        actualizarPantalla();
    });
});

botonesOperador.forEach(boton => {
    boton.addEventListener("click", () => {
        if (numeroActual === "") return;

        numeroAnterior = numeroActual;
        operacion = boton.textContent;
        expresionVisible += ` ${operacion} `;
        numeroActual = "";
        actualizarPantalla();
    });
});

botonIgual.addEventListener("click", () => {
    const a = parseFloat(numeroAnterior);
    const b = parseFloat(numeroActual);

    if (isNaN(a) || isNaN(b)) return;

    let resultado;

    switch (operacion) {
        case "+":
            resultado = a + b;
            break;
        case "−":
            resultado = a - b;
            break;
        case "×":
            resultado = a * b;
            break;
        case "÷":
            resultado = b !== 0 ? a / b : "Error";
            break;
        default:
            return;
    }

    resultado = Number.isInteger(resultado) ? resultado : resultado.toFixed(2);

    pantalla.value = resultado;
    numeroActual = resultado.toString();
    numeroAnterior = "";
    operacion = "";
    expresionVisible = numeroActual;
});

botonLimpiar.addEventListener("click", () => {
    numeroActual = "";
    numeroAnterior = "";
    operacion = "";
    expresionVisible = "";
    actualizarPantalla();
});

function actualizarPantalla() {
    pantalla.value = expresionVisible;
}