const canvas = document.getElementById("ruletaCanvas");
const ctx = canvas.getContext("2d");

const premios = [
"5% OFF",
"10% OFF",
"Regalo",
"15% OFF",
"50% OFF",
"Pulsera gratis",
"Regalo sorpresa",
"10% OFF",
"5% OFF",
"15% OFF",
"Pulsera gratis",
"50% OFF"
];

const colores = ["#ff4da6", "#ff85c2", "#ffb3d9", "#ff66b2"];

let anguloActual = 0;
let girando = false;

const centro = 150;
const radio = 150;
const anguloPorSeccion = (2 * Math.PI) / premios.length;

// 🎡 DIBUJAR RULETA CASINO
function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < premios.length; i++) {
        let anguloInicio = anguloActual + i * anguloPorSeccion;

        ctx.beginPath();
        ctx.moveTo(centro, centro);
        ctx.arc(centro, centro, radio, anguloInicio, anguloInicio + anguloPorSeccion);

        ctx.fillStyle = colores[i % colores.length];
        ctx.fill();

        ctx.save();
        ctx.translate(centro, centro);
        ctx.rotate(anguloInicio + anguloPorSeccion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.fillText(premios[i], 120, 5);
        ctx.restore();
    }

    // centro estilo casino
    ctx.beginPath();
    ctx.arc(centro, centro, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.fillStyle = "#ff4da6";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("IVVY", centro, centro + 5);
}

dibujarRuleta();

// 🎡 GIRO CASINO REAL
function girarRuleta() {

    if (girando) return;
    girando = true;

    const duracion = 5000; // 5 segundos
    const vueltas = 8 + Math.random() * 4;

    const inicio = performance.now();

    const premioIndex = Math.floor(Math.random() * premios.length);
    const anguloFinal = (premioIndex * anguloPorSeccion);

    function animar(tiempo) {

        let progreso = (tiempo - inicio) / duracion;

        if (progreso > 1) progreso = 1;

        // easing (desaceleración real casino)
        let easing = 1 - Math.pow(1 - progreso, 3);

        anguloActual = (vueltas * 2 * Math.PI * easing) + anguloFinal;

        canvas.style.transform = `rotate(${anguloActual}rad)`;

        if (progreso < 1) {
            requestAnimationFrame(animar);
        } else {
            girando = false;

            let premio = premios[premioIndex];

            document.getElementById("resultado").innerHTML =
                "🎉 <b>Ganaste:</b> " + premio + "<br>📸 Envía captura por Instagram 💖";
        }
    }

    requestAnimationFrame(animar);
}
