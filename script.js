function girarRuleta() {

let nombre = document.getElementById("nombre").value;
let instagram = document.getElementById("instagram").value;

if(nombre === "" || instagram === ""){
    alert("Por favor completa todos los campos 💖");
    return;
}

let premios = [
    "💖 5% de descuento",
    "✨ 10% de descuento",
    "🎁 Regalo sorpresa",
    "🛍️ 15% de descuento",
    "🌟 Cupón especial (50% por 7 días)",
    "🔥 50% de descuento",
    "💎 Pulsera personalizada gratis"
];

// Elegir premio aleatorio
let premio = premios[Math.floor(Math.random() * premios.length)];

// Simular "giro"
document.getElementById("resultado").innerHTML = "Girando... 🎡✨";

setTimeout(() => {
    let codigo = "IVVY-" + Math.random().toString(36).substring(2,8).toUpperCase();

    document.getElementById("resultado").innerHTML = 
    "🎉 ¡Felicidades!<br><br>" +
    "Ganaste: <br><b>" + premio + "</b><br><br>" +
    "Código: <b>" + codigo + "</b><br><br>" +
    "📸 Toma captura y envíala por Instagram para reclamar tu premio.";
}, 3000);

}
