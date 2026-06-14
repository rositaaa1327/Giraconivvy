const canvas = document.getElementById("ruletaCanvas");
const ctx = canvas.getContext("2d");

const premios = [
"5% OFF",
"10% OFF",
"Regalo",
"15% OFF",
"50% OFF 7 días",
"50% OFF",
"Pulsera gratis",
"5% OFF",
"10% OFF",
"Regalo",
"15% OFF",
"Pulsera gratis"
];

let girando = false;

function dibujar(){
    const centro = 150;
    const radio = 150;
    const paso = (2*Math.PI)/premios.length;

    for(let i=0;i<premios.length;i++){
        let start = i * paso;

        ctx.beginPath();
        ctx.moveTo(centro,centro);
        ctx.arc(centro,centro,radio,start,start+paso);

        ctx.fillStyle = i%2===0 ? "#ff4da6" : "#ff99cc";
        ctx.fill();

        ctx.save();
        ctx.translate(centro,centro);
        ctx.rotate(start + paso/2);
        ctx.fillStyle="white";
        ctx.font="12px Arial";
        ctx.fillText(premios[i],100,5);
        ctx.restore();
    }
}

dibujar();

function girarRuleta(){

    if(girando) return;
    girando = true;

    let duracion = 15000;
    let inicio = null;
    let vueltas = 10 + Math.random()*5;

    function animar(t){
        if(!inicio) inicio = t;
        let tiempo = t - inicio;

        let rotacion = (tiempo/duracion) * vueltas * 2*Math.PI;

        canvas.style.transform = `rotate(${rotacion}rad)`;

        if(tiempo < duracion){
            requestAnimationFrame(animar);
        } else {
            girando = false;

            let premio = premios[Math.floor(Math.random()*premios.length)];

            document.getElementById("resultado").innerHTML =
            "🎉 Ganaste: <b>" + premio + "</b>";
        }
    }

    requestAnimationFrame(animar);
}
