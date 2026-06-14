let premios = [
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

let canvas = document.getElementById("ruletaCanvas");
let ctx = canvas.getContext("2d");

let girando = false;

function entrar(){
    document.getElementById("pantalla1").style.display="none";
    document.getElementById("pantalla2").style.display="block";
    dibujar();
}

function dibujar(){
    let centro = 150;
    let angulo = (2*Math.PI)/premios.length;

    for(let i=0;i<premios.length;i++){
        ctx.beginPath();
        ctx.moveTo(centro,centro);
        ctx.fillStyle = i%2==0 ? "#ff4da6" : "#ff99cc";
        ctx.arc(centro,centro,150,i*angulo,(i+1)*angulo);
        ctx.fill();

        ctx.save();
        ctx.translate(centro,centro);
        ctx.rotate(i*angulo);
        ctx.fillStyle="white";
        ctx.fillText(premios[i],80,10);
        ctx.restore();
    }
}

function girarRuleta(){

    if(girando) return;
    girando = true;

    let duracion = 15000;
    let inicio = null;

    function animar(t){
        if(!inicio) inicio=t;

        let tiempo = t-inicio;
        let rotacion = (tiempo/duracion)*20;

        canvas.style.transform = `rotate(${rotacion}rad)`;

        if(tiempo<duracion){
            requestAnimationFrame(animar);
        } else {
            girando=false;

            let premio = premios[Math.floor(Math.random()*premios.length)];

            document.getElementById("resultado").innerHTML =
            "🎉 Ganaste: <b>"+premio+"</b>";
        }
    }

    requestAnimationFrame(animar);
}
