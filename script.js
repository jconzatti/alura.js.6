const ElementoHTML = document.querySelector("html");
const ElementosBotoesPomodoro = document.querySelectorAll(".app__card-button");
const Musica = new Audio("./sons/luna-rise-part-one.mp3");
Musica.loop = true;
const ElementoTocarMusica = document.getElementById("alternar-musica");
let TempoDecorridoEmSegundos = 1500;
const ElementoBotaoComecarOuParar = document.getElementById("start-pause");
let Temporizador = null;

ElementosBotoesPomodoro.forEach((lElementoBotaoPomodoro) =>{
    lElementoBotaoPomodoro.addEventListener("click", () => {
        DesativarTodosOsBotoesPomodoro();
        AtivarBotaoPomodoro(lElementoBotaoPomodoro);
        AlterarContexto(ObterContextoDoBotaoPomodoro(lElementoBotaoPomodoro));
    });
});

ElementoTocarMusica.addEventListener("change", () => {
    if (Musica.paused)
        Musica.play()
    else 
        Musica.pause();
});

function DesativarTodosOsBotoesPomodoro(){
    ElementosBotoesPomodoro.forEach((lElementoBotaoPomodoro) =>{
        lElementoBotaoPomodoro.classList.remove("active");
    });   
}

function AtivarBotaoPomodoro(pElementoBotaoPomodoro){
    pElementoBotaoPomodoro.classList.add("active");
}

function ObterContextoDoBotaoPomodoro(pElementoBotaoPomodoro){
    if (pElementoBotaoPomodoro.getAttribute("data-contexto") === "short")
        return "descanso-curto";
    else if (pElementoBotaoPomodoro.getAttribute("data-contexto") === "long")
        return "descanso-longo"; 
    return"foco"; 
}

function AlterarContexto(pContexto){
    const lElementoTitulo = document.querySelector(".app__title");
    lElementoTitulo.innerHTML = ObterHTMLDoTituloPeloContexto(pContexto);
    const lElementoImagem = document.querySelector(".app__image");
    lElementoImagem.src = `/imagens/${pContexto}.png`;
    ElementoHTML.setAttribute("data-contexto", pContexto);
    ZerarTemporizador();
    AjustarTemporizadorPeloContexto(pContexto);
    ExibirContagemRegressiva();
}

function ObterHTMLDoTituloPeloContexto(pContexto){
    if (pContexto === "descanso-curto")
        return `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
    else if (pContexto === "descanso-longo")
        return `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`; 
    return `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa</strong>`; 
}

function AjustarTemporizadorPeloContexto(pContexto){
    TempoDecorridoEmSegundos = 1500
    if (pContexto === "descanso-curto")
        TempoDecorridoEmSegundos = 300
    else if (pContexto === "descanso-longo")
        TempoDecorridoEmSegundos = 900;
}

ElementoBotaoComecarOuParar.addEventListener("click", IniciarOuPausarTemporizador);

function IniciarOuPausarTemporizador(){
    if (Temporizador){
        ZerarTemporizador();
        TocarSomParaPausarTemporizador();
        return
    }
    Temporizador = setInterval(ContagemRegressiva, 1000);
    AtribuirRotuloNoBotaoComecarOuParar("Pausar");
    AtribuirIconeNoBotaoComecarOuParar("./imagens/pause.png");
    TocarSomParaIniciarTemporizador();
}

function ZerarTemporizador(){
    clearInterval(Temporizador);
    Temporizador = null;
    AtribuirRotuloNoBotaoComecarOuParar("Começar");
    AtribuirIconeNoBotaoComecarOuParar("./imagens/play_arrow.png");
}

const ContagemRegressiva = () => {
    if (TempoDecorridoEmSegundos <= 0){
        ZerarTemporizador();
        TocarSomDeAlertaDeFimDoTemporizador();
        return   
    }
    TempoDecorridoEmSegundos -= 1;
    ExibirContagemRegressiva();
}

function TocarSomParaIniciarTemporizador(){
    TocarSom("./sons/play.wav");
}

function TocarSomParaPausarTemporizador(){
    TocarSom("./sons/pause.mp3");
}

function TocarSomDeAlertaDeFimDoTemporizador(){
    TocarSom("./sons/beep.mp3");
}

function TocarSom(pArquivoDeAudio){
    const lSom = new Audio(pArquivoDeAudio);
    lSom.currentTime = 0;
    lSom.play();
}

function AtribuirRotuloNoBotaoComecarOuParar(pRotulo){
    const lElementoSpanDoBotaoComecarOuParar = document.querySelector("#start-pause span");
    lElementoSpanDoBotaoComecarOuParar.textContent = pRotulo;
}

function AtribuirIconeNoBotaoComecarOuParar(pArquivoDeImagemDoIcone){
    const lElementoImagemDoBotaoComecarOuParar = document.querySelector(".app__card-primary-butto-icon");
    lElementoImagemDoBotaoComecarOuParar.src = pArquivoDeImagemDoIcone;
}

function ExibirContagemRegressiva(){
    const lElementoContagemRegressiva = document.getElementById("timer");
    const lTempoDecorridoAtual = new Date(TempoDecorridoEmSegundos * 1000);
    const lTempoDecorridoAtualFormatado = lTempoDecorridoAtual.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});
    lElementoContagemRegressiva.innerHTML = `${lTempoDecorridoAtualFormatado}`;
}

ExibirContagemRegressiva();
